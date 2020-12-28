import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const makeFilterable = (Tree) => {
  class TreeWithFilter extends React.PureComponent {
    constructor(props) {
      super(props);

      const { treeData } = props;
      this.state = {
        treeData,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.filterText !== this.props.filterText ||
        nextProps.treeData !== this.props.treeData
      ) {
        this.getFilteredTreeDataAccordingToText(
          nextProps.treeData,
          nextProps.filterText,
        );
      }
    }

    getFilteredTreeDataAccordingToText = (treeData = [], filterText) => {
      const {
        newTreeData,
        newExpandedNodes,
      } = this.filterTreeDataAccordingToText(treeData, filterText);

      const { onExpandedNodesChange } = this.props;
      if (
        typeof newExpandedNodes !== 'undefined' &&
        typeof onExpandedNodesChange === 'function'
      ) {
        onExpandedNodesChange(newExpandedNodes);
      }

      this.setState({
        treeData: newTreeData,
      });
    };

    doesNodeMatchFilterText = (node, filterText) => {
      if (!node) {
        return false;
      }

      if (!filterText) {
        return true;
      }

      let textsToConsider = Array.isArray(node.texts) ? node.texts : [];

      if (typeof node.title === 'string') {
        textsToConsider = textsToConsider.concat([node.title]);
      }

      return textsToConsider.some(
        (text) =>
          text && text.toLowerCase().indexOf(filterText.toLowerCase()) !== -1,
      );
    };

    filterTreeDataAccordingToText = (
      treeData = [],
      filterText = '',
      doesAnyAncestorMatch = false,
    ) => {
      if (!Array.isArray(treeData)) {
        return {};
      }
      if (!filterText) {
        return { newTreeData: treeData, doesAnyNodeMatch: true };
      }
      return treeData.reduce(
        ({ newTreeData, newExpandedNodes, doesAnyNodeMatch }, node) => {
          const doesMatchFilter = this.doesNodeMatchFilterText(
            node,
            filterText,
          );

          const {
            newTreeData: childrenTreeData,
            newExpandedNodes: expandedDescendants,
            doesAnyNodeMatch: doesAnyDescendantMatch,
          } = this.filterTreeDataAccordingToText(
            node.children,
            filterText,
            doesMatchFilter || doesAnyAncestorMatch,
          );

          if (
            doesAnyAncestorMatch ||
            doesMatchFilter ||
            doesAnyDescendantMatch
          ) {
            return {
              newTreeData: newTreeData.concat([
                {
                  ...node,
                  doesMatchFilter,
                  children: childrenTreeData,
                },
              ]),
              newExpandedNodes: doesAnyDescendantMatch
                ? newExpandedNodes.concat([node.key], expandedDescendants)
                : newExpandedNodes,
              doesAnyNodeMatch:
                doesAnyNodeMatch || doesMatchFilter || doesAnyDescendantMatch,
            };
          }

          return {
            newTreeData,
            newExpandedNodes,
            doesAnyNodeMatch,
          };
        },
        { newTreeData: [], newExpandedNodes: [], doesAnyNodeMatch: false },
      );
    };

    render() {
      const { treeData, ...rest } = this.props;
      return <Tree {...rest} treeData={this.state.treeData} />;
    }
  }

  TreeWithFilter.propTypes = {
    className: PropTypes.string,
    filterText: PropTypes.string,
    treeData: PropTypes.arrayOf(PropTypes.shape()),
  };

  TreeWithFilter.defaultProps = {
    className: '',
    filterText: '',
    treeData: [],
  };

  const mapStateToProps = (state, props) => {
    const { filterText } = props;
    return {
      filterText: filterText && filterText.trim(),
    };
  };

  return connect(mapStateToProps)(TreeWithFilter);
};

export default makeFilterable;
