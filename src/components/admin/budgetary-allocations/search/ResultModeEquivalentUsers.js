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

class ResultModeEquivalentByPrograms extends PureComponent {
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
            const expense = get(allocation, 'spend');
            if (expense > 0) {
              return <div>{expense.toLocaleString()}</div>;
            }
            return <NoData />;
          },
          key: 'expense',
        },
      ],
    }));
    const columns = [
      {
        title: 'Code',
        dataIndex: 'user.code',
        key: 'code',
      },
      {
        title: 'Name',
        dataIndex: 'user.name',
        key: 'name',
      },
      ...renderMonths,
      {
        title: t1('total'),
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

    // const columns = [{
    //   title: 'Name',
    //   dataIndex: 'program.name',
    //   key: 'name',
    //   render: text => <a href="javascript:;">{text}</a>,
    // }];
    // const data = [
    //   {
    //
    //   }
    // ]
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
ResultModeEquivalentByPrograms.propTypes = {
  items: PropTypes.array.isRequired,
  month: PropTypes.array.isRequired,
};
export default ResultModeEquivalentByPrograms;
