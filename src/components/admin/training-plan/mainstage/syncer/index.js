import React from 'react';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import FlatButton from 'components/common/mui/FlatButton';
import PrimaryButton from 'components/common/primary-button';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
// import OverallProgress from 'components/admin/enrolment-plan/mainstage/dashboard/reports/overall-progress';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import optionsSyncSchema from './schema-form';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
// import features from 'feature-flag/features';
import { timestampToDateString } from 'common/utils/Date';
import getLodash from 'lodash.get';

class TPSyncer extends React.Component {
  handleSyncProgressOnClick = ({ closeDialog }) => {
    const { node } = this.props;

    return (
      <>
        <h1>{t1('recalculate_the_training_plan_learners_latest_progress')}</h1>
        <NodeNew
          ntype="report"
          hiddenFields={{ iid: node && node.iid }}
          schema={optionsSyncSchema}
          node={node}
          alternativeApi={
            tpApiUrls.cron_jobs_to_log_report_training_plan_learner_progress
          }
          requestSuccessful={closeDialog}
          submitButton={
            <PrimaryButton
              icon={<Icon icon="sync" />}
              label={t1('recalculate')}
              primary
              type="submit"
            />
          }
        />
      </>
    );
  };

  render() {
    const { node } = this.props;

    return (
      <div>
        {t1('training_plan_score_last_synced')} :{' '}
        {timestampToDateString(getLodash(node, 'last_synced'), {
          showTime: true,
        })}
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <div style={{ width: '30%' }}>
              <PrimaryButton
                primary
                name="sync_progress"
                className="m-r-10"
                type="submit"
                icon={<Icon icon="sync" />}
                label={t1('sync_learners_progress')}
                onClick={showFull}
                fullWidth={false}
              />
            </div>
          )}
          renderFull={this.handleSyncProgressOnClick}
        />
        <div>
          (
          {t1(
            'this_will_recalculate_the_training_plan_learners_latest_progress',
          )}
          )
        </div>
      </div>
    );
  }
}

export default withFeatureFlags()(TPSyncer);
