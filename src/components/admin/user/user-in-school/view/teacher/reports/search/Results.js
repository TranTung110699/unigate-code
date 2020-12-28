import React from 'react';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import get from 'lodash.get';

class Results extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('credit_syllabus')}>
                {t1('credit_syllabus')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('course_number')}>
                {t1('course_number')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('assigned_hours')}>
                {t1('assigned_hours')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('taught_hours')}>
                {t1('taught_hours')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('average_rating')}>
                {t1('average_rating')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.credit_syllabus.name}</TableRowColumn>
                  <TableRowColumn>{item.course}</TableRowColumn>
                  <TableRowColumn>{item.assigned_hours}</TableRowColumn>
                  <TableRowColumn>{item.taught_hours}</TableRowColumn>
                  <TableRowColumn>{5}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default Results;
