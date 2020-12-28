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
import routes from 'routes';
import { Link } from 'react-router-dom';

const Results = ({ items }) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn>{t1('contest')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('round')}</TableHeaderColumn>
      </TableRow>
    </TableHeader>

    <TableBody
      displayRowCheckbox={false}
      showRowHover={false}
      stripedRows={false}
    >
      {items &&
        items.map((item) => (
          <TableRow key={item.id}>
            <TableRowColumn>
              <Link
                to={routes.url('node_edit', {
                  ...item,
                  step: 'dashboard',
                  ntype: 'contest',
                })}
              >
                {item.name}
              </Link>
            </TableRowColumn>
            <TableRowColumn>
              {(item.exam_round && item.exam_round.name) || (
                <span className="text-muted">{t1('nothing')}</span>
              )}
            </TableRowColumn>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  expand: PropTypes.bool,
};

Results.defaultProps = {
  items: [],
  expand: false,
};

export default Results;
