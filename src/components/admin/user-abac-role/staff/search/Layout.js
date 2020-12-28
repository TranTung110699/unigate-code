/* eslint-disable no-undef,react/prop-types,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import FormFilters from './FormFilters';
import Results from './Results';
import schema from './search-schema';

class AddRolesForStaff extends React.Component {
  cssClass = 'admin-contest-staff';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { formid, node, hasPermission, permissions } = this.props;

    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
        hasPermission={hasPermission}
        permissions={permissions}
      />
    );
  };

  render() {
    const { node, formid, appliedScope } = this.props;

    const hiddenFields = {
      resource_iid: node.iid,
      applied_scope: appliedScope,
      _sand_step: 'list_members',
      _sand_expand: ['user_organizations', 'positions'],
    };

    return node ? (
      <div>
        <SearchWrapper
          formid={formid}
          schema={schema}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={apiUrls.user_search}
          noResultText={t1('no_staff')}
          classFormFilter="display-none"
          autoSearchWhenStart={true}
          noResultImage="/media/images/empty/person.png"
        />
      </div>
    ) : null;
  }
}

AddRolesForStaff.propTypes = {
  className: PropTypes.string,
};

AddRolesForStaff.defaultProps = {
  className: '',
};

export default AddRolesForStaff;
