import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

const defaultComponent = (props) => <button {...props} />;

class SubmitButton extends React.Component {
  cssClass = 'etec-submit-button';

  render() {
    const { className, component } = this.props;
    const Component = component || defaultComponent;
    return (
      <Component
        {...this.props}
        className={`${className || ''} ${this.cssClass}`}
      />
    );
  }
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  component: PropTypes.element,
};

SubmitButton.defaultProps = {
  className: '',
  component: null,
};

export default SubmitButton;
