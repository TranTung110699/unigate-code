import React from 'react';
import PropTypes from 'prop-types';
import WidgetsRender from 'components/admin/dashboard/WidgetsRender';
import TimeTable from 'components/timetable/views/index';
import { t1 } from 'translate';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { remove } from 'common/utils/Array';
import SearchEnrolmentPlans from '../../mainstage/enrolment-plans';
// import OverallProgress from 'components/admin/enrolment-plan/mainstage/dashboard/reports/overall-progress';
import OverallLearningStatistics from 'components/admin/enrolment-plan/mainstage/dashboard/reports/overall-learning-statistics';
import StationeryReport from './widget/stationery-report';
import { enableAsset } from 'common/conf';
import connect from 'react-redux/es/connect/connect';
import withFeatureFlags from 'feature-flag/withFeatureFlags';

class Dashboard extends React.PureComponent {
  render() {
    const { className, node, enableAssetConfig, isFeatureEnabled } = this.props;
    const componentClassName = `${className || ''}`;
    const items = [
      // {
      //   component: () => <OverallProgress trainingPlan={node} />,
      //   expand: false,
      //   id: 'overall-progress',
      //   label: t1('overall_progress'),
      //   height: 4,
      //   minHeight: 4,
      //   minWidth: 6,
      //   width: 6,
      // },
      {
        component: () => (
          <OverallLearningStatistics
            trainingPlan={node}
            target="training_plan"
          />
        ),
        expand: false,
        id: 'training_plan_overall_learning_statistics',
        label: t1('training_plan_overall_learning_statistics'),
        height: 4,
        minHeight: 4,
        minWidth: 12,
        width: 12,
      },
      ...(!window.isETEP
        ? [
            {
              component: () => <TimeTable trainingPlan={node} perm={'root'} />,
              expand: false,
              id: 'timetable',
              label: t1('timetable'),
              height: 4,
              minHeight: 4,
              minWidth: 12,
            },
          ]
        : []),
      ...(enableAssetConfig
        ? [
            {
              id: 'stationery_report',
              label: t1('stationery_report'),
              component: () => <StationeryReport {...this.props} />,
              minWidth: 12,
              minHeight: 4,
            },
          ]
        : []),
      {
        component: () => (
          <SearchEnrolmentPlans
            node={node}
            noSearchForm
            columnsNotToShow={['action']}
            hiddenFields={{
              status: remove(
                Object.values(enrolmentPlanStatuses),
                enrolmentPlanStatuses.DELETED,
              ),
            }}
          />
        ),
        expand: true,
        id: 'enrolment_plans',
        label: t1('enrolment_plans'),
        height: 5,
        minHeight: 5,
        minWidth: 12,
      },
    ];

    return (
      <div className={componentClassName}>
        <WidgetsRender items={items} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  className: PropTypes.string,
};

Dashboard.defaultProps = {
  className: '',
  enableAssetConfig: 0,
};
const mapStateToProps = (state) => ({
  enableAssetConfig: enableAsset(state.domainInfo),
});
export default connect(mapStateToProps)(withFeatureFlags()(Dashboard));
