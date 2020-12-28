import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { jsTimestampToDateString } from 'common/utils/Date';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import './Results.scss';

class SupporterPerformanceReportResults extends React.Component {
  getKey = (item) =>
    item &&
    item._id &&
    `${item.supporter.iid} ${item.simplifiedDate.year} ${
      item.simplifiedDate.dayOfYear
    }`;

  simplifiedDateToDate = ({ year, dayOfYear }) =>
    jsTimestampToDateString(
      new Date(new Date(year, 0).setDate(dayOfYear)).getTime(),
    );

  render() {
    const { items } = this.props;

    return (
      <div className="table-result admin-supporter-performance-report-results">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('date')}>
                {t1('date')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('mail')}>
                {t1('mail')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('number_of_assigned_customers')}>
                {t1('number_of_assigned_customers')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('number_of_supported_customers')}>
                {t1('number_of_supported_customers')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('number_of_customers_to_support_later')}
              >
                {t1('number_of_customers_to_support_later')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('number_of_unlock_transaction')}>
                {t1('number_of_unlock_transaction')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('total_money_according_to_database')}
              >
                {t1('total_money_according_to_system')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('total_money_according_to_supporter')}
              >
                {t1('total_money_according_to_supporter')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={this.getKey(item)}>
                  <TableRowColumn>
                    {this.simplifiedDateToDate(item.simplifiedDate)}
                  </TableRowColumn>
                  <TableRowColumn>{item.supporter.name}</TableRowColumn>
                  <TableRowColumn>{item.supporter.mail}</TableRowColumn>
                  <TableRowColumn>{item.ASSIGN_SUPPORT}</TableRowColumn>
                  <TableRowColumn>{item.CUSTOMER_SUPPORTED}</TableRowColumn>
                  <TableRowColumn>{item.CUSTOMER_SAVED}</TableRowColumn>
                  <TableRowColumn>{item.UNLOCK_LEARNING}</TableRowColumn>
                  <TableRowColumn>
                    {item.UNLOCK_LEARNING_am_money +
                      item.UNLOCK_LEARNING_am_vmoney}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.UNLOCK_LEARNING_actual_am_money +
                      item.UNLOCK_LEARNING_actual_am_vmoney}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SupporterPerformanceReportResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};

SupporterPerformanceReportResults.defaultProps = {
  items: [],
};

export default SupporterPerformanceReportResults;
