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
              get(row, 'childrens', []),
              el + 1,
            );
            const expense = sum(get(allocation, 'spend', []));
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
        title: t1('code'),
        dataIndex: 'program.code',
        key: 'code',
        render: (text) => <a href="javascript:;">{text}</a>,
      },
      {
        title: t1('name'),
        dataIndex: 'program.name',
        key: 'name',
        render: (text) => <a href="javascript:;">{text}</a>,
      },
      ...renderMonths,
      {
        title: t1('total'),
        key: 'name',
        render: (text, row) => {
          let total = 0;
          const expense = get(row, 'childrens', []);
          for (let i = 0; i <= expense.length; i++) {
            total += sum(get(expense[i], 'spend', []));
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
