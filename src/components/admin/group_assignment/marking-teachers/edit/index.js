import React from 'react';
import { reduxForm } from 'redux-form';
import Avatar from 'components/common/avatar';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

class Edit extends React.Component {
  style = {
    minWidth: 0,
  };

  avatarStyle = {
    margin: 2,
  };

  submitButtonWrapperStyle = {
    textAlign: 'right',
  };

  render() {
    const { className, staff, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Table
          className={`${className || ''} ${this.cssClass}`}
          name={'marking_teachers'}
          itemList={staff}
          checkKey={'iid'}
          multiSelectable
        >
          <TableHeader>
            <TableRow displayBorder={false}>
              <TableHeaderColumn title={t1('avatar')}>
                {t1('avatar')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((user, index) => (
              <TableRow key={user.id || user.iid}>
                <TableRowColumn>
                  <Avatar user={user} />
                </TableRowColumn>
                <TableRowColumn title={user.iid}>{user.iid}</TableRowColumn>
                <TableRowColumn title={user.name}>{user.name}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={this.submitButtonWrapperStyle}>
          <RaisedButton type="submit" primary label={t1('submit')} />
        </div>
      </form>
    );
  }
}

export default reduxForm({})(Edit);
