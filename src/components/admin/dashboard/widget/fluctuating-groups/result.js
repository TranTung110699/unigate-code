import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './stylesheet.scss';

const Results = ({ items, onGoToDetail }) => (
  <Table
    onCellClick={(rowIndex) => {
      onGoToDetail(items[rowIndex]);
    }}
    className="user-group-have-population-fluctuations"
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn>{t1('group_name')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('current_members')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('pending_members')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('redundant_members')}</TableHeaderColumn>
      </TableRow>
    </TableHeader>

    <TableBody
      displayRowCheckbox={false}
      showRowHover={false}
      stripedRows={false}
    >
      {items &&
        items.map((item) => (
          <TableRow key={item.id} className="table-row">
            <TableRowColumn>{item.name}</TableRowColumn>
            <TableRowColumn className="current-members">
              {item.current_members || 0}
            </TableRowColumn>
            <TableRowColumn className="pending-members">
              {item.pending_members || 0}
            </TableRowColumn>
            <TableRowColumn className="redundant-members">
              {item.redundant_members || 0}
            </TableRowColumn>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  onGoToDetail: PropTypes.func,
};

Results.defaultProps = {
  items: [],
  onGoToDetail: null,
};

export default Results;
