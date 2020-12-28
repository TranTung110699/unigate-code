import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import actions from 'actions/node/creators';

class Link extends React.PureComponent {
  handleClick = (...params) => {
    const { onClick, closeAllDialogsOnClick, dispatch } = this.props;
    if (typeof onClick === 'function') {
      onClick(...params);
    }
    if (closeAllDialogsOnClick) {
      dispatch(actions.closeAllDialogs());
    }
  };

  render() {
    return <ReactRouterLink {...this.props} onClick={this.handleClick} />;
  }
}

Link.propTypes = {
  className: PropTypes.string,
  closeAllDialogsOnClick: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
  closeAllDialogsOnClick: true,
};

export default connect()(Link);
