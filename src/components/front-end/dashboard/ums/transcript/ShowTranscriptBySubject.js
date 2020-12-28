import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { scoreScaleTypes } from 'configs/constants';
import Icon from 'components/common/Icon';
import AntdTable from 'antd/lib/table';
import { getFinalScoreOfSubject } from './utils';

const columns = (
  scoreScale,
  testColSpan = 0,
  finalExamColSpan = 1,
  scoreScalesToShowFinalScore = [],
) => {
  const result = [
    {
      title: t1('stt'),
      key: 'id',
      className: 'text-center',
      render: (text, { stt, rowSpan }) => ({
        children: stt,
        props: {
          className: 'text-center',
          rowSpan: rowSpan,
        },
      }),
    },
    {
      title: t1('subject_name'),
      key: 'id',
      className: 'text-center',
      render: (text, { subject, rowSpan }) => ({
        children: `${subject.name} (${subject.code})`,
        props: {
          className: '',
          rowSpan: rowSpan,
        },
      }),
    },
    {
      title: t1('credit'),
      key: 'id',
      className: 'text-center',
      render: (text, { subject, rowSpan }) => ({
        children: subject.credit,
        props: {
          className: 'text-center',
          rowSpan: rowSpan,
        },
      }),
    },
  ]
    .concat(
      scoreScale === scoreScaleTypes.pmd
        ? [
            {
              title: t1('pmd_final_score'),
              className: 'text-center',
              render: (
                text,
                { history, numberOfRepeatSubject, creditTransfert },
              ) => {
                let children = '';
                if (creditTransfert) {
                  children = t1('credit_transferted');
                } else {
                  children = getFinalScoreOfSubject(
                    scoreScale,
                    getLodash(history, 'current_score.p_original'),
                  );
                }

                return {
                  children,
                  props: {
                    className: 'text-center',
                    colSpan:
                      !numberOfRepeatSubject || numberOfRepeatSubject === 1
                        ? 2
                        : 1,
                  },
                };
              },
            },
            {
              title: t1('pmd_final_grade'),
              className: 'text-center',
              render: (
                text,
                { subject, numberOfRepeatSubject, final_score },
              ) => {
                let children = '';
                if (!subject.weighted) {
                  children = t1('is_skill_course_or_prerequisites');
                } else {
                  children = getFinalScoreOfSubject(
                    scoreScale,
                    getLodash(final_score, 'p_original'),
                  );
                }

                return {
                  children,
                  props: {
                    className: 'text-center',
                    colSpan:
                      !numberOfRepeatSubject || numberOfRepeatSubject === 1
                        ? 0
                        : 1,
                  },
                };
              },
            },
          ]
        : [
            {
              title: t1('attendance'),
              className: 'text-center',
              render: (text, { creditTransfert, history }) => {
                if (creditTransfert) {
                  return {
                    children: t1('credit_transferted'),
                    props: {
                      className: 'text-center',
                      colSpan:
                        1 +
                        (testColSpan > 0 && testColSpan) +
                        (finalExamColSpan || 1) +
                        2 +
                        2 +
                        (Array.isArray(scoreScalesToShowFinalScore)
                          ? scoreScalesToShowFinalScore.length
                          : 0),
                    },
                  };
                }

                const rubrics = getLodash(history, 'rubrics');
                const attendanceRubric =
                  Array.isArray(rubrics) &&
                  rubrics.find(
                    (rubric) => rubric && rubric.sub_type === 'attendance',
                  );

                return {
                  children: getLodash(attendanceRubric, 'p_original'),
                  props: {
                    className: 'text-center',
                  },
                };
              },
            },
            testColSpan > 0 && {
              title: t1('component_score'),
              className: 'text-center',
              children: Array(...Array(testColSpan)).map((value, index) => ({
                title: t1('on_going_%s', [index + 1]),
                className: 'text-center',
                render: (text, { history, creditTransfert }) => {
                  if (creditTransfert) {
                    return {
                      children: t1('credit_transferted'),
                      props: {
                        className: 'text-center',
                        colSpan: 0,
                      },
                    };
                  }

                  const rubrics = getLodash(history, 'rubrics');
                  const testRubrics =
                    Array.isArray(rubrics) &&
                    rubrics
                      .filter(
                        (rubric) =>
                          !['attendance', 'academic_score'].includes(
                            rubric && rubric.sub_type,
                          ),
                      )
                      .reduce(
                        (tRubrics, rubric) =>
                          Array.isArray(rubric.children) &&
                          rubric.children.length
                            ? tRubrics.concat(rubric.children)
                            : tRubrics.concat([rubric]),
                        [],
                      );

                  return {
                    children:
                      getLodash(testRubrics, `[${index}].po`) &&
                      getLodash(testRubrics, `[${index}].p_original`),
                    props: {
                      className: 'text-center',
                    },
                  };
                },
              })),
            },
            {
              title: t1('final_score'),
              className: 'text-center',
              children: Array(...Array(finalExamColSpan || 1)).map(
                (value, index) => ({
                  title: t1(`final_exam_${index}`),
                  className: 'text-center',
                  render: (text, { history, creditTransfert }) => {
                    if (creditTransfert) {
                      return {
                        children: t1('credit_transferted'),
                        props: {
                          className: 'text-center',
                          colSpan: 0,
                        },
                      };
                    }

                    const rubrics = getLodash(history, 'rubrics');
                    const academicRubric =
                      Array.isArray(rubrics) &&
                      rubrics.find(
                        (rubric) =>
                          rubric && rubric.sub_type === 'academic_score',
                      );

                    return {
                      children:
                        getLodash(academicRubric, `children.${index}.po`) &&
                        getFinalScoreOfSubject(
                          scoreScale,
                          getLodash(
                            academicRubric,
                            `children.${index}.p_original`,
                          ),
                        ),
                      props: {
                        className: 'text-center',
                      },
                    };
                  },
                }),
              ),
            },
            {
              title: t1('average_score'),
              className: 'text-center',
              children: [
                {
                  title: t1('status_passed'),
                  className: 'text-center',
                  render: (text, { history, creditTransfert }) => {
                    if (creditTransfert) {
                      return {
                        children: t1('credit_transferted'),
                        props: {
                          className: 'text-center',
                          colSpan: 0,
                        },
                      };
                    }

                    const passed = getLodash(history, 'current_score.pf');

                    return {
                      children: (
                        <Icon
                          icon={passed ? 'check' : 'cancel'}
                          style={{
                            fontSize: 20,
                            color: passed ? 'deepskyblue' : 'red',
                          }}
                        />
                      ),
                      props: {
                        className: 'text-center',
                      },
                    };
                  },
                },
                {
                  title: t1('score'),
                  className: 'text-center',
                  render: (text, { history, creditTransfert }) => {
                    if (creditTransfert) {
                      return {
                        children: t1('credit_transferted'),
                        props: {
                          className: 'text-center',
                          colSpan: 0,
                        },
                      };
                    }

                    return {
                      children: getLodash(history, `current_score.p_original`),
                      props: {
                        className: 'text-center',
                      },
                    };
                  },
                },
              ],
            },
            {
              title: t1('final_grade'),
              className: 'text-center',
              children: [
                {
                  title: t1('status_passed'),
                  className: 'text-center',
                  render: (text, { final_score, rowSpan, creditTransfert }) => {
                    if (creditTransfert) {
                      return {
                        children: t1('credit_transferted'),
                        props: {
                          className: 'text-center',
                          colSpan: 0,
                        },
                      };
                    }

                    const passed = getLodash(final_score, 'pf');

                    return {
                      children: (
                        <Icon
                          icon={passed ? 'check' : 'cancel'}
                          style={{
                            fontSize: 20,
                            color: passed ? 'deepskyblue' : 'red',
                          }}
                        />
                      ),
                      props: {
                        className: 'text-center',
                        rowSpan: rowSpan,
                      },
                    };
                  },
                },
                {
                  title: t1(`score_by_scale_${scoreScale}`),
                  className: 'text-center',
                  render: (
                    text,
                    { subject, final_score, rowSpan, creditTransfert },
                  ) => {
                    if (creditTransfert) {
                      return {
                        children: t1('credit_transferted'),
                        props: {
                          className: 'text-center',
                          colSpan: 0,
                        },
                      };
                    }

                    if (!subject.weighted) {
                      return {
                        children: t1(t1('is_skill_course_or_prerequisites')),
                        props: {
                          className: 'text-center',
                          rowSpan: rowSpan,
                          colSpan:
                            1 +
                            (Array.isArray(scoreScalesToShowFinalScore)
                              ? scoreScalesToShowFinalScore.length
                              : 0),
                        },
                      };
                    }

                    return {
                      children: getLodash(final_score, 'p_original'),
                      props: {
                        className: 'text-center',
                        rowSpan: rowSpan,
                      },
                    };
                  },
                },
              ].concat(
                Array.isArray(scoreScalesToShowFinalScore)
                  ? scoreScalesToShowFinalScore.map((scale) => ({
                      title: t1(`score_by_scale_${scale}`),
                      className: 'text-center',
                      render: (
                        text,
                        { subject, final_score, rowSpan, creditTransfert },
                      ) => {
                        if (creditTransfert) {
                          return {
                            children: t1('credit_transferted'),
                            props: {
                              className: 'text-center',
                              colSpan: 0,
                            },
                          };
                        }

                        if (!subject.weighted) {
                          return {
                            children: t1(
                              t1('is_skill_course_or_prerequisites'),
                            ),
                            props: {
                              className: 'text-center',
                              rowSpan: rowSpan,
                              colSpan: 0,
                            },
                          };
                        }

                        return {
                          children: getLodash(final_score, scale),
                          props: {
                            className: 'text-center',
                            rowSpan: rowSpan,
                          },
                        };
                      },
                    }))
                  : [],
              ),
            },
          ],
    )
    .filter(Boolean);
  return result;
};

const getDataSource = (transcript) => {
  if (!Array.isArray(transcript) || !transcript.length) {
    return [];
  }

  let stt = 0;
  return transcript.reduce((subjects, { subject, histories, final_score }) => {
    if (
      !subject ||
      !subject.iid ||
      (!Array.isArray(histories) &&
        (!final_score || !final_score.credit_transfert))
    ) {
      return subjects;
    }

    stt += 1;
    if (final_score && final_score.credit_transfert) {
      return subjects.concat([
        {
          stt,
          subject,
          creditTransfert: 1,
          rowSpan: 1,
        },
      ]);
    }

    const numberOfRepeatSubject = histories.length;
    return subjects.concat(
      histories.map((history, index) => {
        return {
          stt,
          subject,
          history,
          final_score,
          numberOfRepeatSubject,
          rowSpan: index ? 0 : numberOfRepeatSubject,
        };
      }),
    );
  }, []);
};

const showTranscriptBySemester = ({
  scoreScale,
  testColSpan,
  finalExamColSpan,
  transcript,
  scoreScalesToShowFinalScore,
}) => {
  return (
    <AntdTable
      columns={columns(
        scoreScale,
        testColSpan,
        finalExamColSpan,
        scoreScalesToShowFinalScore,
      )}
      dataSource={getDataSource(transcript)}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default showTranscriptBySemester;
