import React, { Component } from 'react';
import Block from 'components/admin/course/mainstage/dashboard/Block';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actions from 'actions/node/creators';
import LoginAs from 'components/admin/dashboard/login-as/LoginAsForm';
import { withRouter } from 'react-router';
import getMenu from './configs';

import './stylesheet.scss';

class UsefulLinksWidget extends Component {
  handleOnClick = (item) => {
    if (item.id === 'login_as_user') {
      const { dispatch } = this.props;
      const contentDialog = <LoginAs />;
      const optionsProperties = {
        modal: true,
        handleClose: true,
      };
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
    }
  };

  render() {
    const { role, menuRoles } = this.props;
    const currentRole = role || 'all';
    const menus = getMenu(currentRole, menuRoles);

    return (
      <div className="menu_widget">
        <div className="list_blocks">
          {menus &&
            menus.map((item, key) => (
              <div
                key={`${item.id}-${key}`}
                onClick={() => this.handleOnClick(item)}
              >
                <Block
                  title={item.label}
                  link={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state, props) =>
    props.match && props.match.params && props.match.params.role,
  (state) => state.dataApiResults && state.dataApiResults.roles_menu_url,
  (role, menuRoles) => ({
    role,
    menuRoles,
  }),
);

export default withRouter(connect(mapStateToProps)(UsefulLinksWidget));
