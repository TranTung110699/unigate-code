import React, { Component } from 'react';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';

import Positions from 'components/admin/group/edit/member/search-results/Positions';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import actions from 'actions/node/creators';
import { userPreviewLink } from 'components/admin/user/utils';
import { timestampToDateString } from 'common/utils/Date';
import Avatar from 'antd/lib/avatar';
import lGet from 'lodash.get';
import AntdTable from 'antd/lib/table';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';

const label = {
  iidCode: t1('code'),
  name: t1('name'),
  mail: t1('mail'),
  status: t1('status'),
  actions: t1('actions'),
  other_info: t1('other_info'),
  created_date: t1('created_date'),
  login_required_latest_ts: t1('login_required_latest_ts'),
};

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  actionToggleDataSet = { on: 'activated', off: 'unactivated' };

  handleResendRequiredLoginForUsersSelected = (id) => {
    const resendRequiredLogin = this.props.resendRequiredLogin;

    if (typeof resendRequiredLogin !== 'function') {
      return;
    }
    const ids = id ? [id] : this.state.selectedRowKeys;

    resendRequiredLogin({ ids });
  };

  getColumn = () => {
    return [
      {
        title: label.iidCode,
        width: '10%',
        render: (item) => (
          <Link to={userPreviewLink(item, 'user', 'view')}>{item.code}</Link>
        ),
      },
      {
        title: label.name,
        render: (item) => [
          item.avatar && <Avatar src={item.avatar} />,
          <Link to={userPreviewLink(item, 'user', 'view')}>{item.name}</Link>,
        ],
      },
      {
        title: label.mail,
        render: (item) => (
          <Link to={userPreviewLink(item, 'user', 'view')}>{item.mail}</Link>
        ),
      },
      {
        title: label.other_info,
        render: (item) =>
          [
            item.positions && !!item.positions.length && (
              <Positions item={item} textOnly={true} />
            ),
            item.user_organizations && !!item.user_organizations.length && (
              <OrganizationsOrPhongBan
                item={item}
                attr={'user_organizations'}
                showParentsInfo
              />
            ),
            item.phongbans && !!item.phongbans.length && (
              <OrganizationsOrPhongBan
                item={item}
                attr={'phongbans'}
                showParentsInfo={false}
              />
            ),
          ].filter(Boolean),
      },
      {
        title: label.created_date,
        render: (item) => timestampToDateString(item.ts, { type: 'full_date' }),
      },
      {
        title: label.login_required_latest_ts,
        render: ({ login_required_latest_ts }) =>
          timestampToDateString(login_required_latest_ts, {
            type: 'full_date',
          }),
      },
    ].filter(Boolean);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { items } = this.props;
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
          columns={this.getColumn()}
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
          onClick={() => this.handleResendRequiredLoginForUsersSelected()}
          icon={<Icon icon="pass" style={{ color: 'white' }} />}
          label={t1('resend_required_login(%s_users_seleted)', [
            Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
          ])}
          className="m-t-10"
        />
      </div>
    );
  }
}

export default SearchResult;
