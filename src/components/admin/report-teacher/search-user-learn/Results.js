import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

const label = {
  courseCode: t1('code'),
  courseLabel: t1('name'),
  userFullnameLabel: t1('user_full_name'),
  dateJoinLabel: t1('date_join'),
  progressLabel: `${t1('progress')} (%)`,
  lastLearnTimeLabel: t1('last_learn_time'),
};

const width = {
  courseCode: '25%',
  courseLabel: '25%',
  userFullnameLabel: '20%',
  dateJoinLabel: '10%',
  progressLabel: '10%',
  lastLearnTimeLabel: '10%',
};

class Results extends Component {
  render() {
    const { items, formid, ntype } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
            stripedRows
          >
            <TableRow>
              <TableHeaderColumn width={width.courseCode}>
                {label.courseCode}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.courseLabel}>
                {label.courseLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.userFullnameLabel}>
                {label.userFullnameLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.dateJoinLabel}>
                {label.dateJoinLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.progressLabel}>
                {label.progressLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.lastLearnTimeLabel}>
                {label.lastLearnTimeLabel}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.iid}>
                  <TableRowColumn width={width.courseCode}>
                    {item.course_code}
                  </TableRowColumn>
                  <TableRowColumn width={width.courseLabel}>
                    {item.course_name}
                  </TableRowColumn>
                  {item.user &&
                    item.user.map((user) => (
                      <TableRowColumn width={width.userFullnameLabel}>
                        {user.name}
                      </TableRowColumn>
                    ))}
                  {item.user && item.user.name}
                  <TableRowColumn width={width.dateJoinLabel}>
                    {item.date_join}
                  </TableRowColumn>
                  <TableRowColumn width={width.progressLabel}>
                    {item.progress} %
                  </TableRowColumn>
                  <TableRowColumn width={width.lastLearnTimeLabel}>
                    {item.last_learn}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(Results);
