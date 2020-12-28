import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import routes from 'routes';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import { getConf } from 'utils/selectors/index';
import { enableAsset } from 'common/conf';

import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';

import WidgetsRender from 'components/admin/dashboard/WidgetsRender';
import OverallLearningStatistics from './reports/overall-learning-statistics';
import StationeryUsageRate from './reports/stationery-usage-rate';
import optionsSyncSchema from '../syncer/sync-form-schema';
import Workflow from './Workflow';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import ButtonNew from 'components/common/primary-button';

class Dashboard extends React.PureComponent {
  handleSyncProgressOnClick = ({ closeDialog }) => {
    const { node } = this.props;

    return (
      <NodeNew
        ntype="report"
        hiddenFields={{ iid: node && node.iid }}
        schema={optionsSyncSchema}
        node={node}
        alternativeApi={
          epApiUrls.cron_jobs_to_log_report_enrolment_plan_learner_progress
        }
        requestSuccessful={closeDialog}
        submitButton={
          <RaisedButton
            icon={<Icon icon="sync" />}
            label={t1('sync')}
            primary
            type="submit"
          />
        }
      />
    );
  };

  render() {
    const {
      className,
      node,
      dispatch,
      enable_asset,
      config,
      isFeatureEnabled,
    } = this.props;
    const componentClassName = `${className || ''}`;

    const isExecuted = node.status !== enrolmentPlanStatuses.EXECUTED;

    const workflow = {
      component: () => <Workflow node={node} />,
      expand: false,
      id: 'workflow',
      label: t1('enrolment_plan_running_status'),
      height: 4,
      minHeight: 4,
      minWidth: 6,
      width: 6,
    };

    const widgetsWhenExecuted = [
      {
        component: () => <OverallLearningStatistics node={node} />,
        expand: false,
        id: 'learn-overall',
        label: t1('enrolment_plan_overall_learning_statistics'),
        height: 4,
        minHeight: 4,
        minWidth: 12,
        width: 12,
      },
      ...(enable_asset
        ? [
            {
              component: () => <StationeryUsageRate node={node} />,
              expand: false,
              id: 'stationery-usage-rate',
              label: t1('stationery_usage_rate'),
              height: 4,
              minHeight: 4,
              minWidth: 12,
              width: 12,
            },
          ]
        : []),
      workflow,
      // ]),
    ];

    const widgets = !isExecuted ? widgetsWhenExecuted : [workflow];

    const tid = lodashGet(node, 'training_plan_iid');
    const classTextWhite = {
      className: isFeatureEnabled(features.NEW_UI_JULY_2019)
        ? 'text-white'
        : '',
    };
    return (
      <div>
        {!!tid && (
          <div>
            <div {...classTextWhite}>
              {t1('this_enrolment_plan_is_part_of_the_training_plan')}
              :&nbsp;
              <Link
                to={routes.url('node_edit', {
                  ntype: 'training_plan',
                  iid: tid,
                  step: 'dashboard',
                })}
                {...classTextWhite}
              >
                {lodashGet(node, 'training_plan.name') || tid}
              </Link>
            </div>
          </div>
        )}
        <div className={componentClassName}>
          <WidgetsRender items={widgets} />
        </div>

        {!isExecuted && (
          <div>
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <div style={{ width: '30%' }}>
                  {isFeatureEnabled(features.NEW_UI_JULY_2019) ? (
                    <ButtonNew
                      primary
                      name="sync_progress"
                      className="m-r-10"
                      type="submit"
                      icon={<Icon icon="sync" />}
                      label={t1('sync_learners_progress')}
                      onClick={showFull}
                      fullWidth={false}
                    />
                  ) : (
                    <FlatButton
                      primary
                      name="sync_progress"
                      className="m-l-10 m-r-10"
                      type="submit"
                      icon={<Icon icon="sync" />}
                      label={t1('sync_learners_progress')}
                      onClick={showFull}
                      fullWidth={false}
                    />
                  )}
                </div>
              )}
              renderFull={this.handleSyncProgressOnClick}
            />
            <div {...classTextWhite}>
              (
              {t1('this_will_sync_the_latest_learners_progress_to_the_reports')}
              )
            </div>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  className: PropTypes.string,
  node: PropTypes.shape(),
  dispatch: PropTypes.func,
};

Dashboard.defaultProps = {
  className: '',
  enable_asset: 0,
  node: {},
  dispatch: (f) => f,
};

const mapStateToProps = (state) => ({
  enable_asset: enableAsset(state.domainInfo),
  config: getConf(state),
});
export default connect(mapStateToProps)(withFeatureFlags()(Dashboard));
