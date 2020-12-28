import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import AntdTable from 'antd/lib/table';
import ResultModeEquivalentByProgram from './ResultModeEquivalentByPrograms';
import ResultModeEquivalent from './ResultModeEquivalent';
import ResultModeEquivalentUsers from './ResultModeEquivalentUsers';
import ResultModeEquivalentPositions from './ResultModeEquivalentByPositions';
import ResultModeProgramCreditByPositions from './ResultModeProgramCreditByPositions';
import ResultModeProgramCreditByOrg from './ResultModeProgramCreditByOrg';
import get from 'lodash.get';

const caculator = (start_month, end_month = false) => {
  let time = new Date(start_month);
  const indexStart = time.getMonth();
  time = new Date(end_month);
  const indexEnd = time.getMonth();

  return { indexStart, indexEnd };
};
const sum = (array) => array.reduce((a, b) => a + b, 0);
const prepare = (items) =>
  items.map((el) => {
    let total = 0;
    const allocations_month = get(el, 'allocations_month');
    if (allocations_month) {
      for (let i = 0; i < allocations_month.length; i++) {
        total += sum(allocations_month[i]);
      }
    }
    const children_tmp = get(el, 'children', []);
    delete el.children;
    return {
      ...el,
      total_yearly_budget: total,
      children_tmp,
    };
  });
/**
 * @param allocations_month
 * @param children
 * @param m note m start 0->11
 * @returns {number}
 * Tinh toan so tien con lai cho moi thang
 */
const calculateRemain = (allocations_month = [], children = [], m) => {
  if (children) {
    const spend = children.find((element) => element.month === m + 1);
    if (spend) {
      return (
        sum(allocations_month[m] ? allocations_month[m] : []) -
        sum(get(spend, 'spend', []))
      );
    }
  }
  return 0;
};
const caculatorAllocationByMonth = (allocation, m) => {
  const tmp = allocation.find((el) => {
    if (get(el, 'month') === m) {
      return true;
    }
  });
  return tmp;
};
const caculatorTotal = (allocations_month = [], m) =>
  sum(allocations_month[m] ? allocations_month[m] : []);
/**
 *
 * @param children
 * @param month
 * @returns neu tim thay phan bo chi phi cua thang thi tra ve chi phi do, nguoc lai thi tra ve false
 */
const filterChildrenByMonth = (children, month) => {
  if (!children) {
    return false;
  }
  const indexChildren = children.findIndex((el2) => {
    if (el2.month === month + 1) {
      return true;
    }
    return false;
  });
  if (indexChildren !== -1) {
    return children[indexChildren];
  }
  return false;
};
/**
 *
 * @param month
 * TInh toan scoll cho table theo month hien thi
 */
const caculatorScoll = (month) => month.length * 250 + 700;
function groupBy(array, f) {
  const groups = {};
  array.forEach((o) => {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map((group) => groups[group]);
}

class Results extends Component {
  error = { fontSize: 15, color: 'red' };

  render() {
    const { items, searchValues } = this.props;
    const { start_month, end_month, reportBy } = searchValues;
    let month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    if (reportBy === 'period') {
      const { indexStart, indexEnd } = caculator(start_month, end_month);
      month = month.slice(indexStart, indexEnd + 1);
    } else if (get(searchValues, 'forMonthMultiple', []).length) {
      const forMonthMultiple = get(searchValues, 'forMonthMultiple', []).map(
        (el) => {
          const time = new Date(el);
          return time.getMonth();
        },
      );
      month = month.filter((el) => {
        if (forMonthMultiple.includes(el)) {
          return true;
        }
        return false;
      });
    } else {
      const forMonth = new Date(get(searchValues, 'forMonth'));
      month = month.filter((el) => {
        if (forMonth.getMonth() === el) {
          return true;
        }
        return false;
      });
    }
    if (get(searchValues, 'report_type') === 'positions') {
      return <ResultModeProgramCreditByPositions items={items} month={month} />;
    } else if (
      get(searchValues, 'report_type') ===
      'report_type_equivalent_positions_programs'
    ) {
      return (
        <ResultModeEquivalentByProgram
          items={items}
          month={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        />
      );
    } else if (get(searchValues, 'report_type') === 'organizations') {
      return <ResultModeProgramCreditByOrg month={month} items={items} />;
    } else if (get(searchValues, 'report_type') === 'equivalent_positions') {
      return <ResultModeEquivalent month={month} items={items} />;
    } else if (
      get(searchValues, 'report_type') ===
      'report_type_equivalent_positions_positions'
    ) {
      return (
        <ResultModeEquivalentPositions
          month={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          items={items}
        />
      );
    } else if (
      get(searchValues, 'report_type') ===
      'report_type_equivalent_positions_users'
    ) {
      return (
        <ResultModeEquivalentUsers
          month={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          items={items}
        />
      );
    }
    const dataPresent = prepare(items);
    const scoll = caculatorScoll(month);
    const renderMonth = month.map((el) => ({
      title: t1('thang_%s', el + 1),
      key: el,
      children: [
        {
          title: t1('allocation'),
          render: (text, row) => {
            if (!row) {
              return null;
            }
            const total = caculatorTotal(get(row, 'allocations_month', []), el);
            return (
              <div style={total < 0 ? this.error : null}>
                {total.toLocaleString()}
              </div>
            );
          },
          key: 'allocation',
        },
        {
          title: t1('expense'),
          render: (text, row) => {
            const tmp = filterChildrenByMonth(get(row, 'children_tmp'), el);
            if (tmp) {
              return <div>{sum(get(tmp, 'spend')).toLocaleString()}</div>;
            }
            return <div>{t1('no_data')}</div>;
          },
          key: 'expense',
        },
        {
          title: t1('remain'),
          render: (text, row) => {
            if (!row) {
              return null;
            }
            const remain = calculateRemain(
              get(row, 'allocations_month', []),
              get(row, 'children_tmp', []),
              el,
            );
            return (
              <div style={remain < 0 ? this.error : null}>
                {remain.toLocaleString()}
              </div>
            );
          },
          key: 'remain',
        },
      ],
    }));
    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: t1('type'),
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: t1('total_yearly_budgetary'),
        render: (text, row) => (
          <div>{`${parseInt(
            get(row, 'total_yearly_budget', 0),
          ).toLocaleString()} VNĐ`}</div>
        ),
        dataIndex: 'total_yearly_budget',
        key: 'total_yearly_budget',
      },
      ...renderMonth,
    ];
    return (
      <div>
        <AntdTable
          columns={columns}
          bordered
          pagination={false}
          dataSource={dataPresent}
          scroll={{ x: scoll }}
          className="white-background"
        />
      </div>
    );
  }
}

export default connect()(Results);
