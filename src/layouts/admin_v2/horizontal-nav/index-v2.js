import React from 'react';
import { NavLink } from 'react-router-dom';
import { v4 } from 'uuid';
import './style.scss';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import Tabs from 'antd/lib/tabs';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;

class HorizontalNav extends React.Component {
  render() {
    const {
      items,
      componentClass,
      isFeatureEnabled,
      content,
      extraContent,
    } = this.props;

    if (!Array.isArray(items) || !items.length) {
      return null;
    }

    const currentItem = items.find((item) => item.active) || items[0];

    return (
      <div>
        <Tabs
          defaultActiveKey={currentItem.id || currentItem.link}
          type="card"
          className={`horizontal-navbar-wrapper ${componentClass}`}
          tabBarExtraContent={extraContent}
        >
          {items.map((item) => (
            <TabPane
              tab={
                <NavLink isActive={() => item.active} to={item.link}>
                  {item.label}
                </NavLink>
              }
              key={item.id || item.link || v4()}
            >
              {content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

HorizontalNav.propTypes = {
  items: PropTypes.object,
  componentClass: PropTypes.string,
  content: PropTypes.node,
  extraContent: PropTypes.node,
};

export default withFeatureFlags()(HorizontalNav);
