import React from 'react';
import Modal from 'antd/lib/modal';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import moment from 'moment';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import datetimeFormat from './configs';
import { getTimeName } from './utils/DailyUnixTimestamp';
import Tooltip from 'antd/lib/tooltip';
import lodashGet from 'lodash.get';
import EventTime from 'components/admin/event/common/EventTime';
import EventLocation from 'components/admin/event/common/EventLocation';

class ConflictPopup extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  onResolveConflict = () => {
    const { onResolveConflict, onSwitchState } = this.props;
    if (onResolveConflict) {
      onResolveConflict();
    }

    onSwitchState();
  };

  getFooterControl = () => {
    const { onSwitchState, source } = this.props;
    const controls = [
      <Button key="cancel" type="primary" onClick={onSwitchState}>
        {t1('cancel')}
      </Button>,
    ];
    if (source === 'sessionBox') {
      controls.push(
        <Button
          key="resolveConflictTimetable"
          type="danger"
          onClick={this.onResolveConflict}
        >
          {t1('resolve_conflict')}
        </Button>,
      );
    }
    return controls;
  };

  render() {
    const {
      open,
      onSwitchState,
      conflictSessions,
      conflictEvents,
    } = this.props;
    return (
      <Modal
        title={t1('session_of_timetable_that_conflict')}
        visible={open}
        width={800}
        onCancel={onSwitchState}
        footer={this.getFooterControl()}
      >
        <Table
          dataSource={(conflictSessions || [])
            .map(getDataFromSessionToRenderTable)
            .concat((conflictEvents || []).map(getDataFromEventToRenderTable))}
          columns={columns}
        />
      </Modal>
    );
  }
}

ConflictPopup.propTypes = {
  conflictSessions: PropTypes.array,
};

export default connect()(ConflictPopup);

const getDataFromEventToRenderTable = (event) => ({
  name: lodashGet(event, 'name'),
  type: t1('event'),
  scheduled: <EventTime event={event} />,
  location: <EventLocation event={event} />,
});

const getDataFromSessionToRenderTable = (session) => ({
  name: lodashGet(session, 'name'),
  type: t1('session'),
  scheduled: (
    <div>
      <div>
        {moment(session.scheduled.date_time * 1000).format(
          datetimeFormat.DATE_FORMAT,
        )}
      </div>
      <div>
        {getTimeName(session.scheduled.start_time)} -{' '}
        {getTimeName(session.scheduled.end_time)}
      </div>
    </div>
  ),
  location: <span>{lodashGet(session, ['room', 0, 'name'])}</span>,
  class: (
    <Tooltip title={session.course && session.course.name}>
      {session.course && session.course.code}
    </Tooltip>
  ),
  teachers: (() => {
    if (!session.teachers || session.teachers.length === 0) return '';
    const result = [];
    session.teachers.map((teacher) =>
      result.push(
        <Tooltip title={`${teacher.code}`}>{`${teacher.name}; `}</Tooltip>,
      ),
    );
    return <div>{result}</div>;
  })(),
});

const columns = [
  {
    title: t1('name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t1('type'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t1('scheduled'),
    dataIndex: 'scheduled',
    key: 'scheduled',
  },
  {
    title: t1('location'),
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: t1('class'),
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: t1('teachers'),
    dataIndex: 'teachers',
    key: 'teachers',
  },
];
