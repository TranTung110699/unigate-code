/**
 * Created by vohung on 24/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { isStandardSco } from 'common/learn';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'antd/lib/icon';
import { t1 } from 'translate';
import { skillType } from 'configs/constants';
import lGet from 'lodash.get';
import './styles/Metadata.scss';
import SortableItemRenderer from './SortableItemRenderer';
import ConfirmRemovingChildren from './ConfirmRemoveChildren';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
// import VarDump from 'components/common/VarDump';

const DragHandle = SortableHandle(() => (
  <Icon type="drag" title={t1('move_item')} />
));

const SortableItem = SortableElement((props) => {
  const {
    fieldEdit,
    item,
    sortable,
    depth,
    maximumDepth,
    baseUrl,
    parentItem,
    isFeatureEnabled,
  } = props;

  const hasBorder = depth !== 1 && maximumDepth > 2;
  const borderStyle = { borderLeft: '1px dotted #ccc' };
  const isNewUIJulyEnable = isFeatureEnabled(features.NEW_UI_JULY_2019);

  return (
    <div
      key={item.iid}
      className={`sortable-item-row ${item.ntype}-${item.type}
        ${isNewUIJulyEnable ? 'm-l-0 border-round' : ''}
      `}
    >
      <div className="drag-handle" style={hasBorder ? borderStyle : {}}>
        {sortable ? <DragHandle /> : null}
      </div>
      <div className="content-item">
        <SortableItemRenderer
          {...props}
          nodes={props.nodes}
          fieldEdit={fieldEdit}
          depth={depth}
          maximumDepth={maximumDepth}
          baseUrl={baseUrl}
          parentItem={parentItem}
        />
      </div>
    </div>
  );
});

const SortableList = SortableContainer((props) => {
  const { items, depth, baseUrl } = props;
  const totalNrRows = items.length;
  const getDurationOfItemChild = (nodes, item) => {
    const objKey = (item && item.iid) || null;
    const previewNode = lGet(nodes[objKey], 'duration', '');
    return previewNode;
  };
  return (
    <div className="sand-sortable-panel">
      {items &&
        items.map((value, index) => {
          value.duration = null;
          if (value.ntype === 'video' || isStandardSco(value)) {
            value.duration = getDurationOfItemChild(props.nodes, value);
          }
          return (
            <SortableItem
              {...props}
              key={`${value.iid}-${index}` || index}
              itemIndex={index}
              index={index}
              item={value}
              parentItem={props.parentItem}
              totalNrRows={totalNrRows}
              depth={depth}
              baseUrl={baseUrl}
              metadataFilters={props.metadataFilters}
            />
          );
        })}
    </div>
  );
});

class MetadataSortableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeEdit: 0,
      items: [],
      fieldEdit: '',
      dialogConfirm: false,
      childrenRemove: null,
    };
    this.updateDataRow = this.updateDataRow.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  componentWillMount() {
    const { node } = this.props;
    const fieldEdit = this.props.fieldEdit || 'metadata';
    const items = node[fieldEdit] || [];
    this.setState({
      nodeEdit: node.iid,
      items,
      fieldEdit,
    });
  }

  componentWillReceiveProps(nextProps) {
    // const node = this.props.node || {};
    const fieldEdit = this.state.fieldEdit || 'metadata';
    const nextNode = nextProps.node || {};
    const nextItems = nextNode[fieldEdit] || [];
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.node !== 'undefined'
    ) {
      this.setState({
        nodeEdit: nextNode.iid,
        items: nextItems,
      });
    }
  }

  updateDataInStore(newData) {
    const { node, dispatch, itemAncestors } = this.props;
    // console.log('updateDataInStore', node.iid, node.ntype, {node});
    const fieldEdit = this.state.fieldEdit;
    node[fieldEdit] = newData;

    const syllabus =
      itemAncestors &&
      itemAncestors.find((item) => item && item.ntype === 'syllabus');
    if (syllabus && syllabus.iid) {
      // console.log({node});
      node.syllabus = syllabus.iid;
    }

    dispatch(
      sagaActions.updateNodeRequest({
        step: fieldEdit,
        iid: node.iid,
        data: node,
        requestSuccessful: () =>
          this.setState({
            items: newData,
          }),
      }),
    );
  }

  removeAction = () => {
    const { items, nodeEdit, childrenRemove } = this.state;
    if (childrenRemove) {
      this.setChildrenRemove(null);

      const { childIid, ev, itemIndex } = childrenRemove;

      const newData = [];
      items.forEach((row, index) => {
        if (row.iid !== childIid && index !== itemIndex) {
          if (row.type !== skillType.PMD_RUBRIC) {
            newData.push(row);
          }
        }
      });
      this.updateDataInStore(newData, nodeEdit);
    }
  };

  setChildrenRemove = (childIid, ev, itemIndex) => {
    this.setState((state) => {
      return {
        ...state,
        childrenRemove: childIid ? { childIid, ev, itemIndex } : null,
      };
    });
  };

  handleSortEnd({ oldIndex, newIndex }) {
    const { nodeEdit } = this.state;
    let { items } = this.state;
    items = arrayMove(items, oldIndex, newIndex);
    this.updateDataInStore(items, nodeEdit);
    this.setState({
      items,
    });
  }

  updateDataRow(data, index) {
    const { items, nodeEdit } = this.state;
    const newData = items.map((item, i) => {
      if (
        (typeof index === 'undefined' ||
          (typeof index !== 'undefined' && index === i)) &&
        item.iid === data.iid
      ) {
        return { ...item, ...data };
      }
      return item;
    });
    this.updateDataInStore(newData, nodeEdit);
  }

  render() {
    const { node, depth, baseUrl, nodes, sortable } = this.props;

    let fieldEdit = this.props.fieldEdit || 'metadata';
    fieldEdit = fieldEdit === 'children' ? 'metadata' : fieldEdit;
    const { items, nodeEdit } = this.state;

    return (
      <div>
        {items ? (
          <SortableList
            {...this.props}
            sortable={sortable}
            items={items}
            updateDataRow={this.updateDataRow}
            onRemove={this.setChildrenRemove}
            nodeEdit={nodeEdit}
            useDragHandle
            onSortEnd={this.handleSortEnd}
            depth={depth}
            baseUrl={baseUrl}
            parentItem={node}
            fieldEdit={fieldEdit}
            nodes={nodes}
          />
        ) : (
          <div>{t1('there_are_no_items_yet')}</div>
        )}
        {this.state.childrenRemove && (
          <ConfirmRemovingChildren
            {...this.props}
            childrenIidRemove={lGet(this.state, 'childrenRemove.childIid')}
            cancelAction={() => this.setChildrenRemove(null)}
            removeAction={this.removeAction}
          />
        )}
      </div>
    );
  }
}

MetadataSortableList.propTypes = {
  dispatch: PropTypes.func,
  fieldEdit: PropTypes.string,
  SortableItemRenderer: PropTypes.func,
  sortable: PropTypes.bool,
  depth: PropTypes.number,
  maximumDepth: PropTypes.number,
  baseUrl: PropTypes.string.isRequired,
};

MetadataSortableList.defaultProps = {
  fieldEdit: '',
  dispatch: () => {},
  SortableItemRenderer: () => {},
  sortable: true,
  depth: 1,
};

export default connect()(withFeatureFlags()(MetadataSortableList));
