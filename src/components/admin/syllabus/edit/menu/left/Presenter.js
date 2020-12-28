import React, { Component } from 'react';
import Icon from 'components/common/Icon';
import SlideToggle from 'components/common/SlideToggle';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'; // shape({})
import LinkWithIcon from 'components/common/router/LinkWithIcon';
import { t1 } from 'translate';
import Overview from './Overview';

class Presenter extends Component {
  divStyle = { paddingLeft: '30px', color: 'white', fontSize: '150%' };

  render() {
    return (
      <div>
        <Overview {...this.props} />

        <ul className="nav nav-pills nav-stacked menu-teacher-left">
          {this.props.menuItems.map((item) => (
            <li key={item.id}>
              {item.isLink ? (
                <a href={item.href}>
                  <Icon icon={item.icon} /> {item.name}
                </a>
              ) : (
                <LinkWithIcon {...item} />
              )}
            </li>
          ))}
        </ul>

        <div style={this.divStyle}>
          <hr />
          <SlideToggle
            label={t1('freeze')}
            onLeft={this.props.onUnfreeze}
            onRight={this.props.onFreeze}
          />
        </div>
      </div>
    );
  }
}

Presenter.propTypes = {
  menuItems: PropTypes.array.isRequired, // array of menu items
  onFreeze: PropTypes.func.isRequired,
  onUnfreeze: PropTypes.func.isRequired,
};
export default Presenter;
