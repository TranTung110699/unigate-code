import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { isCreditSyllabus } from 'components/admin/node/utils';

const getSkillCreditSyllabusLearningItems = (skill) => {
  return (lodashGet(skill, 'learning_items') || []).filter((li) => {
    return isCreditSyllabus(li);
  });
};

const TableView = ({ skillAnalysis }) => {
  const dataSource = Object.values(skillAnalysis || {});
  const columns = [
    {
      title: t1('skill'),
      key: 'skill',
      render: (skill) => {
        return lodashGet(skill, 'name');
      },
    },
    {
      title: t1('score'),
      key: 'skill',
      render: (skill) => {
        return `${lodashGet(skill, 'score')}%`;
      },
    },
    {
      title: t1('syllabuses'),
      key: 'skill',
      render: (skill) => {
        return getSkillCreditSyllabusLearningItems(skill).map((cs) => (
          <div>{lodashGet(cs, 'name')}</div>
        ));
      },
    },
  ];

  return (
    <AntdTable
      childrenColumnName={null}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default TableView;
