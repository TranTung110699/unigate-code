import React from 'react';
import Field from 'redux-form/es/Field';
import MUTable, { Table as MUTableCore } from './Table';
import MUTableRow from './TableRow';
import MUTableBody from './TableBody';
import MUTableHeader from './TableHeader';
import MUTableHeaderColumn from './TableHeaderColumn';
import { TableRowColumn as MUTableRowColumn } from 'components/common/mui/Table';

export const TableCore = MUTableCore;
export const Table = MUTable;
export const TableAsReduxFormField = (props) => (
  <Field component={MUTableCore} {...props} />
);
export const TableRow = MUTableRow;
export const TableBody = MUTableBody;
export const TableHeader = MUTableHeader;
export const TableHeaderColumn = MUTableHeaderColumn;
export const TableRowColumn = MUTableRowColumn;
