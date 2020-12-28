import React from 'react';
import get from 'lodash.get';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';

let dragingIndex = -1;
let dragingData = {};

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      dataRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (
      isOver &&
      get(dataRow, 'parentNode.id') === get(dragingData, 'parentNode.id')
    ) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />,
      ),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    dragingData = props.dataRow;
    return {
      dataRow: props.dataRow,
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const dataRow = monitor.getItem().dataRow;
    const hoverIndex = props.index;
    const hoverData = props.dataRow;

    if (
      dragIndex === hoverIndex ||
      get(dataRow, 'parentNode.id') !== get(hoverData, 'parentNode.id')
    ) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, (connect) => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

const DragSorting = ({ getTable, updateDataInStore }) => {
  if (typeof getTable !== 'function') {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {getTable({
        components: {
          body: {
            row: DragableBodyRow,
          },
        },
        onRow: (record = {}, index) => {
          const parentNode = record.parentNode;
          return {
            index,
            dataRow: record,
            moveRow: (dragIndex, hoverIndex) => {
              if (typeof updateDataInStore !== 'function' || !parentNode) {
                return;
              }

              const { metadata } = parentNode;
              if (!Array.isArray(metadata) || metadata.length <= 1) {
                return;
              }

              const tmp = metadata[dragIndex];
              metadata.splice(dragIndex, 1);
              metadata.splice(hoverIndex, 0, tmp);

              parentNode.metadata = metadata;
              updateDataInStore(parentNode, 'metadata');
            },
          };
        },
      })}
    </DndProvider>
  );
};

export default DragSorting;
