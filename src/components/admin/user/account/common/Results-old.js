import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFormValues, reduxForm } from 'redux-form';
import { getThemeConfig } from 'utils/selectors';
import Avatar from 'components/common/avatar';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';

import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

import Positions from 'components/admin/group/edit/member/search-results/Positions';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import IconButton from 'material-ui/IconButton';
import ChangePasswordUser from '../../system/change-password/Form';
import actions from 'actions/node/creators';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ResyncDataFromShareDBBtn from './../common/ResyncDataFromShareDBBtn';
import { allowSyncUsersOnAbnormalAccountScreen } from 'common/conf';
import { userPreviewLink } from 'components/admin/user/utils';

const label = {
  iidCode: t1('code'),
  name: t1('name'),
  mail: t1('mail'),
  status: t1('status'),
  actions: t1('actions'),
  other_info: t1('other_info'),
};

const width = {
  actions: '10%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'activated', off: 'unactivated' };

  formatSelectedNsIds = (selectedNsIds) => {
    return selectedNsIds.map((selectedNsId) => selectedNsId.ns_id);
  };

  renderTableHeader = (label, searchFormId, width) => {
    return (
      <TableRow>
        <TableHeaderColumn>{label.iidCode}</TableHeaderColumn>
        <TableHeaderColumn>{label.name}</TableHeaderColumn>
        <TableHeaderColumn>{label.mail}</TableHeaderColumn>
        <TableHeaderColumn>{label.other_info}</TableHeaderColumn>
        {searchFormId === 'account_search' && (
          <TableHeaderColumn>{label.status}</TableHeaderColumn>
        )}
        {searchFormId === 'account_search' && (
          <TableHeaderColumn width={width.actions}>
            {label.actions}
          </TableHeaderColumn>
        )}
      </TableRow>
    );
  };

  renderTableBody = (
    items,
    searchFormId,
    formid,
    deleteUserLabel,
    confirmDeleteUserLabel,
  ) => {
    return (
      items &&
      items.map((item) => (
        <TableRow key={item.ns_id}>
          <TableRowColumn title={item.iid}>
            <Link to={userPreviewLink(item, 'user', 'view')}>{item.code}</Link>
          </TableRowColumn>
          <TableRowColumn title={item.name}>
            <Avatar user={item} />
            &nbsp; {item.name} <span className="text-muted">{item.iid}</span>
          </TableRowColumn>
          <TableRowColumn title={item.mail}>{item.mail}</TableRowColumn>
          <TableRowColumn>
            {item.positions && item.positions.length ? (
              <Positions item={item} textOnly={true} />
            ) : (
              ''
            )}
            {item.user_organizations && item.user_organizations.length ? (
              <OrganizationsOrPhongBan
                item={item}
                attr={'user_organizations'}
              />
            ) : (
              ''
            )}
            {item.phongbans && item.phongbans.length ? (
              <OrganizationsOrPhongBan
                item={item}
                attr={'phongbans'}
                showParentsInfo={false}
              />
            ) : (
              ''
            )}
          </TableRowColumn>
          {searchFormId === 'account_search' && (
            <TableRowColumn>
              <ActionToggle
                baseURL={routes.url('node_update', {
                  ...item,
                  ntype: 'user',
                  step: 'status',
                })}
                dataSet={this.actionToggleDataSet}
                value={item.status || 'unactivated'}
                name="status"
              />
            </TableRowColumn>
          )}
          {searchFormId === 'account_search' && (
            <TableRowColumn width={width.actions}>
              <IconButton
                title={t1('change_password_for_user')}
                iconClassName="mi mi-vpn-key"
                onClick={() => this.changePasswordForUser(item)}
              />
              <DeleteItem
                title={deleteUserLabel}
                textConfirm={confirmDeleteUserLabel}
                formid={formid}
                ntype={'user'}
                itemId={item.id}
              />
            </TableRowColumn>
          )}
        </TableRow>
      ))
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
        schoolScope
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('change_password'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const {
      items,
      formid,
      searchFormId,
      selectedNsIds,
      allowSyncUsersOnAbnormalAccountScreenFlag,
    } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'ns_id';
    const keysSave = ['ns_id'];

    const deleteUserLabel = t1('delete');
    const confirmDeleteUserLabel = t1('are_you_sure_you_want_to_do_this');

    return (
      <div className="table-result">
        {searchFormId &&
          searchFormId === 'abnormal_account_search' &&
          !!allowSyncUsersOnAbnormalAccountScreenFlag && (
            <div>
              {selectedNsIds && selectedNsIds.length > 0 && (
                <span className="m-r-10">
                  {t1('%d_users_selected', [selectedNsIds.length])}
                </span>
              )}
              <ResyncDataFromShareDBBtn
                raisedButton
                className={'m-b-10'}
                title={t1('resync_selected_users_from_evn_share_db')}
                label={t1('resync_selected_users_from_evn_share_db')}
                labelPosition="after"
                secondary
                icon="retry"
                data={{
                  ns_ids: this.formatSelectedNsIds(selectedNsIds),
                }}
                disabled={!selectedNsIds || selectedNsIds.length === 0}
                resyncDataFromShareDBUrl={
                  hrmsEvnApiUrls.resync_users_from_evn_share_db
                }
                searchFormId={searchFormId}
                textConfirm={t1(
                  'do_you_want_to_resync_selected_users_from_evn_share_db?',
                )}
              />
            </div>
          )}
        {searchFormId && searchFormId === 'abnormal_account_search' ? (
          <Table
            name="ns_ids"
            itemList={itemList}
            checkKey={checkKey}
            keysSave={keysSave}
            multiSelectable
          >
            <TableHeader>
              {this.renderTableHeader(label, searchFormId, width)}
            </TableHeader>
            <TableBody deselectOnClickaway={false} showRowHover stripedRows>
              {this.renderTableBody(
                items,
                searchFormId,
                formid,
                deleteUserLabel,
                confirmDeleteUserLabel,
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              {this.renderTableHeader(label, searchFormId, width)}
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {this.renderTableBody(
                items,
                searchFormId,
                formid,
                deleteUserLabel,
                confirmDeleteUserLabel,
              )}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

function mapStateToProps(state, props) {
  const accountSearchResultValues = getFormValues(props.form)(state);

  const selectedNsIds =
    accountSearchResultValues && accountSearchResultValues.ns_ids
      ? accountSearchResultValues.ns_ids
      : [];

  return {
    selectedNsIds,
    themeConfig: getThemeConfig(state),
    allowSyncUsersOnAbnormalAccountScreenFlag: allowSyncUsersOnAbnormalAccountScreen(
      state.domainInfo,
    ),
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
