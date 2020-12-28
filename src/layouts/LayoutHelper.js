import React from 'react';
import { connect } from 'react-redux';
import Store from 'store';
import { getThemeConfig } from 'utils/selectors';
import { setLayout } from './actions';

export const LayoutRegistered = {
  embedded: 'embedded',
  // learning: 'learning', // deprecated
  admin: 'admin',
  // admin_v2: 'admin_v2',
  vieted: 'vieted',
  lotus: 'lotus',
  xpeak: 'xpeak',
  pixelz: 'pixelz',
  ggg: 'ggg',
  etec: 'etec',
  ums: 'ums',
  evn: 'evn',
  msi: 'msi',
  mobile: 'mobile',
  learn: 'learn',
  gj: 'gj',
  vt: 'vt',
};

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 **/
class LayoutHelper {
  useLayout(layoutId, component, params) {
    const { dispatch } = component.props;
    if (layoutId) {
      dispatch(setLayout(layoutId, params));
      return;
    }
    console.warn(`layout ${layoutId} not found!!!`);
  }

  setLayout(componentContext) {
    const themeConfig = getThemeConfig(Store.getState());
    let theme = themeConfig.layout || 'xpeak';
    this.useLayout(theme, componentContext);
  }
}

class LayoutClass extends React.Component {
  componentWillMount() {
    const { dispatch, layoutId } = this.props;
    const layout = LayoutRegistered[layoutId];
    const params = layout.path;
    if (layout) {
      dispatch(setLayout(layout, params));
    }
  }

  render() {
    return <span />;
  }
}

export const Layout = connect()(LayoutClass);

export default new LayoutHelper();
