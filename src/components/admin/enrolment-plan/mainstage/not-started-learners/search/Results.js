import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';

import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends React.Component {
  width = {
    code: '10%',
    name: '10%',
    enrolmentPlan: '10%',
  };

  render() {
    const { items, columnsNotToShow } = this.props;

    let modifiedItems = unwind(
      unwind(items, 'credit_syllabuses_of_enrolment_plan'),
      'credit_syllabuses_of_enrolment_plan.credit_syllabuses',
    );

    const groupKeyUserIid = 'user.iid';
    const groupKeyEnrolmentPlanIid =
      'credit_syllabuses_of_enrolment_plan.enrolment_plan.iid';

    modifiedItems = populateRowSpanInfoToRenderListOfItemAsTable(
      modifiedItems,
      [groupKeyUserIid, groupKeyEnrolmentPlanIid],
    );

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              {!(columnsNotToShow || []).includes('code') && (
                <TableHeaderColumn width={this.width.code}>
                  {t1('code')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('name') && (
                <TableHeaderColumn width={this.width.name}>
                  {t1('name')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('enrolment_plan') && (
                <TableHeaderColumn width={this.width.enrolmentPlan}>
                  {t1('enrolment_plan')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('credit_syllabuses') && (
                <TableHeaderColumn>
                  {t1('not_started_credit_syllabuses')}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            showRowHover={false}
            stripedRows={false}
          >
            {modifiedItems &&
              modifiedItems.map((item) => {
                const user = lodashGet(item, 'user');
                const enrolmentPlan = lodashGet(
                  item,
                  'credit_syllabuses_of_enrolment_plan.enrolment_plan',
                );
                const creditSyllabus = lodashGet(
                  item,
                  'credit_syllabuses_of_enrolment_plan.credit_syllabuses',
                );
                const rowSpans = lodashGet(item, 'rowSpans') || {};
                const userRowSpan = rowSpans[groupKeyUserIid] || 0;
                const enrolmentPlanRowSpan =
                  rowSpans[groupKeyEnrolmentPlanIid] || 0;

                return (
                  <TableRow
                    key={`${lodashGet(user, 'iid')}_${lodashGet(
                      enrolmentPlan,
                      'iid',
                    )}`}
                  >
                    {userRowSpan && !(columnsNotToShow || []).includes('code') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        width={this.width.code}
                      >
                        {lodashGet(user, 'code')}
                      </TableRowColumn>
                    )}
                    {userRowSpan && !(columnsNotToShow || []).includes('name') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        width={this.width.name}
                      >
                        {lodashGet(user, 'name')}
                      </TableRowColumn>
                    )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('enrolment_plan') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          width={this.width.enrolmentPlan}
                        >
                          {lodashGet(enrolmentPlan, 'name')}
                        </TableRowColumn>
                      )}
                    {!(columnsNotToShow || []).includes(
                      'credit_syllabuses',
                    ) && (
                      <TableRowColumn>
                        {lodashGet(creditSyllabus, 'name')}
                      </TableRowColumn>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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
