/**
 * Created by Peter Hoang Nguyen on 4/14/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table as MiTable } from 'components/common/mui/Table';
import Pagination from '../pagination';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 14/04/2017
 **/
class Table extends React.Component {
  render() {
    const { total, onPageChange } = this.props;

    return (
      <div>
        <MiTable {...this.props} />
        <Pagination total={total} onPageChange={onPageChange} />
      </div>
    );
  }
}

Table.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

export default Table;
