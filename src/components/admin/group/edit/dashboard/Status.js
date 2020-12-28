import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from '../switch-controls';
class ContestStatus extends React.Component {
  render() {
    return <SwitchControls items={controls(this.props.node)} />;
  }
}

export default ContestStatus;
