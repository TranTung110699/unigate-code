import React, { Component } from 'react';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import Avatar from 'components/common/avatar';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  addUsersToField = (users) => {
    console.log(users, this.props);
    const { onAddChip } = this.props;
    users.forEach((user) => {
      if (onAddChip) {
        console.log(user);
        onAddChip({
          key: user.name,
          data: user,
        });
      }
    });
  };

  render() {
    const { items } = this.props;
    const iidLabel = t1('iid');
    const nameLabel = t1('name');
    const actionLabel = t1('action');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width="10%" title={t1('avatar')}>
                {t1('avatar')}
              </TableHeaderColumn>
              <TableHeaderColumn width="15%">{iidLabel}</TableHeaderColumn>
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn width="15%" className="text-center">
                {actionLabel}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width="10%">
                    <Avatar user={item} />
                  </TableRowColumn>
                  <TableRowColumn width="15%">{item.iid}</TableRowColumn>
                  <TableRowColumn title={item.name}>{item.name}</TableRowColumn>
                  <TableRowColumn width="15%" className="text-center">
                    <IconButton
                      iconClassName="mi mi-add"
                      onClick={() => this.addUsersToField([item])}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
