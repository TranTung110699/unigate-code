import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import actions from 'actions/node/creators';
import { filterObjectKeys } from 'common/utils/object';
import get from 'lodash.get';

const addUserToFieldInvite = t1('add_user');
const addUsersToFieldInvite = t1('add_users');
const checkKey = 'id';

class Results extends Component {
  tableKeysSave = ['id', 'iid', 'name', 'original_course'];

  constructor(props) {
    super(props);
    this.addUsersToField = this.addUsersToField.bind();
    this.addUsersSelectedToField = this.addUsersSelectedToField.bind();
  }

  addUsersSelectedToField = () => {
    const { users, dispatch } = this.props;
    this.addUsersToField(users);

    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  addUsersToField = (users) => {
    const { onAddChip, onAdd } = this.props;
    if (onAddChip) {
      users.forEach((user) => {
        onAddChip({
          key: user.name,
          data: { ...user, type: 'user' },
        });
      });
    } else if (onAdd) {
      onAdd(users);
    }
  };

  render() {
    const { items, formid } = this.props;

    return (
      <div className="table-result">
        <Table
          formid={formid}
          itemList={items}
          checkKey={checkKey}
          keysSave={this.tableKeysSave}
          multiSelectable
        >
          <TableHeader adjustForCheckbox enableSelectAll>
            <TableRow>
              <TableHeaderColumn title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('email')}>
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('phone_number')}>
                {t1('phone_number')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('note')}>
                {t1('note')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {items &&
              items.map((item) => (
                <TableRow key={item.id} selected={item.selected}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.mail}</TableRowColumn>
                  <TableRowColumn>{item.phone}</TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'debit_status') ? t1('debit_fee') : ''}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={addUsersToFieldInvite}
                      iconClassName="mi mi-add"
                      onClick={() =>
                        this.addUsersToField([
                          filterObjectKeys(item, [
                            'id',
                            'iid',
                            'name',
                            'original_course',
                          ]),
                        ])
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="m-t-25">
          <RaisedButton
            name="add_user_to_group"
            id="add_user_to_group"
            label={addUserToFieldInvite}
            onClick={() => this.addUsersSelectedToField()}
            primary
          />
        </div>
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

function mapStateToProps(state, props) {
  const { formid } = props;
  const result = state.searchResults[formid] || {};
  const users = result.selectedItems || [];
  return {
    users,
  };
}

export default connect(mapStateToProps)(Results);
