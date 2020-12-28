import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import get from 'lodash.get';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import { scoreScaleTypes } from 'configs/constants';

class Results extends Component {
  render() {
    const { items, page, scoreScaleFilter } = this.props;
    const position =
      (parseInt(get(page, 'page', 0)) - 1) *
      parseInt(get(page, 'items_per_page', 0));
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1 + position,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('student_information'),
        className: 'text-center',
        children: [
          {
            title: t1('code'),
            render: (text, row) => ({
              children: get(row, 'user.code'),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('last_name'),
            render: (text, row) => get(row, 'user.last_name'),
          },
          {
            title: t1('first_name'),
            render: (text, row) => ({
              children: get(row, 'user.first_name'),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('birthday'),
            render: (text, row) => {
              const birthday = get(row, 'user.birthday');
              return {
                children: birthday ? timestampToDateString(birthday) : '',
                props: {
                  className: 'text-center',
                },
              };
            },
          },
        ],
      },
      {
        title: t1('form_of_training_information'),
        className: 'text-center',
        children: [
          {
            title: t1('training_mode'),
            render: (text, row) => ({
              children: t1(get(row, 'training_mode')),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('major'),
            render: (text, row) => get(row, 'majorObject.name'),
          },
          {
            title: t1('ico'),
            render: (text, row) => ({
              children: get(row, 'icoObject.name'),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('semester'),
            render: (text, row) => get(row, 'semesterObject.name'),
          },
          {
            title: t1('school_year'),
            render: (text, row) => get(row, 'schoolYear.name'),
          },
        ],
      },
      {
        title: t1('accumulated_credit'),
        render: (text, row) => ({
          children: get(row, 'accumulation.total_credit'),
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('average_score_(GPA)'),
        className: 'text-center',
        children: [
          {
            title: t1('GPA_on_the_score_scale_currently_filter'),
            render: (text, row) => {
              let score = '';
              switch (scoreScaleFilter) {
                case scoreScaleTypes.pmd: {
                  score = parseFloat(
                    get(row, 'accumulation.number_average_score', 0),
                  ).toFixed(2);
                  break;
                }
                case scoreScaleTypes.abcdf: {
                  score = get(row, 'accumulation.average_score') || '';
                  break;
                }
                default: {
                  score = parseFloat(
                    get(
                      row,
                      `accumulation.average_score_by_${scoreScaleFilter ||
                        scoreScaleTypes['0_4']}`,
                      0,
                    ),
                  ).toFixed(2);
                }
              }
              return {
                children: score,
                props: {
                  colSpan:
                    !scoreScaleFilter ||
                    scoreScaleFilter === scoreScaleTypes['0_4']
                      ? 2
                      : 1,
                  className: 'text-center',
                },
              };
            },
          },
          {
            title: t1('GPA_on_the_score_scale_0-4'),
            render: (text, row) => {
              const score = get(row, 'accumulation.average_score_by_0_4', 0);
              return {
                children: score ? parseInt(score).toFixed(2) : 0,
                props: {
                  colSpan:
                    !scoreScaleFilter ||
                    scoreScaleFilter === scoreScaleTypes['0_4']
                      ? 0
                      : 1,
                  className: 'text-center',
                },
              };
            },
          },
        ],
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
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
