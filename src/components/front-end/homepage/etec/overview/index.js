/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayHtml from 'components/common/html';
import IconStarGrey from './images/ic-star-grey.png';
import IconStarWhite from './images/ic-star-white.png';
import './stylesheet.scss';

class Overview extends Component {
  spanStyle = {
    color: '#8fdd2d',
    fontSize: '0.5em',
    position: 'relative',
    top: '-15px',
  };

  render() {
    const { style, color, title, content, shortTitle } = this.props;
    return (
      <div className="etec-overview" style={style}>
        <h1 style={{ color }}>
          {title}
          <span style={this.spanStyle}>{` ${shortTitle}`}</span>
        </h1>
        <DisplayHtml
          content={content}
          style={{ color, display: 'block !important' }}
        />
        <div className="indicator">
          <div style={{ background: color }} />
          <img
            src={
              color === 'white' || color === '#ffffff' || color === '#FFFFFF'
                ? IconStarWhite
                : IconStarGrey
            }
            alt=""
          />
          <div style={{ background: color }} />
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  shortTitle: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.instanceOf(Object),
};
Overview.defaultProps = {
  shortTitle: '',
  color: '',
  content: '',
  style: {},
  title: '',
};
export default Overview;
