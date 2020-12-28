import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { NavLink } from 'react-router-dom';
import './stylesheet.scss';
import getMenuItems from './config';

const labelStyle = {
  marginLeft: '-22px',
  marginTop: '-3px',
};
const style = {
  padding: 0,
  margin: 0,
};

class DashboardMenu extends React.Component {
  listStyle = { padding: '0px', marginLeft: '25px' };

  generateSubListItem = (item, handleMenuClick) =>
    item.children.map((children, indexChidren) => (
      <ListItem
        className="item"
        key={`${item.id}-menu-left-children-${children.id || indexChidren}`}
        leftIcon={children.icon}
        primaryText={<div style={labelStyle}>{children.label}</div>}
        insetChildren
        containerElement={
          <NavLink className="item" to={children.href} {...item.options} />
        }
        onClick={handleMenuClick}
      />
    ));

  render() {
    const { handleMenuClick, availableMenus, rootUrl } = this.props;
    const menuItems = getMenuItems(rootUrl, availableMenus);
    return (
      <div className="ums-dashboard-menu">
        <List className="ums-menu-left" style={this.listStyle}>
          {Array.isArray(menuItems) &&
            menuItems.map((item, index) =>
              item && item.children ? (
                <ListItem
                  className="item"
                  key={`menu-left-${item.id || index}`}
                  primaryText={<div style={labelStyle}>{item.label}</div>}
                  primaryTogglesNestedList
                  initiallyOpen
                  leftIcon={item.icon}
                  nestedListStyle={style}
                  nestedItems={this.generateSubListItem(item, handleMenuClick)}
                />
              ) : (
                item && (
                  <ListItem
                    key={`menu-left-${item.id || index}`}
                    leftIcon={item.icon}
                    primaryText={<div style={labelStyle}>{item.label}</div>}
                    containerElement={
                      <NavLink
                        className="item"
                        to={item.href}
                        {...item.options}
                      />
                    }
                    onClick={handleMenuClick}
                  />
                )
              ),
            )}
        </List>
      </div>
    );
  }
}

export default DashboardMenu;
