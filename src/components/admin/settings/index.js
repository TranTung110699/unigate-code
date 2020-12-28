import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import actions from 'actions/creators';
import requireRoot from 'common/hoc/requireRoot';
import Widgets from './Widgets';
import SubMenuTopContext from 'common/context/menu/SubMenuTop';

class SettingsDashboard extends Component {
  componentDidMount() {
    const { themeConfig } = this.props;
    const siteTitle = `${t1('settings')} ${
      themeConfig && themeConfig.website_title
        ? ': ' + themeConfig.website_title
        : ''
    }`;
    this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
  }

  render() {
    return (
      <div>
        <SubMenuTopContext isHidden />
        <Widgets />
      </div>
    );
  }
}

export default connect()(requireRoot(SettingsDashboard));
