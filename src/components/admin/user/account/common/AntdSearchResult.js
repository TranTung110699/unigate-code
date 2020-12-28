import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFormValues, reduxForm } from 'redux-form';
import { getThemeConfig } from 'utils/selectors';
import './stylesheet.scss';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import IconButton from 'material-ui/IconButton';
import ChangePasswordUser from '../../system/change-password/Form';
import actions from 'actions/node/creators';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { allowSyncUsersOnAbnormalAccountScreen } from 'common/conf';
import { userPreviewLink } from 'components/admin/user/utils';
import { timestampToDateString } from 'common/utils/Date';
import Avatar from 'antd/lib/avatar';
import lGet from 'lodash.get';
import AntdTable from 'antd/lib/table';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import ExportUser from './ExportUser';

const width = {
  actions: '10%',
};

const deleteUserLabel = t1('delete');
const confirmDeleteUserLabel = t1('are_you_sure_you_want_to_do_this');

const label = {
  iidCode: t1('code'),
  name: t1('name'),
  mail: t1('contact'),
  status: t1('active'),
  actions: t1('actions'),
  other_info: t1('other_info'),
  created_date: t1('created_date'),
};

class SearchResult extends Component {
  actionToggleDataSet = { on: 'activated', off: 'unactivated' };

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  changePasswordForUser = (id) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <ChangePasswordUser
        title={t1('change_password')}
        hiddenFields={{
          ids: id ? [id] : this.state.selectedRowKeys,
        }}
        alternativeApi="/user/api/change-password"
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

  getColumn = ({ searchFormId, formid, domain }) => {
    const changeStaffUrl = '/school/add-staff';
    return [
      {
        title: label.iidCode,
        width: '10%',
        render: (item) => (
          <Link to={userPreviewLink(item, 'user', 'view')}>
            {item.code || item.lname}
          </Link>
        ),
      },
      {
        title: label.name,
        render: (item) => (
          <>
            {item.avatar && <Avatar src={item.avatar} />}&nbsp;
            <Link to={userPreviewLink(item, 'user', 'view')}>
              {item.name || item.lname}
            </Link>
          </>
        ),
      },
      {
        title: label.mail,
        render: (item) => (
          <Link to={userPreviewLink(item, 'user', 'view')}>
            {item.phone}
            {item.mail ? ` - ${item.mail}` : ''}
          </Link>
        ),
      },
      {
        title: label.created_date,
        render: (item) => timestampToDateString(item.ts, { type: 'full_date' }),
      },
    ]
      .concat(
        searchFormId === 'account_search'
          ? [
              {
                title: label.status,
                className: 'text-center',
                render: (item) => (
                  <ActionToggle
                    baseURL={routes.url('node_update', {
                      ...item,
                      ntype: 'user',
                      step: 'status',
                    })}
                    dataSet={this.actionToggleDataSet}
                    value={item.status || 'unactivated'}
                    name="status"
                    noLabel
                  />
                ),
              },
              {
                title: label.actions,
                className: 'text-center',
                render: (item) => [
                  <Link to={userPreviewLink(item, 'user', 'view')}>
                    <Icon
                      type="edit"
                      antIcon
                      style={{
                        fontSize: 24,
                        marginRight: 5,
                      }}
                      title={t1('edit')}
                    />
                  </Link>,
                  <IconButton
                    title={t1('change_password_for_user')}
                    iconClassName="mi mi-vpn-key m-r-5"
                    onClick={() => this.changePasswordForUser(item && item.id)}
                  />,
                  <DeleteItem
                    title={deleteUserLabel}
                    textConfirm={confirmDeleteUserLabel}
                    formid={formid}
                    ntype={'user'}
                    itemId={item.id}
                  />,
                ],
              },
            ]
          : [],
      )
      .filter(Boolean);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { items, ...props } = this.props;
    const { selectedRowKeys } = this.state;
    const idInCurrentPage = Array.isArray(items)
      ? items.map(({ id }) => id)
      : [];

    return (
      <div className="table-result" style={{ width: '100%' }}>
        <AntdTable
          bordered
          rowKey="id"
          size="middle"
          pagination={false}
          childrenColumnName={null}
          style={{ background: 'white' }}
          columns={this.getColumn(props)}
          dataSource={Array.isArray(items) ? items : []}
          rowSelection={{
            selectedRowKeys,
            hideDefaultSelections: true,
            onChange: this.onSelectChange,
            selections: [
              {
                key: 'select_current_page',
                text: t1('select_data_in_current_page'),
                onSelect: () => {
                  this.setState((state) => {
                    let currentSelectedRowKeys = lGet(
                      state,
                      'selectedRowKeys',
                      [],
                    );
                    currentSelectedRowKeys = currentSelectedRowKeys.concat(
                      idInCurrentPage
                        .map((id) => !currentSelectedRowKeys.includes(id) && id)
                        .filter(Boolean),
                    );

                    return { selectedRowKeys: currentSelectedRowKeys };
                  });
                },
              },
              {
                key: 'invert_current_page',
                text: t1('invert_data_in_current_page'),
                onSelect: () => {
                  this.setState((state) => {
                    let currentSelectedRowKeys = lGet(
                      state,
                      'selectedRowKeys',
                      [],
                    ).filter((id) => !idInCurrentPage.includes(id));
                    return { selectedRowKeys: currentSelectedRowKeys };
                  });
                },
              },
              Array.isArray(selectedRowKeys) &&
                !!selectedRowKeys.length &&
                !selectedRowKeys.every((id) =>
                  idInCurrentPage.includes(id),
                ) && {
                  key: 'remove_all',
                  text: t1('remove_all_data_selected'),
                  onSelect: () => {
                    this.setState(() => ({ selectedRowKeys: [] }));
                  },
                },
            ].filter(Boolean),
          }}
        />
        <RaisedButton
          primary
          disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
          onClick={() => this.changePasswordForUser()}
          icon={<Icon icon="pass" style={{ color: 'white' }} />}
          label={t1('change_password_of_users(%s_seleted)', [
            Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
          ])}
          className="m-t-10"
        />
        <ExportUser className="m-t-10 m-l-10" />
      </div>
    );
  }
}

SearchResult.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchFormId: PropTypes.string,
};

SearchResult.defaultProps = {
  items: [],
  searchFormId: '',
};

function mapStateToProps(state, props) {
  const accountSearchResultValues = getFormValues(props.form)(state);

  const selectedNsIds =
    accountSearchResultValues && accountSearchResultValues.ns_ids
      ? accountSearchResultValues.ns_ids
      : [];
  const domainInfo = state.domainInfo;
  return {
    selectedNsIds,
    themeConfig: getThemeConfig(state),
    allowSyncUsersOnAbnormalAccountScreenFlag: allowSyncUsersOnAbnormalAccountScreen(
      state.domainInfo,
    ),
    domain: domainInfo && domainInfo.domain,
  };
}

export default connect(mapStateToProps)(reduxForm({})(SearchResult));
