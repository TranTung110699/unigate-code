import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Avatar from 'components/common/avatar';
import { t1 } from 'translate';

class UsersAvatarListFull extends React.Component {
  cssClass = 'users-avatar-list-full';

  render() {
    const { className, users } = this.props;
    return (
      <Table
        className={`${className || ''} ${this.cssClass}`}
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow displayBorder={false}>
            <TableHeaderColumn title={t1('avatar')}>
              {t1('avatar')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('iid')}>{t1('iid')}</TableHeaderColumn>
            <TableHeaderColumn title={t1('name')}>
              {t1('name')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {users.map((user, index) => (
            <TableRow>
              <TableRowColumn>
                <Avatar user={user} />
              </TableRowColumn>
              <TableRowColumn title={user.iid}>{user.iid}</TableRowColumn>
              <TableRowColumn title={user.name}>{user.name}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

UsersAvatarListFull.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape()),
};

UsersAvatarListFull.defaultProps = {
  className: '',
  users: PropTypes.arrayOf(PropTypes.shape()),
};

export default UsersAvatarListFull;
