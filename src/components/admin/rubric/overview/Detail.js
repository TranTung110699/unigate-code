import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Html from 'components/common/html';
import AntTable from 'antd/lib/table';
import { FormulaHelp } from '../utils';

class RubricOverview extends Component {
  render() {
    const { rubric } = this.props;

    const columns = [
      {
        title: t1('rubric_name'),
        dataIndex: 'name',
        key: 'name',
        width: '40%',
      },
      {
        title: t1('meaning'),
        key: 'sub_type',
        dataIndex: 'sub_type',
        width: '40%',
        render: (text, row, index) => FormulaHelp(get(row, 'sub_type')),
      },
      {
        title: t1('weight'),
        dataIndex: 'weighted',
        width: '10%',
        key: 'weighted',
        render: (text, row) => (row.weighted ? row.weighted : '-'),
      },
      {
        title: t1('passing_score'),
        dataIndex: 'pass_score',
        width: '10%',
        key: 'pass_score',
      },
    ];

    const childRubrics = get(rubric, 'children') || [];
    return (
      <div>
        <div>
          {t1('rubric_pass_score')}: <b>{get(rubric, 'pass_score')}</b>
        </div>

        <div>
          {t1('rubric_description')}:{' '}
          <b>{FormulaHelp(get(rubric, 'sub_type'))}</b>
        </div>

        <Html content={get(rubric, 'description')} />

        {Array.isArray(childRubrics) && childRubrics.length ? (
          <AntTable
            dataSource={childRubrics}
            columns={columns}
            rowKey="iid"
            pagination={false}
          />
        ) : null}
      </div>
    );
  }
}

export default RubricOverview;
