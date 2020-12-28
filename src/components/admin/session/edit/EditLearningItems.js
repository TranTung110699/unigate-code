import React from 'react';
import PropTypes from 'prop-types';
import fetchNodes from 'components/common/fetchNodes';
import NodeNew from 'components/admin/node/new/index';
import schemaEditLearningItems from '../schema/learning-items';

class AddItemToSyllabusSkill extends React.Component {
  render() {
    const { node, searchFormId, session, closeDialog } = this.props;
    return (
      <NodeNew
        ntype="session"
        node={session}
        step="learning_items"
        mode="edit"
        schema={schemaEditLearningItems(node)}
        searchFormId={searchFormId}
        requestSuccessful={closeDialog}
      />
    );
  }
}

AddItemToSyllabusSkill.propTypes = {
  className: PropTypes.string,
};

AddItemToSyllabusSkill.defaultProps = {
  className: '',
};

export default fetchNodes([
  {
    nodePropName: 'node',
    depth: -1,
    fullNodePropName: 'node',
  },
])(AddItemToSyllabusSkill);
