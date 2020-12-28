import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import schema from './schema-form';
import Results from './Results';

class OrganizationUsers extends React.Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  cssClass = 'admin-department-students';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { formid, node, action } = this.props;

    return (
      <Results
        {...props}
        action={action}
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

    return (
      node && (
        <SearchWrapper
          formid={formid}
          hiddenFields={{
            user_organizations: [node.iid],
            _sand_step: 'list_members',
            _sand_expand: ['user_organizations', 'positions', 'phongbans'],
          }}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={apiUrls.user_search}
          paginationProps={this.paginationProps}
          noResultText={t1('no_students')}
          schema={schema}
        />
      )
    );
  }
}

OrganizationUsers.propTypes = {
  className: PropTypes.string,
};

OrganizationUsers.defaultProps = {
  className: '',
};

export default OrganizationUsers;
