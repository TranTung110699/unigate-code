import React, { Component } from 'react';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
// import {render} from 'react-dom';
import './stylesheet.scss';

const SortableItem = SortableElement(({ value, props }) => (
  <li {...props}>{value}</li>
));

const SortableList = SortableContainer(({ items, props }) => (
  <ul className="sortable" {...props}>
    {items.map((value, index) => (
      <SortableItem key={value.iid} index={index} value={value} />
    ))}
  </ul>
));

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent;
