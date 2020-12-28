import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import getMenus from 'components/front-end/dashboard/show-by-tab/left-menu/configs';
import lGet from 'lodash.get';
import './stylesheet.scss';

const flatMenu = (menus, action) => {
  if (!menus) return null;

  const menuSize = menus.length;

  for (let i = 0; i < menuSize; i += 1) {
    const menu = menus[i];
    if (!menu) return null;
    if (menu.id === action) {
      return menu;
    }
    const child = flatMenu(menu.children, action);
    if (child) return child;
  }
  return null;
};

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { action } = this.props;
    const menus = getMenus(null, null, null, 'dashboard');
    const flattenMenu = flatMenu(menus, action);
    const labelMenu = lGet(flattenMenu, 'navLabel', '');
    return (
      <div className="col-md-12 m-t-5">
        <ol className="breadcrumbs">
          <li className="breadcrumb-item">
            <Link to="/">
              <Icon icon="home" /> {t1('home_page')}
            </Link>
          </li>
          {labelMenu && (
            <li className="breadcrumb-item active">{`${labelMenu}`}</li>
          )}
        </ol>
      </div>
    );
  }
}

export default index;
