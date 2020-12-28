import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import routes from 'routes';
import PropTypes from 'prop-types';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import ShowManageExamShiftIcon from '../show-manage-exam-shift-wrapper/ShowManageExamShiftIcon';
import ShowManageExamShiftTitle from '../show-manage-exam-shift-wrapper/ShowManageExamShiftTitle';
import Table from 'antd/lib/table';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import ActionToggle from '../../../../common/toggle/ActionToggle';
import Warning from '../../../../common/Warning';

const actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
class ExamShiftResults extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid } = this.props;
    const nameLabel = t1('name');
    const actionsLabel = t1('actions');
    const startTimeLabel = t1('start_time');
    const endTimeLabel = t1('end_time');
    const numberContestantsLabel = t1('contestants_count');

    const width = {
      // startTime: '15%',
      // endTime: '15%',
      numberContestants: '10%',
      actions: '10%',
    };

    const columns = [
      {
        title: nameLabel,
        key: 'name',
        dataIndex: 'name',
        render: (name, item) => {
          return <ShowManageExamShiftTitle {...this.props} examShift={item} />;
        },
      },
      {
        title: startTimeLabel,
        key: 'startTime',
        dataIndex: 'start_date',
        render: (name, item) => {
          return (
            <span>
              {timestampToDateString(item.start_date, { showTime: true })}
            </span>
          );
        },
        // width: width.startTime,
      },
      {
        title: endTimeLabel,
        key: 'endTime',
        dataIndex: 'end_date',
        render: (name, item) => {
          return (
            <span>
              {timestampToDateString(item.end_date, { showTime: true })}
            </span>
          );
        },
        // width: width.endTime,
      },
      {
        title: numberContestantsLabel,
        key: 'numberContestants',
        dataIndex: 'counter',
        render: (name, item) => {
          const count = lodashGet(item, 'counter.students');

          return count > 0 ? (
            <span>{count}</span>
          ) : (
            <Warning inline>{t1('no_contestants')}</Warning>
          );
        },
        width: width.numberContestants,
      },
      {
        title: t1('status'),
        render: (name, item) => {
          return (
            <ActionToggle
              title={t1(item.status)}
              readOnlyLabelSet={actionToggleReadOnlyLabelSet}
              hideLabel
              baseURL={`/exam-shift/api/update?id=${item.id}&_sand_step=status`}
              dataSet={actionToggleReadOnlyLabelSet}
              value={item.status || 'queued'}
              name="status"
            />
          );
        },
        width: width.numberContestants,
      },
      {
        title: actionsLabel,
        key: 'actions',
        width: width.actions,
        render: (item) => {
          return (
            <React.Fragment>
              <ShowManageExamShiftIcon {...this.props} examShift={item} />{' '}
              <span className="m-l-20">
                <DeleteItem
                  formid={formid}
                  ntype="course"
                  itemId={item.id}
                  iconButton
                />
              </span>
            </React.Fragment>
          );
        },
      },
    ];
    return (
      <div className="table-result">
        <Table
          dataSource={items}
          columns={columns}
          childrenColumnName={null}
          rowKey="id"
          className="white-background"
          pagination={false}
        />
      </div>
    );
  }
}

ExamShiftResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

ExamShiftResults.defaultProps = {
  items: [],
};

export default connect()(ExamShiftResults);
