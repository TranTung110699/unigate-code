import React from 'react';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { t1 } from 'translate';
import routes from 'routes';
import PropTypes from 'prop-types';

// inside roles & staff menu , we have 2 separate tabs: 1 for roles and 1 for staff
// action : staff|roles
const navItems = (action, node) => [
  {
    id: 'staff',
    active: action === 'staff',
    link: routes.url('edit_item', { mode: 'staff', item: node }),
    label: t1('staff'),
  },
  {
    id: 'roles',
    active: action === 'roles',
    link: routes.url('edit_item', { mode: 'roles', item: node }),
    label: t1('roles'),
  },
];

class StaffHorizontalNav extends React.Component {
  render() {
    const { content, node, action } = this.props;

    return (
      <HorizontalNav
        items={navItems(action, node)}
        content={content}
        key={node && node.iid}
      />
    );
  }
}

StaffHorizontalNav.propTypes = {
  content: PropTypes.node,
};

export default StaffHorizontalNav;
