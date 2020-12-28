/* eslint-disable react/prop-types,no-undef */
import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import Form from './Form';

class RoleEditor extends Component {
  renderFull = ({ closeDialog }) => <Form {...this.props} />;

  textPreview = () => {
    const { editTile } = this.props;

    return editTile || t1('edit_roles');
  };

  render() {
    const { user, org } = this.props;
    const roles = lodashGet(user, 'abacRoles', []).map((role) =>
      lodashGet(role, 'name'),
    );

    return (
      <div>
        {Array.isArray(roles) &&
          roles.length > 0 &&
          roles.map((titleEditRole) => <div> - {titleEditRole}</div>)}

        <DetailOnDialog
          {...this.props}
          textPreview={this.textPreview}
          renderFull={this.renderFull}
        />
      </div>
    );
  }
}

export default RoleEditor;
