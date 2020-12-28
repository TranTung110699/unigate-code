/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { relationTypes } from 'configs/constants';
import FormFilters from './FormFilters';
import Results from './Results';

class AcademicCategoryStaff extends React.Component {
  cssClass = 'admin-academic-category-staff';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { formid, node } = this.props;
    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  render() {
    const { className, node, formid } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return node ? (
      <SearchWrapper
        formid={formid}
        hiddenFields={{
          category_iid: node.iid,
          rt: relationTypes.STAFF_CATEGORY,
          _sand_step: 'list_members',
        }}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.user_search}
        noResultText={t1('no_staff')}
      >
        <FormFilters />
      </SearchWrapper>
    ) : null;
  }
}

AcademicCategoryStaff.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryStaff.defaultProps = {
  className: '',
};

export default AcademicCategoryStaff;
