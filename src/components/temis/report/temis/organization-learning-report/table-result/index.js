import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import { leaderPositionToText } from 'configs/constants/user';
import { sexAsText } from 'common/sex';

const TableResult = ({ items }) => {
  const getUserOganizationsObjectFromUser = (user) =>
    lodashGet(user, '__expand.user_organizations[0]');

  const getAcademicCategoryObjectsFromUser = (user) =>
    lodashGet(user, '__expand.academic_categories');

  const getCoursesByCompletionStatusFromUser = (user, status) =>
    lodashGet(user, ['__expand', 'courses_by_completion_status', status]);

  const getTemisDataFromUser = (user) => lodashGet(user, '__expand.temis');

  const displayBooleanField = (v) => (v ? t1('yes') : t1('no'));

  const columns = React.useMemo(
    () => [
      {
        title: t1('name'),
        index: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('birthday'),
        index: 'name',
        render: (user) => {
          const birthdayTs = lodashGet(user, 'birthday');
          return timestampToDateString(birthdayTs);
        },
      },
      {
        title: t1('email'),
        index: 'mail',
        dataIndex: 'mail',
      },
      {
        title: t1('phone'),
        index: 'phone',
        dataIndex: 'phone',
      },
      {
        title: t1('sex'),
        index: 'sex',
        render: (user) => sexAsText(lodashGet(user, 'sex')),
      },
      {
        title: t1('dtts'),
        index: 'dtts',
        render: (user) =>
          displayBooleanField(lodashGet(user, 'ethnicity') === 'dtts'),
      },
      {
        title: 'Chức vụ',
        index: 'leader_position',
        render: (user) => {
          return leaderPositionToText(lodashGet(user, 'leader_position'));
        },
      },
      {
        title: t1('province'),
        index: 'province',
        render: (user) => {
          return lodashGet(
            getUserOganizationsObjectFromUser(user),
            '__expand.org_province_id.name',
          );
        },
      },
      {
        title: t1('district'),
        index: 'district',
        render: (user) => {
          return lodashGet(
            getUserOganizationsObjectFromUser(user),
            '__expand.org_district_id.name',
          );
        },
      },
      {
        title: t1('organization_name'),
        index: 'organization_name',
        render: (user) => {
          return lodashGet(getUserOganizationsObjectFromUser(user), 'name');
        },
      },
      {
        title: t1('organization_code'),
        index: 'organization_code',
        render: (user) => {
          return lodashGet(getUserOganizationsObjectFromUser(user), 'code');
        },
      },
      {
        title: 'Môn học',
        index: 'academic_categories',
        render: (user) => {
          return (
            <ul>
              {(getAcademicCategoryObjectsFromUser(user) || []).map((cate) => {
                return (
                  <li key={lodashGet(cate, 'iid')}>
                    {lodashGet(cate, 'name')}
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        title: 'Số lượng bài học hoàn thành',
        index: 'number_of_passed_courses',
        width: '5%',
        render: (user) => {
          return (getCoursesByCompletionStatusFromUser(user, 'passed') || [])
            .length;
        },
      },
      {
        title: t1('completed_courses'),
        index: 'passed_courses',
        width: '10%',
        render: (user) => {
          return (
            <ul>
              {(getCoursesByCompletionStatusFromUser(user, 'passed') || []).map(
                (course) => {
                  return (
                    <li key={lodashGet(course, 'iid')}>
                      {lodashGet(course, 'name')}
                    </li>
                  );
                },
              )}
            </ul>
          );
        },
      },
      {
        title: 'Số lượng bài đang học',
        index: 'number_of_in_progress_courses',
        width: '5%',
        render: (user) => {
          return (
            getCoursesByCompletionStatusFromUser(user, 'in_progress') || []
          ).length;
        },
      },
      {
        title: t1('in_progress_courses'),
        index: 'in_progress_courses',
        width: '10%',
        render: (user) => {
          return (
            <ul>
              {(
                getCoursesByCompletionStatusFromUser(user, 'in_progress') || []
              ).map((course) => {
                return (
                  <li key={lodashGet(course, 'iid')}>
                    {lodashGet(course, 'name')}
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        title: t1('logged_in'),
        index: 'logged_in',
        render: (user) => {
          return displayBooleanField(lodashGet(user, 'logged_in'));
        },
      },
      {
        title: t1('have_enter_temis_profile_info'),
        index: 'have_enter_temis_profile_info',
        render: (user) => {
          return displayBooleanField(
            lodashGet(user, 'have_enter_temis_profile_info'),
          );
        },
      },
      {
        title: 'Đánh giá cuối khóa học',
        index: 'done_global_survey',
        render: (user) => {
          return displayBooleanField(
            lodashGet(getTemisDataFromUser(user), 'done_global_survey'),
          );
        },
      },
      {
        title: 'Chuẩn giáo viên/hiệu trưởng',
        index: 'done_tcnn',
        render: (user) => {
          return displayBooleanField(
            lodashGet(getTemisDataFromUser(user), 'done_tcnn'),
          );
        },
      },
    ],
    [],
  );

  return (
    <AntdTable
      bordered
      rowKey="id"
      size="middle"
      pagination={false}
      className="white-background"
      columns={columns}
      onExpand={null}
      dataSource={items}
      scroll={{
        x: true,
      }}
    />
  );
};

export default TableResult;
