import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from '../../../../translate';
import get from 'lodash.get';
import {
  caculatorScoll,
  sum,
  caculatorAllocationByMonth,
  NoData,
} from './common';

class ResultModeEquivalentByPositions extends PureComponent {
  render() {
    const { month, items } = this.props;
    const scoll = caculatorScoll(month);
    const renderMonths = month.map((el) => ({
      title: t1('thang_%s', el + 1),
      key: el,
      children: [
        {
          title: t1('expense'),
          render: (text, row) => {
            const allocation = caculatorAllocationByMonth(
              get(row, 'expense', []),
              el + 1,
            );
            let totalSpend = get(allocation, 'spend', 0);

            if (totalSpend > 0) {
              return <div>{totalSpend.toLocaleString()}</div>;
            }
            return <NoData />;
          },
          key: 'expense',
        },
      ],
    }));
    const columns = [
      {
        title: t1('code'),
        dataIndex: 'position_detail.code',
        key: 'code',
      },
      {
        title: t1('name'),
        dataIndex: 'position_detail.name',
        key: 'name',
      },
      ...renderMonths,
      {
        title: 'Total',
        key: 'total',
        render: (text, row) => {
          let total = 0;
          const expense = get(row, 'expense', []);
          for (let i = 0; i <= expense.length; i++) {
            total += get(expense[i], 'spend', 0);
          }
          return <div>{total.toLocaleString()}</div>;
        },
      },
    ];
    return (
      <div>
        <AntdTable
          bordered
          columns={columns}
          pagination={false}
          dataSource={items}
          scroll={{ x: scoll }}
        />
      </div>
    );
  }
}
ResultModeEquivalentByPositions.propTypes = {
  items: PropTypes.array.isRequired,
  month: PropTypes.array.isRequired,
};
export default ResultModeEquivalentByPositions;
