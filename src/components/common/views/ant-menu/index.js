import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Divider from 'antd/lib/divider';
import Tooltip from 'antd/lib/tooltip';
import Message from 'antd/lib/message';
import 'antd/lib/menu/style';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import './stylesheet.scss';
import { getThemeConfig } from 'utils/selectors';

const { SubMenu, Item } = Menu;

class MenuRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: null,
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }

  componentDidMount() {
    this.setMenuState(this.props);
    this.executeMessage();
  }

  componentWillReceiveProps(nextProps) {
    this.setMenuState(nextProps);
  }

  getTooltipFromItem = (item) => {
    return item.tooltip || item.title;
  };

  getTitleFromItem = (item) => {
    let result = [];
    if (this.props.isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      if (this.props.mode !== 'horizontal') {
        if (item.icon && item.icon.position === 'left') {
          result.push(
            <Icon
              key={`${item.url || item.id}_icon_left`}
              type={item.icon.type}
            />,
          );
        }
        if (item.icon && item.icon.position === 'right') {
          result.push(
            <Icon
              key={`${item.url || item.id}_icon_right`}
              type={item.icon.type}
            />,
          );
        }
        if (item.iconRight) {
          result.push(
            <Icon
              className={'submenu-item-icon-right'}
              key={`${item.url || item.id}_icon_right`}
              type={item.iconRight.type}
              theme={item.iconRight.theme}
              twoToneColor={item.iconRight.twoToneColor}
            />,
          );
        }
      }
      result.push(
        <span key={`${item.url || item.id}_name`}> {item.title} </span>,
      );
    } else {
      if (item.icon && item.icon.position === 'left') {
        result.push(
          <Icon
            key={`${item.url || item.id}_icon_left`}
            type={item.icon.type}
          />,
        );
      }
      result.push(
        <span key={`${item.url || item.id}_name`}> {item.title} </span>,
      );
      if (item.icon && item.icon.position === 'right') {
        result.push(
          <Icon
            key={`${item.url || item.id}_icon_right`}
            type={item.icon.type}
          />,
        );
      }
      if (item.iconRight) {
        result.push(
          <Icon
            className={'submenu-item-icon-right'}
            key={`${item.url || item.id}_icon_right`}
            type={item.iconRight.type}
            theme={item.iconRight.theme}
            twoToneColor={item.iconRight.twoToneColor}
          />,
        );
      }
    }
    if (item.url) {
      result = <Link to={item.url}>{result}</Link>;
    }

    return result;
  };

  validSchoolTypes = (schoolTypes) => {
    if (!schoolTypes || schoolTypes.length === 0) {
      return true;
    }
    const { themeConfig } = this.props;
    return schoolTypes.includes(themeConfig.type);
  };

  checkPermissions = (permissions) => {
    if (!permissions || permissions.length === 0) {
      return true;
    }
    const { themeConfig } = this.props;
    return permissions.includes(themeConfig.type);
  };

  executeMessage = () => {
    const { messages } = this.props;
    if (!messages) {
      return;
    }

    messages.map((message) => {
      if (
        !message.content ||
        message.hidden ||
        !this.validSchoolTypes(message.schoolTypes) ||
        !this.checkPermissions(message.permissions)
      ) {
        return;
      }
      const timeDefault = 15;
      switch (message.type) {
        case 'warning':
          return Message.warning(
            message.content,
            message.liveTime || timeDefault,
          );
        case 'error':
          return Message.error(
            message.content,
            message.liveTime || timeDefault,
          );
        default:
          return Message.info(message.content, message.liveTime || timeDefault);
      }
    });
  };

  setMenuState = (props) => {
    let {
      schema,
      location: { pathname },
    } = props;
    const { menus } = this.generateMenu(schema, pathname);

    for (let s of schema) {
      if (s.subMenu) {
        for (let sub of s.subMenu) {
          const activeMenu = pathname.includes(sub.url);
          if (activeMenu) {
            this.setState({
              // defaultOpenKeys: s.id,
              defaultSelectedKeys: sub.id,
            });
          }
        }
      }
    }

    this.setState({
      menus,
    });
  };

  generateMenu = (schema, pathname) => {
    const { mode } = this.props;
    const menus = [];

    const tooltipPlacement = mode === 'horizontal' ? 'top' : 'right';

    schema.forEach((item) => {
      if (
        item.hidden ||
        !this.validSchoolTypes(item.schoolTypes) ||
        !this.checkPermissions(item.permissions)
      ) {
        return;
      }

      const key = item.id || item.url;

      if (item.divider) {
        if (item.dividerOrientation && item.dividerLabel)
          // left | right | center
          menus.push(
            <Divider orientation={item.dividerOrientation}>
              {item.dividerLabel}
            </Divider>,
          );
        else menus.push(<Divider />);
        return;
      }

      if (!item.subMenu) {
        menus.push(
          <Item key={key} disabled={item.disabled}>
            <Tooltip
              placement={tooltipPlacement}
              title={this.getTooltipFromItem(item)}
            >
              {this.getTitleFromItem(item)}
            </Tooltip>
          </Item>,
        );

        return;
      }

      const { menus: menuGroup } = this.generateMenu(item.subMenu, pathname);

      if (!menuGroup || menuGroup.length === 0) {
        return;
      }

      menus.push(
        <SubMenu
          key={key}
          title={
            <Tooltip placement="topLeft" title={this.getTitleFromItem(item)}>
              {this.getTitleFromItem(item)}
            </Tooltip>
          }
        >
          {menuGroup}
        </SubMenu>,
      );
    });

    return {
      menus,
    };
  };

  horizontalActiveMenu = (schema, pathname) => {
    for (let menu of schema) {
      const activeMenu = pathname.includes(menu.url);
      if (activeMenu) {
        return menu.id;
      }
    }
  };

  render() {
    const {
      className = '',
      style = {},
      onClick = (f) => f,
      theme,
      mode,
      isFeatureEnabled,
      schema,
      location: { pathname },
    } = this.props;

    if (!this.state.menus) {
      return <span />;
    }
    let openAllMenu = [];
    if (mode !== 'horizontal') schema.map((s) => openAllMenu.push(s.id));
    const selectedKeys =
      mode === 'horizontal'
        ? { defaultSelectedKeys: this.horizontalActiveMenu(schema, pathname) }
        : { selectedKeys: this.state.defaultSelectedKeys };
    return (
      <Menu
        className={`${className} ui-menu-panel
          ${
            isFeatureEnabled(features.NEW_UI_JULY_2019)
              ? `${mode === 'horizontal' ? 'p-l-45 p-r-45' : ''}
                NEW_UI_JULY_2019-menu-dark-theme`
              : 'menu-left-container'
          }
        `}
        style={style}
        theme={theme}
        mode={mode}
        onClick={onClick}
        defaultOpenKeys={openAllMenu}
        {...selectedKeys}
      >
        {this.state.menus}
      </Menu>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (themeConfig) => ({
    themeConfig,
  }),
);

export default withRouter(
  connect(mapStateToProps)(withFeatureFlags()(MenuRender)),
);
