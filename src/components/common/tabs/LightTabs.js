import React from 'react';
import { Tabs as MUITabs } from 'material-ui/Tabs';

const tabsInkBarStyle = { backgroundColor: '#00BAD2' };

export const tabButtonStyle = {
  color: 'rgba(0, 0, 0, 0.54)',
};

const tabsTabItemContainerStyle = {
  backgroundColor: '#F5F5F5',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
};

const tabsContentContainerStyle = { paddingTop: '5px' };

const LightTabs = (props) => (
  <MUITabs
    inkBarStyle={tabsInkBarStyle}
    tabItemContainerStyle={tabsTabItemContainerStyle}
    contentContainerStyle={tabsContentContainerStyle}
    {...props}
  />
);

export default LightTabs;
