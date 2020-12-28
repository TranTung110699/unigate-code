import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from 'components/admin/course/edit/switch-controls';
import CloningSyllabus from './CloningSyllabus';

const CourseStatus = ({ node }) => {
  return (
    <React.Fragment>
      <SwitchControls items={controls(node)} />
      <CloningSyllabus node={node} />
    </React.Fragment>
  );
};

export default CourseStatus;
