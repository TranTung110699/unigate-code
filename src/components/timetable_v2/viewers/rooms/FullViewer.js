import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import Grid from 'react-virtualized/dist/es/Grid';
import ScrollSync from 'react-virtualized/dist/es/ScrollSync';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import SessionBox from './SessionBox';
import { t1 } from 'translate';
import { generateTimeslotOfCourseForRooms } from '../../utils/DailyUnixTimestamp';
import { getRoomsCellsFromTimetables } from '../../utils/TimetableUtils';

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
    this.setState({
      width: this.props.width,
      height: this.props.height,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setupTimetableViews(nextProps);
    if (
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height
    ) {
      this.setState({
        width: nextProps.width,
        height: nextProps.height,
      });
    }
  }

  setupTimetableViews(nextProps) {
    const props = nextProps || this.props;
    const rooms = props.rooms || [];
    const { timeConfigs } = props;

    const allTimeslots = generateTimeslotOfCourseForRooms(
      null,
      timeConfigs.start_time,
      timeConfigs.end_time,
      timeConfigs.timeframe,
    );

    this.setState({
      allTimeslots,
      rooms,
      rowCount: rooms.length,
      columnCount: allTimeslots.length + 1,
      readyToDraw: true,
      columnWidth: this.state.width / (allTimeslots.length + 1),
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
    let index = 10;
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
                  cellRenderer={this._renderTopHeaderCell}
                  className="HeaderGrid"
                  width={columnWidth}
                  height={rowHeight}
                  rowHeight={rowHeight}
                  columnWidth={columnWidth}
                  rowCount={1}
                  columnCount={1}
                />
              </div>
              <div
                className={`LeftSideGridContainer`}
                style={{ top: rowHeight - 1 }}
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
                  {({ width }) => {
                    index += 1;
                    return (
                      <div>
                        <Grid
                          className="HeaderGrid"
                          columnWidth={columnWidth}
                          columnCount={columnCount}
                          height={rowHeight}
                          overscanColumnCount={overscanColumnCount}
                          cellRenderer={this._renderHeaderCell}
                          rowHeight={rowHeight}
                          rowCount={1}
                          scrollLeft={scrollLeft}
                          width={width * 2 - scrollbarSize()}
                        />
                        <Grid
                          className="BodyGrid"
                          columnWidth={columnWidth}
                          columnCount={columnCount}
                          height={height}
                          style={{ zIndex: 100 }}
                          onScroll={onScroll}
                          overscanColumnCount={overscanColumnCount}
                          overscanRowCount={overscanRowCount}
                          cellRenderer={this._renderBodyCell}
                          rowHeight={rowHeight}
                          rowCount={rowCount}
                          width={width}
                        />
                      </div>
                    );
                  }}
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

    const { allTimeslots, rooms } = this.state;
    const { timeConfigs } = this.props;
    const selectedTimeslot = allTimeslots[columnIndex - 1];
    const room = rooms[rowIndex];

    const { cells, roomsCellsFilledData } = getRoomsCellsFromTimetables(
      selectedTimeslot,
      room,
      timeConfigs.timeframe,
      this.state.columnWidth,
      this.state.rowHeight,
      window.roomsCellsFilledData || [],
    );
    window.roomsCellsFilledData = roomsCellsFilledData;

    if (cells && cells.length > 0) {
      return (
        <div className="b-r-cel b-t-cel BodyGrid" key={key} style={style}>
          {cells.map((cell) => (
            <SessionBox cell={cell} />
          ))}
        </div>
      );
    }

    return (
      <div
        onClick={(event) => {}}
        className={`b-r-cel b-t-cel BodyGrid`}
        key={key}
        style={style}
      >
        <span className="hidden">empty cell</span>
      </div>
    );
  };

  _renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return;
    }
    return this._renderTopHeaderCell({ columnIndex, key, rowIndex, style });
  };

  _renderTopHeaderCell = ({ columnIndex, key, style }) => {
    const { allTimeslots } = this.state;
    return (
      <div
        className="headerCell leftHeader b-r-cel b-t-cel b-b-cel "
        key={key}
        style={style}
      >
        {columnIndex === 0
          ? t1('room')
          : this._renderTopHeaderData(allTimeslots[columnIndex - 1])}
      </div>
    );
  };

  _renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
    const { rooms } = this.state;
    return (
      <div className={`headerCell b-r-cel b-t-cel`} key={key} style={style}>
        {this._renderLeftHeaderData(rooms[rowIndex])}
      </div>
    );
  };

  /**
   * format date as dd/mm/yyy
   *
   * @param d
   * @returns {string}
   */
  _renderLeftHeaderData = (room) => {
    return (
      <div className="timeslot-header">
        <div className="room-name">{t1(room.room_type)}</div>
        <div className="timeslot-name">{room.name}</div>
      </div>
    );
  };

  /**
   * format date as dd/mm/yyy
   *
   * @param d
   * @returns {string}
   */
  _renderTopHeaderData = (timeslot) => {
    return (
      <div className="timeslot-header">
        <div className="timeslot-name">{timeslot.start_time_name}</div>
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
  columnWidth: 50, // the width of column
  rowHeight: 80, // the height of rows
  height: 450, // the height of view
  width: 450, // the height of view
  overscanColumnCount: 0,
  overscanRowCount: 5,
  // rowCount: 100, // total of row that will be draw
  // columnCount: 50, // total of column that will be draw
};
