import React from 'react';
import AntTable from 'antd/lib/table';
import { types } from 'components/admin/question/schema/question-types';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

const surveyAnswer = [
  { value: 1, text: 'Rất không đồng ý' },
  { value: 2, text: 'Không đồng ý' },
  { value: 3, text: 'Đồng ý' },
  { value: 4, text: 'Rất đồng ý' },
];

const getColumns = ({ survey }) => [
  {
    title: t1('user_information'),
    className: 'text-center',
    fixed: 'left',
    children: [
      {
        title: t1('user'),
        key: 'user',
        dataIndex: 'u',
        render: (user) => (
          <>
            {user && user.name} <br />
            {user && user.code && `(${user && user.code})`}
          </>
        ),
      },
      {
        title: t1('mail'),
        key: 'user',
        dataIndex: 'u',
        render: ({ mail }) => mail,
      },
      {
        title: t1('organization_information'),
        className: 'text-center',
        children: [
          {
            title: t1('name'),
            key: 'user',
            dataIndex: 'u',
            render: (user) =>
              lodashGet(user, '__expand.user_organizations.0.name'),
          },
          {
            title: t1('province'),
            key: 'user',
            dataIndex: 'u',
            render: (user) =>
              lodashGet(
                user,
                '__expand.user_organizations.0.__expand.org_province_id.name',
              ),
          },
          {
            title: t1('district'),
            key: 'user',
            dataIndex: 'u',
            render: (user) =>
              lodashGet(
                user,
                '__expand.user_organizations.0.__expand.org_district_id.name',
              ),
          },
        ],
      },
    ],
  },
  ...(!!(survey && survey.length)
    ? survey.map((column, index) => {
        return {
          title: t1('question_%s', [index + 1]),
          key: `question-${column.iid}`,
          width:
            parseInt(column.type) === types.TYPE_OPEN_ENDED ||
            parseInt(column.type) === types.TYPE_MC
              ? '500px'
              : undefined,
          render: (user) => {
            const answers = lodashGet(user, 'answers', []);
            const answerArray = lodashGet(
              lodashGet(answers, column.iid),
              'answer',
              [],
            );
            if (
              parseInt(column.type) === types.TYPE_OPEN_ENDED ||
              parseInt(column.type) === types.TYPE_MC
            ) {
              return answerArray.map((answer) => <div>{answer}</div>);
            }
            return lodashGet(
              surveyAnswer.find(
                (text) => text.value === parseInt(lodashGet(answerArray, '0')),
              ),
              'text',
            );
          },
        };
      })
    : []),
];

const Detail = ({ items, survey }) => {
  const { children } = survey;

  return (
    <AntTable
      dataSource={items}
      columns={getColumns({
        survey: children.filter(
          (child) => parseInt(child.type) !== types.TYPE_INTRODUCTION,
        ),
      })}
      bordered
      scroll={{ x: true }}
      pagination={false}
      childrenColumnName={null}
      className="white-background"
    />
  );
};

export default Detail;
