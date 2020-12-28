import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import { populateRowSpanInfoToRenderListOfItemAsTable } from 'common/utils/Array';

import { t1 } from 'translate';
import AntTable from 'antd/lib/table';
import { showInTable } from 'common/utils/antd';

class Results extends React.Component {
  width = {
    code: '10%',
    name: '20%',
    enrolmentPlan: '10%',
  };

  render() {
    const { items, columnsNotToShow } = this.props;

    let modifiedItems = populateRowSpanInfoToRenderListOfItemAsTable(items, [
      'enrolment_plan.iid',
      'credit_syllabus.program.iid',
    ]);

    const columns = [
      {
        title: t1('enrolment_plan'),
        key: 'enrolment_plan',
        width: this.width.enrolment_plan,
        dataIndex: 'enrolment_plan',
        render: (enrolmentPlan, item) => {
          const rowSpan = lodashGet(item, 'rowSpans["enrolment_plan.iid"]');
          return {
            props: {
              rowSpan,
            },
            children: lodashGet(enrolmentPlan, 'name'),
          };
        },
      },
      {
        title: t1('credit_syllabus_name'),
        key: 'name',
        width: this.width.name,
        dataIndex: 'credit_syllabus',
        render: (creditSyllabus) => (
          <>
            {lodashGet(creditSyllabus, 'name')}
            {lodashGet(creditSyllabus, 'program.name') ? (
              <div className="text-muted">
                {lodashGet(creditSyllabus, 'program.name')}
              </div>
            ) : null}
          </>
        ),
      },
      {
        title: t1('average_score'),
        key: 'avg_progress',
        width: this.width.avg_progress,
        dataIndex: 'avg_progress',
      },
      {
        title: t1('average_completion_progress'),
        key: 'avg_cp',
        width: this.width.avg_cp,
        dataIndex: 'avg_cp',
      },
      {
        title: t1('passed'),
        key: 'passed_total',
        width: this.width.passed_total,
        dataIndex: 'passed_total',
      },
      {
        title: t1('not_passed'),
        key: 'not_passed_total',
        width: this.width.not_passed_total,
        dataIndex: 'not_passed_total',
      },
    ];

    return (
      <div className="table-result">
        <AntTable
          dataSource={modifiedItems}
          columns={showInTable(columns, columnsNotToShow)}
          className="white-background"
          childrenColumnName={null}
          pagination={false}
          bordered
          rowKey="id"
        />
      </div>
    );
  }
}

Results.propTypes = {
  data: PropTypes.shape(),
};

Results.defaultProps = {
  data: {},
};

export default Results;
