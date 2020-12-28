import React from 'react';
import PropTypes from 'prop-types';
import AntToggle from 'antd/lib/switch';
import './TwoSideToggle.scss';

class TwoSideToggle extends React.Component {
  toggleLabelStyle = {
    display: 'none',
  };

  toggleStyle = {
    width: 'auto',
  };

  cssClass = 'two-side-toggle';

  handleToggleOn = (event) => {
    const { onToggle } = this.props;
    if (typeof onToggle === 'function') {
      onToggle(event, true);
    }
  };

  handleToggleOff = (event) => {
    const { onToggle } = this.props;
    if (typeof onToggle === 'function') {
      onToggle(event, false);
    }
  };

  handleToggleChange = (checked, event) => {
    const { onToggle } = this.props;
    if (typeof onToggle === 'function') {
      onToggle(event, checked);
    }
  };

  render() {
    const {
      className,
      onLabel,
      offLabel,
      toggled,
      style,
      readOnly,
    } = this.props;

    if (readOnly) {
      return toggled ? onLabel : offLabel;
    }

    return (
      <span style={style} className={`${className || ''} ${this.cssClass}`}>
        <span
          onClick={toggled ? this.handleToggleOff : null}
          className={`${this.cssClass}__label\
             ${this.cssClass}__label--left\
             ${toggled ? `${this.cssClass}__label--active` : ''}`}
        >
          {offLabel}
        </span>
        <AntToggle
          checked={toggled}
          className={`${this.cssClass}__toggle ${className}`}
          style={this.toggleStyle}
          onChange={this.handleToggleChange}
        />
        <span
          onClick={toggled ? null : this.handleToggleOn}
          className={`${this.cssClass}__label\
             ${this.cssClass}__label--right\
             ${toggled ? '' : `${this.cssClass}__label--active`}`}
        >
          {onLabel}
        </span>
      </span>
    );
  }
}

TwoSideToggle.propTypes = {
  className: PropTypes.string,
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
};

TwoSideToggle.defaultProps = {
  className: '',
  offLabel: '',
  onLabel: '',
};

export default TwoSideToggle;
