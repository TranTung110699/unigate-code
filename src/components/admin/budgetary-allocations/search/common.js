import React from 'react';
import get from 'lodash.get';
import t1 from 'translate';
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
const NoData = () => (
  <div style={{ fontSize: 15, color: 'red' }}>{t1('no_data')}</div>
);
/**
 *
 * @param month
 * TInh toan scoll cho table theo month hien thi
 */
const caculatorScoll = (month) => month.length * 250 + 700;
export {
  caculatorScoll,
  filterChildrenByMonth,
  caculatorTotal,
  caculatorAllocationByMonth,
  calculateRemain,
  prepare,
  caculator,
  sum,
  NoData,
};
