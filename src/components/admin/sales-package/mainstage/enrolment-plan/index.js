import PropTypes from 'prop-types';
import React from 'react';
import apiUrls from '../../endpoints';
import SearchForm from './SearchForm';

function EnrolmentPlanSearch({ node }) {
  return (
    <div>
      <SearchForm
        node={node}
        alternativeApi={apiUrls.searchEnrolmentPlansOfPackage}
        formid={`search-EP-sale-package-${node.iid}`}
      />
    </div>
  );
}

export default EnrolmentPlanSearch;

EnrolmentPlanSearch.propTypes = {
  node: PropTypes.object.isRequired,
};
