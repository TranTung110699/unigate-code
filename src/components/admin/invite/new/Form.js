import React, { Component } from 'react';
import SearchInviteForm from 'components/admin/invite/search/Layout';
import { CourseActions } from 'configs/constants/permission';

class SearchInviteFormWrapper extends Component {
  render() {
    const { hiddenFields, node, hasPermission, permissions } = this.props;
    const hasPermUpdate =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE,
        node && node.iid,
        permissions,
      );
    return (
      <div>
        <SearchInviteForm
          {...this.props}
          hiddenFields={hiddenFields}
          hasInvite={hasPermUpdate}
        />
      </div>
    );
  }
}

export default SearchInviteFormWrapper;
