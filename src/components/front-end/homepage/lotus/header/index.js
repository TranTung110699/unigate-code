import React from 'react';
import { connect } from 'react-redux';
import Intro from './intro';
import Nav from './nav';
import './stylesheet.scss';

class HomepageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  cssClass = 'lotus-home-page-header';

  render() {
    const { navItems } = this.props;

    return (
      <div className={`container ${this.cssClass}`}>
        <div className={`col-sm-8 col-md-8 col-lg-8 ${this.cssClass}__group`}>
          <div className={`${this.cssClass}__intro`}>
            <Intro />
          </div>
        </div>
        <div className={`col-sm-4 col-md-4 col-lg-4 ${this.cssClass}__group`}>
          <div className={`${this.cssClass}__nav`}>
            <Nav items={navItems} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(HomepageHeader);
