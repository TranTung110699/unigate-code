import React from 'react';
import PropTypes from 'prop-types';
import { TableBody as MUTableBody } from 'components/common/mui/Table';

class TableBody extends React.Component {
  getChildContext() {
    const { displayRowCheckbox } = this.props;
    return {
      displayRowCheckbox,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <MUTableBody {...this.props} displayRowCheckbox={false}>
        {children}
      </MUTableBody>
    );
  }
}

TableBody.propTypes = {
  displayRowCheckbox: PropTypes.bool,
};

TableBody.defaultProps = {
  displayRowCheckbox: true,
};

TableBody.childContextTypes = {
  displayRowCheckbox: PropTypes.bool,
};

TableBody.muiName = 'TableBody';

export default TableBody;
