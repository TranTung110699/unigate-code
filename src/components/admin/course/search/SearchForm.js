import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { createSelector } from 'reselect';
import Results from './Results';
import K12Results from './K12Results';
import SiSResults from './SiSResults';
import sisSchema from './schema/sis-form';
import schema from './schema/schema-form';
import schemaAdvance from './schema/schema-form-advance';
import k12Schema from './schema/k12-schema-form';
import { handleOpenNewCourse } from './../new/ButtonNew';
import Permission from 'components/common/permission/Permission';
import { CourseActions } from 'configs/constants/permission';
import { abacRoleTypes } from 'configs/constants';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import commonSagaActions from 'actions/saga-creators';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import lodashGet from 'lodash.get';

const formid = 'course_search';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesSearchForm: {},
      autoSearchWhenStart: true,
    };
  }

  getParamsForCheckPermission = () => {
    return {
      actions: CourseActions,
      type: abacRoleTypes.COURSE,
    };
  };

  componentDidMount() {
    const { action, dispatch, history } = this.props;
    if (action === 'new') {
      handleOpenNewCourse({ dispatch, searchFormId: formid, history });
    }
  }

  renderResultComponent = (items, props) => {
    const {
      renderActionCell,
      resultReadOnly,
      permissions,
      hasPermission,
      isSIS,
      isK12,
    } = this.props;

    if (isK12) {
      return (
        <K12Results
          items={items}
          {...props}
          readOnly={resultReadOnly}
          renderActionCell={renderActionCell}
        />
      );
    }

    if (isSIS) {
      return (
        <SiSResults
          items={items}
          {...props}
          readOnly={resultReadOnly}
          renderActionCell={renderActionCell}
          permissions={permissions}
          hasPermission={hasPermission}
        />
      );
    }

    return (
      <Results
        items={items}
        {...props}
        readOnly={resultReadOnly}
        renderActionCell={renderActionCell}
        permissions={permissions}
        hasPermission={hasPermission}
      />
    );
  };

  handleExport = () => {
    const { valuesSearchForm } = this.state;
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_course,
        valuesSearchForm,
      ),
    );
  };

  render() {
    const formid = this.props.formid || 'course_search';
    const {
      isSIS,
      alternativeApi,
      isK12,
      showExport,
      isFeatureEnabled,
    } = this.props;

    let { hiddenFields } = this.props;
    hiddenFields = Object.assign(
      {
        requireOrganization: 1,
        _sand_expand: ['number_of_students'],
      },
      hiddenFields,
    );

    if (!isSIS) {
      hiddenFields = { ...hiddenFields, isSIS };
    }

    return (
      <SearchWrapper
        {...this.props}
        formid={formid}
        schema={
          isK12
            ? k12Schema
            : isSIS
            ? sisSchema(hiddenFields)
            : isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? schemaAdvance
            : schema
        }
        renderResultsComponent={
          this.props.renderResultsComponent || this.renderResultComponent
        }
        onChange={
          isSIS && showExport
            ? (valuesSearchForm) => {
                this.setState(() => ({ valuesSearchForm }));
              }
            : null
        }
        onResultChange={this.props.onResultChange}
        autoSearchWhenStart={this.state.autoSearchWhenStart}
        showQueryField={!isSIS && !isSIS}
        showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
        ntype="course"
        hiddenFields={hiddenFields}
        alternativeApi={alternativeApi || apiUrls.course_search}
        submitButton={
          isSIS ? (
            <div>
              <RaisedButton
                primary
                type="submit"
                label={t1('search')}
                className="m-l-10 m-r-10"
              />
              {showExport && (
                <RaisedButton
                  primary
                  onClick={this.handleExport}
                  icon={<Icon icon="export" style={{ color: 'white' }} />}
                  label={t1('export')}
                  className="m-l-10 m-r-10"
                />
              )}
            </div>
          ) : null
        }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  let includeSubOrg = lodashGet(
    state,
    `valueFieldsToPopulateDefault.${props.formid ||
      'course_search'}.include_sub_organizations`,
  );

  const defaultSearchSubOrgFromConfig = lodashGet(
    state,
    'domainInfo.conf.default_search_sub_organizations.course',
  );

  if (typeof includeSubOrg === 'undefined') {
    includeSubOrg = defaultSearchSubOrgFromConfig;
  }

  return {
    action: props.match && props.match.params && props.match.params.action,
    includeSubOrg,
  };
};

export default connect(mapStateToProps)(
  withSchoolConfigs(withFeatureFlags()(Permission(SearchForm))),
);
