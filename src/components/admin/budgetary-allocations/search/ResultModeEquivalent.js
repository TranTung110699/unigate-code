import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import get from 'lodash.get';
import { caculatorAllocationByMonth, NoData } from './common';

const caculatorScoll = (month) => (month.length + 1) * 250 + 700;

class ResultModeEquivalent extends PureComponent {
  error = { fontSize: 15, color: 'red' };

  getKeyForTable = (months) => {
    if (Array.isArray(months)) {
      return `${get(months, '[0]')}-${get(
        months,
        `[${get(months, 'length') - 1}]`,
      )}`;
    }

    return 'default';
  };

  render() {
    const { month, items } = this.props;
    const scoll = caculatorScoll(month);
    const renderMonths = month.map((el) => ({
      title: t1('thang_%s', el + 1),
      key: el,
      children: [
        {
          title: t1('allocation'),
          render: (text, row) => {
            if (!row) {
              return null;
            }
            const allocation = caculatorAllocationByMonth(
              get(row, 'allocations_month', []),
              el + 1,
            );
            return (
              <div
                style={get(allocation, 'allocation', 0) < 0 ? this.error : null}
              >
                {get(allocation, 'allocation', 0).toLocaleString()}
              </div>
            );
          },
          key: 'allocation',
        },
        {
          title: t1('expense'),
          render: (text, row) => {
            const allocation = caculatorAllocationByMonth(
              get(row, 'allocations_month', []),
              el + 1,
            );
            if (get(allocation, 'spend', 0) > 0) {
              return <div>{get(allocation, 'spend', 0).toLocaleString()}</div>;
            }
            return <NoData />;
          },
          key: 'expense',
        },
        {
          title: t1('remain'),
          render: (text, row) => {
            if (!row) {
              return null;
            }
            const allocation = caculatorAllocationByMonth(
              get(row, 'allocations_month', []),
              el + 1,
            );

            return (
              <div style={get(allocation, 'remain', 0) < 0 ? this.error : null}>
                {get(allocation, 'remain', 0).toLocaleString()}
              </div>
            );
          },
          key: 'remain',
        },
      ],
    }));
    const columns = [
      {
        title: t1('code'),
        dataIndex: 'CDANHTDUONG_EVN_CODE',
        key: 'code',
      },
      {
        title: t1('name'),
        dataIndex: 'CDANHTDUONG_EVN',
        key: 'name',
      },
      ...renderMonths,
      {
        title: 'Report',
        key: 'report',
        children: [
          {
            title: t1('total_allocation'),
            render: (text, row) => {
              let total_allocation = 0;
              month.map((el) => {
                const allocation = caculatorAllocationByMonth(
                  get(row, 'allocations_month', []),
                  el + 1,
                );
                total_allocation += get(allocation, 'allocation', 0);
              });
              if (total_allocation > 0) {
                return <div>{total_allocation.toLocaleString()}</div>;
              }
              return <NoData />;
            },
          },
          {
            title: t1('total_expense'),
            render: (text, row) => {
              let total = 0;
              month.map((el) => {
                const allocation = caculatorAllocationByMonth(
                  get(row, 'allocations_month', []),
                  el + 1,
                );
                total += get(allocation, 'spend', 0);
              });
              return <div>{total.toLocaleString()}</div>;
            },
          },
          {
            title: t1('percent(%)'),
            render: (text, row) => {
              let total = 0;
              let total_allocation = 0;
              month.map((el) => {
                const allocation = caculatorAllocationByMonth(
                  get(row, 'allocations_month', []),
                  el + 1,
                );
                total += get(allocation, 'spend', 0);
                total_allocation += get(allocation, 'allocation', 0);
              });
              const per = parseInt((total * 100) / total_allocation);
              if (per) {
                return (
                  <div style={per > 100 ? this.error : null}>{`${per}%`}</div>
                );
              }
              return <div>{t1('no_data')}</div>;
            },
          },
        ],
      },
    ];

    return (
      <div>
        <AntdTable
          columns={columns}
          key={this.getKeyForTable(month)}
          bordered
          pagination={false}
          dataSource={items}
          scroll={{ x: scoll }}
          className="white-background"
        />
      </div>
    );
  }
}

ResultModeEquivalent.propTypes = {
  items: PropTypes.array.isRequired,
  month: PropTypes.array.isRequired,
};
export default ResultModeEquivalent;
