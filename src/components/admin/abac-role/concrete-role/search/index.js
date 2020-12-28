/* eslint-disable no-undef,react/prop-types,react/sort-comp,prefer-const */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { abacRoleTypes } from 'configs/constants';
import Results from './Results';
import NoResults from './NoResultsShowAbstractRoles';

class GenericConcreteRolesSearch extends Component {
  renderNoResultComponent = () => {
    const { formid, type, node, location } = this.props;

    return (
      <div>
        <NoResults
          type={type}
          formid={formid}
          node={node}
          location={location}
        />
      </div>
    );
  };

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => {
    const {
      formid,
      type,
      node,
      location,
      hasPermission,
      permissions,
    } = this.props;

    return (
      <div>
        <Results
          node={node}
          type={type}
          formid={formid}
          resultId={resultId}
          items={items}
          location={location}
          hasPermission={hasPermission}
          permissions={permissions}
        />
        <hr />
        <NoResults
          type={type}
          formid={formid}
          node={node}
          location={location}
        />
      </div>
    );
  };

  getOrganizationIid = (node) => {
    if (node && node.domains) {
      return null;
    }

    if (node && node.type === 'organization') {
      return node && node.iid;
    }

    return node && node.organizations;
  };

  render() {
    const { formid, step, type, node } = this.props;
    let appliedTargetIid = null;

    if (type !== abacRoleTypes.SCHOOL) {
      appliedTargetIid = node && node.iid;
    }

    return (
      <SearchWrapper
        formid={formid}
        alternativeApi={aApiUrls.abac_role_search}
        hiddenFields={{
          _sand_step: step,
          type,
          organizations: this.getOrganizationIid(node),
          applied_target_iid: appliedTargetIid,
        }}
        renderResultsComponent={this.renderTreeResultComponent}
        renderNoResultComponent={this.renderNoResultComponent}
      />
    );
  }
}

export default GenericConcreteRolesSearch;
