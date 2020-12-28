import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from '../../../edit/switch-controls';
class CourseStatus extends React.Component {
  render() {
    return <SwitchControls items={controls(this.props.node)} />;
  }
}

export default CourseStatus;
