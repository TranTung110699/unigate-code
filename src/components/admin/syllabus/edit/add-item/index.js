import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import ChooseItemToAdd from 'components/admin/node/edit/metadata-v2/add-item/';
import getChildrenTypes from 'components/admin/node/edit/metadata/add-item/utils';

class PreAddItem extends Component {
  render() {
    const {
      node,
      checkIfEnableExamTemplate,
      domainInfo,
      fieldEdit,
      syllabus,
    } = this.props;
    const childrenTypes = getChildrenTypes(
      domainInfo,
      node,
      fieldEdit,
      syllabus,
      0,
      [],
      checkIfEnableExamTemplate,
    );

    return <ChooseItemToAdd childrenTypes={childrenTypes} node={node} />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    checkIfEnableExamTemplate: get(
      state,
      'domainInfo.conf.enable_exam_template',
    ),
    domainInfo: get(state, 'domainInfo', {}),
  };
};

export default connect(mapStateToProps)(PreAddItem);
