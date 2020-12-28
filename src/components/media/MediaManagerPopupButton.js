import React from 'react';
import PropTypes from 'prop-types';
import { openMediaManagerDialog, setTargetElement } from './actions';
import { connect } from 'react-redux';

class MediaManager extends React.Component {
  handleClick = () => {
    const { dispatch, accept, onSelect } = this.props;
    const id = this.props.id || 'fileUpload';
    dispatch(openMediaManagerDialog(true));
    dispatch(setTargetElement(id, onSelect, accept));
  };

  render() {
    const { className, Component } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <Component className={componentClassName} onClick={this.handleClick} />
    );
  }
}

MediaManager.propTypes = {
  className: PropTypes.string,
};

MediaManager.defaultProps = {
  className: '',
  Component: (props) => <button {...props} />,
};

export default connect()(MediaManager);
