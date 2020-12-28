import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Avatar from 'components/common/avatar';
import { parseScoreToString } from 'common/utils/Score';
const cssClass = 'admin-course-score-normal-result';

const getContentByRubric = (
  row = {},
  rubric = {},
  renderMarking = () => {},
  renderGroupAssignment = () => {},
) => {
  if (getLodash(rubric, 'sub_type') === 'attendance') {
    return (
      <span>
        {getLodash(row, 'attendance.absent')}/
        {getLodash(row, 'attendance.total')}(
        {getLodash(row, 'attendance.passed') ? 'P' : 'F'})
      </span>
    );
  }

  const isEditScore = getLodash(row, 'isEditScore');
  const condition = getLodash(row, `condition.${rubric.iid}`);
  const { progress, score_scale, ...user } = row;
  return [
    isEditScore && condition
      ? renderMarking({
          rubric,
          user,
          progress,
          scoreScale: score_scale,
          rubricParentSubType: rubric.rubricParentSubType,
        })
      : getLodash(row, `progress.${rubric.iid}.p_original`),
    renderGroupAssignment(user, rubric),
  ];
};

const getRubricColumnTitle = (rubric) =>
  getLodash(rubric, 'weighted')
    ? `${getLodash(rubric, 'name')} (${getLodash(rubric, 'weighted')})`
    : getLodash(rubric, 'name');

const getRubricColumnClass = (rubric) =>
  getLodash(rubric, 'weighted') ? 'text-center text-bold' : 'text-center';

const getColumnByRubric = (
  rubric = {},
  renderMarking = () => {},
  renderGroupAssignment = () => {},
) => {
  const children = getLodash(rubric, 'children');
  // if no child rubrics || or 1 child
  if (!Array.isArray(children) || children.length <= 1) {
    const rubricRender =
      !Array.isArray(children) || !children.length ? rubric : children[0];

    rubricRender.rubricParentSubType =
      !Array.isArray(children) || !children.length
        ? rubric.rubricParentSubType
        : rubric.sub_type;

    return {
      title: getRubricColumnTitle(rubric),
      className: getRubricColumnClass(rubric),
      render: (text, row) => ({
        children: getContentByRubric(
          row,
          rubricRender,
          renderMarking,
          renderGroupAssignment,
        ),
        props: {
          className: 'text-center',
        },
      }),
    };
  }

  return {
    title: getRubricColumnTitle(rubric),
    className: getRubricColumnClass(rubric),
    children: children.map((child) =>
      getColumnByRubric(
        {
          ...child,
          rubricParentSubType: rubric.sub_type,
        },
        renderMarking,
        renderGroupAssignment,
      ),
    ),
  };
};

const getColumns = ({
  node = {},
  rubrics,
  rubricOriginal = {},
  renderMarking = () => {},
  renderGroupAssignment = () => {},
  hasPermUpdateTranscriptStatus,
  commentFinalScore = () => {},
}) =>
  [
    {
      title: t1('avatar'),
      key: 'ava',
      render: (text, row) => <Avatar user={row} />,
    },
    {
      title: t1('code'),
      key: 'code',
      render: (text, row) => <span>{row.code || row.iid}</span>,
    },
    {
      title: t1('name'),
      key: 'name',
      render: (text, row) => <div>{row.name}</div>,
    },
  ].concat(
    rubrics.map((rubric) =>
      getColumnByRubric(
        rubric,
        renderMarking,
        renderGroupAssignment,
        commentFinalScore,
      ),
    ),
    [
      {
        title: t1('average_score'),
        className: 'text-center text-bold',
        render: (text, row) => {
          const rubricIid = getLodash(rubricOriginal, 'iid');
          return {
            children: parseScoreToString(
              getLodash(row, `progress.${rubricIid}.p_original`, ''),
              getLodash(row, 'score_scale'),
            ),
            props: {
              className: 'text-center text-transform',
            },
          };
        },
      },
      {
        title: <span>{t1('passed')}</span>,
        className: 'text-center text-bold',
        render: (text, row) => {
          const graduated = getLodash(row, 'graduated');
          if (typeof graduated === 'undefined') {
            return null;
          }

          return {
            children: (
              <span
                className={
                  graduated
                    ? `${cssClass}__graduated-label--passed`
                    : `${cssClass}__graduated-label--failed`
                }
              >
                {graduated ? t1('passed') : t1('failed')}
                {commentFinalScore(row)}
              </span>
            ),
            props: {
              className: 'text-center',
            },
          };
        },
      },
    ],
  );

const editRubricForUser = (props) => {
  const {
    users,
    rubrics,
    progresses,
    node,
    score_scale,
    attendance,
    isEditScore,
    conditions,
  } = props;

  if (!Array.isArray(rubrics) || !rubrics.length) {
    return t1('rubrics_error');
  }

  return (
    <AntdTable
      columns={getColumns(props)}
      dataSource={
        Array.isArray(users)
          ? users.filter(Boolean).map((user) => {
              const userProgress = getLodash(progresses, user.iid);
              const graduated = getLodash(
                userProgress,
                `[${node.iid}].graduated`,
              );
              const allowedToTest = getLodash(
                userProgress,
                `[${node.iid}].allowed_to_test`,
              );
              return {
                ...user,
                condition: getLodash(conditions, user.iid),
                attendance: getLodash(attendance, user.iid),
                score_scale: getLodash(score_scale, user.iid),
                progress: userProgress,
                graduated,
                isEditScore,
                allowed_to_test: allowedToTest,
              };
            })
          : []
      }
      bordered
      pagination={false}
      size="middle"
    />
  );
};

export default editRubricForUser;
