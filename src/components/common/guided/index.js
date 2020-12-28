import React from 'react';
import Popover from './PopoverForHelp';

const guidedWrapperStyle = {
  position: 'relative',
};

const guideStyle = {
  position: 'absolute',
  top: '10px',
  right: '5px',
  zIndex: 1000,
  cursor: 'pointer',
};

class Guided extends React.Component {
  render() {
    return (
      <div style={guidedWrapperStyle}>
        <div style={guideStyle}>
          <Popover {...this.props} />
        </div>

        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Guided;
