import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { Element } from 'schema-form/elements';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import apiUrls from 'api-endpoints';
import Editable from 'components/common/forms/editable';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ChangePasswordUser from 'components/admin/user/system/change-password/Form';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import UpdateUserForm from 'components/admin/user/new/Form';
import { constants } from 'configs/constants';

class Results extends Component {
  constructor(props) {
    super(props);
    this.statusOnChanged = this.statusOnChanged.bind(this);
  }

  handleVmoneySubmit = (values, item) => {
    const { dispatch, ntype } = this.props;
    const data = {
      ntype,
      id: item.id,
      ...values,
      _sand_step: 'reset_vmoney',
      _sand_is_system: '1',
    };

    dispatch(
      sagaActions.updateNodeRequest({
        step: 'reset_vmoney',
        data,
        searchFormId: 'user_search',
      }),
    );
  };
  changePasswordForUser = (item) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <ChangePasswordUser
        mode="edit"
        ntype="user"
        title={t1('change_password')}
        node={item}
        step="set_pass"
        formid="change_password"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('change_password'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  statusOnChanged(status, userId) {
    const { formid, dispatch } = this.props;

    const params = {
      status,
      id: userId,
      _sand_step: 'change_status',
      formid,
    };

    dispatch(
      userSagaActions.changeStatusRequest(apiUrls.update_node('user'), params),
    );
  }

  rolesToString = (item) => {
    if (!item || !item.roles) return '';
    let str = '';
    item.roles.forEach((role) => {
      if (role) {
        str += `${role}, `;
      }
    });
    if (str.length > 2) {
      str = str.substring(0, str.length - 2);
    }
    return str;
  };
  updateUserInfo = (item) => {
    const { dispatch } = this.props;
    const formid = `edit_user_${item.id}`;
    const contentDialog = (
      <UpdateUserForm
        mode="edit"
        title={t1('edit_user')}
        node={item}
        step="students"
        searchFormId="user_search"
        formid={formid}
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_user'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { formid, ntype, items } = this.props;
    const changePasswordLabel = t1('change_password');
    const deletePageLabel = t1('delete');
    const confirmDeletePageLabel = 'are_you_sure_you_want_to_do_this';
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('iid')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('lname/email')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('full_name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('money')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('vmoney')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('roles')}</TableHeaderColumn>
              <TableHeaderColumn title={t1('status')}>
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>
                    {item.lname && item.lname.length > 0
                      ? item.lname
                      : item.email}
                  </TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    {item.counter && item.counter.money
                      ? item.counter.money
                      : 0}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Editable
                      form={item.id}
                      name="counter__vmoney"
                      initialValue={item.counter.vmoney || 0}
                      type="number"
                      onSubmit={(values) =>
                        this.handleVmoneySubmit(values, item)
                      }
                    />
                  </TableRowColumn>
                  <TableRowColumn>{this.rolesToString(item)}</TableRowColumn>
                  <TableRowColumn>
                    {t1(item.status)} <br />
                    <Element
                      schema={{
                        type: 'select',
                        name: item.id,
                        fullWidth: true,
                        defaultValue: item.status,
                        value: item.status,
                        options: constants.userStatuses(),
                        onChange: (event, value) => {
                          this.statusOnChanged(value, item.id);
                        },
                      }}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={t1('edit_user')}
                      iconClassName="mi mi-vpn-key"
                      onClick={() => this.changePasswordForUser(item)}
                    />
                    <IconButton
                      title={changePasswordLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateUserInfo(item)}
                    />
                    <DeleteItem
                      title={deletePageLabel}
                      textConfirm={confirmDeletePageLabel}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

function mapStateToProps(state, props) {
  let statuses = [];

  if (
    state.formSchemaConfigs[props.id] &&
    state.formSchemaConfigs[props.id].status
  ) {
    statuses = state.formSchemaConfigs[props.id].status;
  }

  return {
    statuses,
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'user_search_result',
  })(Results),
);
