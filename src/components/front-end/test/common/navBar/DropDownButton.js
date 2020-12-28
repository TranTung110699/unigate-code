import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Icon from 'components/common/Icon';

class DropDownButton extends React.Component {
  popoverAnchorOrigin = { horizontal: 'left', vertical: 'bottom' };
  popoverTargetOrigin = { horizontal: 'left', vertical: 'top' };

  constructor(props) {
    super(props);
    this.state = {
      shouldShowDropDown: false,
      anchorEl: null,
      popoverStyle: {},
    };
  }

  handleButtonClick = (event) => {
    event.preventDefault();

    this.setState({
      shouldShowDropDown: !this.state.shouldShowDropDown,
      anchorEl: event.currentTarget,
      popoverStyle: {
        minWidth: event.currentTarget.getBoundingClientRect().width,
      },
    });
  };

  handleRequestClose = () => {
    this.setState({
      shouldShowDropDown: false,
    });
  };

  render() {
    const { className, text, children, component } = this.props;
    const Component = component || ((props) => <button {...props} />);
    const componentProps = this.props.componentProps || {};

    return (
      <Component
        {...componentProps}
        className={className}
        onClick={this.handleButtonClick}
      >
        {text}
        <Icon icon="keyboard_arrow_down" />
        <Popover
          open={this.state.shouldShowDropDown}
          style={this.state.popoverStyle}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.popoverAnchorOrigin}
          targetOrigin={this.popoverTargetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          {children}
        </Popover>
      </Component>
    );
  }
}

DropDownButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  component: PropTypes.any,
  componentProps: PropTypes.any,
  text: PropTypes.string,
};

DropDownButton.defaultProps = {
  children: null,
  className: '',
  component: null,
  componentProps: null,
  text: '',
};

export default DropDownButton;
