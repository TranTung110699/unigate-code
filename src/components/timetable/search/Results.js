import React from 'react';
import ReactDOM from 'react-dom';
import { getDayOfWeek } from '../common/DayOfWeek';
import Rooms from '../rooms/Layout';
import { submit } from 'redux-form';
import { ROOM_TYPE_VIRTUAL_ROOM } from 'components/admin/session/common/constants';
import { Scrollbars } from 'react-custom-scrollbars';
import nodeActions from 'actions/node/creators';
import actions from 'actions/node/creators';
import {
  getPropertyOfObjects,
  getTimeSlotsAsString,
} from '../common/timetableUtils';
import { normalizeDateAsddmmyyy } from 'common/normalizers';
import Cell from './Cell';
import { getFloorsOfVenue, getRootVenue } from '../common/venueUtils';
import { t1 } from 'translate';
import { compareObject } from 'common';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import {
  getDateArray,
  getStartTimeOfDay,
  getWeekNumberOfYear,
} from '../common/Datetime';
import apiEndpoints from 'api-endpoints';
import ConfirmDelete from '../forms/ConfirmDelete';
import { connect } from 'react-redux';
import DialogNoHeader from 'schema-form/elements/custom-popup/DialogNoHeader';
import DetailOfDay from '../DetailOfDay';
import { getCellToDisplay } from '../common/timetable';
import timeSlots from '../common/TimeSlotsData';
import RaisedButton from 'components/common/mui/RaisedButton';
import '../stylesheet.scss';
import { timetableActions } from 'actions/timetable';
import DetailOfClass from '../search/DetailOfClass';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 07/10/2017
 * */
class TimeTable extends React.Component {
  divStyle = { width: '90px', margin: '0 auto' };

  constructor(props) {
    super(props);
    this.state = { newTimeTableData: [], teacher: [], classes: [] };
  }

  componentWillMount() {
    this.setState({ dateRange: getDateArray() });
  }

  componentDidUpdate() {
    const {
      // startTime, endTime,
      clientWidth,
    } = this.state;

    // if (startTime || endTime) {
    //   clearTimeout(window.loadInitTimetable);
    //   window.loadInitTimetable = setTimeout(this.resetDataOnView, 1000);
    // }

    const newClientWidth = document.getElementById('teacher-search-form')
      .clientWidth;
    if (newClientWidth !== clientWidth) {
      this.setState({
        clientWidth: newClientWidth,
        clientHeight: ReactDOM.findDOMNode(this.refs.timetableResult)
          .clientHeight,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!compareObject(nextProps.items, this.props.items)) {
      this.setState({ items: nextProps.items });
    }
    if (this.props.startDate) {
      this.setState({ startTime: this.props.startDate });
    }
    if (this.props.endDate) {
      this.setState({ endTime: this.props.endDate });
    }

    const { venueId, floor } = this.state;
    const { venueList } = this.props;
    let venues;
    if (!venueId) {
      venues = getRootVenue(venueList);
      if (venues && venues.length > 0) {
        this.setState({ venueId: venues[0].iid });
      }
    }

    if (!floor) {
      if (!venues) {
        venues = getRootVenue(venueList);
      }
      if (venues && venues.length > 0) {
        const floors = getFloorsOfVenue(venueList, venues[0].iid);
        if (floors && floors.length > 0) {
          this.setState({ floorId: floors[0].iid });
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    const keyCode = event.which;
    if (
      keyCode === 17 ||
      keyCode === 16 ||
      keyCode === 91 ||
      keyCode === 18 ||
      (event && (event.metaKey || event.altKey))
    ) {
      this.setState({ controlKeyIsPress: true });
    }
  };
  onKeyUp = (event) => {
    const keyCode = event.which;

    if (
      keyCode === 17 ||
      event.which === 16 ||
      keyCode === 91 ||
      keyCode === 18 ||
      (event && (event.metaKey || event.altKey))
    ) {
      this.setState({ controlKeyIsPress: false });
    }
  };

  onSelectTimeTable = (cellData) => {
    if (!cellData || !cellData.timeTable) {
      return;
    }
    let timeTable = cellData.timeTable;
    const { dispatch } = this.props;
    const formid = this.props.id;
    timeTable = {
      ...timeTable,
      clientState: {
        lastSelectionTime: new Date().getTime(),
      },
    };
    dispatch(actions.updateRowOnSearChResults(formid, timeTable.id, timeTable));
  };

  getSelectedCell = () => {
    const items = this.props.items || [];
    let lastSelectionTime = 0;
    let result;

    items.map((data, index) => {
      if (
        data.clientState &&
        data.clientState.lastSelectionTime &&
        data.clientState.lastSelectionTime > lastSelectionTime
      ) {
        lastSelectionTime = data.clientState.lastSelectionTime;
        result = data;
      }
    });
    return result;
  };

  getLastSelectionTime() {
    const items = this.props.items || [];
    let lastSelectionTime = 0;
    items.map((data, index) => {
      if (
        data.clientState &&
        data.clientState.lastSelectionTime &&
        data.clientState.lastSelectionTime > lastSelectionTime
      ) {
        lastSelectionTime = data.clientState.lastSelectionTime;
      }
    });
    return lastSelectionTime;
  }

  onSelectAvailableCell = (room, timeSlot, dayAsTimeStamp, needConfirm) => {
    const startTime = this.getStartTimeWhenClickToCell(dayAsTimeStamp);
    if (!startTime) {
      return;
    }
    if (needConfirm) {
      this.onConfirmAddScheduleToNotAllowTimeTable(
        room,
        timeSlot,
        dayAsTimeStamp,
      );
      return;
    }
    const { controlKeyIsPress } = this.state;
    const { dispatch, id, clazz } = this.props;
    let timetable = {};
    let addToExistedData = false;
    const items = this.props.items || [];
    const selectedCell = this.getSelectedCell();
    const options = {
      onSuccess: this.updateSessionsToClass,
      mainClassIid: clazz ? clazz.iid : undefined,
      onConflict: this.onConflictTimeTable,
    };

    if (
      controlKeyIsPress &&
      selectedCell &&
      room.id === selectedCell.room.id &&
      selectedCell.start_time === parseInt(dayAsTimeStamp / 1000)
    ) {
      for (let index = 0; index < items.length; index++) {
        const data = items[index];
        if (selectedCell.id == data.id) {
          const time_slots = data.time_slots || [];
          const time_slot_ids = data.time_slot_ids || [];
          time_slots.push(timeSlot);
          time_slot_ids.push(timeSlot.id);
          addToExistedData = true;
          timetable = {
            ...data,
            time_slots: [...time_slots],
            time_slot_ids: [...time_slot_ids],
          };
        }
      }
    }

    if (addToExistedData) {
      dispatch(
        timetableActions.updateTimeTableRequest(
          apiEndpoints.update_node('timetable'),
          id,
          timetable,
          options,
        ),
      );
    } else {
      let teachers = [];
      let classes = [];
      if (controlKeyIsPress && selectedCell) {
        teachers = selectedCell.teachers || [];
        classes = selectedCell.classes || [];
      }

      const { clazz } = this.props;
      const unixTimestamp = dayAsTimeStamp / 1000;
      timetable = {
        start_time: unixTimestamp,
        isNew: true,
        id: new Date().getTime(),
        end_time: unixTimestamp,
        time_slots: [timeSlot],
        time_slot_ids: [timeSlot.id],
        days_of_week: [getDayOfWeek(new Date(dayAsTimeStamp)).value],
        room: {
          ...room,
        },
        clientState: {
          lastSelectionTime: new Date().getTime(),
        },
        teachers,
        classes,
        class_iids: getPropertyOfObjects(classes, 'iid'),
        teacher_iids: getPropertyOfObjects(teachers, 'iid'),
      };
      if (clazz) {
        const timetableClass = Object.assign(
          {},
          { name: clazz.name, id: clazz.id, iid: clazz.iid },
        );
        delete timetableClass.sessions;
        timetable.classes = [timetableClass];
        timetable.class_iids = [clazz.iid];
        timetable.start_time = startTime / 1000;
        timetable.end_time =
          clazz.end_time > unixTimestamp ? clazz.end_time : unixTimestamp;
        timetable.syllabusIid = clazz.syllabus;
      }

      dispatch(
        timetableActions.createNewTimeTableRequest(
          apiEndpoints.post_new_node('timetable'),
          id,
          timetable,
          options,
        ),
      );
    }
  };

  getStartTimeWhenClickToCell = (unixTimestamp) => {
    const startOfThisDay = getStartTimeOfDay(new Date());
    const { dispatch } = this.props;

    if (unixTimestamp < startOfThisDay) {
      const contentDialog = (
        <div>
          <p>{t1('school_dates_can_not_be_created_in_the_past')}</p>
        </div>
      );

      const optionsProperties = {
        modal: true,
        handleClose: true,

        title: t1('create_timetable_fail'),
      };
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
      return false;
    }

    return unixTimestamp;
  };

  onConfirmAddScheduleToNotAllowTimeTable = (
    room,
    timeSlot,
    dayAsTimeStamp,
  ) => {
    const { dispatch } = this.props;
    const contentDialog = (
      <div>
        <div>
          Bạn đang đặt lịch học vào thời gian không có trong kế hoạch. Bạn có
          chắc chắn muốn thực hiện việc này không?
        </div>

        <div>
          <RaisedButton
            label={t1('continue_to_set_timetable')}
            onTouchTap={() => {
              this.onSelectAvailableCell(room, timeSlot, dayAsTimeStamp);
              const optionsProperties = {
                modal: true,
                openDialog: false,
                handleClose: true,
              };
              dispatch(actions.handleOpenDialog({ openDialog: false }));
            }}
            primary
          />
        </div>
      </div>
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('time_slots_not_allow'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  closeTimetableDetail = () => {
    this.setState({ openDetail: false });
  };

  viewDetailOfDay = (dayObj) => {
    const { dispatch, clazz } = this.props;
    const items = this.props.items || [];
    const rooms = this.getRoomAvailableInClass();
    const contentDialog = (
      <DetailOfDay
        day={dayObj}
        clazz={clazz}
        classIid={this.props.classIid}
        items={items}
        rooms={rooms}
        timeSlots={timeSlots}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
      width: '90%',
      title: `${t1('detail_of_schedule')}: ${dayObj.dateAsString}`,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  updateSessionsToClass = (responseResult) => {
    const { clazz, dispatch } = this.props;
    if (!clazz || !responseResult || !responseResult.sessions) {
      dispatch(actions.handleOpenDialog({ openDialog: false }));
      return;
    }
    const sessions = responseResult.sessions;
    this.resetDataOnView();
    clazz.sessions = sessions;
    dispatch(nodeActions.treeUpsertNode(clazz));
  };

  onConflictTimeTable = (timeTable, dailySchedulesConflict, options) => {
    const { dispatch } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }));
    const contentDialog = (
      <div>
        <div>Lịch học bị trùng {dailySchedulesConflict.length} buổi.</div>
        <ul>
          {dailySchedulesConflict.map((dailySchedule) => {
            const dateAsString = normalizeDateAsddmmyyy(
              dailySchedule.date * 1000,
            );
            return (
              <li key={`conflict-date-${dateAsString}`}>
                {' '}
                {dateAsString}{' '}
                {getTimeSlotsAsString(dailySchedule.timetable.time_slots)}{' '}
              </li>
            );
          })}
        </ul>
        <p>
          {t1(
            'if_you_continue_to_click_button_below_some_days_have_conflicted_will_be_ignore',
          )}
        </p>
        <div>
          <RaisedButton
            label={t1('continue_to_update')}
            onTouchTap={() => {
              this.resolveConflictSchedule(timeTable, options);
            }}
            primary
          />
        </div>
      </div>
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,
      callbacks: {
        onCloseDialog: () => {
          this.cancelOnDuplicateTimetable(timeTable);
        },
      },

      title: t1('time_schedule_are_conflict'),
    };
    setTimeout(() => {
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
    }, 1);
  };

  cancelOnDuplicateTimetable = (timetable) => {
    const { dispatch, id } = this.props;
    // dispatch(actions.deleteRowOnSearChResults(id, timetable.id));
    dispatch(submit(id));
  };

  resetDataOnView = () => {
    const { dispatch, id } = this.props;
    dispatch(submit(id));
  };

  resolveConflictSchedule = (timetable, options) => {
    const { dispatch, id, clazz } = this.props;
    if (!timetable) {
      return;
    }
    const newOptions = options || {
      onSuccess: this.updateSessionsToClass,
      mainClassIid: clazz ? clazz.iid : undefined,
      onConflict: this.onConflictTimeTable,
    };
    newOptions.allowDoUpdateIfConflict = true;

    if (timetable.isNew) {
      dispatch(
        timetableActions.createNewTimeTableRequest(
          apiEndpoints.post_new_node('timetable'),
          id,
          timetable,
          newOptions,
        ),
      );
    } else {
      dispatch(
        timetableActions.updateTimeTableRequest(
          apiEndpoints.update_node('timetable'),
          id,
          timetable,
          newOptions,
        ),
      );
    }
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  updateTimeTable = (timeTable, updateValue) => {
    if (!updateValue) {
      return;
    }

    if (updateValue.start_time) {
      timeTable = { ...timeTable, start_time: updateValue.start_time };
    }
    if (updateValue.end_time) {
      timeTable = { ...timeTable, end_time: updateValue.end_time };
    }
    if (updateValue.days_of_week && updateValue.days_of_week.length > 0) {
      timeTable = { ...timeTable, days_of_week: [...updateValue.days_of_week] };
    }
    if (updateValue.time_slots && updateValue.time_slots.length > 0) {
      timeTable = { ...timeTable, time_slots: [...updateValue.time_slots] };
    }

    return timeTable;
  };

  onDeleteTimeTable = (cellData) => {
    if (!cellData || !cellData.timeTable) {
      return;
    }
    const { timeTable } = cellData;
    const { dispatch, id, clazz } = this.props;
    const options = {
      onSuccess: this.updateSessionsToClass,
      onConflict: this.onConflictTimeTable,
      mainClassIid: clazz ? clazz.iid : undefined,
    };
    if (
      timeTable.start_time === timeTable.end_time &&
      (!timeTable.teachers || timeTable.teachers.length === 0) &&
      (!timeTable.classes || timeTable.classes.length === 0)
    ) {
      dispatch(
        timetableActions.deleteTimeTableRequest(
          apiEndpoints.delete_node('timetable'),
          id,
          timeTable,
          options,
        ),
      );
    } else {
      const confirmContent = (
        <ConfirmDelete
          onDeleteConfirmed={this.onDeleteConfirmed}
          data={cellData}
        />
      );
      this.setState({ openDetail: true, popupContent: confirmContent });
    }
  };

  onDeleteConfirmed = (data, params) => {
    const { id, dispatch, clazz } = this.props;
    const { timeTable } = params.data;
    const options = {
      onSuccess: this.updateSessionsToClass,
      onConflict: this.onConflictTimeTable,
      deleteTimeTableId: timeTable.id,
      mainClassIid: clazz ? clazz.iid : undefined,
    };
    if (params.update) {
      dispatch(
        timetableActions.updateTimeTableRequest(
          apiEndpoints.update_node('timetable'),
          id,
          params.update,
          options,
        ),
      );
    }
    if (params.new) {
      dispatch(
        timetableActions.createNewTimeTableRequest(
          apiEndpoints.post_new_node('timetable'),
          id,
          params.new,
          options,
        ),
      );
    }
    if (params.delete) {
      dispatch(
        timetableActions.deleteTimeTableRequest(
          apiEndpoints.delete_node('timetable'),
          id,
          params.delete,
          options,
        ),
      );
    }
    this.setState({ openDetail: false });
  };

  getTimeTableById = (id) => {
    const items = this.props.items || [];

    let result;
    items.map((timetable) => {
      if (timetable.id === id) {
        result = timetable;
      }
    });
    return result;
  };

  getMonthsByDates(dateRange) {
    const result = [];
    const months = [];
    const monthsObject = {};
    dateRange.map((date) => {
      let total = monthsObject[date.month];
      if (!total) {
        total = 0;
        months.push({ month: date.month, year: date.year });
      }
      total += 1;
      monthsObject[date.month] = total;
    });
    months.map((month) => {
      result.push({
        month: month.month,
        year: month.year,
        total: monthsObject[month.month],
      });
    });

    return result;
  }

  getWeeksByDates(dateRange) {
    const result = [];
    const weeks = [];
    const weeklyObjects = {};
    dateRange.map((date) => {
      const key = getWeekNumberOfYear(new Date(date.time));
      let total = weeklyObjects[key];
      if (!total) {
        total = 0;
        weeks.push({
          // week: date.week,
          week: getWeekNumberOfYear(new Date(date.time)),
          key,
          month: date.month,
          year: date.year,
        });
      }
      total += 1;
      weeklyObjects[key] = total;
    });
    weeks.map((week) => {
      result.push({
        ...week,
        total: weeklyObjects[week.key],
      });
    });
    return result;
  }

  handleOnVenueChanged = (event, index, value) => {
    this.setState({ venueId: value });
  };

  handleOnFloorChanged = (event, index, value) => {
    this.setState({ floorId: value });
  };

  isValidTimeSlot = (dayOfWeek, slotId) => {
    if (!this.props.clazz) {
      return true;
    }
    if (!this.props.clazz.slots_of_day) {
      return true;
    }
    const clazz = this.props.clazz || {};
    const slotsOfDay = clazz.slots_of_day || {};
    const slotOfDay = slotsOfDay[dayOfWeek] || [];
    return slotOfDay.includes(slotId);
  };

  getStartAndEndDate = () => {
    const { startDate, endDate, searchForm, clazz } = this.props;
    if (clazz.start_time && clazz.end_time) {
      return {
        start_time: clazz.start_time,
        end_time: clazz.end_time,
      };
    }
    // if (!clazz) {
    //   return {
    //     start_time: startDate, end_time: endDate,
    //   };
    // }
    if (!searchForm || !searchForm.values) {
      return {
        start_time: startDate,
        end_time: endDate,
      };
    }
    return {
      ...searchForm.values,
    };
  };

  // getRooms = () => {
  //   let {venueList} = this.props;
  //   return getRoomsOfVenueAndFloor(venueList, this.state.venueId, this.state.floorId);
  // }

  handleChooseRoom = () => {
    const { dispatch, venueList, clazz } = this.props;

    const contentDialog = <Rooms clazz={clazz} venues={venueList} />;
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('choose_room'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  confirmRemoveRoomOfClass = (iid) => {
    const { clazz, dispatch } = this.props;
    if (!clazz) {
      return;
    }
    dispatch(
      timetableActions.removeRoomFromClass(
        apiEndpoints.remove_room_from_class,
        clazz.iid,
        iid,
      ),
    );
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  removeRoomOfClass = (iid) => {
    const { dispatch } = this.props;
    const contentDialog = (
      <div>
        <p>Bạn có chắc chăn muốn gỡ phòng này ra khỏi lịch hiện tại không?</p>
        <RaisedButton
          className="m-l-10"
          onClick={() => {
            this.confirmRemoveRoomOfClass(iid);
          }}
          label={t1('Đồng ý')}
          primary
        />
      </div>
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('xóa phòng khỏi lịch'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  getVirtualRoom = () => {
    const { clazz } = this.props;
    const sessions = (clazz && clazz.sessions) || [];
    if (!sessions) return;

    let room = undefined;

    for (let i = 0; i < sessions.length; i++) {
      sessions[i].room_types &&
        sessions[i].room_types.map((roomType) => {
          if (roomType === ROOM_TYPE_VIRTUAL_ROOM) {
            room = {
              code: ROOM_TYPE_VIRTUAL_ROOM,
              iid: clazz.iid,
              name: t1(ROOM_TYPE_VIRTUAL_ROOM),
              room_seat: t1('45'),
              room_type: ROOM_TYPE_VIRTUAL_ROOM,
            };
          }
        });
    }
    return room;
  };

  getRoomAvailableInClass = () => {
    const { clazz } = this.props;

    const rooms = clazz && clazz.rooms ? clazz.rooms : [];
    const virtualRoom = this.getVirtualRoom();
    if (virtualRoom) {
      rooms.push(virtualRoom);
    }

    return rooms;
  };

  render() {
    const { daysOfWeekOfClass, clazz } = this.props;
    const startAndEndDate = this.getStartAndEndDate();

    const dateRange = getDateArray(
      new Date(startAndEndDate.start_time * 1000),
      new Date(startAndEndDate.end_time * 1000),
      daysOfWeekOfClass,
    );
    const tableWidth =
      dateRange.length > 7 ? `${dateRange.length * 150}px` : '100%';
    const items = this.props.items || [];
    const lastSelectionTime = this.getLastSelectionTime();
    const months = this.getMonthsByDates(dateRange);
    const weeks = this.getWeeksByDates(dateRange);

    // const floors = getFloorsOfVenue(venueList, this.state.venueId);
    const rooms = this.getRoomAvailableInClass();

    return (
      <div
        className="timetable-panel  m-t-20"
        style={{
          width: `${this.state.clientWidth}px`,
          maxHeight: `${700}px`,
          height: `${700}px`,
        }}
      >
        <div>hoangnh</div>
        <DetailOfClass clazz={this.props.clazz} />
        <Scrollbars
          renderTrackHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                right: '2px',
                top: '2px',
                left: '2px',
                borderRadius: '3px',
              }}
            />
          )}
        >
          <table
            ref="timetableResult"
            className="panel"
            style={{ width: tableWidth, marginBottom: '35px' }}
          >
            <thead>
              <tr>
                <td colSpan="2" rowSpan="2" className="width200px">
                  Times
                </td>
                <td
                  colSpan="1"
                  rowSpan="3"
                  className="cursor-pointer width100px"
                  onClick={this.handleChooseRoom}
                >
                  Rooms
                  <i className="mi mi-edit" />
                </td>
              </tr>
              <tr>
                {weeks &&
                  weeks.map((week) => (
                    <td colSpan={week.total} key={`month-${week.key}`}>
                      Tuần {`${week.week} (${week.month}/${week.year})`}
                    </td>
                  ))}
              </tr>
              <tr>
                <td className="width60px">Start</td>
                <td className="width60px">End</td>
                {dateRange &&
                  dateRange.map((date) => (
                    <td
                      className={`view-day-detail ${
                        !date.isAllowByDefault ? 'disabled' : ''
                      }`}
                      key={`date-t-${date.dateAsString}`}
                    >
                      <div
                        style={this.divStyle}
                        className="view-day-detail"
                        onClick={() => {
                          this.viewDetailOfDay(date);
                        }}
                      >{`${date.label} ${date.day}`}</div>
                    </td>
                  ))}
              </tr>
            </thead>

            {rooms.map((room) => {
              const timeSlotsView = [];
              let startNewRoom = true;
              const timeSlotsLength = timeSlots.length;
              for (let i = 0; i < timeSlotsLength; i++) {
                timeSlotsView.push(
                  <tr key={`row-${room.id}-${i}-${i}`}>
                    <td className="fix-height">
                      {timeSlots[i].time_from}
                      <span />
                    </td>
                    <td className="fix-height">
                      {timeSlots[i].time_to}
                      <span />
                    </td>
                    {startNewRoom && (
                      <td rowSpan={timeSlotsLength}>
                        <div>
                          {room.name}
                          <i
                            onClick={() => {
                              this.removeRoomOfClass(room.iid);
                            }}
                            className="mi mi-delete cursor-pointer"
                          />
                        </div>
                        <div>{room.room_type}</div>
                        <div>{`${
                          room.room_seat ? `${room.room_seat}chỗ` : ''
                        }`}</div>
                        <div>{`${
                          room.room_size ? `${room.room_size}m2` : ''
                        }`}</div>
                      </td>
                    )}

                    {dateRange &&
                      dateRange.map((date, index) => {
                        const cellData = getCellToDisplay(
                          items,
                          room,
                          date.time,
                          timeSlots[i],
                        );
                        if (
                          !cellData ||
                          (cellData &&
                            cellData.rowSpan !== -1 &&
                            cellData.roomId !== room.id)
                        ) {
                          return (
                            <td
                              className={`${
                                !date.isAllowByDefault ||
                                !this.isValidTimeSlot(
                                  date.value,
                                  timeSlots[i].id,
                                )
                                  ? 'disabled cursor-pointer'
                                  : 'cursor-pointer'
                              }`}
                              key={`date-cell-${index}-${date.dateAsString}`}
                              title={`${timeSlots[i].name}: ${
                                timeSlots[i].time_from
                              } - ${timeSlots[i].time_from} (${t1('room')}: ${
                                room.name
                              } ${t1('date')} ${date.label} ${date.day})`}
                              onClick={() => {
                                this.onSelectAvailableCell(
                                  room,
                                  timeSlots[i],
                                  date.time,
                                  !date.isAllowByDefault ||
                                    !this.isValidTimeSlot(
                                      date.value,
                                      timeSlots[i].id,
                                    ),
                                );
                              }}
                            />
                          );
                        }

                        if (cellData.rowSpan !== -1) {
                          return (
                            <td
                              rowSpan={cellData.rowSpan}
                              className="cursor-pointer"
                              key={`date-cell-${index}-${date.dateAsString}`}
                            >
                              <Cell
                                classIid={this.props.classIid}
                                onSelect={this.onSelectTimeTable}
                                data={cellData}
                                formid={this.props.id}
                                onConflictTimeTable={this.onConflictTimeTable}
                                updateSessionsToClass={
                                  this.updateSessionsToClass
                                }
                                clazz={this.props.clazz}
                                isControlByKey={this.state.controlKeyIsPress}
                                lastTimeOfSelectRow={lastSelectionTime}
                                onStartRemove={this.onDeleteTimeTable}
                              />
                            </td>
                          );
                        }
                      })}
                  </tr>,
                );
                startNewRoom = false;
              }
              return (
                <tbody key={`table-timetable-body-${room.iid}`}>
                  {timeSlotsView.map((item) => item)}
                </tbody>
              );
            })}
          </table>
        </Scrollbars>
        <DialogNoHeader
          autoScrollBodyContent
          className="timetable-panel-detail"
          closeOn={this.closeTimetableDetail}
          open={this.state.openDetail}
        >
          <div className="timetable-panel-popup">{this.state.popupContent}</div>
        </DialogNoHeader>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let sessions = [];
  if (props.clazz) {
    sessions = props.clazz.sessions || [];
  }
  return {
    venueList: state.dataApiResults.venueList || [],
    searchForm: state.form[props.id],
    sessions,
  };
};

export default connect(mapStateToProps)(TimeTable);
