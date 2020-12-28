import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { courseLearningTypes } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';
import '../report-by-organization/stylesheet.scss';
import { getCurrentMonth } from 'common/utils/Date';

class Results extends Component {
  getValueForObjectivesOnEachCriterionForEveryMonthOfYear = (month, data) => {
    const learningType = get(this.props, 'learningType');
    switch (data.objectives) {
      case 'number_of_courses':
      case 'number_of_learned':
      case 'number_of_users': {
        return get(data, month);
      }
      case 'number_of_dates': {
        if (learningType === courseLearningTypes.ONLINE) {
          const numberOfHours = get(data, `number_of_hours.${month}`);
          if (!numberOfHours) {
            return null;
          }
          return numberOfHours % 8 === 0
            ? numberOfHours / 8
            : (numberOfHours / 8).toFixed(1);
        }

        const numbersOfSession = get(data, `numbers_of_session.${month}`);
        if (!numbersOfSession) {
          return null;
        }
        return numbersOfSession % 2 === 0
          ? numbersOfSession / 2
          : (numbersOfSession / 2).toFixed(1);
      }
      case 'total_of_learned': {
        const numberOfLearned = get(data, `number_of_learned.${month}`);
        if (!numberOfLearned) {
          return '';
        }
        const numbersOfSession =
          learningType === courseLearningTypes.ONLINE
            ? 1
            : get(data, `numbers_of_session.${month}`, 1);

        return numberOfLearned * numbersOfSession;
      }
      case 'total_of_invites': {
        const numberOfInvites = get(data, `number_of_invites.${month}`);
        if (!numberOfInvites) {
          return '';
        }
        const numbersOfSession =
          learningType === courseLearningTypes.ONLINE
            ? 1
            : get(data, `numbers_of_session.${month}`, 1);

        return numberOfInvites * numbersOfSession;
      }
      case 'rate_of_learned': {
        const numberOfInvites = get(data, `number_of_invites.${month}`);
        if (!numberOfInvites) {
          return '';
        }

        const value = get(data, `number_of_learned.${month}`, 0) * 100;

        return value % numberOfInvites === 0
          ? value / numberOfInvites
          : (value / numberOfInvites).toFixed(2);
      }
      default: {
        return '';
      }
    }
  };

  getDataToRenderInMonthColumn = (month, row) => {
    const data = this.getValueForObjectivesOnEachCriterionForEveryMonthOfYear(
      month,
      row,
    );

    if (data) {
      return data;
    }

    const currentMonth = getCurrentMonth();
    if (month >= currentMonth) {
      return t1('n/a');
    }
    return 0;
  };

  createMonthColumns = () => {
    const monthColumns = [];

    for (let month = 1; month <= 12; ++month) {
      monthColumns.push({
        title: t1(`month_${month}`),
        render: (text, row) => ({
          children: this.getDataToRenderInMonthColumn(month, row),
          props: {
            className: 'text-center',
          },
        }),
      });

      if (month % 3 === 0) {
        monthColumns.push({
          title: `${month} ${t1('month')}`,
          render: (text, row) => ({
            children: this.getDataToRenderInMonthColumn(`1_${month}`, row),
            props: {
              className: 'column-total-month text-center',
            },
          }),
        });
      }
    }
    return monthColumns;
  };

  getColumns = () => {
    const columns = [
      {
        title: t1('stt'),
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('academic_category'),
        key: 'id',
        render: (text, row, index) => ({
          children: get(row, 'academic_categorie.name'),
          props: {
            rowSpan: index % 7 === 0 ? 7 : 0,
          },
        }),
      },
      {
        title: t1('report_objectives'),
        render: (text, row) => {
          const children =
            row.objectives === 'number_of_courses'
              ? t1('number_of_credits')
              : t1(row.objectives);
          return {
            children:
              row.objectives === 'rate_of_learned'
                ? `${children} (%)`
                : children,
            props: {},
          };
        },
      },
      {
        title:
          get(this.props, 'learningType') === courseLearningTypes.ONLINE
            ? t1('online_training')
            : t1('offline_training'),
        children: this.createMonthColumns(),
      },
    ];

    return columns;
  };

  getDataSource = (items) =>
    items.reduce(
      (result, { academic_categorie, report_objectives = {} }) =>
        result.concat(
          [
            'number_of_courses',
            'number_of_dates',
            'number_of_learned',
            'total_of_learned',
            'number_of_users',
            'total_of_invites',
            'rate_of_learned',
          ].map((key, index) => {
            const id = `${get(academic_categorie, 'iid')}_${key}__${index}`;
            switch (key) {
              case 'number_of_courses': {
                return {
                  ...(report_objectives.number_of_courses || {}),
                  academic_categorie,
                  objectives: key,
                  id,
                };
              }
              case 'number_of_dates': {
                return {
                  objectives: key,
                  numbers_of_session: report_objectives.numbers_of_session,
                  number_of_hours: report_objectives.number_of_hours,
                  id,
                };
              }
              case 'number_of_learned': {
                return {
                  ...(report_objectives.number_of_learned || {}),
                  objectives: key,
                  id,
                };
              }
              case 'number_of_users': {
                return {
                  ...(report_objectives.number_of_users || {}),
                  objectives: key,
                  id,
                };
              }
              case 'rate_of_learned': {
                return {
                  objectives: key,
                  number_of_invites: report_objectives.number_of_invites,
                  number_of_learned: report_objectives.number_of_learned,
                  id,
                };
              }
              default: {
                return {
                  objectives: key,
                  numbers_of_session: report_objectives.numbers_of_session,
                  number_of_invites: report_objectives.number_of_invites,
                  number_of_learned: report_objectives.number_of_learned,
                };
              }
            }
          }),
        ),
      [],
    );

  render() {
    const { items } = this.props;

    if (!Array.isArray(items) || !items.length) {
      return <h3>{t1('no_report_data_available')}</h3>;
    }

    return (
      <AntdTable
        columns={this.getColumns()}
        dataSource={this.getDataSource(items)}
        pagination={false}
        rowClassName={(record) => {
          return get(record, 'objectives') === 'rate_of_learned'
            ? 'highlight-rate-row'
            : '';
        }}
        bordered
        size="middle"
        className="report-progress-master-by-academic-category"
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
