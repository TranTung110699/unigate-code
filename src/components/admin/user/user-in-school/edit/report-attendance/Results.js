import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import get from 'lodash.get';
import { attendanceStatusOptions } from 'configs/constants';
import Icon from 'components/common/Icon';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { fromArrayToKeyValueObject } from 'common/utils/Array';

const iconStyleCheck = { fontSize: 26, color: '#3595D9' };

class Results extends Component {
  render() {
    const { items, userIid, absenceReasons } = this.props;
    const reasons = fromArrayToKeyValueObject(absenceReasons, 'id');
    console.log('reason: ', reasons);
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('date'),
        key: 'id',
        render: (text, row) => {
          const session = get(row, 'session');
          return `${get(session, 'day')}/${get(session, 'month')}/${get(
            session,
            'year',
          )}`;
        },
        dataIndex: 'name',
      },
    ]
      .concat(
        attendanceStatusOptions().map((item) => ({
          width: 200,
          title: item.label,
          key: item.value,
          render: (text, row) => {
            const attendances = get(row, 'attendances');
            const attendance = get(attendances, `[${userIid}]`);
            if (!attendance || attendance.status !== item.value) {
              return null;
            }
            return <Icon style={iconStyleCheck} icon="check" />;
          },
        })),
      )
      .concat([
        {
          title: t1('reason'),
          key: 'reason',
          render: (text, row) => {
            const attendances = get(row, 'attendances');
            const attendance = get(attendances, `[${userIid}]`);
            if (!attendance) {
              return null;
            }
            return get(reasons, `[${attendance.reason}].description`);
          },
        },
      ]);

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = createSelector(
  (state) => get(state, 'domainInfo.conf.absence_reason_list'),
  (absenceReasons) => ({
    absenceReasons,
  }),
);

export default connect(mapStateToProps)(Results);
