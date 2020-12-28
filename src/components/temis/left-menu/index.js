import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import configs from './configs';
import withUserInfo from 'common/hoc/withUserInfo';
import './stylesheet.scss';

const { SubMenu } = Menu;

class TemisLeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  render() {
    const {
      TemisLeftMenuConfigs,
      dashboardAction,
      path,
      userInfo,
    } = this.props;

    // const menus = getMenus(TemisLeftMenuConfigs, null, null, path);
    let openKey = [];

    const menus = configs(userInfo);
    const menuActive = menus.filter((menu) => menu.href.includes(path));

    const activatedMenu =
      dashboardAction || (menuActive && menuActive[0] && menuActive[0].id)
        ? menuActive[0].id
        : 'temis-dashboard';

    const { screenWidth } = this.state;

    return (
      <Menu
        selectedKeys={[activatedMenu]}
        defaultOpenKeys={openKey}
        mode={
          screenWidth <= 991 && screenWidth >= 768 ? 'horizontal' : 'inline'
        }
        className="temis-dashboard-menu"
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

TemisLeftMenu.propTypes = {
  activatedMenu: PropTypes.string,
  TemisLeftMenuConfigs: PropTypes.instanceOf(Array),
};

TemisLeftMenu.defaultProps = {
  activatedMenu: null,
  TemisLeftMenuConfigs: [],
};

export default connect()(withUserInfo(TemisLeftMenu));
