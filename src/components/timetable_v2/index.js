import React from 'react';
import Setting from './common/settings';
import SessionViewer from './common/sessions';
import { getParams } from 'common';
import Form from 'antd/lib/form';
import { t1 } from 'translate';
import Checkbox from 'antd/lib/checkbox';
import Icon from 'antd/lib/icon';
import 'antd/lib/checkbox/style';
import { getDataByIid, getDataByIids } from './utils/index';
import DatePicker from 'antd/lib/date-picker';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import { Today } from './utils/DailyUnixTimestamp';
import {
  getThisMondayOfWeekByUnixTimestamp,
  incrementDayByTimeStamp,
} from './utils/DateUtils';
import TimetableDrawer from './TimetableDrawer';
import nodeActions from 'actions/node/creators';
import ScheduleSettingPopup from './ScheduleSettingPopup';
import timetableAction from 'actions/timetable/TimetableV2';
import './stylesheet.scss';
import 'antd/lib/button/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/icon/style';
import datetimeFormat from './configs';
import moment from 'moment';
import Select from 'antd/lib/select/index';
import { ROOM_TYPE_VIRTUAL_ROOM } from '../admin/session/common/constants';

const Option = Select.Option;
const FormItem = Form.Item;

class Timetable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { openTimeSlot: false, openSetting: false, showAll: true };
  }

  componentWillMount() {
    const course = this.props.course || {};
    window.cellsFilledData = [];
    this.getClassInfo();
    if (course.start_date && course.end_date) {
      this.props.dispatch(
        timetableAction.getTimetables({
          start_date: course.start_date,
          end_date: course.end_date,
          room_iids: course.room_iids,
        }),
      );
      this.getSessions();
    }
  }

  componentWillReceiveProps(nextProps) {
    const courseNext = nextProps.course || {};
    const course = this.props.course || {};
    if (
      courseNext.start_date &&
      courseNext.end_date &&
      (courseNext.start_date !== course.start_date ||
        courseNext.end_date !== course.end_date)
    ) {
      this.props.dispatch(
        timetableAction.getTimetables({
          start_date: courseNext.start_date,
          end_date: courseNext.end_date,
          room_iids: courseNext.room_iids,
        }),
      );
      this.getSessions(nextProps);
    }
  }

  getClassInfo = (nextProps) => {
    const props = nextProps || this.props;

    let course_iid = this.getCourseIid(nextProps);

    if (!course_iid) {
      return;
    }
    this.setState({ course_iid });
    const { dispatch } = props;
    dispatch(
      nodeActions.fetchNode({
        iid: course_iid,
        ntype: 'course',
        depth: 2,
        is_timetable: true,
      }),
    );
  };

  getCourseIid = (nextProps) => {
    const props = nextProps || this.props;

    let course_iid = getParams(props).course_iid;
    if (!course_iid) {
      course_iid = props.course_iid;
    }

    return course_iid;
  };

  getSessions = (nextProps) => {
    const props = nextProps || this.props;
    const course_iid = this.getCourseIid(nextProps);

    if (course_iid) {
      this.setState({ course_iid });
      props.dispatch(timetableAction.getSessions({ course_iid }));
    }
  };

  switchStateOfSchedulePopup = () => {
    const { openTimeSlot } = this.state;
    this.setState({ openTimeSlot: !openTimeSlot });
  };

  onCellClick = (selectedDate, selectedTimeslot) => {
    if (selectedDate instanceof Date) {
      this.setState({
        selectedDate,
        selectedTimeslot,
        lastCellClick: new Date().getTime(),
      });
    }
    this.switchStateOfSchedulePopup();
  };

  switchStateOfSetting = (status) => {
    const state = status === undefined ? !this.state.openSetting : status;
    this.setState({ openSetting: state });
  };
  switchStateOfSessionViewer = (status) => {
    const state = status === undefined ? !this.state.openSessionViewer : status;
    this.setState({ openSessionViewer: state });
  };

  viewAllTheTime = (e) => {
    this.setState({ showAll: !this.state.showAll });
  };

  getTimeFrameToView = () => {
    const course = this.props.course || {};
    const showAll = this.props.form.getFieldValue('showAll');
    if (showAll) {
      return { start_date: course.start_date, end_date: course.end_date };
    }
    const todayUnix = Today().getTime() / 1000;
    let dateToView =
      !course.start_date || todayUnix > course.start_date
        ? todayUnix
        : course.start_date;
    const startDateUnix = getThisMondayOfWeekByUnixTimestamp(dateToView);
    const endDateUnix =
      incrementDayByTimeStamp(startDateUnix, +6).getTime() / 1000;
    return { start_date: startDateUnix, end_date: endDateUnix };
  };

  getRoomOfClassOptions = () => {
    const course = this.getCourseWithVitureRooms();
    const rooms = course.rooms || [];

    return rooms.map((room) => (
      <Option key={room.iid} value={room.iid}>
        {room.name} - {t1(room.room_type)}
      </Option>
    ));
  };

  backwardTo7ViewDates = () => {
    this.incrementDateToView(-7);
  };

  gotoNext7ViewDates = () => {
    this.incrementDateToView(7);
  };

  incrementDateToView = (day) => {
    const course = this.props.course || {};
    this.props.form.validateFields((err, values) => {
      this.props.form.setFieldsValue({
        start_date: values.start_date.add(day, 'days'),
        end_date: values.end_date.add(day, 'days'),
      });
      const lastUpdateTimetable = this.props.lastUpdateTimetable || '';
      this.setState({
        lastUpdateTimetable: lastUpdateTimetable + new Date().getTime(),
      });
    });
  };

  getViewerData = () => {
    let values = {};
    const course = this.props.course || {};
    this.props.form.validateFields((err, vals) => {
      values = {
        ...vals,
        start_date: vals.start_date && vals.start_date.unix(),
        end_date: vals.end_date && vals.end_date.unix(),
      };

      if (vals.showAll) {
        values = {
          ...vals,
          start_date: course.start_date || values.start_date,
          end_date: course.end_date || values.end_date,
        };
      }
    });

    return values;
  };

  getVirtualRoom = () => {
    const course = this.props.course || {};
    const { sessions } = this.props;
    if (!sessions || !course.iid) return;
    let room = null;
    for (let i = 0; i < sessions.length; i++) {
      sessions[i].room_types &&
        sessions[i].room_types.map((roomType) => {
          if (roomType === ROOM_TYPE_VIRTUAL_ROOM) {
            room = {
              code: ROOM_TYPE_VIRTUAL_ROOM,
              iid: parseInt(course.iid),
              name: t1(ROOM_TYPE_VIRTUAL_ROOM),
              room_seat: t1('45'),
              room_type: ROOM_TYPE_VIRTUAL_ROOM,
            };
          }
        });
    }
    return room;
  };

  getCourseWithVitureRooms = () => {
    const virtualRoom = this.getVirtualRoom();
    let course = this.props.course || {};
    if (!virtualRoom) {
      return course;
    }

    let rooms = course.rooms || [];
    if (getDataByIid(rooms, virtualRoom.iid)) {
      return course;
    }
    let room_iids = course.room_iids || [];
    room_iids.push(virtualRoom.iid);
    rooms.push(virtualRoom);

    return { ...course, room_iids, rooms };
  };

  render() {
    const { openTimeSlot, selectedDate } = this.state;
    const { getFieldDecorator } = this.props.form;
    const selectedTimeslot = this.state.selectedTimeslot || {};
    const { timetables, sessions } = this.props;
    const lastUpdateTimetable =
      this.state.lastUpdateTimetable || this.props.lastUpdateTimetable;
    const course = this.getCourseWithVitureRooms();
    const room_iids = course.room_iids || [];
    const { start_date, end_date } = this.getTimeFrameToView();
    let viewConfigs = this.getViewerData();
    viewConfigs = {
      ...viewConfigs,
      rooms: getDataByIids(course.rooms, viewConfigs.room_iids),
    };
    if (!viewConfigs.start_date) {
      viewConfigs.start_date = start_date;
      viewConfigs.end_date = end_date;
    }
    return (
      <div className={`ui-timetable-ve-panel`}>
        <div className="header-of-timetable">
          <div className="left">
            <Form className="viewer-form">
              <FormItem className="control-item-tt">
                {getFieldDecorator('room_iids', {
                  initialValue: room_iids.map((iid) => parseInt(iid)),
                })(
                  <Select
                    placeholder={t1('choose_rooms_want_to_display')}
                    style={{ minWidth: '200px' }}
                    mode="multiple"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                  >
                    {this.getRoomOfClassOptions()}
                  </Select>,
                )}
              </FormItem>

              {!viewConfigs.showAll && [
                <FormItem key="startDateControl" className="control-item-tt">
                  {getFieldDecorator('start_date', {
                    rules: [],
                    initialValue: moment(start_date * 1000),
                  })(
                    <DatePicker
                      style={{ width: '120px' }}
                      format={datetimeFormat.DATE_FORMAT}
                    />,
                  )}
                </FormItem>,
                <FormItem key="endDateControl" className="control-item-tt">
                  {getFieldDecorator('end_date', {
                    rules: [],
                    initialValue: moment(end_date * 1000),
                  })(
                    <DatePicker
                      style={{ width: '120px' }}
                      format={datetimeFormat.DATE_FORMAT}
                    />,
                  )}
                </FormItem>,
                <div key="date-viewer-control">
                  <Icon
                    className="icon-date"
                    size="large"
                    onClick={this.backwardTo7ViewDates}
                    type="left-circle"
                    theme="outlined"
                  />
                  <Icon
                    className="icon-date"
                    size="large"
                    onClick={this.gotoNext7ViewDates}
                    type="right-circle"
                    theme="outlined"
                  />
                </div>,
              ]}

              <FormItem className="control-item-tt">
                {getFieldDecorator('showAll', {
                  rules: [],
                  initialValue: true,
                })(
                  <Checkbox
                    checked={this.state.showAll}
                    onChange={this.viewAllTheTime}
                  >
                    {t1('view_all_the_time')}
                  </Checkbox>,
                )}
              </FormItem>
            </Form>
          </div>
          <div>
            <Button
              className="item-icon p-0"
              shape="circle"
              icon="snippets"
              onClick={this.switchStateOfSessionViewer}
            />
            <Button
              className="item-icon p-0"
              shape="circle"
              icon="setting"
              onClick={this.switchStateOfSetting}
            />
          </div>
        </div>
        <Setting
          open={this.state.openSetting}
          onRequestClassInfo={this.getClassInfo}
          onSwitchState={this.switchStateOfSetting}
          course={course}
        />
        <SessionViewer
          open={this.state.openSessionViewer}
          sessions={sessions}
          onRequestClassInfo={this.getClassInfo}
          onSwitchState={this.switchStateOfSessionViewer}
          course={course}
        />
        <TimetableDrawer
          viewerConfigs={viewConfigs}
          timetables={[...timetables]}
          lastUpdateTimetable={lastUpdateTimetable}
          rooms={course.rooms}
          sessions={sessions}
          settingSwitch={this.switchStateOfSetting}
          onCellClick={this.onCellClick}
          course={course}
        />

        <div key={this.state.lastCellClick || 'scheduleSetting'}>
          <ScheduleSettingPopup
            selectedDate={selectedDate}
            start_time={selectedTimeslot.start_time}
            end_time={selectedTimeslot.end_time}
            room_iid={selectedTimeslot.room && selectedTimeslot.room.iid}
            open={openTimeSlot}
            course={course}
            allowEditMode={true}
            onSwitchState={this.onCellClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let course;

  let course_iid = getParams(props).course_iid;
  if (!course_iid) {
    course_iid = props.course_iid;
  }

  if (course_iid) {
    course = state.tree[course_iid];
  }
  const timetableV2 = state.timetableV2 || {};
  const timetables = timetableV2.timetables;
  const sessionsOfCourse = timetableV2.sessionsOfCourse || {};

  return {
    course,
    timetables: state.timetableV2.timetables || [],
    lastUpdateTimetable: state.timetableV2.lastUpdateTimetable,
    sessions: sessionsOfCourse[course_iid],
  };
};

export default connect(mapStateToProps)(Form.create()(Timetable));
