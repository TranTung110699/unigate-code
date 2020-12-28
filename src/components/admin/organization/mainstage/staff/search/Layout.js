import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
// import FormFilters from './FormFilters';
import Results from './Results';
import schema from './schema-form';

class OrganizationStaff extends React.Component {
  cssClass = 'admin-department-staff';

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
    const { node, formid } = this.props;

    return node ? (
      <SearchWrapper
        formid={formid}
        hiddenFields={{
          user_organizations: [node.iid],
          _sand_step: 'staff',
        }}
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.user_search}
        noResultText={t1('no_staff')}
      />
    ) : null;
  }
}

OrganizationStaff.propTypes = {
  className: PropTypes.string,
};

OrganizationStaff.defaultProps = {
  className: '',
};

export default OrganizationStaff;
