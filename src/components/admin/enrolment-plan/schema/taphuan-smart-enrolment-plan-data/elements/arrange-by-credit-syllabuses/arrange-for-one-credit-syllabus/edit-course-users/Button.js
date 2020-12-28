import React from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { t1 } from 'translate';
import EditCourseUsers from './EditCourseUsers';

const EditCourseUsersButton = ({ course, onCloseDialog }) => {
  const courseIid = lodashGet(course, 'iid');
  const dialogKey = `edit_course_users_${courseIid}`;

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => {
        return <button onClick={showFull}>{t1('edit')}</button>;
      }}
      renderFull={() => {
        return <EditCourseUsers course={course} />;
      }}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        callbacks: {
          onCloseDialog,
        },
        handleClose: true,
      }}
    />
  );
};

export default EditCourseUsersButton;
