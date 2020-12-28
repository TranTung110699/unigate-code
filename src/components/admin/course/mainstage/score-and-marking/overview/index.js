import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Loading from 'components/common/loading';
import fetchData from 'components/common/fetchData';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import WidgetsRender from 'components/admin/dashboard/WidgetsRender';

const containerStyle = {
  width: '100%',
  height: '100%',
  padding: '5px',
};

const getColorsByChartType = (id) => {
  if (id == 'passed') return ['#C62828', '#FDD835', '#54FF9F'];
  return ['#C62828', '#FDD835', '#54FF9F', '#4CAF50'];
};

const chartLabel = (id) => {
  if (id == 'passed') return t1(`passed_failed_overview`);
  else if (id == 'score') return t1(`score_spectrum`);
  else if (id == 'progress') return t1(`completion_progress_spectrum`);
};

const ScoreOverview = ({ loadingStatus, overallProgress }) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!Array.isArray(overallProgress) || !overallProgress.length) {
    return <h3>{t1('there_is_no_data_for_this_report')}</h3>;
  }

  return (
    <WidgetsRender
      items={overallProgress.map(({ id, overall_progress }) => {
        return {
          component: (
            <div style={containerStyle}>
              <br />
              <br />
              <br />
              <PieChart
                data={overall_progress}
                options={{
                  outerRadius: '60%',
                  innerRadius: '50%',
                  colors: getColorsByChartType(id),
                }}
              />
            </div>
          ),
          expand: false,
          id,
          label: chartLabel(id),
          height: 4,
          minHeight: 4,
          minWidth: 6,
          width: 6,
        };
      })}
    />
  );
};

const fetchOverallProgress = (props) => ({
  baseUrl: '/api/v2/report/get-course-overall-progress',
  fetchCondition: get(props, 'course.iid'),
  params: {
    course_iid: get(props, 'course.iid'),
  },
  propKey: 'overallProgress',
  refetchCondition: () => false,
});
export default fetchData(fetchOverallProgress)(ScoreOverview);
