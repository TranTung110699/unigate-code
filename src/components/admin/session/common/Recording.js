import React, { Component } from 'react';
import { t, t1 } from 'translate/index';
import Icon from 'components/common/Icon/index';
import { canJoinToLearn, isSessionScheduled, joinStatuses } from '../utils';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import apiUrls from '../endpoints/index';
import Request from 'common/network/http/Request';
import { timestampToDateString } from 'common/utils/Date';
import actions from 'actions/node/creators';
import AntButton from 'antd/lib/button';

class SessionRecordingViewer extends Component {
  getRecording = (sessionIid) => {
    const params = {
      session_iid: sessionIid,
      is_course_admin: 1,
    };
    const { dispatch } = this.props;

    Request.post(apiUrls.get_session_recording, params).then((res) => {
      let contentDialog;
      if (res.success && Array.isArray(res.result) && res.result.length) {
        contentDialog = (
          <div>
            {res.result.map((recording, idx) => {
              return (
                <div key={recording.recordID}>
                  <a
                    href={lodashGet(recording, 'playback.format.url')}
                    target="_blank"
                  >
                    #{idx + 1}. <b>{lodashGet(recording, 'participants')}</b>{' '}
                    {t1('participants')}
                    <span className="m-l-20">
                      {timestampToDateString(
                        Math.floor(lodashGet(recording, 'startTime') / 1000),
                        { showTime: true },
                      )}{' '}
                      -{' '}
                      {timestampToDateString(
                        Math.floor(lodashGet(recording, 'endTime') / 1000),
                        { showTime: true },
                      )}{' '}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        );
      } else {
        contentDialog = (
          <div>{t1('no_recording_rendered_yet_please_wait_a_while')}</div>
        );
      }

      const optionsProperties = {
        handleClose: true,

        modal: true,
        title: t1('playback_session_recordings'),
      };
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
    });
  };

  render() {
    const { session, beforeTimeCanJoinClass } = this.props;

    if (!session.enable_recording || !isSessionScheduled(session))
      return <span>{t('recording_disabled')}</span>;

    const status = canJoinToLearn(session, beforeTimeCanJoinClass);

    // // playback is only available once it's finished
    if (status == joinStatuses.JOIN_STATUS_TOO_EARLY) {
      return <span>N/A</span>;
    }

    return (
      <AntButton
        onClick={() => {
          this.getRecording(session.iid);
        }}
        icon="play-circle"
        type="dashed"
      >
        {t1('view')} (
        {session.recordings && session.recordings.length
          ? session.recordings.length
          : 0}
        )
      </AntButton>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    beforeTimeCanJoinClass: lodashGet(
      state,
      'domainInfo.conf.before_time_can_join_class',
    ),
  };
};

export default connect(mapStateToProps)(SessionRecordingViewer);
