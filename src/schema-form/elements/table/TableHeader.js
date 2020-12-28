import React from 'react';
import PropTypes from 'prop-types';
import { TableHeader as MUTableHeader } from 'components/common/mui/Table';

class TableHeader extends React.Component {
  getChildContext() {
    const { displaySelectAll, enableSelectAll } = this.props;
    return {
      displayRowCheckbox: displaySelectAll,
      rowCheckboxSelectable: enableSelectAll,
      isHeader: true,
    };
  }

  render() {
    const {
      children,
      adjustForCheckbox,
      displaySelectAll,
      enableSelectAll,
      ...props
    } = this.props;
    return (
      <MUTableHeader
        {...props}
        displaySelectAll={false}
        enableSelectAll={false}
        adjustForCheckbox={adjustForCheckbox && !displaySelectAll}
      >
        {children}
      </MUTableHeader>
    );
  }
}

TableHeader.propTypes = {
  adjustForCheckbox: PropTypes.bool,
  displaySelectAll: PropTypes.bool,
  enableSelectAll: PropTypes.bool,
};

TableHeader.defaultProps = {
  adjustForCheckbox: true,
  displaySelectAll: true,
  enableSelectAll: true,
};

TableHeader.childContextTypes = {
  displayRowCheckbox: PropTypes.bool,
  rowCheckboxSelectable: PropTypes.bool,
  isHeader: PropTypes.bool,
};

TableHeader.muiName = 'TableHeader';

export default TableHeader;
