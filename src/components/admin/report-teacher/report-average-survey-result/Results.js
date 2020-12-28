import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import { courseLearningTypeToText } from 'configs/constants';
import { range } from 'common/utils/Array';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import './Results.scss';

class Results extends Component {
  render() {
    const cssClass = 'report-average-survey-result';

    const { result, objects, searchValues } = this.props;
    const surveys = lodashGet(objects, 'surveys');
    const learningType = lodashGet(searchValues, 'learning_type');
    const rangeOfMonths = range(1, 12);

    const columns = [
      {
        title: t1('stt'),
        key: 'stt',
        render: (text, row, index) => index + 1,
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: courseLearningTypeToText(learningType),
        key: 'learning_type',
        children: rangeOfMonths.reduce((childrenColumns, month) => {
          childrenColumns = childrenColumns.concat([
            {
              title: t1(`month_${month}`),
              key: month,
              render: (row) => {
                return (
                  lodashGet(
                    result,
                    `${lodashGet(row, 'iid')}.rating_by_month.${month}.avg`,
                  ) || null
                );
              },
            },
          ]);

          if (month % 3 === 0) {
            childrenColumns = childrenColumns.concat([
              {
                title: t1(`%s_month`, month),
                key: `first_${month}_month`,
                render: (row) => ({
                  children:
                    lodashGet(
                      result,
                      `${lodashGet(
                        row,
                        'iid',
                      )}.average_rating_from_beginning_of_year_til_a_month.${month}`,
                    ) || null,
                  props: { className: `${cssClass}__column-total-month` },
                }),
              },
            ]);
          }

          return childrenColumns;
        }, []),
      },
    ];

    return (
      <AntdTable
        className={'report-average-survey-result'}
        columns={columns}
        dataSource={surveys}
        bordered
        pagination={false}
        size="middle"
        childrenColumnName={null}
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};

Results.defaultProps = {
  items: [],
};

export default Results;
