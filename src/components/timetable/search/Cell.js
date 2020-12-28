import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import { timetableActions } from 'actions/timetable';
import apiEndpoints from 'api-endpoints';
import { Tab, Tabs } from 'material-ui/Tabs';
import Avatar from 'components/common/avatar';
import { history } from 'store';
import { getIdsFromTimeslots } from '../common/timetable';
import { scopingType } from '../form-configs/new';
import CellDetail from '../forms/CellDetail';
import ChooseClasses from '../forms/ChooseClasses';
import ChooseTeachers from '../forms/ChooseTeachers';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 23/10/2017
 * */
class Cell extends React.Component {
  spanStyle = {
    marginBottom: '0px',
    display: 'flex',
    bottom: '5px',
    position: 'absolute',
  };
  spanStyle1 = { color: 'red' };
  avatarStyle = { width: 24, height: 24, fontSize: 12 };
  cell = {
    iconType: {
      fontSize: '14px',
      top: '2px',
      position: 'relative',
    },
    class: {
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getDisplayClassName = () => {
    const { data, classIid } = this.props;
    if (data && data.type === 'event') {
      return 'event';
    }
    if (classIid) {
      return !this.isDisplayForClass() ? 'new' : '';
    }

    if (!data.classes || data.classes.length === 0) {
      return 'new';
    }

    if (!data.teachers || data.teachers.length === 0) {
      return 'new';
    }
    return '';
  };

  isDisplayForClass = () => {
    const { data, classIid } = this.props;
    const classes = data.timeTable.classes;
    if (classes && classIid) {
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].iid == classIid) {
          return true;
        }
      }
    }
    return false;
  };

  getSuggestionTeachers = () => {
    const { clazz } = this.props;
    if (!clazz || !clazz.teachers || clazz.teachers.length === 0) {
      return [];
    }
    const result = [];
    for (let i = 0; i < clazz.teachers.length; i++) {
      result.push({
        name: clazz.teachers[i].name,
        data: clazz.teachers[i],
      });
    }
    return result;
  };

  onUpdateTimetable = (data, params) => {
    const { dispatch, clazz } = this.props;
    let { timeTable } = this.props.data;

    const startTime = data.start_time || timeTable.start_time;
    const endTime = data.end_time || timeTable.end_time;
    const time_slots = data.time_slots || timeTable.time_slots;
    const ids = getIdsFromTimeslots(time_slots);

    const options = {
      onSuccess: this.props.updateSessionsToClass,
      onConflict: this.props.onConflictTimeTable,
      onFail: this.showMessagesOnFail,
    };
    timeTable = {
      ...timeTable,
      start_time: startTime,
      end_time: endTime,
      time_slots: time_slots,
      time_slot_ids: ids,
    };
    dispatch(
      timetableActions.updateTimeTableRequest(
        apiEndpoints.update_node('timetable'),
        this.props.formid,
        timeTable,
        options,
      ),
    );
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  showMessagesOnFail = (response) => {
    const { dispatch } = this.props;
    const contentDialog = <p>{response.message}</p>;
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('update_timetable_fail'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  getAnotherClassesFromTimeTable = (timeTable, clazz) => {
    const classes = timeTable.classes || [];
    if (classes.length === 0) {
      return [];
    }
    if (!clazz) {
      return classes;
    }
    const result = [];
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].iid === clazz.iid || classes[i].id === clazz.id) {
        continue;
      }
      result.push(classes[i]);
    }
    return result;
  };

  showDetailOfTimetableCell = () => {
    const { isControlByKey, data, dispatch, clazz } = this.props;
    if (isControlByKey) {
      return;
    }
    const suggestionTeachers = this.getSuggestionTeachers();
    const { timeTable } = data;

    const timeNode = {
      teachers: data.teachers,
      suggestionForTeacher: suggestionTeachers,
      classes: this.getAnotherClassesFromTimeTable(timeTable, clazz),
      start_time: timeTable.start_time,
      end_time: timeTable.end_time,
      time_slots: timeTable.time_slots,
    };

    const classesNode = {
      applyingScoping: scopingType.THIS_DAY,
      classes: this.getAnotherClassesFromTimeTable(timeTable, clazz),
    };

    const teachersNode = {
      teachers: data.teachers,
      applyingScoping: scopingType.THIS_DAY,
      suggestionForTeacher: suggestionTeachers,
    };

    const dayOfWeek = timeTable.days_of_week ? timeTable.days_of_week[0] : '';

    const contentDialog = (
      <Tabs>
        <Tab label={t1('detail')}>
          <CellDetail
            node={timeNode}
            params={{
              dayOfWeek,
            }}
            onSubmit={this.onUpdateTimetable}
          />
        </Tab>
        <Tab label={t1('teachers')}>
          <ChooseTeachers
            node={teachersNode}
            params={{ timeTable, clazz, unixTime: data.timeId / 1000 }}
            onSubmit={this.onChooseTeachers}
          />
        </Tab>
        <Tab label={t1('add_class')}>
          <ChooseClasses
            node={classesNode}
            params={{ timeTable, clazz }}
            onSubmit={this.onChooseClasses}
          />
        </Tab>
      </Tabs>
    );
    let title = t1('edit_timetable');
    if (clazz) {
      title = `${t1('edit_timetable_for_class')} ${clazz.name}`;
    }
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  onChooseClasses = (data, params) => {
    const { dispatch, clazz } = this.props;
    let classes = data.classes || [];
    if (clazz) {
      classes = [
        { name: clazz.name, iid: clazz.iid, id: clazz.id },
        ...classes,
      ];
    }
    const options = {
      onSuccess: this.props.updateSessionsToClass,
      onConflict: this.props.onConflictTimeTable,
      mainClassIid: clazz ? clazz.iid : undefined,
      onFail: this.showMessagesOnFail,
    };

    dispatch(actions.handleOpenDialog({ openDialog: false }));
    setTimeout(() => {
      dispatch(
        timetableActions.updateDataOfTimeTableRequest(
          apiEndpoints.update_node('timetable', 'classes'),
          this.props.formid,
          classes,
          params.timeTable,
          data.applyingScoping,
          this.props.data.timeId / 1000,
          options,
        ),
      );
    }, 0);
  };

  onChooseTeachers = (data, params) => {
    const { dispatch, clazz } = this.props;
    const teachers = data.teachers || [];
    const options = {
      onSuccess: this.props.updateSessionsToClass,
      onConflict: this.props.onConflictTimeTable,
      mainClassIid: clazz ? clazz.iid : undefined,
      onFail: this.showMessagesOnFail,
    };

    dispatch(
      timetableActions.updateDataOfTimeTableRequest(
        apiEndpoints.update_node('timetable', 'teachers'),
        this.props.formid,
        teachers,
        params.timeTable,
        data.applyingScoping,
        this.props.data.timeId / 1000,
        options,
      ),
    );
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  render() {
    const {
      data,
      onSelect,
      dispatch,
      lastTimeOfSelectRow,
      onStartRemove,
      mode,
    } = this.props;
    let className = '';
    if (
      data &&
      data.timeTable &&
      data.timeTable.clientState &&
      lastTimeOfSelectRow &&
      lastTimeOfSelectRow === data.timeTable.clientState.lastSelectionTime
    ) {
      className = 'cell-selected';
    }

    return (
      <div>
        <div
          className={`${this.getDisplayClassName()} data-panel ${className}`}
          onClick={() => {
            if (mode === 'view') {
              return true;
            }
            if (!this.isDisplayForClass()) {
              const classes = data.timeTable.classes;
              if (!classes || classes.length === 0) {
                return;
              }
              history.push(`/admin/course/${classes[0].iid}/timetable`);
              return;
            }
            onSelect(data);
          }}
          onDoubleClick={() => {
            if (!this.isDisplayForClass()) {
              return;
            }
            if (mode === 'view') {
              return true;
            }
            this.showDetailOfTimetableCell();
          }}
        >
          <div style={this.cell.class}>
            {data.classes && data.classes.length > 0 && (
              <span>
                {
                  <i style={this.cell.iconType} className="material-icons">
                    {data.type === 'event' ? 'event' : 'class'}
                  </i>
                }
                {data.classes.map((clazz, index) => (
                  <span key={`clazz${index}-${data.id}`}>{clazz.name}</span>
                ))}
              </span>
            )}
          </div>
          <div>
            {data.teachers && data.teachers.length > 0 && (
              <span style={this.spanStyle}>
                {' '}
                {data.teachers.map((teacher, index) => (
                  <Avatar
                    style={this.avatarStyle}
                    user={teacher}
                    key={`teacher${index}-${data.id}`}
                  />
                ))}
              </span>
            )}

            {(!data.teachers || data.teachers.length === 0) &&
              data.timeTable.conflict_teachers &&
              data.timeTable.conflict_teachers.length > 0 && (
                <span style={this.spanStyle1}>
                  GV:{' '}
                  {data.timeTable.conflict_teachers.map((teacher, index) => (
                    <span key={`teacher${index}-${data.id}`}>
                      {teacher.name}
                    </span>
                  ))}
                </span>
              )}
          </div>
        </div>
        {/* { */}
        {/* (data.isNew || data.editMode) && */}
        {/* <div className="save-icon" onClick={saveNewTimeTable}> */}
        {/* <i className="mi mi-24 mi-check-circle"/> */}
        {/* </div> */}
        {/* } */}

        {/* <div className="edit-panel"> */}
        {/* <i className="mi mi-person-add" onClick={() => { */}
        {/* onStartChooseTeachers(data.id, data.teachers) */}
        {/* } */}
        {/* }/> */}
        {/* <i className="mi mi-gradient" onClick={() => { */}
        {/* onStartChooseClasses(data.id, data.classes) */}
        {/* } */}
        {/* }/> */}
        {/* <i className="mi mi-settings" */}
        {/* onClick={() => { */}
        {/* onStartSetup(data.id) */}
        {/* } */}
        {/* }/> */}
        {/* </div> */}
        {mode !== 'view' && data.type !== 'event' && this.isDisplayForClass() && (
          <i
            className="mi mi-clear"
            onClick={() => {
              onStartRemove(data);
            }}
          />
        )}
      </div>
    );
  }
}

export default connect()(Cell);
