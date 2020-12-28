import React from 'react';
import PropTypes from 'prop-types';

const makeUncontrollable = (Tree) => {
  class UncontrollableTree extends React.PureComponent {
    constructor(props) {
      super(props);
      const { expandedNodes } = props;
      this.state = {
        expandedNodes,
      };
    }

    componentWillMount() {
      const { expandedNodes } = this.props;
      if (expandedNodes && !this.expandedNodesControlled(this.props)) {
        this.handleExpandedNodesChange(expandedNodes);
      }
    }

    expandedNodesControlled = (props) => {
      const { expandedNodesControlled } = props;
      return expandedNodesControlled;
    };

    handleExpandedNodesChange = (expandedNodes) =>
      this.setState({ expandedNodes });

    render() {
      const { expandedNodes, onExpandedNodesChange, ...rest } = this.props;

      return (
        <Tree
          {...rest}
          expandedNodes={
            this.expandedNodesControlled(this.props)
              ? expandedNodes
              : this.state.expandedNodes
          }
          onExpandedNodesChange={
            this.expandedNodesControlled(this.props)
              ? onExpandedNodesChange
              : this.handleExpandedNodesChange
          }
        />
      );
    }
  }

  UncontrollableTree.propTypes = {
    className: PropTypes.string,
    expandedNodes: PropTypes.arrayOf(PropTypes.any),
    expandedNodesControlled: PropTypes.bool,
    onExpandedNodesChange: PropTypes.func,
  };

  UncontrollableTree.defaultProps = {
    className: '',
    expandedNodes: [],
    expandedNodesControlled: false,
    onExpandedNodesChange: null,
  };

  return UncontrollableTree;
};

export default makeUncontrollable;
