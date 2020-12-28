import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
// import apiUrls from 'api-endpoints';
import questionApiUrls from 'components/admin/question/endpoints';
import questionBankApiUrls from 'components/admin/question-bank/endpoints';
import { UsedFor } from 'configs/constants';
import get from 'lodash.get';

const getDataSource = (items) => {
  if (!Array.isArray(items) || !items.length) {
    return [];
  }

  let stt = 0;

  return items
    .map(({ children, ...item }) => {
      if (!Array.isArray(children) || !children.length) {
        return null;
      }
      let total = 0;
      let getCount = {};
      children.forEach((child) => {
        if (!Array.isArray(child.detals) || !child.detals.length) {
          return;
        }
        total += child.total || 0;
        child.detals.forEach(({ type, count }) => {
          getCount[type] = (getCount[type] || 0) + count;
        });
      });

      const detals = Object.keys(getCount).map((type) => {
        return {
          type,
          count: getCount[type],
        };
      });

      return Object.assign(item, {
        total,
        detals,
        stt: ++stt,
        children,
      });
    })
    .filter(Boolean);
};

const renderTable = ({ questionTypes, items = [], groupBy = 'category' }) => {
  const columns = [
    {
      title: t1('stt'),
      key: 'stt',
      dataIndex: 'stt',
      className: 'text-center',
    },
    {
      title: t1('category'),
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: t1('level'),
      key: 'level',
      dataIndex: 'level',
      className: 'text-center',
    },
    {
      title: t1('total'),
      key: 'total',
      dataIndex: 'total',
      className: 'text-center',
      render: (total) => ({
        children: total,
        props: {
          className: 'text-center',
        },
      }),
    },
    Array.isArray(questionTypes) &&
      questionTypes.length && {
        title: t1('number_of_questions_by_type'),
        children: questionTypes.map(({ label, value }) => {
          return {
            title: label,
            render: (text, { detals = [] }) => {
              if (!Array.isArray(detals) || !detals.length) {
                return null;
              }

              const getCount = detals.find(
                ({ type }) => String(type) === String(value),
              );

              return {
                children: get(getCount, 'count') || 0,
                props: {
                  className: 'text-center',
                },
              };
            },
          };
        }),
      },
  ].filter(Boolean);

  return (
    <AntdTable
      columns={columns}
      dataSource={getDataSource(items)}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default fetchData(() => ({
  baseUrl: questionApiUrls.get_question_types,
  params: {
    used_for: [UsedFor.EXAM],
  },
  propKey: 'questionTypes',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(
  fetchData((props) => ({
    baseUrl: questionBankApiUrls.question_number_by_type,
    params: {
      question_banks: props.questionBanks,
      group_by: props.groupBy,
    },
    propKey: 'items',
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(renderTable),
);
