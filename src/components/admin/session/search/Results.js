import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from 'routes';
import { createSelector } from 'reselect';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import isEqual from 'lodash.isequal';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { secondsToTimeString } from 'common/utils/Date';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import RaisedButton from 'components/common/mui/RaisedButton';
import { getSessionRoomName } from 'components/timetable_v2/common/sessions';

import MeetingUrl from '../common/MeetingUrl';
import RecordingViewer from '../common/Recording';
import LearningItems from '../common/LearningItems';
import LearningItemsStudentView from 'components/front-end/course/session/LearningItemsOfSession';
import CreateSessionsButton from '../new';
import CloneSessionsButton from '../new/Clone';
import Teachers from '../common/Teachers';
import EditButton from '../edit/EditButton';
import DeleteMeeting from '../common/DeleteMeeting';
import ScheduledDateTime from '../common/ScheduledDateTime';
import { canJoinToLearn, isBBB, joinStatuses } from '../utils';
import './styles.scss';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.sessions, this.props.sessions)) {
      this.onSelectChange([]);
    }
  }

  renderButtonDeleteSessions = (selectedRowKeys) => {
    const { formid, sessions } = this.props;

    if (!Array.isArray(sessions) || !sessions.length) {
      return null;
    }

    const sessionsStudied = [];
    let warning = false;
    sessions.forEach((session) => {
      if (session.status !== 'init') {
        warning = true;
      }

      if (selectedRowKeys.includes(session.id) && session.status !== 'init') {
        sessionsStudied.push(session);
      }
    });

    const label = sessionsStudied.length
      ? t1('cannot_delete_(%s_sesions_ended)', [sessionsStudied.length])
      : t1('delete_sessions');

    return (
      <DeleteItem
        ntype={'session'}
        params={{
          ids: selectedRowKeys,
        }}
        textConfirm={
          warning
            ? t1(
                'system_will_automatically_rearrange_timetables_sessions_according_to_what_will_be_deleted._' +
                  'This_action_may_cause_error_on_some_related_sessions,_therefore_discouraged_to_perform.' +
                  '_Are_you_sure_you_want_to_continue?',
              )
            : null
        }
        formid={formid}
        renderComponent={({ onClick }) => (
          <RaisedButton
            className="m-r-10"
            disabled={!selectedRowKeys.length || sessionsStudied.length}
            label={label}
            labelPosition="after"
            onClick={onClick}
            secondary
            icon={<Icon icon="remove" />}
            buttonType="danger"
          />
        )}
      />
    );
  };

  render() {
    const {
      sessions,
      hasPermUpdate,
      isStudent,
      beforeCanJoinToLearn,
      node,
      formid,
    } = this.props;
    if (!Array.isArray(sessions) || !sessions.length) {
      return (
        <CreateSessionsButton
          hasPermUpdate={hasPermUpdate}
          node={node}
          formid={formid}
        />
      );
    }

    const columns = [
      {
        title: t1('name'),
        key: 'id',
        render: (text, session) => <span>{session && session.name}</span>,
      },
      {
        title: t1('scheduled_date'),
        render: (text, session) => {
          return (
            <div className="color-by-status">
              <ScheduledDateTime session={session} />
            </div>
          );
        },
      },
      {
        title: <div>{t1('duration')} (hh:mm)</div>,
        render: (text, session) => ({
          children: (
            <div>
              {(session.learn_duration > 0 || session.learn_duration > 0) &&
                `${secondsToTimeString(
                  session.learn_duration || session.duration || 0,
                )}`}
              {session.break_time > 0 && [
                session.learn_duration > 0 || session.learn_duration > 0 ? (
                  <br />
                ) : null,
                `${t1('break_time')}: ${secondsToTimeString(
                  session.break_time,
                )}`,
              ]}
            </div>
          ),
          props: {
            className: '',
          },
        }),
      },
      {
        title: t1('location'),
        render: (text, session) => {
          return (
            <div className="color-by-status">
              {getSessionRoomName(session)}
              {isBBB(session) ? <MeetingUrl session={session} /> : null}
            </div>
          );
        },
      },
      getLodash(node, 'ntype') === 'course' && {
        title: t1('playback'),
        render: (text, session) => {
          return <RecordingViewer session={session} />;
        },
      },
      {
        title: t1('instructors'),
        render: (text, session) => {
          return <Teachers session={session} />;
        },
      },
      {
        title: t1('learning_items'),
        render: (text, session) => {
          if (!isStudent)
            return (
              <LearningItems
                session={session}
                hasPermUpdate={this.props.hasPermUpdate}
                node={node}
              />
            );
          else
            return <LearningItemsStudentView session={session} course={node} />;
        },
      },
      hasPermUpdate
        ? {
            title: t1('action'),
            render: (text, session) => ({
              children: (
                <div>
                  {session.type !== 'plan' && (
                    <DeleteMeeting session={session} />
                  )}
                  {session.type !== 'plan' && (
                    <span className="m-l-10">
                      <EditButton
                        hasPermUpdate={hasPermUpdate}
                        session={session}
                        formid={formid}
                        node={node}
                      />
                    </span>
                  )}
                  {session.type !== 'plan' && (
                    <Link
                      to={`${routes.url('node_edit', {
                        iid: session.course_iid,
                        ntype: 'course',
                      })}/session/${session.iid}/attendance`}
                      className="m-l-10"
                    >
                      <Icon
                        title={t1('manage_attendance_for_this_session')}
                        icon="attendance"
                      />
                    </Link>
                  )}
                  {session.status === 'init' && (
                    <span className="m-l-10">
                      <DeleteItem
                        title={t1('delete_session')}
                        ntype={'session'}
                        itemId={session.id}
                        formid={formid}
                        iconButton
                      />
                    </span>
                  )}
                </div>
              ),
              props: {
                className: 'text-center',
              },
            }),
          }
        : null,
    ].filter(Boolean);

    return (
      <div>
        <AntdTable
          rowKey="id"
          rowSelection={
            hasPermUpdate
              ? {
                  selectedRowKeys: this.state.selectedRowKeys || [],
                  onChange: this.onSelectChange,
                }
              : null
          }
          columns={columns}
          dataSource={sessions}
          bordered
          pagination={false}
          size="small"
          rowClassName={(session, index) => {
            const status = canJoinToLearn(session, beforeCanJoinToLearn);
            switch (status) {
              case joinStatuses.JOIN_STATUS_OK:
                return 'join-status-ok';
                break;
              case joinStatuses.JOIN_STATUS_TOO_LATE:
                return 'join-status-too-late';
                break;
              case joinStatuses.JOIN_STATUS_TOO_EARLY:
                return 'join-status-too-early';
                break;
            }
          }}
          className="session-result-container"
        />
        {hasPermUpdate && (
          <div className="m-t-30">
            {this.renderButtonDeleteSessions(this.state.selectedRowKeys)}
            <CloneSessionsButton
              hasPermUpdate={hasPermUpdate}
              node={node}
              formid={formid}
              session_ids={this.state.selectedRowKeys}
            />
            <CreateSessionsButton
              hasPermUpdate={hasPermUpdate}
              node={node}
              formid={formid}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => getLodash(state, 'domainInfo.conf.before_time_can_join_class'),
  (state) => getLodash(state, 'domainInfo.school.supported_learning_methods'),
  (state, props) => {
    const { items } = props;
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    return items
      .map((session) => {
        const item = getLodash(state, `tree.${session.iid}`) || session;
        return { ...session, item };
      })
      .filter(Boolean);
  },
  (beforeCanJoinToLearn, supportedLearningMethods, sessions) => ({
    beforeCanJoinToLearn,
    supportedLearningMethods,
    sessions,
  }),
);

export default connect(mapStateToProps)(Results);
