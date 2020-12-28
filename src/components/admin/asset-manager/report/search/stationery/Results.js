import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1, t3 } from 'translate';
import DisplayHtml from 'components/common/html';
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
    const { items, formid, ntype } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('stationery_code')}>
                {t1('stationery_code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('inventory_start_date')}>
                {t1('inventory_start_date')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('total_import')}>
                {t1('total_import')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('inventory_end_date')}>
                {t1('inventory_end_date')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.startAmount || 0}</TableRowColumn>
                  <TableRowColumn>{item.totalAmount || 0}</TableRowColumn>
                  <TableRowColumn>{item.endAmount || 0}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
