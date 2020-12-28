import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/common/Icon';
import SubMenuButton from 'components/common/primary-button';

class TopMenuItem extends Component {
  render() {
    const { item, isDark } = this.props;

    if (item.component) {
      return item.component;
    } else if (item.button) {
      return item.button;
    }

    return (
      <NavLink
        activeClassName="nav-selected"
        to={item.href || '#'}
        exact
        className={'m-l-10 m-r-10'}
      >
        {item.primary ? (
          <SubMenuButton
            icon={<Icon icon={item.icon} />}
            label={item.label}
            primary
          />
        ) : (
          <span className={isDark ? 'text-white' : ''}>
            {item.icon && <Icon icon={item.icon} />} {item.label}
          </span>
        )}
      </NavLink>
    );
  }
}

export default TopMenuItem;
