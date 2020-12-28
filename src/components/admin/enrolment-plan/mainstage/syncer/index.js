import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';

import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import optionsSyncSchema from './sync-form-schema';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';

const EpProgressSyncer = ({ node }) => {
  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <div className="">
          {t1('enrolment_plan_score_last_synced')} :{' '}
          {timestampToDateString(lodashGet(node, 'last_synced'), {
            showTime: true,
          })}
          <div>
            <FlatButton
              primary
              name="sync_progress"
              type="submit"
              icon={<Icon icon="sync" />}
              label={`${t1('sync_progress')}`}
              onClick={showFull}
            />
            <br />(
            {t1(
              'if_you_do_not_see_latest_progress,_click_the_button_to_sync_latest_progress',
            )}
            )
          </div>
        </div>
      )}
      renderFull={({ closeDialog }) => (
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
            <div>
              <div>
                ({' '}
                {t1(
                  'you_may_have_to_wait_a_while_before_the_progress_gets_fully_synchronized',
                )}{' '}
                )
              </div>
              <RaisedButton
                icon={<Icon icon="sync" />}
                label={t1('sync')}
                primary
                type="submit"
              />
            </div>
          }
        />
      )}
    />
  );
};

export default EpProgressSyncer;
