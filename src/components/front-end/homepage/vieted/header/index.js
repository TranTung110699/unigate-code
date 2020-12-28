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

  cssClass = 'vieted-home-page-header';

  render() {
    const { navItems } = this.props;

    return (
      <div className={this.cssClass}>
        <div className="container">
          <div className="row">
            <div className={`col-sm-8 ${this.cssClass}__group`}>
              <div className={`${this.cssClass}__intro`}>
                <Intro />
              </div>
            </div>
            <div className={`col-sm-4 ${this.cssClass}__group`}>
              <div className={`${this.cssClass}__nav`}>
                <Nav items={navItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomepageHeader.propTypes = {
  navItems: Nav.propTypes,
};

HomepageHeader.defaultProps = {
  navItems: [],
};

export default connect()(HomepageHeader);
