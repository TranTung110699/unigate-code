import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { fromTreeToArray } from 'common/utils/object';
import List from 'react-virtualized/dist/es/List';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { pushToSet, remove } from 'common/utils/Array';
import { Scrollbars } from 'react-custom-scrollbars';

import './Core2.scss';

class Tree extends React.PureComponent {
  cssClass = 'tree-component';

  constructor(props) {
    super(props);
    this.cellMeasurerCache = new CellMeasurerCache({
      fixedWidth: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.treeData !== this.props.treeData) {
      this.cellMeasurerCache.clearAll();
      this.List.recomputeRowHeights();
    }
  }

  handleResize = () => {
    this.cellMeasurerCache.clearAll();
  };

  handleScroll = ({ target }) => {
    const { scrollTop, scrollLeft } = target;
    const { Grid: grid } = this.List;
    grid.handleScrollEvent({ scrollTop, scrollLeft });
  };

  handleExpandIconClick = (node, expandedNodes) => {
    const { onExpandedNodesChange } = this.props;
    if (node) {
      if (typeof onExpandedNodesChange === 'function') {
        let newExpandedNodes = Array.isArray(expandedNodes)
          ? expandedNodes
          : [];
        newExpandedNodes = newExpandedNodes.includes(node.key)
          ? remove(newExpandedNodes, node.key)
          : pushToSet(newExpandedNodes, node.key);
        onExpandedNodesChange(newExpandedNodes);
      }
    }
  };

  fromTreeDataToNodeRenderers = (treeData = [], expandedNodes = []) =>
    treeData
      .map((data) =>
        fromTreeToArray(
          data,
          (node, nodeParent, currentLevel, nodeAncestors) => {
            if (!node) {
              return null;
            }

            if (typeof node.key === 'undefined') {
              throw new Error(
                "every node in Tree's treeData must have 'key' attribute",
              );
            }

            const hasChild =
              Array.isArray(node.children) && node.children.length > 0;

            return ({ index, key, parent, style }) => (
              <CellMeasurer
                cache={this.cellMeasurerCache}
                columnIndex={0}
                key={node.key || key}
                rowIndex={index}
                parent={parent}
              >
                <div style={style} className={`${this.cssClass}__node`}>
                  <div
                    className={`${this.cssClass}__node-indentation`}
                    style={{ width: 45 * (currentLevel + 1) }}
                  >
                    {hasChild && (
                      <button
                        type="button"
                        className={`${this.cssClass}__node-expand-button`}
                        style={{ width: 45, height: '100%' }}
                        onClick={() =>
                          this.handleExpandIconClick(node, expandedNodes)
                        }
                      >
                        <Icon
                          icon={
                            expandedNodes.includes(node.key)
                              ? 'angle_down'
                              : 'angle_right'
                          }
                        />
                      </button>
                    )}
                  </div>
                  <div className={`${this.cssClass}__node-title`}>
                    {node.title}
                  </div>
                </div>
              </CellMeasurer>
            );
          },
          -1,
          (node) => node && expandedNodes.includes(node.key) && node.children,
        ),
      )
      .reduce((result, arr) => result.concat(arr), [])
      .filter(Boolean);

  listStyle = {
    overflowX: false,
    overflowY: false,
  };

  render() {
    const { className, treeData, expandedNodes, height } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const nodeRenderers = this.fromTreeDataToNodeRenderers(
      treeData,
      expandedNodes,
    );
    return (
      <AutoSizer disableHeight onResize={this.handleResize}>
        {({ width }) => (
          <Scrollbars
            style={{ width, height }}
            onScroll={this.handleScroll}
            className={componentClassName}
          >
            <List
              style={this.listStyle}
              ref={(el) => {
                this.List = el;
              }}
              deferredMeasurementCache={this.cellMeasurerCache}
              overscanRowCount={0}
              rowHeight={this.cellMeasurerCache.rowHeight}
              width={width}
              height={height}
              rowCount={nodeRenderers.length}
              rowRenderer={({ index, key, parent, style }) =>
                nodeRenderers[index]({ index, key, parent, style })
              }
            />
          </Scrollbars>
        )}
      </AutoSizer>
    );
  }
}

Tree.propTypes = {
  className: PropTypes.string,
  expandedNodes: PropTypes.arrayOf(PropTypes.any),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onExpandedNodesChange: PropTypes.func,
  treeData: PropTypes.arrayOf(PropTypes.shape()),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Tree.defaultProps = {
  className: '',
  expandedNodes: [],
  height: 500,
  onExpandedNodesChange: null,
  treeData: [],
  width: 500,
};

export default Tree;
