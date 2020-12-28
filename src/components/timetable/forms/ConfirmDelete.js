import React from 'react';
import { connect } from 'react-redux';
import {
  getDateArray,
  getStartTimeOfDay,
  incrementDayByTime,
} from '../common/Datetime';
import DeleteConfirm, { deleteType } from '../form-configs/DeleteConfirm';
import { daysOfWeekToString } from '../common/DayOfWeek';
import { normalizeDateAsddmmyyy } from 'common/normalizers';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';

const typeInDeleteNode = {
  ALL: 'all',
  SINGLE_DAY: 'single_day',
};

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 21/10/2017
 **/
class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteNodeType: '' };
  }

  componentWillReceiveProps(nextProps) {
    const { deleteNodeType } = this.state;
    const newDeleteNodeType = this.getTypeOfDeleteNode(nextProps);
    if (deleteNodeType !== newDeleteNodeType) {
      this.setState({ deleteNodeType: newDeleteNodeType });
    }
  }

  componentDidMount() {
    this.setState({ deleteNodeType: this.getTypeOfDeleteNode() });
  }

  getTimeTables = () => {
    let deleteNode = false;
    const multiDeleteMode = this.getTypeOfDeleteNode();
    const { data } = this.props;
    const { timeTable } = data;
    const params = {};
    if (
      multiDeleteMode === deleteType.SINGLE_NODE ||
      multiDeleteMode === deleteType.MULTI_NODE
    ) {
      params.delete = { ...timeTable };
    } else {
      //data.timeId
      const ignoreDate = new Date(data.timeId);
      const newEndTime = getStartTimeOfDay(incrementDayByTime(ignoreDate, -1));
      const newStartTime = getStartTimeOfDay(incrementDayByTime(ignoreDate, 1));
      let updateNode = {
        ...timeTable,
        start_time: timeTable.start_time,
        end_time: newEndTime / 1000,
      };
      let newNode = {
        ...timeTable,
        start_time: newStartTime / 1000,
        end_time: timeTable.end_time,
      };
      updateNode = this.validateTimeTable(updateNode);
      newNode = this.validateTimeTable(newNode);
      if (!updateNode) {
        // new node update không hợp lệ thì lấy new Node thành update (ko tạo ra thêm object)
        updateNode = newNode;
        newNode = false;
      }
      params.update = updateNode;
      params.new = newNode;
    }
    return params;
  };

  validateTimeTable = (timeTable) => {
    if (timeTable.start_time > timeTable.end_time) {
      return false;
    }
    const dates = getDateArray(
      new Date(timeTable.start_time * 1000),
      new Date(timeTable.end_time * 1000),
    );
    const daysOfWeek = timeTable.days_of_week;
    const totalDayInTimeFrame = this.countTotalRealDayOfTimeFrame(
      timeTable.start_time,
      timeTable.end_time,
      daysOfWeek,
    );
    if (totalDayInTimeFrame > 0) {
      return { ...timeTable };
    }
    return false;
  };
  /**
   * đếm số buổi học trong 1 quãng thời gian nào đó
   */
  countTotalRealDayOfTimeFrame = (start_time, end_time, daysOfWeek) => {
    const dates = getDateArray(
      new Date(start_time * 1000),
      new Date(end_time * 1000),
    );
    let total = 0;
    for (let i = 0; i < dates.length; i++) {
      //
      for (let j = 0; j < daysOfWeek.length; j++) {
        if (dates[i].value == daysOfWeek[j]) {
          total += 1;
        }
      }
    }
    return total;
  };

  getTypeOfDeleteNode = (nextProps) => {
    const { data } = nextProps || this.props;
    const { deleteTimeTable } = nextProps || this.props;
    const { timeTable } = data;
    const daysOfWeek = timeTable.days_of_week;
    const totalDayInTimeFrame = this.countTotalRealDayOfTimeFrame(
      timeTable.start_time,
      timeTable.end_time,
      daysOfWeek,
    );
    if (
      timeTable.start_time === timeTable.end_time ||
      totalDayInTimeFrame <= 1
    ) {
      return deleteType.SINGLE_NODE;
    }

    return deleteTimeTable && deleteTimeTable.values
      ? deleteTimeTable.values.deleteOption
      : deleteType.SINGLE_DAY;
  };

  render() {
    const { onDeleteConfirmed, params, data } = this.props;
    const { multiDeleteMode, deleteNodeType } = this.state;
    const { timeTable } = data;
    let node = {};

    return (
      <div className="confirm-content">
        <div className="message text-align-center">
          {t1('you_are_sure_to_delete_this_time_table')}
        </div>
        {deleteNodeType === deleteType.SINGLE_NODE && (
          <div>
            <div className="m-b-10 text-align-center">
              {`Ngày: ${normalizeDateAsddmmyyy(timeTable.start_time * 1000)}`}
            </div>
            <div className="text-align-center">
              {timeTable.time_slots &&
                timeTable.time_slots.map((slot) => (
                  <span>{`${slot.name}: ${slot.time_from} -  ${
                    slot.time_to
                  }, `}</span>
                ))}
            </div>
          </div>
        )}

        {deleteNodeType !== deleteType.SINGLE_NODE && (
          <div className="message">
            <div className="text-align-center">
              {deleteNodeType === deleteType.SINGLE_DAY && (
                <span> {`Ngày: ${normalizeDateAsddmmyyy(data.timeId)}`} </span>
              )}
              {deleteNodeType === deleteType.MULTI_NODE && (
                <span>
                  {`Từ ngày: ${normalizeDateAsddmmyyy(
                    timeTable.start_time * 1000,
                  )} đến ${normalizeDateAsddmmyyy(timeTable.end_time * 1000)}`}
                  <p>({daysOfWeekToString(timeTable.days_of_week)})</p>
                </span>
              )}
            </div>
            <div className="text-align-center">
              {timeTable.time_slots &&
                timeTable.time_slots.map((slot) => (
                  <span>{`${slot.name}: ${slot.time_from} -  ${
                    slot.time_to
                  }, `}</span>
                ))}
            </div>
          </div>
        )}

        <div className="m-b-20">
          <NodeNew
            schema={DeleteConfirm}
            mode={deleteNodeType !== deleteType.SINGLE_NODE ? 'multi_node' : ''}
            node={node}
            ntype="timetable"
            onSubmit={onDeleteConfirmed}
            params={{ ...this.getTimeTables(), data }}
            formid="deleteTimeTable"
            submitLabels={{ edit: t1('Delete'), submitting: '.....' }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deleteTimeTable: state.form.deleteTimeTable,
  };
};

export default connect(mapStateToProps)(ConfirmDelete);
