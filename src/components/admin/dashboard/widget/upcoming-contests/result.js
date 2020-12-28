import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import routes from 'routes';

const style = {
  status: {
    borderRight: '1px solid #e0e0e0',
    width: '100px',
  },
};

const Rows = ({ items, title }) =>
  items &&
  items.map((item, index) => (
    <TableRow key={item.id}>
      {index === 0 && (
        <TableHeaderColumn rowspan={items.length} style={style.status}>
          {title}
        </TableHeaderColumn>
      )}
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
        {timestampToDateTimeString(item.start_time)}
      </TableRowColumn>
      <TableRowColumn>
        {timestampToDateTimeString(item.end_time)}
      </TableRowColumn>
    </TableRow>
  ));

const Results = ({ items }) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn style={style.status}>
          {t1('status')}
        </TableHeaderColumn>
        <TableHeaderColumn>{t1('contest')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('start_date')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('end_date')}</TableHeaderColumn>
      </TableRow>
    </TableHeader>

    <TableBody
      displayRowCheckbox={false}
      showRowHover={false}
      stripedRows={false}
    >
      <Rows
        key="ongoing-contests"
        items={items && items.opening}
        title={t1('ongoing')}
      />
      <Rows
        key="upcoming-contests"
        items={items && items.upcoming}
        title={t1('upcoming')}
      />
    </TableBody>
  </Table>
);

Results.propTypes = {
  // items: PropTypes.arrayOf(PropTypes.any),
  expand: PropTypes.bool,
};

Results.defaultProps = {
  items: [],
  expand: false,
};

export default Results;
