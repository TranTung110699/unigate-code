import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { getThemeConfig } from '../../../../utils/selectors';
import { layouts } from '../../../../configs/constants';

class Results extends Component {
  tableHeaderColumnStyle = { textAlign: 'center' };

  render() {
    const { items, themeConfig } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('stt')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('phone')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('email')}
              </TableHeaderColumn>
              {themeConfig &&
                themeConfig.layout === layouts.UMS && [
                  <TableHeaderColumn width="10%" rowSpan="2">
                    {t1('courses_number')}
                  </TableHeaderColumn>,
                  <TableHeaderColumn
                    colSpan="2"
                    style={this.tableHeaderColumnStyle}
                  >
                    {t1('feedback_info')}
                  </TableHeaderColumn>,
                ]}
              <TableHeaderColumn
                colSpan="3"
                style={this.tableHeaderColumnStyle}
              >
                {t1('hours_number')}
              </TableHeaderColumn>
              {themeConfig &&
                themeConfig.layout === layouts.UMS && [
                  <TableHeaderColumn
                    colSpan="2"
                    style={this.tableHeaderColumnStyle}
                  >
                    {t1('ratio')}
                  </TableHeaderColumn>,
                ]}
            </TableRow>
            <TableRow>
              {themeConfig &&
                themeConfig.layout === layouts.UMS && [
                  <TableHeaderColumn>{t1('average_rate')}</TableHeaderColumn>,
                  <TableHeaderColumn>{t1('total_rate')}</TableHeaderColumn>,
                ]}
              <TableHeaderColumn>{t1('taught')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('assigned')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('not_taught')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {items && items.length && (
            <TableBody displayRowCheckbox={false} showRowHover>
              {items.map((item) => (
                <TableRow key={item.id || item.iid}>
                  <TableRowColumn width="10%">
                    {item && item.index}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.name} (
                    {item && item.teacher && item.teacher.iid})
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.phone}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.email}
                  </TableRowColumn>
                  {themeConfig &&
                    themeConfig.layout === layouts.UMS && [
                      <TableRowColumn width="10%">
                        {item && item.courses_number}
                      </TableRowColumn>,
                      <TableRowColumn>
                        {item && item.average_rate}
                      </TableRowColumn>,
                      <TableRowColumn>
                        {item && item.rate_total}
                      </TableRowColumn>,
                    ]}
                  <TableRowColumn>{item && item.taught_hours}</TableRowColumn>
                  <TableRowColumn>{item && item.assigned_hours}</TableRowColumn>
                  <TableRowColumn>
                    {item && item.not_taught_hours}
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(Results);
