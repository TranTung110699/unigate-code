import lodashGet from 'lodash.get';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import { t1 } from 'translate';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import React from 'react';
import AntdTable from 'antd/lib/table';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

const Add = ({ dialogKey, formid, user, course }) => {
  const userIid = lodashGet(user, 'iid');
  const courseIid = lodashGet(course, 'iid');

  return (
    <ApiRequestBtnWithConfirmDialog
      textConfirm={t1('do_you_want_to_add_this_teacher_to_course?')}
      formidToSubmitOnSuccess={formid}
      url={taphuanSmartEnrolmentPlanApi.add_course_teachers}
      params={{
        user_iid: userIid,
        course_iid: courseIid,
      }}
      icon="add"
      closeModal
      modalKey={dialogKey}
    />
  );
};

const AddTeachers = ({ course, dialogKey }) => {
  const courseIid = lodashGet(course, 'iid');

  const formid = `add_course_teachers_${courseIid}`;

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
            <Add
              formid={formid}
              user={row}
              course={course}
              dialogKey={dialogKey}
            />
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
      </>
    );
  };

  return (
    <SearchWrapper
      formid={formid}
      showSearchButton={false}
      alternativeApi={
        taphuanSmartEnrolmentPlanApi.search_teachers_to_add_to_course
      }
      hiddenFields={{
        course_iid: courseIid,
      }}
      renderResultsComponent={renderResultsComponent}
      noResultText={t1('no_data')}
      noNeedBackground
    />
  );
};

export default AddTeachers;
