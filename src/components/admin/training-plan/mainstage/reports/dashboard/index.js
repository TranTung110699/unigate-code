import React from 'react';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import Button from 'components/common/primary-button';
import lodashGet from 'lodash.get';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { reportRoutes, reportTypes } from '../../../routes';

const DashboardReport = ({ trainingPlan }) => {
  if (!trainingPlan.iid) return null;

  const iid = lodashGet(trainingPlan, 'iid');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 ">
          <Widget
            title={t1('users_overall_progress')}
            url={reportRoutes(iid, reportTypes.usersOverallProgress)}
          >
            <p>{t1('description_users_overall_progress')}</p>
            {/*
            <div className="text-center m-t-30">
              <Link to={reportRoutes(iid, reportTypes.usersOverallProgress)}>
                <Button
                  icon={<Icon icon="preview" />}
                  label={t1('view_detail')}
                />
              </Link>
            </div>
*/}
          </Widget>
        </div>

        <div className="col-md-4 ">
          <Widget
            title={t1('training_plan_credit_overall_progress')}
            url={reportRoutes(iid, reportTypes.creditOverallProgress)}
          >
            <p>{t1('description_training_plan_credit_overall_progress')}</p>
            {/*
            <div className="text-center m-t-30">
              <Link to={reportRoutes(iid, reportTypes.creditOverallProgress)}>
                <Button
                  icon={<Icon icon="preview" />}
                  label={t1('view_detail')}
                />
              </Link>
            </div>
*/}
          </Widget>
        </div>

        {/*
        <div className="col-md-4 ">
          <Widget
            title={t1('training_plan_not_started_members')}
            url={reportRoutes(iid, reportTypes.notStartedLearners)}
          >
            <p>{t1('description_training_plan_not_started_members')}</p>
            <div className="text-center m-t-30">
              <Link to={reportRoutes(iid, reportTypes.notStartedLearners)}>
                <Button
                  icon={<Icon icon="preview" />}
                  label={t1('view_detail')}
                />
              </Link>
            </div>
          </Widget>
        </div>
*/}

        <div className="col-md-4 ">
          <Widget
            title={t1('training_plan_survey')}
            url={reportRoutes(iid, reportTypes.survey)}
          >
            <p>{t1('survey_results_of_all_students_in_training_plan')}</p>
            {/*
            <div className="text-center m-t-30">
              <Link to={reportRoutes(iid, reportTypes.survey)}>
                <Button
                  icon={<Icon icon="preview" />}
                  label={t1('view_detail')}
                />
              </Link>
            </div>
*/}
          </Widget>
        </div>

        <div className="col-md-4 ">
          <Widget
            title="Trạng thái học tập của giảng viên cốt cán"
            url={reportRoutes(iid, reportTypes.cbcc)}
          >
            <p>Thống kê theo trạng thái học tập GVPTCC/CBQLCSGDPTCC</p>
            {/*
            <div className="text-center m-t-30">
              <Link to={reportRoutes(iid, reportTypes.cbcc)}>
                <Button
                  icon={<Icon icon="preview" />}
                  label={t1('view_detail')}
                />
              </Link>
            </div>
*/}
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
