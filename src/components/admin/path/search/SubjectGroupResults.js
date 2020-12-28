import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { t1, t3 } from 'translate';
import { schoolTypes, programTypeOptions } from 'configs/constants';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import StaffList from 'components/common/staff-list';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import lGet from 'lodash.get';

const width = {
  iid: '10%',
  name: '15%',
  staff: '5%',
  code: '5%',
  type: '10%',
  organizations: '15%',
  major: '10%',
  credit: '10%',
  hours: '5%',
  // semester_count: '10%',
  status: '5%',
  action: '10%',
};

class ProgramResults extends Component {
  getProgramTypeDisplayText = (value) => {
    const programType = programTypeOptions().find(
      (type) => type.value === value,
    );

    if (!programType) {
      return t3('n/a');
    }

    return programType.label;
  };

  render() {
    const { items, formid, ntype, schoolType } = this.props;

    const isSIS = schoolType && schoolType === schoolTypes.SIS;

    const label = {
      name: t1('name'),
      staff: t1('staff'),
      code: t1('code'),
      type: t1('type'),
      organizations: t1('organizations'),
      credit: t1('credits'),
      hours: t1('hours'),
      major: t1('major'),
      iid: t1('iid'),
      status: t1('status'),
      action: t1('action'),
      editPath: t1('edit_path'),
      remove: t1('remove'),
      textConfirm: t1('are_you_sure_you_want_to_do_this'),
      publishLevel: t1('publish_level'),
      editIcon: <Icon title={this.editPath} icon="edit" />,
      viewIcon: <Icon title={this.editPath} icon="preview" />,
      semesterCountLabel: t1('semester_count'),
    };

    const editLink = (item) => `/admin/program/${item.iid}/children`;
    const viewLink = (item) => `/admin/program/${item.iid}/dashboard`;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.code}>
                {label.code}
              </TableHeaderColumn>

              {/*              <TableHeaderColumn width={width.iid}>{iidLabel}</TableHeaderColumn>
               */}
              <TableHeaderColumn width={width.name}>
                {label.name}
              </TableHeaderColumn>
              {/*
              <TableHeaderColumn width={width.staff}>
                {label.staff}
              </TableHeaderColumn>

                 */}
              {isSIS && (
                <TableHeaderColumn width={width.type}>
                  {label.type}
                </TableHeaderColumn>
              )}

              {!isSIS && (
                <TableHeaderColumn width={width.organizations}>
                  {label.organizations}
                </TableHeaderColumn>
              )}

              {isSIS && (
                <TableHeaderColumn width={width.credit}>
                  {label.credit}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn width={width.hours}>
                {label.hours}
              </TableHeaderColumn>
              {/*
              <TableHeaderColumn width={width.semester_count}>{semesterCountLabel}</TableHeaderColumn>
              <TableHeaderColumn>{degreeLabel}</TableHeaderColumn>
              */}
              <TableHeaderColumn width={width.status}>
                {label.status}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {label.action}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.iid}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.code}>
                    <Link to={editLink(item)}>{item.code}</Link>
                  </TableRowColumn>
                  {/*                  <TableRowColumn width={width.iid}>
                    {item.iid}
                  </TableRowColumn>
*/}
                  <TableRowColumn width={width.name}>
                    <Link to={editLink(item)}>{item.name}</Link>
                  </TableRowColumn>
                  {/*

                  <TableRowColumn width={width.staff}>
                    <StaffList staff={[item.u]} />
                  </TableRowColumn>
                     */}

                  {isSIS && (
                    <TableRowColumn width={width.type}>
                      {this.getProgramTypeDisplayText(item.type)}
                    </TableRowColumn>
                  )}

                  {!isSIS && (
                    <TableRowColumn width={width.organizations}>
                      {item.organizations_name
                        ? item.organizations_name.join(',')
                        : null}
                    </TableRowColumn>
                  )}

                  {isSIS && (
                    <TableRowColumn width={width.credit}>
                      {item.credit}
                    </TableRowColumn>
                  )}
                  <TableRowColumn width={width.hours}>
                    {item.hours ? `${item.hours} ${t1('hours')}` : ''}
                  </TableRowColumn>
                  {/*
                  <TableRowColumn width={width.semester_count}>
                    {item.semester_count}
                  </TableRowColumn>
       <TableRowColumn width={width.degree} title={degreeLabel}>
                    {item.degree && item.degree.name}
                  </TableRowColumn>
*/}
                  <TableRowColumn width={width.status} title={label.status}>
                    {t1(item.status)}
                  </TableRowColumn>
                  <TableRowColumn width={width.action} title={label.action}>
                    <Link to={viewLink(item)}>
                      <FlatButton icon={label.editIcon} />
                    </Link>
                    {/*
                    <Link to={editLink(item)}>
                      <FlatButton icon={label.viewIcon} />
                    </Link>

                       */}

                    <DeleteItem
                      title={label.remove}
                      textConfirm={label.textConfirm}
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
});

export default connect(mapStateToProps)(ProgramResults);
