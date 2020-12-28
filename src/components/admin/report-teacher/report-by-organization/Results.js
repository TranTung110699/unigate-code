import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { courseLearningTypes } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';
import './stylesheet.scss';

class Results extends Component {
  createMonthColumns = () => {
    const months = [];
    let pos = 0;

    for (let month = 1; month <= 12; ++month) {
      const index = pos;
      months.push({
        title: `${t1('month')} ${month}`,
        render: (text, row) => {
          return get(row, `data[${index}].value`, 0) || 0;
        },
      });

      if (month % 3 === 0) {
        months.push({
          title: `${month} ${t1('month')}`,
          render: (text, row) => {
            return {
              children: get(row, `data[${index + 1}].value`, 0) || 0,
              props: {
                className: 'column-total-month',
              },
            };
          },
        });
        ++pos;
      }
      ++pos;
    }
    return months;
  };

  render() {
    const { items, learningType } = this.props;
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
        title: t1('information'),
        key: 'id',
        render: (text) => t1(text),
        dataIndex: 'name',
      },
      {
        title:
          learningType === courseLearningTypes.ONLINE
            ? t1('online_training')
            : t1('offline_training'),
        children: this.createMonthColumns(),
      },
    ];
    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        className="report-by-organization"
        scroll={{
          x: true,
        }}
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
