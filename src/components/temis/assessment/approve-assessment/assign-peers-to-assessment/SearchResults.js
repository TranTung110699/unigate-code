import React, { Component } from 'react';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate/index';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import Avatar from 'antd/lib/avatar';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { timestampToDateTimeString } from 'common/utils/Date';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import Icon from 'components/common/Icon';
import Button from 'antd/lib/button';

class SearchPeersToAssignResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  handleAssignPeersToAssess = (iids = null) => {
    const { assignPeersToAssess } = this.props;

    if (typeof assignPeersToAssess !== 'function') {
      return;
    }

    assignPeersToAssess(iids || this.state.selectedRowKeys);
  };

  getColumns = () => {
    return [
      {
        title: t1('stt'),
        className: 'text-center',
        render: (text, row, index) => index + 1,
      },
      {
        title: t1('name'),
        key: 'name',
        render: (name, item) => {
          return (
            <div>
              {item.avatar && <Avatar src={item.avatar} />}&nbsp;
              <PreviewUserInDialog
                user={item}
                showFullDetailButton={false}
                hiddenItem={['positions']}
              />
            </div>
          );
        },
      },
      {
        title: t1('mail'),
        render: ({ mail }) => mail,
      },
      {
        title: t1('birthday'),
        key: 'birthday',
        render: (birthday, item) => {
          return (
            <div>
              {item.birthday > 0 &&
                timestampToDateTimeString(item.birthday, { showTime: false })}
            </div>
          );
        },
      },
      {
        title: t1('organizations'),
        width: '15%',
        render: (item) =>
          item.user_organizations &&
          !!item.user_organizations.length && (
            <div>
              <OrganizationsOrPhongBan
                item={item}
                attr={'user_organizations'}
                showParentsInfo
              />
              {Array.isArray(get(item, '__expand.phongbans')) &&
                !!get(item, '__expand.phongbans').length && [
                  <br />,
                  <OrganizationsOrPhongBan item={item} attr={'phongbans'} />,
                ]}
            </div>
          ),
      },
      {
        title: t1('action'),
        className: 'text-center',
        render: ({ iid, name }) => (
          <Icon
            icon="plus"
            className="action"
            title={t1('assign_%s_to_assess', [name])}
            onClick={() => this.handleAssignPeersToAssess([iid])}
          />
        ),
      },
    ];
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { items } = this.props;
    const { selectedRowKeys } = this.state;
    const idInCurrentPage = Array.isArray(items)
      ? items.map(({ iid }) => iid)
      : [];

    return [
      <AntdTable
        columns={this.getColumns()}
        dataSource={Array.isArray(items) ? items : []}
        rowKey="iid"
        bordered
        pagination={false}
        childrenColumnName={null}
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
                  let currentSelectedRowKeys = get(
                    state,
                    'selectedRowKeys',
                    [],
                  );
                  currentSelectedRowKeys = currentSelectedRowKeys.concat(
                    idInCurrentPage
                      .map(
                        (iid) => !currentSelectedRowKeys.includes(iid) && iid,
                      )
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
                  let currentSelectedRowKeys = get(
                    state,
                    'selectedRowKeys',
                    [],
                  ).filter((iid) => !idInCurrentPage.includes(iid));
                  return { selectedRowKeys: currentSelectedRowKeys };
                });
              },
            },
            Array.isArray(selectedRowKeys) &&
              !!selectedRowKeys.length &&
              !selectedRowKeys.every((iid) =>
                idInCurrentPage.includes(iid),
              ) && {
                key: 'remove_all',
                text: t1('remove_all_data_selected'),
                onSelect: () => {
                  this.setState(() => ({ selectedRowKeys: [] }));
                },
              },
          ].filter(Boolean),
        }}
      />,
      <Button
        type="primary"
        onClick={() => this.handleAssignPeersToAssess()}
        disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
        className="m-t-30"
      >
        {t1('assign_%s_selected_users_to_assess', [
          (Array.isArray(selectedRowKeys) && selectedRowKeys.length) || 0,
        ])}
      </Button>,
    ];
  }
}

export default withTemisConfig(SearchPeersToAssignResult);
