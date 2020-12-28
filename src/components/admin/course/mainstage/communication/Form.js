/**
 * Created by hungvo on 27/04/2017.
 */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import schema from './schema/form';

const formid = 'course_communicate';

class Form extends Component {
  style = { margin: 10 };

  render() {
    const { node } = this.props || {};
    const hiddenFields = this.props.hiddenFields || {};
    const targets = node && node.targets;
    const propsRender = { node, title: t1('communication') };
    hiddenFields.course_iid = node;

    if (targets && targets.length === 1) {
      hiddenFields.targets = targets;
      propsRender.step = 'send_one';
    }

    return (
      <div style={this.style}>
        <NodeNew
          {...propsRender}
          ntype={'communication'}
          hiddenFields={hiddenFields}
          schema={schema}
          mode={'new'}
          closeModal
          alternativeApi={apiUrls[formid]}
        />
      </div>
    );
  }
}

export default connect()(Form);
