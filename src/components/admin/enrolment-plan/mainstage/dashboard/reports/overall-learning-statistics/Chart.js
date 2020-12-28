import React from 'react';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import fetchData from 'components/common/fetchData';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import { chartColorsPallete } from 'configs/constants';

const Overall = ({ overallStatistics }) => {
  if (!overallStatistics) return null;

  const chartData = [
    {
      value: overallStatistics.assigned,
      name: t1('assigned_to_learn'),
    },
    {
      value: overallStatistics.unassigned,
      name: t1('not_yet_assigned'),
    },
  ];

  const chartData2 = [
    {
      value: overallStatistics.completed,
      name: t1('passed'),
    },
    {
      value: overallStatistics.not_yet_completed,
      name: t1('not_yet_completed'),
    },
  ];

  const style = {
    height: '300px',
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div style={style}>
            <CustomActiveShapePieChart
              data={chartData}
              options={{
                outerRadius: '60%',
                innerRadius: '50%',
                colors: chartColorsPallete.PASSED_FAILED,
              }}
            />

            <div>
              {t1('total_number_of_members_assigned')}:{' '}
              <b>
                {overallStatistics.assigned}/{overallStatistics.total}
              </b>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-6 col-xs-6">
          <div style={style}>
            <CustomActiveShapePieChart
              data={chartData2}
              options={{
                outerRadius: '60%',
                innerRadius: '50%',
                colors: chartColorsPallete.PASSED_FAILED,
              }}
            />

            <div>
              {t1('total_number_of_students_completed')}:{' '}
              <b>
                {overallStatistics.completed}/{overallStatistics.assigned}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchOverallProgressConfig = (props) => {
  const enrolmentPlanIid = lodashGet(props, 'node.iid');
  const trainingPlanIid = lodashGet(props, 'trainingPlan.iid');

  return {
    baseUrl: apiUrls.enrolment_plan_overall_learning_statistics,
    fetchCondition:
      lodashGet(props, 'node.iid') || lodashGet(props, 'trainingPlan.iid'),
    params: {
      enrolment_plan_iid: enrolmentPlanIid,
      training_plan_iid: trainingPlanIid,
    },
    propKey: 'overallStatistics',
    keyState: `overall_learning_statistics_${enrolmentPlanIid}_${trainingPlanIid}`,
    shouldRenderLoading: true,
  };
};

export default fetchData(fetchOverallProgressConfig)(Overall);
