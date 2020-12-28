import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import lodashGet from 'lodash.get';
import Links from 'routes/links';
import OpenEndedTake from 'components/common/open-ended-take';
import IconButton from 'material-ui/IconButton';
import { ntype as allNtypes } from 'configs/constants';

const Results = ({ items }) => {
  const columns = [
    {
      title: t1('course'),
      key: 'course',
      dataIndex: 'course',
      render: (course) => {
        const enrolmentPlan = lodashGet(course, '__expand.enrolment_plans[0]');
        const enrolmentPlanName = lodashGet(enrolmentPlan, 'name');

        return (
          <div>
            <div>{lodashGet(course, 'name')}</div>
            <div>{enrolmentPlanName ? `(${enrolmentPlanName})` : ''}</div>
          </div>
        );
      },
    },
    {
      title: t1('assignment'),
      key: 'open_ended_take',
      dataIndex: 'open_ended_take',
      render: (take) => {
        return <OpenEndedTake borderBottom={false} take={take} />;
      },
    },
    {
      title: t1('score'),
      key: 'open_ended_take.score',
      dataIndex: 'open_ended_take.score',
      render: (score) => {
        return !isNaN(score) ? score : null;
      },
    },
    {
      title: t1('action'),
      dataIndex: 'open_ended_take',
      key: 'action',
      render: (take, row) => {
        const course = lodashGet(row, 'course');
        const questionAncestors = lodashGet(take, 'ancestors');
        const getAncestorWithNtype = (ntype) =>
          Array.isArray(questionAncestors)
            ? questionAncestors.find((a) => lodashGet(a, 'ntype') === ntype)
            : null;

        const exercise = getAncestorWithNtype(allNtypes.EXERCISE);
        const sco = getAncestorWithNtype(allNtypes.SCO);

        return (
          <IconButton
            iconClassName="ti-pencil"
            containerElement={
              <Link
                to={Links.learnCourse(
                  course,
                  `${lodashGet(sco, 'iid')}-${lodashGet(exercise, 'iid')}`,
                )}
              />
            }
            title={t1('go_to_assignment')}
          />
        );
      },
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

export default Results;
