import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import AntdTable from 'antd/lib/table';
import RemoveTeacherButton from './remove-teacher/Button';
import AddTeachersButton from './add-teachers/Button';

const EditCourseTeachers = ({ course }) => {
  const courseIid = lodashGet(course, 'iid');

  const formid = `edit_course_teachers_${courseIid}`;

  const renderResultsComponent = (items) => {
    const columns = [
      {
        title: t1('name'),
        key: 'name',
        render: (row) => lodashGet(row, 'name'),
      },
      {
        title: t1('actions'),
        key: 'actions',
        render: (row) => {
          return (
            <RemoveTeacherButton formid={formid} user={row} course={course} />
          );
        },
      },
    ];

    return (
      <>
        <AntdTable
          size="middle"
          columns={columns}
          dataSource={items}
          pagination={false}
          bordered
          rowKey="id"
        />
        <AddTeachersButton formid={formid} course={course} />
      </>
    );
  };

  return (
    <SearchWrapper
      formid={formid}
      showSearchButton={false}
      alternativeApi={taphuanSmartEnrolmentPlanApi.search_course_teachers}
      hiddenFields={{
        course_iid: courseIid,
      }}
      renderResultsComponent={renderResultsComponent}
      noResultText={t1('no_data')}
      noNeedBackground
    />
  );
};

export default EditCourseTeachers;
