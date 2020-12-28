import React from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { t1 } from 'translate';
import AddUsers from './AddUsers';

const AddCourseUsersButton = ({ course, onCloseDialog }) => {
  const courseIid = lodashGet(course, 'iid');
  const dialogKey = `add_course_users_${courseIid}`;

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => {
        return <button onClick={showFull}>{t1('add')}</button>;
      }}
      renderFull={() => {
        return <AddUsers course={course} dialogKey={dialogKey} />;
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

export default AddCourseUsersButton;
