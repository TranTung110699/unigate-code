import React from 'react';
import { NavLink } from 'react-router-dom';
import { v4 } from 'uuid';
import './style.scss';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class HorizontalNav extends React.Component {
  render() {
    const { items, componentClass, isFeatureEnabled } = this.props;
    return (
      <div>
        <ul
          className={`horizontal-nav ${componentClass}
          ${isFeatureEnabled(features.NEW_UI_JULY_2019) &&
            'NEW_UI_JULY_2019-horizontal-nav'}
        `}
        >
          {items &&
            items.length &&
            items.map((item) => (
              <li className={item.active ? 'active' : ''} key={item.id || v4()}>
                <NavLink
                  isActive={() => item.active}
                  to={item.link}
                  activeClassName="ant-menu-item-selected"
                >
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withFeatureFlags()(HorizontalNav);
