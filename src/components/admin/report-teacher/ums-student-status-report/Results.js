import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import get from 'lodash.get';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';

class Results extends Component {
  render() {
    const { items } = this.props;
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
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: t1('last_name'),
        key: 'last_name',
        dataIndex: 'last_name',
      },
      {
        title: t1('first_name'),
        key: 'first_name',
        dataIndex: 'first_name',
      },
      {
        title: t1('birthday'),
        key: 'birthday',
        dataIndex: 'birthday',
        render: (birthday) => timestampToDateString(birthday),
      },
      {
        title: t1('major'),
        key: 'major',
        dataIndex: 'major.name',
      },
      {
        title: t1('training_mode'),
        key: 'training_mode',
        render: (text, row) => {
          const trainingMode = get(row, 'training_mode', null);
          const trainingLevel = get(row, 'training_level', null);
          if (trainingMode && trainingLevel) {
            return `${t1(trainingMode)}/${t1(trainingLevel)}`;
          }

          if (trainingMode) {
            return t1(trainingMode);
          }

          if (trainingLevel) {
            return t1(trainingLevel);
          }
        },
      },
      {
        title: t1('ico'),
        key: 'ico',
        dataIndex: 'ico.name',
      },
      {
        title: t1('note'),
        key: 'note',
        dataIndex: 'note',
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (text) => t1(text),
      },
    ];
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

export default Results;
