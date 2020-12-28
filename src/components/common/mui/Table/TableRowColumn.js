import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUTableRowColumn from 'material-ui/Table/TableRowColumn';

class TableRowColumn extends Component {
  render() {
    const { children } = this.props;
    let title = this.props.title;
    if (!title && typeof children === 'string') {
      title = children;
    }
    return (
      <MUTableRowColumn {...this.props} title={title}>
        {children}
      </MUTableRowColumn>
    );
  }
}

TableRowColumn.propTypes = {
  sortable: PropTypes.bool,
};

TableRowColumn.defaultProps = {
  sortable: false,
};

export default TableRowColumn;
