import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import Icon from 'components/common/Icon/index';
// import FormCreateSession from './Create';
import apiUrls from '../endpoints/index';
import Request from 'common/network/http/Request';
import { canJoinToLearn, isSessionScheduled, joinStatuses } from '../utils';
import lGet from 'lodash.get';
import AntButton from 'components/common/primary-button';

class MeetingUrl extends Component {
  createBBBLink = (sessionIid) => {
    const params = {
      session_iid: sessionIid,
      is_course_admin: 1,
    };
    const { dispatch } = this.props;

    Request.post(apiUrls.join_class_by_session, params).then((res) => {
      if (res.success) {
        window.open(res.result, '_blank');
        // const contentDialog = (
        //   <div>
        //     {t1('click_the_following_link_to_')}
        //     <a href={res.result} target="_blank">
        //       {res.result}
        //     </a>
        //   </div>
        // );
        //
        // const optionsProperties = {
        //   handleClose: true,
        //
        //   modal: true,
        //   title: t1('class_session_url'),
        // };
        // dispatch(
        //   actions.handleOpenDialog({ contentDialog, optionsProperties }),
        // );
      } else alert(t1('get_virtual_class_failed'));
    });
  };

  render() {
    const { session, beforeTimeCanJoinClass } = this.props;

    if (!isSessionScheduled(session)) {
      return <span>{t1('not_scheduled')}</span>;
    }

    const status = canJoinToLearn(session, beforeTimeCanJoinClass);

    return (
      <div>
        {status === joinStatuses.JOIN_STATUS_OK && (
          <div>
            {/*{session.my_meeting_url ? (
              <a href={session.my_meeting_url} target={'_blank'}>
                {' '}
                {t1('join_link')}
              </a>
            ) : null}*/}

            <div>
              <AntButton
                icon="link"
                onClick={() => {
                  this.createBBBLink(session.iid);
                }}
                title={t1('get_new_link_to_join')}
                label={t1('join')}
                type="primary"
                size="small"
                className="m-t-5"
              />
            </div>
          </div>
        )}

        {status === joinStatuses.JOIN_STATUS_TOO_EARLY && (
          <div className="text-muted">
            {t1('too_early_to_join')}.{' '}
            <span
              title={t1(
                'class_opens_%d_minutes_before_starting',
                session.pre_class_time || beforeTimeCanJoinClass,
              )}
            >
              <Icon icon="help" />
            </span>
          </div>
        )}

        {status === joinStatuses.JOIN_STATUS_TOO_LATE && (
          <div>
            <span>{t1('time_over')}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    beforeTimeCanJoinClass: lGet(
      state,
      'domainInfo.conf.before_time_can_join_class',
    ),
  };
};

export default connect(mapStateToProps)(MeetingUrl);
