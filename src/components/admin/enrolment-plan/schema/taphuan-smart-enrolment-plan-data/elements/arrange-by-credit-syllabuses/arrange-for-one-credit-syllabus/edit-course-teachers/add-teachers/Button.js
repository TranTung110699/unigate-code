import React from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { t1 } from 'translate';
import AddTeachers from './AddTeachers';

const AddCourseTeachersButton = ({ course, onCloseDialog }) => {
  const courseIid = lodashGet(course, 'iid');
  const dialogKey = `add_course_teachers_${courseIid}`;

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => {
        return <button onClick={showFull}>{t1('add')}</button>;
      }}
      renderFull={() => {
        return <AddTeachers course={course} dialogKey={dialogKey} />;
      }}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        handleClose: true,
        callbacks: {
          onCloseDialog,
        },
      }}
    />
  );
};

export default AddCourseTeachersButton;
