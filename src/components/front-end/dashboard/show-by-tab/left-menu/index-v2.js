import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getMenus from './configs';
import { leftMenuSelector } from '../selectors';
import Menu from 'antd/lib/menu';
import './stylesheet.scss';
import withUserInfo from 'common/hoc/withUserInfo';

const { SubMenu } = Menu;

class DashboardMenu extends React.Component {
  render() {
    const {
      dashboardMenuConfigs,
      dashboardAction,
      path,
      userInfo,
    } = this.props;

    const menus = getMenus(dashboardMenuConfigs, null, null, path, userInfo);
    const activatedMenu =
      dashboardAction || dashboardMenuConfigs[0] || 'in-progress';
    let openKey = [];

    menus.map((menu) => openKey.push(menu.id));

    return (
      <Menu
        selectedKeys={[activatedMenu]}
        defaultOpenKeys={openKey}
        mode="inline"
        className="ant-dashboard-menu"
      >
        {menus &&
          menus.map((menu, index) => {
            if (!menu) return null;
            if (menu.href) {
              return (
                <Menu.Item key={menu.id} className="ant-menu-item-lv1">
                  <Link
                    to={menu.href}
                    className="sub-menu-link"
                    key={`${menu.id}-${index}`}
                  >
                    <>
                      {menu.icon && React.isValidElement(menu.icon)
                        ? menu.icon
                        : null}{' '}
                      {menu.label}
                    </>
                  </Link>
                </Menu.Item>
              );
            }

            return (
              <SubMenu
                key={menu.id}
                title={
                  <>
                    {menu.icon && React.isValidElement(menu.icon)
                      ? menu.icon
                      : null}{' '}
                    {menu.label}
                  </>
                }
                className="ant-menu-item-lv1"
              >
                {menu.children &&
                  menu.children.map(
                    (child) =>
                      child && (
                        // <Link to={child.href} className="sub-menu-link" key={`${child.id}-${index}`}>
                        <Menu.Item key={child.id}>
                          <Link
                            to={child.href}
                            className="sub-menu-link"
                            key={`${child.id}-${index}`}
                          >
                            {child.icon} {child.label}
                          </Link>
                        </Menu.Item>
                      ),
                  )}
              </SubMenu>
            );
          })}
      </Menu>
    );
  }
}

DashboardMenu.propTypes = {
  activatedMenu: PropTypes.string,
  dashboardMenuConfigs: PropTypes.instanceOf(Array),
};

DashboardMenu.defaultProps = {
  activatedMenu: null,
  dashboardMenuConfigs: [],
};

const mapPropsToState = (state) => leftMenuSelector(state);

export default connect(mapPropsToState)(withUserInfo(DashboardMenu));
