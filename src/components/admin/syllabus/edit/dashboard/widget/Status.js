import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from 'components/admin/syllabus/edit/switch-controls';

class SyllabusStatus extends React.Component {
  render() {
    return <SwitchControls items={controls(this.props.node)} />;
  }
}

export default SyllabusStatus;
