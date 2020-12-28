import React from 'react';
import SocialNetwork from './social-network';
import Copyright from './copyright';
import './stylesheet.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className="ggg-footer">
        <SocialNetwork />
        <Copyright />
      </div>
    );
  }
}

export default Footer;
