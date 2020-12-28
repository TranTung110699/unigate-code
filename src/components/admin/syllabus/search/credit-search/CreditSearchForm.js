/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import lodashGet from 'lodash.get';
import CreditResults from './credit-results';
import syllabusSearchSchema from './schema-form-advance';
import compactSearchschema from '../schema-form';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class CreditSyllabusSearchForm extends Component {
  renderCreditResultComponent = (items, props) => {
    return <CreditResults items={items} {...props} />;
  };

  render() {
    let { hiddenFields, isFeatureEnabled } = this.props;

    const {
      isSIS,
      surveyIidsToAvoidDuplicateApplication,
      approvalTypes,
    } = this.props;
    const requireOrganization = false;

    const type = this.props.type;
    hiddenFields = {
      ...hiddenFields,
      survey_iids_to_avoid_duplicate_application: surveyIidsToAvoidDuplicateApplication,
      type,
      ntype: 'syllabus',
      approvalTypes,
      isSIS,
    };

    if (!isSIS) {
      hiddenFields = {
        ...hiddenFields,
        requireOrganization,
      };
    }

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return (
        <SearchWrapper
          {...this.props}
          formid="syllabus_search"
          schema={syllabusSearchSchema}
          hiddenFields={hiddenFields}
          defaultValues={{
            status: approvalTypes
              ? Object.keys(approvalTypes)
              : ['queued', 'approved'],
          }}
          showSearchButton={false}
          renderResultsComponent={this.renderCreditResultComponent}
        />
      );
    }

    return (
      <SearchWrapper
        {...this.props}
        formid="syllabus_search"
        schema={compactSearchschema}
        hiddenFields={hiddenFields}
        defaultValues={{
          status: approvalTypes
            ? Object.keys(approvalTypes)
            : ['queued', 'approved'],
        }}
        renderResultsComponent={this.renderCreditResultComponent}
      />
    );
  }
}

const mapStateToProps = (state) => {
  let includeSubOrg = lodashGet(
    state,
    `valueFieldsToPopulateDefault.syllabus_search.include_sub_organizations`,
  );

  const defaultSearchSubOrgFromConfig = lodashGet(
    state,
    'domainInfo.conf.default_search_sub_organizations.syllabus',
  );

  if (typeof includeSubOrg === 'undefined') {
    includeSubOrg = defaultSearchSubOrgFromConfig;
  }

  const approvalTypes =
    lodashGet(state, 'domainInfo.school.approval_flow') || {};

  return {
    approvalTypes,
    includeSubOrg,
  };
};

export default connect(mapStateToProps)(
  withSchoolConfig(withFeatureFlags()(CreditSyllabusSearchForm)),
);
