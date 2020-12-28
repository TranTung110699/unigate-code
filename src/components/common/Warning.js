import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';

const style = {
  color: '#e2211b',
};

class Warning extends Component {
  render() {
    if (this.props.inline)
      return (
        <span
          className="warning-item"
          style={Object.assign({}, style, this.props.style)}
        >
          {this.props.withIcon ? (
            <>
              <Icon icon="warning" />{' '}
            </>
          ) : (
            ''
          )}
          {this.props.children}
        </span>
      );

    return (
      <div
        className="warning-item"
        style={Object.assign({}, style, this.props.style)}
      >
        {this.props.withIcon ? <Icon icon="warning" /> : ''}{' '}
        {this.props.children}
      </div>
    );
  }
}

// // withIcon =
Warning.propTypes = {
  withIcon: PropTypes.bool,
};

export default Warning;
