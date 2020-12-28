/* eslint-disable react/prop-types */
import React from 'react';

import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { timestampToDateTimeString } from 'common/utils/Date';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { max } from 'common/utils/Array';

import AntdTable from 'antd/lib/table';

const ProgressOfLearner = ({ learner, creditSyllabuses, progress }) => {
  if (!Array.isArray(creditSyllabuses) || !creditSyllabuses.length) {
    return t1('there_are_no_courses_in_the_EP_yet');
  }

  const creditsProgress = Array.isArray(progress) ? progress : [];

  return (
    <div className="table-result whitebox">
      <table key={learner} className="whitebox">
        <thead
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <tr>
            <th>{t1('subject_name')}</th>
            <th>{t1('completion_score')}</th>
            <th>{t1('completion_progress')}</th>
            <th>{t1('last_learned')}</th>
            <th>{t1('passed_failed')}</th>
          </tr>
        </thead>

        <tbody displayRowCheckbox={false} showRowHover stripedRows>
          {creditSyllabuses.map((syllabus) => {
            const { cp, p, passed, last_learned } =
              creditsProgress.find(
                (row) =>
                  String(row.credit_syllabus_iid) === String(syllabus.iid),
              ) || {};
            return (
              <tr key={syllabus.id}>
                <td>{lodashGet(syllabus, 'name')}</td>
                <td>{p || 0}</td>
                <td>{cp || 0}%</td>
                <td>
                  {last_learned > 0 && timestampToDateTimeString(last_learned)}
                </td>
                <td>{passed ? t1('passed') : t1('failed')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Results = ({ items, objects, isEvn, hiddenFields }) => {
  const learner = lodashGet(hiddenFields, 'user_iid');

  const creditSyllabuses = lodashGet(objects, 'credit_syllabuses');

  if (learner) {
    return (
      <ProgressOfLearner
        learner={learner}
        creditSyllabuses={creditSyllabuses}
        progress={lodashGet(items, '0.credit_progress')}
      />
    );
  }

  const getUserOfRow = (row) => {
    return lodashGet(row, 'user');
  };

  const getCreditSyllabusProgressOfRow = (row, creditSyllabus) => {
    if (!row) return null;

    const user = row.user;
    if (!user) return null;

    return (lodashGet(row, 'credit_progress') || []).find(
      (elem) =>
        lodashGet(elem, 'credit_syllabus_iid') ==
        lodashGet(creditSyllabus, 'iid'),
    );
  };

  const data = items;
  const columns = [
    {
      title: t1('code'),
      key: 'code',
      render: (row) => {
        const user = getUserOfRow(row);
        return lodashGet(user, 'code');
      },
    },
    {
      title: t1('name'),
      key: 'name',
      render: (row) => {
        const user = getUserOfRow(row);
        return lodashGet(user, 'name');
      },
    },
    {
      title: t1('mail'),
      key: 'mail',
      render: (row) => {
        const user = getUserOfRow(row);
        return lodashGet(user, 'mail');
      },
    },
    {
      title: t1('organization'),
      key: 'organization',
      render: (row) => {
        const user = getUserOfRow(row);
        return (lodashGet(user, '__expand.user_organizations') || [])
          .map((org) => lodashGet(org, 'name'))
          .join(',');
      },
    },
    ...(isEvn
      ? [
          {
            title: t1('phongban'),
            key: 'phongban',
            render: (row) => {
              const user = getUserOfRow(row);
              return (lodashGet(user, '__expand.phongbans') || [])
                .map((org) => lodashGet(org, 'name'))
                .join(',');
            },
          },
        ]
      : []),
    ...(creditSyllabuses || []).map((cs) => ({
      title: `${lodashGet(cs, 'name')} - (#${lodashGet(cs, 'code') ||
        lodashGet(cs, 'iid')})`,
      key: lodashGet(cs, 'iid'),
      children: [
        {
          title: t1('completion_progress'),
          key: 'completion_progress',
          render: (row) => {
            const { cp } = getCreditSyllabusProgressOfRow(row, cs) || {};
            return `${cp || 0}%`;
          },
        },
        {
          title: t1('completion_score'),
          key: 'completion_score',
          render: (row) => {
            const { p } = getCreditSyllabusProgressOfRow(row, cs) || {};
            return p || 0;
          },
        },
        {
          title: t1('passed_failed'),
          key: 'passed_failed',
          render: (row) => {
            const { passed } = getCreditSyllabusProgressOfRow(row, cs) || {};
            return passed ? t1('passed') : t1('failed');
          },
        },
        {
          title: t1('last_learned'),
          key: 'last_learned',
          render: (row) => {
            const { last_learned } =
              getCreditSyllabusProgressOfRow(row, cs) || {};
            return last_learned > 0
              ? timestampToDateTimeString(last_learned)
              : '--/--/--';
          },
        },
      ],
    })),
    {
      title: t1('overall_progress'),
      key: 'overall_progress',
      render: (row) => {
        return lodashGet(row, 'overallProgress') || null;
      },
    },
    {
      title: t1('last_learned'),
      key: 'last_learned',
      render: (row) => {
        const epLastLearned = lodashGet(row, 'last_learned');
        return epLastLearned > 0
          ? timestampToDateTimeString(epLastLearned)
          : '--/--/--';
      },
    },
  ];

  return (
    <AntdTable
      className="white-background"
      dataSource={data}
      columns={columns}
      pagination={false}
      bordered
      size="middle"
      scroll={{
        x: true,
      }}
    />
  );
};

export default withSchoolConfigs(Results);
