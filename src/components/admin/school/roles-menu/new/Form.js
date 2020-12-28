import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import rolesMenuSchema from 'components/admin/school/roles-menu/schema/form';

class Form extends Component {
  render() {
    return (
      <div className="roles_menu">
        <NodeNew
          {...this.props}
          ntype="roles_menu"
          schema={rolesMenuSchema}
          closeModal
          inline="true"
        />
      </div>
    );
  }
}

export default connect()(Form);
