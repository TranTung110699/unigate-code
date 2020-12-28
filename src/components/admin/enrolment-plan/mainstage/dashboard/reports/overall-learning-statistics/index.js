import React from 'react';
import TPSyncer from 'components/admin/training-plan/mainstage/syncer';
import EPSyncer from 'components/admin/enrolment-plan/mainstage/syncer';
import Chart from './Chart';
import RubricOverview from 'components/admin/rubric/overview';
import lodashGet from 'lodash.get';

const Overall = ({ overallStatistics, node, trainingPlan }) => {
  const rubricIid =
    lodashGet(trainingPlan, 'rubric_iid') || lodashGet(node, 'rubric_iid');

  return (
    <div>
      <Chart
        overallStatistics={overallStatistics}
        node={node}
        trainingPlan={trainingPlan}
      />

      <div className="m-b-10">
        <RubricOverview iid={rubricIid} />
      </div>

      {trainingPlan ? <TPSyncer node={trainingPlan} /> : null}
      {node ? <EPSyncer node={node} /> : null}
    </div>
  );
};

export default Overall;
