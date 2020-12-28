/**
 * Created by anhvtt on 09/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';

import SearchLayout from './search/Layout';
import { menuItems } from './menu-v2/sub-left-menu-configs';

class ConfCategoryEditLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: props.domain,
      menu: props.menu,
      step: null,
      sections: [],
    };
  }

  componentWillMount() {
    this.getSectionsConfigByMenu(this.getConfig(this.props));
  }

  componentWillReceiveProps(nextProps) {
    const conf = this.getConfig(nextProps);
    if (
      conf.menu !== this.state.menu ||
      (conf.menu === this.state.menu && conf.type !== this.state.type)
    ) {
      this.getSectionsConfigByMenu(conf);
    }
  }

  getSectionsConfigByMenu({ menu, type, domain }) {
    const items = menuItems({ domain });
    let menuConfig = {};
    items.forEach((item) => {
      if (item && item.subMenu) {
        item.subMenu.forEach((child) => {
          menuConfig = child.id === menu ? child : menuConfig;
        });
      } else {
        menuConfig = item.id === menu ? item : menuConfig;
      }
    });

    const sections = menuConfig.sections || [];

    this.setState({
      menu,
      type,
      domain,
      sections,
    });
  }

  getConfig = (props) => {
    const menu = props.menu;
    const type = props.type || null;
    const domain = props.domain || 'admin';

    return { menu, type, domain };
  };

  render() {
    return (
      <SearchLayout sections={this.state.sections} menu={this.state.menu} />
    );
  }
}

const mapStateToProps = (state) => ({
  menuAvailable: get(state, 'domainInfo.school.config_menu_nav'),
});

export default connect(mapStateToProps)(ConfCategoryEditLayout);
