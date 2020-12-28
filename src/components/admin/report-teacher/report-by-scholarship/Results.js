import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import get from 'lodash.get';
import { t1 } from 'translate';

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
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('major'),
        key: 'major',
        dataIndex: 'major.name',
      },
      {
        title: t1('ico'),
        key: 'ico',
        dataIndex: 'ico.name',
      },
      {
        title: t1('training_mode/training_level'),
        key: 'training_mode/training_level',
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
        title: t1('scholarship'),
        key: 'scholarship',
        dataIndex: 'scholarship.name',
      },
      {
        title: t1('semester'),
        key: 'semester',
        dataIndex: 'semester.name',
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
          return (
            <span style={{ color: text ? 'green' : 'red' }}>
              {' '}
              {text ? t1('used') : t1('unused')}
            </span>
          );
        },
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
