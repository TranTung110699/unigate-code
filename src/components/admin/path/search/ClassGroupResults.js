import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import FlatButton from 'components/common/mui/FlatButton';

import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ActionToggle from 'components/common/toggle/ActionToggle';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

const label = {
  name: t1('name'),
  faculty: t1('faculty'),
  major: t1('major'),
  ico: t1('ico'),
  totalClass: t1('total_class'),
  action: t1('action'),
  editPathLabel: t1('edit_path'),
  approve: t1('approve'),
  semester: t1('semester'),
  editIcon: <Icon title={t1('edit_path')} icon="edit" />,
  viewIcon: <Icon title={t1('preview_path')} icon="preview" />,
  addChildrenLink: (item) => `/admin/classgroup/${item.iid}/children`,
  editLink: (item) => `/admin/classgroup/${item.iid}/update`,
};

const width = {
  name: '20%',
  faculty: '10%',
  major: '10%',
  ico: '10%',
  totalClass: '10%',
  // semester_count: '10%',
  status: '10%',
  action: '10%',
  semester: '10%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid, ntype } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.name}>
                {label.name}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.faculty}>
                {label.faculty}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.major}>
                {label.major}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.ico}>
                {label.ico}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.semester}>
                {label.semester}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.totalClass}>
                {label.totalClass}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {label.approve}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {label.action}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.iid}>
                  <TableRowColumn width={width.name}>
                    <Link to={label.addChildrenLink(item)}>
                      {item.name}{' '}
                      <span className="text-muted">({item.iid})</span>
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.faculty}>
                    {item.faculty && item.faculty.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.major}>
                    {item.major && item.major.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.ico}>
                    {item.ico && item.ico.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.semester}>
                    {item.semester && item.semester.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.totalClass}>
                    {(item.children && item.children.length) || 0}
                  </TableRowColumn>
                  <TableRowColumn width={width.status} title={label.approve}>
                    <ActionToggle
                      hideLabel
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                    />
                  </TableRowColumn>
                  <TableRowColumn width={width.action} title={label.action}>
                    <Link to={label.editLink(item)}>
                      <FlatButton icon={label.editIcon} />
                    </Link>
                    <DeleteItem
                      title={label.remove}
                      textConfirm={label.textConfirm}
                      ntype={ntype}
                      formid={formid}
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

export default connect()(Results);
