import React from 'react';
import PropTypes from 'prop-types';
import Tree from 'components/common/tree';

class TreeSelectComponent extends React.Component {
  render() {
    const { selectedNodes, input, onSelectedNodesChange, ...rest } = this.props;

    return (
      <Tree
        {...rest}
        selectable
        selectedNodes={selectedNodes || (input && input.value)}
        onSelectedNodesChange={
          onSelectedNodesChange || (input && input.onChange)
        }
      />
    );
  }
}

TreeSelectComponent.propTypes = {
  input: PropTypes.shape(),
  onSelectedNodesChange: PropTypes.func,
  selectedNodes: PropTypes.arrayOf(PropTypes.any),
};

TreeSelectComponent.defaultProps = {
  input: null,
  onSelectedNodesChange: null,
  selectedNodes: null,
};

export default TreeSelectComponent;
