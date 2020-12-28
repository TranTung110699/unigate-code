import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { surveyStatusToText } from 'configs/constants/survey';
import SurveyAppliedItemPosition from 'components/admin/survey/mainstage/applied-items/common/SurveyAppliedItemPosition';
import lodashGet from 'lodash.get';
import ButtonEdit from 'components/admin/survey/mainstage/applied-items/edit/ButtonEdit';
import ButtonDelete from 'components/admin/survey/mainstage/applied-items/delete/ButtonDelete';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  render() {
    const { items, formid, columnsNotToShow } = this.props;
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              {!(columnsNotToShow || []).includes('code') && (
                <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('name') && (
                <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('applied_position') && (
                <TableHeaderColumn>{t1('applied_position')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('status') && (
                <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('action') && (
                <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.filter(Boolean).map((item) => (
                <TableRow key={item.id}>
                  {!(columnsNotToShow || []).includes('code') && (
                    <TableRowColumn>
                      {lodashGet(item, '__expand.survey_iid.code')}
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('name') && (
                    <TableRowColumn>
                      {lodashGet(item, '__expand.survey_iid.name')}
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('applied_position') && (
                    <TableRowColumn>
                      <SurveyAppliedItemPosition item={item} />
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('status') && (
                    <TableRowColumn>
                      {surveyStatusToText(
                        lodashGet(item, '__expand.survey_iid.status'),
                      )}
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('action') && (
                    <TableRowColumn>
                      <ButtonEdit
                        searchFormId={formid}
                        node={item}
                        step="applied_position"
                      />
                      <ButtonDelete searchFormId={formid} item={item} />
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
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
