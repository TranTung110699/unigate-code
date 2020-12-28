import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getMenus from './configs';
import { leftMenuSelector } from '../selectors';
import './stylesheet.scss';

class DashboardMenu extends React.Component {
  getMenuActiveClass = (menu, activeMenu) => {
    let isActive =
      menu === activeMenu ||
      (menu === 'assignments' &&
        ['group-assignments', 'personal-assignments'].includes(activeMenu));

    return isActive ? 'active' : '';
  };

  render() {
    const { dashboardMenuConfigs, dashboardAction, path } = this.props;

    const menus = getMenus(dashboardMenuConfigs, null, null, path);
    const activatedMenu =
      dashboardAction || dashboardMenuConfigs[0] || 'in-progress';

    return (
      <div className="dashboard-menu">
        <ul>
          {menus &&
            menus.map((menu, index) => {
              if (!menu) return null;
              if (menu.href) {
                return (
                  <Link
                    to={menu.href}
                    className="sub-menu-link"
                    key={`${menu.id}-${index}`}
                  >
                    <li
                      className={`${this.getMenuActiveClass(
                        menu.id,
                        activatedMenu,
                      )}  ${menu.menuLevel}`}
                    >
                      {menu.label}
                    </li>
                  </Link>
                );
              }

              return (
                <div key={`${menu.id}-${index}-div`}>
                  <li
                    key={`${menu.id}-${index}`}
                    className={`${menu.menuLevel}`}
                  >
                    {menu.label}
                  </li>
                  {menu.children &&
                    menu.children.map(
                      (child) =>
                        child && (
                          // <Link to={child.href} className="sub-menu-link" key={`${child.id}-${index}`}>
                          <li
                            className={`sub-menu ${this.getMenuActiveClass(
                              child.id,
                              activatedMenu,
                            )}`}
                            key={`${child.id}-sub`}
                          >
                            <Link
                              to={child.href}
                              className="sub-menu-link"
                              key={`${child.id}-${index}`}
                            >
                              {child.icon} {child.label}
                            </Link>
                          </li>
                        ),
                    )}
                </div>
              );
            })}
        </ul>
      </div>
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

export default connect(mapPropsToState)(DashboardMenu);
