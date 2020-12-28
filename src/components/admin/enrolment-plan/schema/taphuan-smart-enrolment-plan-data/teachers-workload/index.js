import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import AntdTable from 'antd/lib/table';

const Index = ({}) => {
  const formid = `search_teachers_workload`;

  const getTeacherFromRow = (row) => lodashGet(row, 'teacher');

  const renderResultsComponent = (items) => {
    const columns = [
      {
        title: t1('name'),
        key: 'name',
        render: (row) => {
          const teacher = getTeacherFromRow(row);
          return lodashGet(teacher, 'name');
        },
      },
      {
        title: t1('number_of_courses'),
        key: 'number_of_courses',
        render: (row) => {
          return lodashGet(row, 'number_of_courses');
        },
      },
      {
        title: t1('number_of_students'),
        key: 'number_of_students',
        render: (row) => {
          return lodashGet(row, 'number_of_students');
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
      alternativeApi={taphuanSmartEnrolmentPlanApi.search_teachers_workload}
      hiddenFields={{}}
      renderResultsComponent={renderResultsComponent}
      noResultText={t1('no_data')}
      noNeedBackground
    />
  );
};

export default Index;
