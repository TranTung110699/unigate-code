import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import getLodash from 'lodash.get';
import ShowFullWhenHover from 'components/common/html/show-full-when-hover';

const Results = ({ items = [], rubrics = [] }) => {
  if (!Array.isArray(items) || !items.length) {
    return <div>NOT FOUND</div>;
  }

  const columns = [
    {
      title: t1('stt'),
      key: 'id',
      render: (text, row) => ({
        children: row.stt + 1,
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('student_information'),
      children: [
        {
          title: t1('student_code'),
          render: (text, row) => getLodash(row, 'student.code'),
        },
        {
          title: t1('student_full_name'),
          render: (text, row) => getLodash(row, 'student.name'),
        },
        {
          title: t1('student_major'),
          render: (text, row) => getLodash(row, 'student.major'),
        },
      ],
    },
    {
      title: t1('subject_information'),
      children: [
        {
          title: t1('semester_code'),
          render: (text, row) => getLodash(row, 'semester_code'),
        },
        {
          title: t1('subject_code'),
          render: (text, row) => getLodash(row, 'subject_code'),
        },
        {
          title: t1('course_code'),
          render: (text, row) => getLodash(row, 'course_code'),
        },
        {
          title: t1('number_of_relearn'),
          render: (text, row) => ({
            children: getLodash(row, 'number_of_relearn'),
            props: {
              className: 'text-center',
            },
          }),
        },
        {
          title: t1('score_scale'),
          render: (text, row) => ({
            children: getLodash(row, 'score_scale'),
            props: {
              className: 'text-center',
            },
          }),
        },
      ],
    },
  ]
    .concat(
      Array.isArray(rubrics) && rubrics.length
        ? rubrics.map((rubric) => {
            if (
              !Array.isArray(rubric.children) ||
              rubric.children.length <= 1
            ) {
              return {
                title: `${rubric.name} (${rubric.weighted}%)`,
                render: (text, row) => {
                  const scores = getLodash(row, 'scores') || [];
                  const score = scores.find((sc) => {
                    if (
                      Array.isArray(rubric.children) &&
                      rubric.children.length === 1
                    ) {
                      return (
                        String(sc.iid) ===
                        String(getLodash(rubric, 'children.[0].iid'))
                      );
                    }
                    return String(sc.iid) === String(rubric.iid);
                  });
                  return {
                    children: getLodash(score, 'p'),
                    props: {
                      className: 'text-center',
                    },
                  };
                },
              };
            }

            return {
              title: `${rubric.name} (${rubric.weighted}%)`,
              children: rubric.children.map((child) => ({
                title:
                  rubric.sub_type === 'academic_score'
                    ? child.name
                    : `${child.name} (${child.weighted}%)`,
                render: (text, row) => {
                  const scores = getLodash(row, 'scores') || [];
                  const score = scores.find(
                    (sc) => String(sc.iid) === String(child.iid),
                  );
                  return {
                    children: getLodash(score, 'p'),
                    props: {
                      className: 'text-center',
                    },
                  };
                },
              })),
            };
          })
        : [],
      [
        {
          title: t1('errors'),
          render: (text, row) => {
            const errors = getLodash(row, 'errors');

            if (!Array.isArray(errors) || !errors.length) {
              return '';
            }
            if (errors.length > 1) {
              return (
                <ul>
                  {errors.map((err) => (
                    <li>
                      <ShowFullWhenHover content={err} style={{ width: 100 }} />
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <ShowFullWhenHover content={errors[0]} style={{ width: 100 }} />
            );
          },
        },
      ],
    )
    .filter(Boolean);

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
