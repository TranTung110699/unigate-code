import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import questionBankapiUrls from 'components/admin/question-bank/endpoints';
import { difficulties } from 'configs/constants';

const renderTable = ({ items = [], groupBy = 'category' }) => {
  const columns = [
    {
      title: t1(`${groupBy}_name`),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t1('total_number_of_question'),
      key: 'total',
      dataIndex: 'total',
      render: (total) => ({
        children: total,
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('number_of_questions_by_difficulty_level'),
      children: ['---']
        .concat(Object.values(difficulties))
        .map((difficultie) => {
          return {
            title: t1(difficultie),
            render: (text, { count_by_difficulties = [] }) => {
              const countDyDifficultie =
                count_by_difficulties.find((row) => {
                  return row.difficulty === difficultie;
                }) || {};

              return {
                children: countDyDifficultie.count || 0,
                props: {
                  className: 'text-center',
                },
              };
            },
          };
        }),
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
};

export default fetchData((props) => ({
  baseUrl: questionBankapiUrls.the_difficulty_of_questions,
  params: {
    question_banks: props.questionBanks,
    group_by: props.groupBy,
  },
  propKey: 'items',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(renderTable);
