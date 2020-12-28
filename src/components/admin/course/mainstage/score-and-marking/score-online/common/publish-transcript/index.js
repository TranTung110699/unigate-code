import React, { Fragment } from 'react';
import routes from 'routes';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import ActionToggle from 'components/common/toggle/ActionToggle';

const actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };

class PublishTranscript extends React.Component {
  render() {
    const { node, hasPermUpdateTranscriptStatus } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className={'col-md-3'}>
            {hasPermUpdateTranscriptStatus ? (
              <ActionToggle
                readOnly={false}
                readOnlyLabelSet={actionToggleReadOnlyLabelSet}
                baseURL={routes.url('node_update', {
                  ...node,
                  step: 'transcript_status',
                })}
                label={t1('publish_transcript')}
                dataSet={actionToggleReadOnlyLabelSet}
                value={getLodash(node, 'transcript_status') || 'queued'}
                name="transcript_status"
              />
            ) : null}
          </div>
          <div className="col-md-9">
            {t1(
              'when_you_publish_score_the_gradebook_will_be_added_to_school_report',
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PublishTranscript;
