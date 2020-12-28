import React from 'react';
import { connect } from 'react-redux';
import { t3, t1 } from 'translate';
import { submitExamErrors } from 'common/learn/exercise';
import Warning from 'components/common/Warning';
import NetworkAvailability from 'components/common/detect-network-availability';
import DownloadReduxLog from './DownloadReduxLog';
import RetrySubmit from './RetrySubmit';

class SubmitFailedDialog extends React.Component {
  render() {
    const { submitError } = this.props;
    return (
      <div className="whitebox">
        <Warning>
          <h1>{t3('exam_submission_failed')}</h1>
          <b>{t1('submission_error')}</b>:{' '}
          {submitError == submitExamErrors.OFFLINE && (
            <span>{t1('computer_network_is_offline')}</span>
          )}
          {submitError == submitExamErrors.FAILED && (
            <span>{t1('server_could_not_save_the_result')}</span>
          )}
        </Warning>
        {submitError == submitExamErrors.OFFLINE && (
          <div>
            <span>{t1('network_status')}</span>:{' '}
            <NetworkAvailability showOnlineStatus />
          </div>
        )}

        <RetrySubmit {...this.props} />

        <hr />
        <div>
          <div>
            {t1(
              'in_case_you_cannot_submit_the_exam,_download_the_log_file_below_and_send_the_file_to_your_contest_organizer',
            )}
          </div>
          <DownloadReduxLog />
        </div>
      </div>
    );
  }
}

export default connect()(SubmitFailedDialog);
