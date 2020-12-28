import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import { t1 } from 'translate';
import LightTabs, { tabButtonStyle } from './LightTabs';

class TabsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.initialSelectedIndex || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialSelectedIndex !== nextProps.initialSelectedIndex) {
      this.setActiveTab(nextProps.initialSelectedIndex);
    }
  }

  setActiveTab = (index) => {
    this.setState({
      activeTab: index,
    });
    const { onActive } = this.props;
    if (typeof onActive === 'function') {
      onActive(index);
    }
  };

  renderResultComponent = (items) => this.setState({ items });

  render() {
    const { activeTab } = this.state;
    const { tabs, ...props } = this.props;
    if (!Array.isArray(tabs) || !tabs.length) {
      return null;
    }
    if (tabs.length === 1) {
      return tabs[0] && tabs[0].content;
    }
    return (
      <LightTabs {...props} value={activeTab}>
        {tabs.map((tab, index) => {
          const { content, value, ...propsTab } = tab;
          return (
            <Tab
              key={`${props.key || 'tab'}-${index}`}
              buttonStyle={tabButtonStyle}
              label={t1('tab_%s', [value || index + 1])}
              {...propsTab}
              value={value || index}
              onActive={() => this.setActiveTab(value || index)}
            >
              {activeTab === (value || index) &&
                (typeof content === 'function' ? content() : content)}
            </Tab>
          );
        })}
      </LightTabs>
    );
  }
}

TabsComponent.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.any),
};

TabsComponent.defaultProps = {
  tabs: null,
};

export default TabsComponent;
