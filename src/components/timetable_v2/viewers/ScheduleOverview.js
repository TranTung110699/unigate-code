import React from 'react';
import Table from 'antd/lib/table';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import CourseTimetables, { formatData } from './schema/CourseTimetables';
import schema from './schema/scheduleSchema';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { t1 } from 'translate';

const renderScheduleOverview = (courses, userIid) => {
  const dataSource = formatData(courses);
  return (
    <Table
      columns={CourseTimetables(!userIid)}
      dataSource={dataSource}
      pagination={false}
      bordered
    />
  );
};

const searchSchedule = ({ userIid, ...props }) => (
  <React.Fragment>
    <SubTopMenuContext
      lastBreadcrumbName={t1('schedule_overview')}
      description={t1('schedule_overview_description')}
    />
    <SearchWrapper
      formid="search-schedule"
      renderResultsComponent={(courses) =>
        renderScheduleOverview(courses, userIid)
      }
      schema={schema(userIid)}
      alternativeApi={'/timetable-v2/get-timetables-to-view'}
      {...props}
    />
  </React.Fragment>
);

export default searchSchedule;
