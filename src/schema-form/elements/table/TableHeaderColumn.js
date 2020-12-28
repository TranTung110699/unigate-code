import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn as MUTableHeaderColumn } from 'components/common/mui/Table';
import SortButton from 'schema-form/elements/sort-button/core';
import styled from 'styled-components';

const StyledSortButton = styled(SortButton)`
  color: ${(props) =>
    props.active ? 'rgba(0, 0, 0, 0.87)' : 'rgb(158, 158, 158)'};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

class TableHeaderColumn extends Component {
  handleSortDesButtonClick = () => {
    const { onColSortClick } = this.context;
    const { colKey } = this.props;
    if (typeof onColSortClick === 'function') {
      onColSortClick(colKey, -1);
    }
  };

  handleSortAscButtonClick = () => {
    const { onColSortClick } = this.context;
    const { colKey } = this.props;
    if (typeof onColSortClick === 'function') {
      onColSortClick(colKey, 1);
    }
  };

  render() {
    const { children, colKey } = this.props;
    const { sortable, sortData } = this.context;
    let sortOrder = 0;
    if (sortable && sortData) {
      sortOrder = sortData[colKey];
    }
    let tooltip = this.props.tooltip;
    if (!tooltip && typeof children === 'string') {
      tooltip = children;
    }
    return (
      <MUTableHeaderColumn {...this.props} tooltip={tooltip}>
        <StyledSortButton
          onClick={
            sortOrder === 1
              ? this.handleSortDesButtonClick
              : this.handleSortAscButtonClick
          }
          active={Boolean(sortOrder)}
          sortOrder={sortOrder}
          showIcon={Boolean(sortOrder)}
        >
          {children}
        </StyledSortButton>
      </MUTableHeaderColumn>
    );
  }
}

TableHeaderColumn.propTypes = {
  sortable: PropTypes.bool,
};

TableHeaderColumn.defaultProps = {
  sortable: false,
};

TableHeaderColumn.contextTypes = {
  sortable: PropTypes.bool,
  sortData: PropTypes.shape(),
  onColSortClick: PropTypes.func,
};

export default TableHeaderColumn;
