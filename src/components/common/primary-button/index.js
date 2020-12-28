import React, { Component } from 'react';

import withFeatureFlags from 'feature-flag/withFeatureFlags';
import { connect } from 'react-redux';
import './stylesheet.scss';
import { ButtonType } from './button-type-constants';
import AntButton from 'antd/lib/button';
import PropTypes from 'prop-types';

class ButtonNew extends Component {
  render() {
    const {
      name,
      type,
      icon,
      label,
      onClick,
      isFeatureEnabled,
      className,
      buttonType,
      flatButton,
      children,
      loading,
      htmlType,
      ...props
    } = this.props;

    const validType = ['primary', 'ghost', 'dashed', 'danger', 'link'];

    return (
      <AntButton
        type={
          flatButton && !buttonType && !type
            ? 'default'
            : buttonType ||
              (validType.includes(type) ? type : ButtonType.primary)
        }
        icon={!React.isValidElement(icon) ? icon : false}
        onClick={onClick}
        className={`ant-button-wrapper ${className}`}
        loading={loading}
        htmlType={htmlType || type === 'submit' ? 'submit' : 'button'}
        ghost={(type || buttonType) === ButtonType.ghost}
        {...props}
      >
        {React.isValidElement(icon) && !loading ? icon : null}
        {label || children}
      </AntButton>
    );
  }
}

ButtonNew.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger', 'link']),
  buttonType: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger', 'link']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'reset', 'submit']),
  shape: PropTypes.oneOf(['round', 'circle', 'circle-outline']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  target: PropTypes.string,
  block: PropTypes.bool,
};

export default connect()(withFeatureFlags()(ButtonNew));
