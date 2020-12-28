import React, { Component } from 'react';
import Block from 'components/admin/course/mainstage/dashboard/Block';
import actions from 'actions/node/creators';
import LoginAs from 'components/admin/dashboard/login-as/LoginAsForm';
import getMenu from './configs';

import 'components/admin/dashboard/widget/useful-links/stylesheet.scss';

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
    const { node } = this.props;
    const menus = getMenu(node);

    return (
      <div className="menu_widget">
        <div className="list_blocks">
          {menus &&
            menus.map((item, key) => (
              <div
                key={`${item.id}-${key}`}
                // onClick={() => this.handleOnClick(item)}
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

export default UsefulLinksWidget;
