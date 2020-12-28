import PropTypes from 'prop-types';
import React from 'react';
import schema from 'components/admin/enrolment-plan/search/schema-advance';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';

function EnrolmentPlanSearch({ node, alternativeApi, formid, mode }) {
  const renderResultComponent = (items, props) => {
    return <Results items={items} {...props} />;
  };

  const hiddenFields = {
    _sand_expand: [
      'organizations',
      'academic_categories',
      'training_plan_iid',
      'number_of_members',
    ],
    include_sub_organizations: 1,
    sales_package_iid: node.iid,
  };

  return (
    <div>
      <SearchWrapper
        schema={schema}
        showSearchButton={false}
        formid={formid}
        showQueryField
        renderResultsComponent={renderResultComponent}
        alternativeApi={alternativeApi}
        hiddenFields={hiddenFields}
        searchSubOrganization
        mode={mode}
        node={node}
        showResult
      />
    </div>
  );
}

export default EnrolmentPlanSearch;

EnrolmentPlanSearch.propTypes = {
  alternativeApi: PropTypes.string,
  node: PropTypes.object.isRequired,
};
