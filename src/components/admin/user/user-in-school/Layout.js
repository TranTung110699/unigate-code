import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes } from 'configs/constants';
import { userOrganizationAndPhongbanIidsSelector } from 'common/selectors';
import CheckPermission from 'components/common/CheckPermission';
import UserResults from './Results';
import schemaNew from '../account/account-search/schema/schema-new';
import lodashGet from 'lodash.get';

class UserLayout extends Component {
  prepareDataBeforeSearch = (values) => {
    let newValues = values;
    if (
      Array.isArray(newValues.credit_syllabuses) &&
      newValues.credit_syllabuses.length > 0
    ) {
      newValues = {
        ...newValues,
        credit_syllabuses: values.credit_syllabuses.map(
          (creditSyllabus) => creditSyllabus.iid,
        ),
      };
    }

    return newValues;
  };

  renderResultsComponent = (items, props) => {
    const renderResults = (showEditAccountButton) => (
      <UserResults
        {...this.props}
        {...props}
        items={items}
        showEditAccountButton={showEditAccountButton}
      />
    );

    return (
      <CheckPermission
        renderOnFailure={() => renderResults(false)}
        renderOnSuccess={() => renderResults(true)}
        actions={['root']}
      />
    );
  };

  render() {
    const {
      themeConfig,
      orgIids,
      formid,
      searchFormId,
      isSearchParent,
      alternativeApi,
      searchUserSchema,
      showSearchButton,
      includeSubOrg,
      allowedTargetGroupFilters,
    } = this.props;

    const isSIS = themeConfig.type === schoolTypes.SIS;
    let hiddenFields = this.props.hiddenFields || {};

    hiddenFields = {
      ...hiddenFields,
      ntype: 'user',
      _sand_step: isSearchParent ? 'parent' : 'students',
      _sand_expand: ['user_organizations', 'positions', 'phongbans'],
    };

    if (!isSIS && !allowedTargetGroupFilters.includes('user_organizations')) {
      hiddenFields = {
        ...hiddenFields,
        orgIids,
      };
    }

    return (
      <SearchWrapper
        formid={formid || 'user_school_search'}
        searchFormId={searchFormId || 'user_school_search'}
        hiddenFields={hiddenFields}
        renderResultsComponent={
          this.props.renderResultsComponent || this.renderResultsComponent
        }
        onResultChange={this.props.onResultChange}
        prepareDataBeforeSearch={this.prepareDataBeforeSearch}
        showQueryField={false}
        showSearchButton={showSearchButton || false}
        schema={searchUserSchema ? searchUserSchema : schemaNew}
        alternativeApi={alternativeApi ? alternativeApi : '/user/api/search'}
        autoSearchWhenStart
        noResultImage={'/media/images/empty/person.png'}
        includeSubOrg={includeSubOrg}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const departmentAndPhongbanIids = userOrganizationAndPhongbanIidsSelector(
    state,
  );

  let includeSubOrg = lodashGet(
    state,
    `valueFieldsToPopulateDefault.${props.formid ||
      'user_school_search'}.include_sub_organizations`,
  );

  const defaultSearchSubOrgFromConfig = lodashGet(
    state,
    'domainInfo.conf.default_search_sub_organizations.account',
  );

  if (typeof includeSubOrg === 'undefined') {
    includeSubOrg = defaultSearchSubOrgFromConfig;
  }

  return {
    themeConfig: getThemeConfig(state),
    orgIids: departmentAndPhongbanIids,
    includeSubOrg,
    allowedTargetGroupFilters: lodashGet(
      state,
      'domainInfo.conf.allowed_target_group_filters',
    ),
  };
};

export default connect(mapStateToProps)(UserLayout);
