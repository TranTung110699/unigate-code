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
              <TableHeaderColumn title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('hours_used')}>
                {t1('hours_used')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.id}</TableRowColumn>
                  <TableRowColumn>{item.code || 0}</TableRowColumn>
                  <TableRowColumn>{item.hours_used || 0}</TableRowColumn>
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
