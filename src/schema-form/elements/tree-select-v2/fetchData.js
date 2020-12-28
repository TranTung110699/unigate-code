import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import clone from 'lodash.clone';

import fetchDataCommon from 'components/common/fetchData';

const fetchData = (TreeSelect) => {
  class TreeSelectWrapper extends React.Component {
    render() {
      const { treeData, fromSelectionToText } = this.props;

      return (
        <TreeSelect
          {...this.props}
          fromSelectionToText={fromSelectionToText}
          treeData={treeData}
        />
      );
    }
  }

  TreeSelectWrapper.propTypes = {
    treeData: PropTypes.arrayOf(PropTypes.shape()),
    fromSelectionToText: PropTypes.func,
    loadingStatus: PropTypes.string,
  };

  TreeSelectWrapper.defaultProps = {
    treeData: [],
    fromSelectionToText: (f) => f,
    loadingStatus: '',
  };

  const keyState = String(new Date().getTime());

  const treeDataSelector = createSelector(
    (state, props) => props.resultOfApi,
    (state, props) => props.mapResultToTreeData,
    function getTreeDataFromResult(result, mapResultToTreeData) {
      let clonedResult = clone(result);

      if (!Array.isArray(clonedResult)) {
        if (!clonedResult) {
          return [];
        }
        clonedResult = [clonedResult];
      }
      if (!mapResultToTreeData) {
        return clonedResult;
      }

      return clonedResult.filter(Boolean).map((node) => {
        let transformedNode = node;
        Object.keys(mapResultToTreeData).forEach((key) => {
          const field = mapResultToTreeData[key];
          let keyValue = null;

          if (typeof field === 'string') {
            keyValue = transformedNode[field];
          } else {
            keyValue = field(transformedNode);
          }

          transformedNode = {
            ...transformedNode,
            [key]: keyValue,
          };
        });
        if (
          Array.isArray(transformedNode.children) &&
          transformedNode.children.length > 0
        ) {
          transformedNode = {
            ...transformedNode,
            children: getTreeDataFromResult(
              transformedNode.children,
              mapResultToTreeData,
            ),
          };
        }
        return transformedNode;
      });
    },
  );

  const fromSelectionToNodeSelector = createSelector(
    treeDataSelector,
    (treeData) => {
      const fromSelectionToNodeBasedOnTreeData = (el, someTreeData) => {
        if (!someTreeData) {
          return undefined;
        }
        for (let i = 0; i < someTreeData.length; i += 1) {
          const node = someTreeData[i];
          if (node) {
            if (node.value === el) {
              return node;
            }
            if (Array.isArray(node.children) && node.children.length > 0) {
              const maybeResult = fromSelectionToNodeBasedOnTreeData(
                el,
                node.children,
              );
              if (typeof maybeResult !== 'undefined') {
                return maybeResult;
              }
            }
          }
        }

        return undefined;
      };

      return (el) => fromSelectionToNodeBasedOnTreeData(el, treeData);
    },
  );

  const fromSelectionToTextSelector = createSelector(
    fromSelectionToNodeSelector,
    (state, props) => props.mapTreeDataToText,
    (fromSelectionToNode, mapTreeDataToText) => (el) => {
      const node = fromSelectionToNode(el);

      if (typeof mapTreeDataToText === 'string') {
        return node[mapTreeDataToText];
      }

      return mapTreeDataToText(node);
    },
  );

  const mapStateToProps = (state, props) => ({
    treeData: treeDataSelector(state, props),
    fromSelectionToText: fromSelectionToTextSelector(state, props),
    fromSelectionToNode: fromSelectionToNodeSelector(state, props),
  });

  return fetchDataCommon((props) => ({
    baseUrl: props.baseUrl,
    params: props.params,
    propKey: 'resultOfApi',
    keyState: props.keyState || keyState,
  }))(connect(mapStateToProps)(TreeSelectWrapper));
};

export default fetchData;
