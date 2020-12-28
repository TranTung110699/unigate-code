import React from 'react';

import { withRouter } from 'react-router-dom';
import PhilosophyMenuList from './philosophy-menu-list';
import InstallApp from './install_app';
import './stylesheet.scss';

class BlogRightSideBar extends React.Component {
  render() {
    return (
      <div>
        <div>
          <PhilosophyMenuList />
        </div>
        <div>
          <InstallApp />
        </div>
      </div>
    );
  }
}

export default withRouter(BlogRightSideBar);
