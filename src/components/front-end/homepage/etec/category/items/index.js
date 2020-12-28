import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { displayAvatar } from 'utils/Util';
import { getFrontendUrl } from 'routes/links/common';
import './stylesheet.scss';

class Item extends Component {
  style = { padding: '10px' };

  render() {
    const { className, path } = this.props;
    return (
      <NavLink
        style={this.style}
        className={`etec-category ${className}`}
        to={getFrontendUrl('tests', { type: 'path', iid: path.iid })}
      >
        <div
          className="background"
          style={{ backgroundImage: `url(${displayAvatar(path.avatar)}` }}
        >
          <div className="content">
            <img src={path.icon} alt={path.name} />
            <h2>{path.name}</h2>
          </div>
        </div>
      </NavLink>
    );
  }
}

Item.propTypes = {
  className: PropTypes.string,
  path: PropTypes.instanceOf(Object),
};
Item.defaultProps = {
  className: '',
  path: {},
};
export default Item;
