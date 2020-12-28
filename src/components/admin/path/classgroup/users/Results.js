import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'components/common/avatar';
import { timestampToDateString } from 'common/utils/Date';
import {
  displayUserFeesStatusForClassGroup,
  displayUserFeesStatusForCourse,
} from 'common/classgroup';
import { t1 } from 'translate';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  cssClass = 'admin-financial-classgroup-users-search-result';

  width = {
    code: '10%',
    name: '15%',
    birthday: '10%',
    phone: '10%',
    // mail: '20%',
    fees: '40%',
  };

  render() {
    const { items, objects, className, ntype } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass ||
      ''} table-result`;

    return (
      <div className={componentClassName}>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={this.width.code}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.name}>
                {t1('full_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.birthday}>
                {t1('birthday')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.phone}>
                {t1('phone')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.email}>
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.fees}>
                {t1('fees')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {items &&
              items.map((item) => (
                <TableRow>
                  <TableRowColumn width={this.width.code}>
                    {item.code}
                  </TableRowColumn>
                  <TableRowColumn width={this.width.name}>
                    <Avatar user={item} />
                    &nbsp; {item.name}
                  </TableRowColumn>
                  <TableRowColumn width={this.width.birthday}>
                    {timestampToDateString(item.birthday)}
                  </TableRowColumn>
                  <TableRowColumn width={this.width.phone}>
                    {item.phone}
                  </TableRowColumn>
                  <TableRowColumn width={this.width.mail}>
                    {item.mail}
                  </TableRowColumn>
                  <TableRowColumn width={this.width.fees}>
                    {ntype === 'course'
                      ? displayUserFeesStatusForCourse(item)
                      : displayUserFeesStatusForClassGroup(item)}
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
