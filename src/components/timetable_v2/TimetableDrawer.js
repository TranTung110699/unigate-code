import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import Grid from 'react-virtualized/dist/es/Grid';
import ScrollSync from 'react-virtualized/dist/es/ScrollSync';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import ScheduleOfSessionBox from './ScheduleOfSessionBox';
import EventBox from './EventBox';
import {
  generateTimeslotOfCourseForRooms,
  Today,
} from './utils/DailyUnixTimestamp';
import { getCellsFromTimetables, isCellForEvent } from './utils/TimetableUtils';
import {
  getAllTheDayBetweenUnixTimestamp,
  getDayNameConfigs,
  incrementDayByTimeStamp,
} from './utils/DateUtils';
import { getTimestampTheStartADay } from 'common/utils/Date';

class TimetableDrawer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...gridConfigs,
      readyToDraw: false,
    };
  }

  componentDidMount() {
    this.setupTimetableViews();
  }

  componentWillReceiveProps(nextProps) {
    this.setupTimetableViews(nextProps);
  }

  setupTimetableViews(nextProps) {
    const props = nextProps || this.props;
    const course = props.course || {};
    const unixTimeStempOfToday = Today().getTime() / 1000;
    let start_date =
      getTimestampTheStartADay(props.viewerConfigs.start_date) ||
      unixTimeStempOfToday;
    let end_date =
      getTimestampTheStartADay(props.viewerConfigs.end_date) ||
      incrementDayByTimeStamp(unixTimeStempOfToday, 6).getTime() / 1000;
    const { rooms } = props.viewerConfigs;
    const timetableConfigsInCourse =
      course.timetableConfigs || defaultTimeConfigs;

    const allTimeslots = generateTimeslotOfCourseForRooms(
      rooms,
      timetableConfigsInCourse.start_time,
      timetableConfigsInCourse.end_time,
      timetableConfigsInCourse.timeframe,
    );
    const daysOfCourse = getAllTheDayBetweenUnixTimestamp(start_date, end_date);
    this.setState({
      allTimeslots,
      daysOfCourse,
      rowCount: allTimeslots.length,
      columnCount: daysOfCourse.length + 1,
      readyToDraw: true,
    });
  }

  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      readyToDraw,
    } = this.state;
    if (!readyToDraw) {
      return <span />;
    }
    return (
      <ScrollSync>
        {({
          clientHeight,
          clientWidth,
          onScroll,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }) => {
          const x = scrollLeft / (scrollWidth - clientWidth);
          const y = scrollTop / (scrollHeight - clientHeight);

          return (
            <div className="GridRow">
              <div className="LeftSideGridContainer" style={{ top: -1 }}>
                <Grid
                  cellRenderer={this._renderLeftHeaderCell}
                  className="HeaderGrid"
                  width={columnWidth}
                  height={rowHeight * 2}
                  rowHeight={rowHeight * 2}
                  columnWidth={columnWidth}
                  rowCount={1}
                  columnCount={1}
                />
              </div>
              <div
                className={`LeftSideGridContainer`}
                style={{ top: rowHeight * 2 - 1 }}
              >
                <Grid
                  overscanColumnCount={overscanColumnCount}
                  overscanRowCount={overscanRowCount}
                  cellRenderer={this._renderLeftSideCell}
                  columnWidth={columnWidth}
                  columnCount={1}
                  className="LeftSideGrid"
                  height={height - scrollbarSize()}
                  rowHeight={rowHeight}
                  rowCount={rowCount}
                  scrollTop={scrollTop}
                  width={columnWidth}
                />
              </div>
              <div
                key={`${this.props.lastUpdateTimetable || ''}bodyGrid`}
                className="GridColumn"
              >
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <div>
                      <Grid
                        className="HeaderGrid"
                        columnWidth={columnWidth}
                        columnCount={columnCount}
                        height={rowHeight * 2}
                        overscanColumnCount={overscanColumnCount}
                        cellRenderer={this._renderHeaderCell}
                        rowHeight={rowHeight * 2}
                        rowCount={1}
                        scrollLeft={scrollLeft}
                        width={width - scrollbarSize()}
                      />
                      <Grid
                        className="BodyGrid"
                        columnWidth={columnWidth}
                        columnCount={columnCount}
                        height={height}
                        onScroll={onScroll}
                        overscanColumnCount={overscanColumnCount}
                        overscanRowCount={overscanRowCount}
                        cellRenderer={this._renderBodyCell}
                        rowHeight={rowHeight}
                        rowCount={rowCount}
                        width={width}
                      />
                    </div>
                  )}
                </AutoSizer>
              </div>
            </div>
          );
        }}
      </ScrollSync>
    );
  }

  _renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return;
    }
    const { onCellClick, timetables, settingSwitch } = this.props;
    const course = this.props.course || {};
    const timetableConfigsInCourse =
      course.timetableConfigs || defaultTimeConfigs;
    const { daysOfCourse, allTimeslots } = this.state;
    const sessions = this.props.sessions || [];
    const selectedDate = daysOfCourse[columnIndex - 1];
    const timeslot = allTimeslots[rowIndex];

    const { cells, cellsFilledData } = getCellsFromTimetables(
      allTimeslots,
      rowIndex,
      timetables,
      selectedDate,
      timetableConfigsInCourse.timeframe,
      this.state.rowHeight,
      window.cellsFilledData || [],
      course,
    );
    window.cellsFilledData = cellsFilledData;

    if (cells && cells.length > 0) {
      return (
        <div className="b-r-cel b-t-cel BodyGrid" key={key} style={style}>
          {cells.map((cell) =>
            isCellForEvent(cell) ? (
              <EventBox cell={cell} />
            ) : (
              <ScheduleOfSessionBox
                sessions={sessions}
                course={course}
                cell={cell}
              />
            ),
          )}
        </div>
      );
    }
    let saturdayClass = selectedDate.getDay() === 6 ? 'saturday-bg-color' : '';
    let sundayClass = selectedDate.getDay() === 0 ? 'sunday-bg-color' : '';
    return (
      <div
        onClick={(event) => {
          if (!course.rooms || course.rooms.length === 0) {
            return settingSwitch(true);
          }
          onCellClick(selectedDate, timeslot);
        }}
        className={`b-r-cel b-t-cel BodyGrid ${saturdayClass}  ${sundayClass}`}
        key={key}
        style={style}
      >
        <span className="hidden">empty cell</span>
      </div>
    );
    // return this._renderLeftSideCell({columnIndex, key, rowIndex, style});
  };

  _renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return;
    }
    return this._renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  };

  _renderLeftHeaderCell = ({ columnIndex, key, style }) => {
    const { daysOfCourse } = this.state;

    return (
      <div
        className="headerCell leftHeader b-r-cel b-t-cel b-b-cel "
        key={key}
        style={style}
      >
        {columnIndex === 0
          ? 'Thời gian'
          : this._renderTopHeaderData(daysOfCourse[columnIndex - 1])}
      </div>
    );
  };

  _renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
    const { allTimeslots } = this.state;
    const timeslot = allTimeslots[rowIndex];
    return (
      <div
        className={`headerCell b-r-cel b-t-cel ${timeslot.className}`}
        key={key}
        style={style}
      >
        {this._renderLeftHeaderData(timeslot)}
      </div>
    );
  };

  /**
   * format date as dd/mm/yyy
   *
   * @param d
   * @returns {string}
   */
  _renderLeftHeaderData = (timeslot) => {
    const pad = (s) => (s < 10 ? `0${s}` : s);
    return (
      <div className="timeslot-header">
        <div className="room-name">{timeslot.room && timeslot.room.name}</div>
        <div className="timeslot-name">{timeslot.start_time_name}</div>
      </div>
    );
  };

  /**
   * format date as dd/mm/yyy
   *
   * @param d
   * @returns {string}
   */
  _renderTopHeaderData = (d) => {
    const pad = (s) => (s < 10 ? `0${s}` : s);
    let saturdayClass = d.getDay() === 6 ? 'saturday-bg-color' : '';
    let sundayClass = d.getDay() === 0 ? 'sunday-bg-color' : '';
    return (
      <div className={`date-header ${saturdayClass} ${sundayClass}`}>
        <div className="month-year">{`${getDayNameConfigs(d).label} - ${[
          pad(d.getMonth() + 1),
          d.getFullYear(),
        ].join('/')}`}</div>
        <div className="day-number">{pad(d.getDate())}</div>
      </div>
    );
  };
}

TimetableDrawer.propTypes = {
  onCellClick: PropTypes.func,
  course: PropTypes.object,
  timetables: PropTypes.arrayOf(PropTypes.shape()),
  rooms: PropTypes.arrayOf(PropTypes.shape()),
};

export default TimetableDrawer;

const gridConfigs = {
  columnWidth: 150, // the width of column
  rowHeight: 40, // the height of rows
  height: 450, // the height of view
  overscanColumnCount: 0,
  overscanRowCount: 5,
  // rowCount: 100, // total of row that will be draw
  // columnCount: 50, // total of column that will be draw
};

const defaultTimeConfigs = {
  timeframe: 60,
  start_time: 420, //'07:00:00',
  end_time: 1260, //'21:00:00',
};
