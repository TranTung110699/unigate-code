import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Html from 'components/common/html';
import AntTable from 'antd/lib/table';
import { FormulaHelp } from 'components/admin/rubric/utils';
import IconHelp from 'components/common/Icon/Help';
import PassFailIcon from 'components/admin/course/mainstage/score-and-marking/score-by-rubric/PassFailIcon';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import { allRubricSubTypes } from 'components/admin/rubric/utils';
import RubricDescription from './RubricDescription';

const dialogOptionsProperties = {
  width: '50%',
  handleClose: true,
  minHeight: '300px',
};

class RubricOverview extends Component {
  render() {
    const { itemIid, itemNtype, rubric, scoreByRubrik } = this.props;

    const columns = [
      {
        title: t1('rubric_name'),
        dataIndex: 'name',
        key: 'name',
        width: '45%',
        render: (text, row, index) => (
          <div>
            {row.name}{' '}
            <DetailOnDialog
              dialogKey={`rubrid-details-${row.iid}`}
              renderPreview={({ showFull }) => (
                <span
                  onClick={showFull}
                  title={t1('click_to_view_rubric_details')}
                  className="cursor-pointer"
                >
                  <IconHelp />
                </span>
              )}
              renderFull={({ closeDialog }) => (
                <div>
                  <h1>{t1('rubric_description')}</h1>
                  <RubricDescription rubric={row} />
                </div>
              )}
              dialogOptionsProperties={dialogOptionsProperties}
            />
          </div>
        ),
      },
      // {
      //   title: t1('meaning'),
      //   key: 'sub_type',
      //   dataIndex: 'sub_type',
      //   width: '40%',
      //   render: (text, row, index) => FormulaHelp(get(row, 'sub_type'))
      // },
      {
        title: t1('rubric_weight'),
        dataIndex: 'weighted',
        width: '15%',
        key: 'weighted',
        render: (text, row) => (row.weighted ? row.weighted : '-'),
      },
      // {
      //   title: t1('passing_score'),
      //   dataIndex: 'pass_score',
      //   width: '20%',
      //   key: 'pass_score',
      // },
      {
        title: (
          <span>
            {t1('score')}
            <br />
            /100
          </span>
        ),
        dataIndex: 'score',
        width: '15%',
        key: 'score',
        render: (val, row) => {
          const score = scoreByRubrik
            ? get(scoreByRubrik.find((el) => el.iid == row.iid), 'score')
            : null;

          if (
            get(row, 'sub_type') == allRubricSubTypes.RUBRIC_FORMULA_TAKE_SURVEY
          ) {
            if (score) return <PassFailIcon passed={1} />;
            else return <PassFailIcon passed={0} />;
          }

          return score;
        },
      },

      {
        title: t1('passed'),
        dataIndex: 'passed',
        width: '15%',
        key: 'passed',
        render: (val, row) => {
          const passed = scoreByRubrik
            ? get(scoreByRubrik.find((el) => el.iid == row.iid), 'passed')
            : null;
          return <PassFailIcon passed={passed || 0} />;
        },
      },
    ];

    const childRubrics = get(rubric, 'children') || [];
    return Array.isArray(childRubrics) && childRubrics.length ? (
      <AntTable
        dataSource={childRubrics}
        columns={columns}
        rowKey="iid"
        pagination={false}
      />
    ) : null;
  }
}

export default RubricOverview;
