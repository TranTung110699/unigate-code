/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new/index';
import schoolSchema from 'components/admin/school/school/schema/form';

class Form extends Component {
  render() {
    return (
      <NodeNew {...this.props} schema={schoolSchema} inline="true" closeModal />
    );
  }
}

export default connect()(Form);
