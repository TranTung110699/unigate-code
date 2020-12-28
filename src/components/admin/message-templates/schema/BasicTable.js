import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { v4 } from 'uuid';

import { t1 } from 'translate';

const BasicTable = (props) => {
  const { items, columns } = props;

  return (
    <div>
      <span className="text-muted">{t1('parameters')}</span>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            {columns.map((column) => (
              <TableHeaderColumn key={v4()}>{t1(column)}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {items &&
            items.filter(Boolean).map((item) => (
              <TableRow key={v4()}>
                <TableRowColumn>
                  {`{{`}
                  {item.name}
                  {`}}`}
                </TableRowColumn>
                <TableRowColumn>{item.type || 'string'}</TableRowColumn>
                <TableRowColumn>{item.description}</TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicTable;
