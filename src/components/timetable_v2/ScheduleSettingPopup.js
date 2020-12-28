/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Select from 'antd/lib/select';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/modal/style';
import 'antd/lib/drawer/style';
import 'antd/lib/time-picker/style';
import 'antd/lib/date-picker/style';

import { t, t1 } from 'translate';
import timetableAction from 'actions/timetable/TimetableV2';
import timeTableConfig from './configs';
import ConflictPopup from './ConflictPopup';
import { daysOfWeek } from './utils/DateUtils';
import { getTimeFromName, getTimeName } from './utils/DailyUnixTimestamp';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

class SchedulePopup extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openConflictPopup: false,
    };
  }

  getNewTimetable = () => {
    const { course, room_iid } = this.props;

    return {
      class_iids: [course.iid],
      room_iid,
    };
  };

  onSaveTimetableSettingEvent = () => {
    this.saveTimetableSetting();
  };

  saveTimetableSetting = (autoResolveConflict) => {
    const { course } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let timetable = this.props.timetable || this.getNewTimetable();
        timetable = {
          ...timetable,
          room_iid: values.room_iid || timetable.room_iid,
          start_date: values.apply_date_range[0].unix(),
          id: timetable.id,
          course_iid: course.iid,
          end_date: values.apply_date_range[1].unix(),
          start_time: getTimeFromName(
            values.start_time.format(timeTableConfig.TIME_FORMAT),
          ),
          // end_time: getTimeFromName(values.end_time.format(timeTableConfig.TIME_FORMAT)),
          days_of_week: values.days_of_week,
        };
        this.requestNewTimetable(timetable, autoResolveConflict);
      }
    });
  };

  requestNewTimetable = async (values, autoResolveConflict) => {
    const { onSwitchState, dispatch, course } = this.props;
    dispatch(
      timetableAction.upsertTimetable(values, {
        course,
        auto_resolve_conflict: autoResolveConflict,
        onConflictTimetable: this.onConflictTimetable,
      }),
    );
    if (!autoResolveConflict) {
      onSwitchState();
    }
  };

  onConflictTimetable = (conflictSessions, conflictEvents) => {
    this.setState({
      conflictSessions,
      conflictEvents,
      openConflictPopup: true,
    });
  };

  switchStateOfConflictPopup = () => {
    this.setState({ openConflictPopup: !this.state.openConflictPopup });
  };

  getDefaultStartDateAndEndDate = () => {
    let { start_date, end_date, selectedDate } = this.props;
    const course = this.props.course || {};

    if (!start_date && !end_date) {
      const courseEndDate = course.end_date
        ? course.end_date * 1000
        : undefined;
      end_date = courseEndDate || selectedDate;
      return [
        moment(
          moment(selectedDate).format(timeTableConfig.DATE_FORMAT),
          timeTableConfig.DATE_FORMAT,
        ),
        moment(
          moment(end_date).format(timeTableConfig.DATE_FORMAT),
          timeTableConfig.DATE_FORMAT,
        ),
      ];
    }

    return [
      moment(
        moment(start_date * 1000).format(timeTableConfig.DATE_FORMAT),
        timeTableConfig.DATE_FORMAT,
      ),
      moment(
        moment(end_date * 1000).format(timeTableConfig.DATE_FORMAT),
        timeTableConfig.DATE_FORMAT,
      ),
    ];
  };

  getDailyNames = () => {
    const { selectedDate, days_of_week, timetable } = this.props;
    let days = [];
    let dayNames = '';
    if (days_of_week) {
      days = days_of_week;
    } else if (timetable && timetable.days_of_week) {
      days = timetable.days_of_week;
    } else if (selectedDate) {
      days = [selectedDate.getDay()];
    }
    if (days.length === 0) {
      return '';
    }
    dayNames = days.reduce(
      (accumulator, day) =>
        `${accumulator + daysOfWeek[parseInt(day, 10)].label}, `,
      dayNames,
    );

    return `${dayNames.substring(0, dayNames.length - 2)} ${t('weekly')}`;
  };

  getRoomOfClassOptions = () => {
    const course = this.props.course || {};
    const rooms = course.rooms || [];
    const buildings = course.campuses || [];
    const result = rooms.map((room) => {
      const building = this.getBuildingByRoom(room, buildings);

      return (
        <Option key={room.iid} value={room.iid}>
          {room.name} - {t1(room.room_type)}
          {building
            ? ` (${building.name} ${
                room.floor_number
                  ? ` - ${t1('floor')}: ${room.floor_number}`
                  : ''
              })`
            : ''}
        </Option>
      );
    });

    return result;
  };

  getBuildingByRoom = (room, buildings) => {
    if (!room || !room.parent_iid || !buildings) {
      return null;
    }

    return (
      buildings.find((building) => building.iid === room.parent_iid) || null
    );
  };

  getDaysOfWeekOptions = (input) => {
    const clonedDaysOfWeek = JSON.parse(JSON.stringify(input));
    clonedDaysOfWeek.length = Object.keys(clonedDaysOfWeek).length;

    return Array.from(clonedDaysOfWeek).map((day, index) => ({
      label: day.label,
      value: index,
    }));
  };

  getSelectedDaysOfWeek(props) {
    const { selectedDate, days_of_week } = props;

    return days_of_week || (selectedDate ? [selectedDate.getDay()] : []);
  }

  render() {
    const {
      open,
      onSwitchState,
      start_time,
      room_iid,
      allowEditMode,
      form: { getFieldDecorator },
    } = this.props;
    const { openConflictPopup, conflictSessions, conflictEvents } = this.state;
    const dayNames = this.getDailyNames();
    const roomOptions = this.getRoomOfClassOptions();
    const daysOfWeekOptions = this.getDaysOfWeekOptions(daysOfWeek);
    const editable = allowEditMode || this.props.editable;

    return (
      <div>
        <Modal
          title={dayNames}
          visible={open}
          onCancel={onSwitchState}
          footer={[
            <Button
              disabled={!editable}
              key="submit"
              type="primary"
              onClick={this.onSaveTimetableSettingEvent}
            >
              {t1('save')}
            </Button>,
          ]}
        >
          <Form>
            <Row gutter={8}>
              <Col span={24}>
                <b>
                  <i>{t1('choose_a_room')}</i>
                </b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('room_iid', {
                    rules: [
                      { required: true, message: t1('room_is_required') },
                    ],
                    initialValue: room_iid,
                  })(
                    <Select
                      filterOption={false}
                      style={{ width: '100%' }}
                      disabled={!editable}
                    >
                      {roomOptions}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <b>
                  <i>{t1('date_range')}</i>
                </b>
              </Col>
              <Col span={20}>
                <FormItem>
                  {getFieldDecorator('apply_date_range', {
                    rules: [
                      { required: true, message: t1('date_range_is_required') },
                    ],
                    initialValue: this.getDefaultStartDateAndEndDate(),
                  })(
                    <RangePicker
                      disabled={!editable}
                      style={{ width: '100%' }}
                      format={timeTableConfig.DATE_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={4}>
                <FormItem>
                  {getFieldDecorator('start_time', {
                    rules: [
                      { required: true, message: t1('time_from_is_required') },
                    ],
                    initialValue: moment(
                      getTimeName(start_time),
                      timeTableConfig.TIME_FORMAT,
                    ),
                  })(
                    <TimePicker
                      disabled={!editable}
                      minuteStep={1}
                      style={{ width: '100%' }}
                      format={timeTableConfig.TIME_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <b>
                  <i>{t1('days_of_week')}</i>
                </b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('days_of_week', {
                    rules: [
                      {
                        required: true,
                        message: t1('days_of_week_is_required'),
                      },
                    ],
                    initialValue: this.getSelectedDaysOfWeek(this.props),
                  })(
                    <CheckboxGroup
                      disabled={!editable}
                      options={daysOfWeekOptions}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
        <ConflictPopup
          onSwitchState={this.switchStateOfConflictPopup}
          onResolveConflict={() => this.saveTimetableSetting(true)}
          open={openConflictPopup}
          source="sessionBox"
          conflictSessions={conflictSessions}
          conflictEvents={conflictEvents}
        />
      </div>
    );
  }
}

SchedulePopup.propTypes = {
  open: PropTypes.bool,
  onSwitchState: PropTypes.func,
  selectedDate: PropTypes.objectOf(PropTypes.any),
  start_time: PropTypes.number,
  days_of_week: PropTypes.array,
  end_time: PropTypes.number,
  start_date: PropTypes.number,
  end_date: PropTypes.number,
};

export default connect()(Form.create()(SchedulePopup));
