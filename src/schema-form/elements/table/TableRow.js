import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow as MUTableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Checkbox from 'material-ui/Checkbox';
import lodashGet from 'lodash.get';

class TableRow extends Component {
  render() {
    const { children, rowNumberSelected } = this.props;
    let { rowCheckBoxSpan } = this.props;

    const rowNumber =
      typeof rowNumberSelected !== 'undefined'
        ? rowNumberSelected
        : this.props.rowNumber;

    const {
      selectedIndexes,
      onRowSelect,
      isHeaderSelected,
      displayRowCheckbox,
      isHeader,
      rowCheckboxSelectable,
      displayRowCheckboxOnTheRightSide,
      bodyRowCheckBoxSpans,
    } = this.context;

    if (!isHeader) {
      rowCheckBoxSpan = lodashGet(
        bodyRowCheckBoxSpans,
        rowNumber,
        // NOTE:
        // for body rows: use this.props.rowCheckBoxSpan will not work with "select all" check box at table header
        // we will remove it later after refactor all places that currently use it
        // for header rows, we can still use this.props.rowCheckBoxSpan
        rowCheckBoxSpan,
      );
    }

    const rowCheckBox = (
      <TableRowColumn width="72px" rowSpan={rowCheckBoxSpan || 1}>
        <Checkbox
          disabled={!rowCheckboxSelectable || this.props.disabled}
          checked={
            isHeader
              ? isHeaderSelected
              : Array.isArray(selectedIndexes) &&
                selectedIndexes.includes(rowNumber)
          }
          onCheck={
            onRowSelect &&
            (() => {
              if (!isHeader) {
                onRowSelect(rowNumber);
              } else {
                onRowSelect('all');
              }
            })
          }
        />
      </TableRowColumn>
    );

    return (
      <MUTableRow {...this.props} selectable={false}>
        {rowCheckBoxSpan !== 0 &&
          !displayRowCheckboxOnTheRightSide &&
          displayRowCheckbox &&
          rowCheckBox}
        {children}
        {rowCheckBoxSpan !== 0 &&
          displayRowCheckboxOnTheRightSide &&
          displayRowCheckbox &&
          rowCheckBox}
      </MUTableRow>
    );
  }
}

TableRow.propTypes = {};

TableRow.defaultProps = {};

TableRow.contextTypes = {
  onRowSelect: PropTypes.func,
  displayRowCheckbox: PropTypes.bool,
  selectedIndexes: PropTypes.arrayOf(PropTypes.number),
  isHeader: PropTypes.bool,
  isHeaderSelected: PropTypes.bool,
  rowCheckboxSelectable: PropTypes.bool,
  displayRowCheckboxOnTheRightSide: PropTypes.bool,
  bodyRowCheckBoxSpans: PropTypes.arrayOf(PropTypes.number),
};

export default TableRow;
