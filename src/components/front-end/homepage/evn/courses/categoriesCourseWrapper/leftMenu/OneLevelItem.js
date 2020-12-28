import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import routes from 'routes/index';
import { ListItem } from 'material-ui/List';
import { createSelector } from 'reselect';

class EVNOneItem extends Component {
  render() {
    const { item, node } = this.props;

    if (item.type === 'action') {
      return <div>{item.view}</div>;
    }
    if (item.type === 'toggle') {
      return (
        <ListItem rightIcon={item.icon} hoverColor="none">
          <span>{item.label}</span>
        </ListItem>
      );
    }
    const url =
      item.href ||
      (node
        ? routes.url('node_edit', Object.assign(node, { step: item.action }))
        : '');

    return (
      <ListItem
        className={`sub-item lv2-item ${item.menuLevel}`}
        insetChildren
        primaryText={item.label}
        containerElement={
          <NavLink exact={item.exact} {...item.options} to={url} />
        }
      />
    );
  }
}

export default EVNOneItem;
