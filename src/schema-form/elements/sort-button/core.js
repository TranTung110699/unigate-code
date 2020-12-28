import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-upward';

const Wrapper = styled.button`
  transform: translateX(-6px);
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const SortIcon = styled(ArrowUpIcon)`
  width: 16px !important;
  height: 16px !important;
  transform: translateY(3px)
    ${(props) => (props.sortOrder === -1 ? 'rotate(-180deg)' : 'rotate(0deg)')};
  opacity: ${(props) => (!props.showIcon ? 0 : 1)};
  fill: currentColor !important;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

class SortButton extends React.Component {
  cssClass = '';

  handleClick = (...params) => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick(...params);
    }
  };

  render() {
    const { className, sortOrder, showIcon, children } = this.props;
    return (
      <Wrapper
        className={`${className || ''} ${this.cssClass}`}
        onClick={this.handleClick}
      >
        {children}
        <SortIcon showIcon={showIcon} sortOrder={sortOrder} />
      </Wrapper>
    );
  }
}

SortButton.propTypes = {
  className: PropTypes.string,
  showIcon: PropTypes.bool,
};

SortButton.defaultProps = {
  className: '',
  showIcon: true,
};

export default SortButton;
