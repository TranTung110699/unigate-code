import React, { Component } from 'react';
import { t1 } from 'translate';
import Avatar from 'components/common/avatar';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { handleInviteCourseRequest } from 'actions/learn/saga-creators';
import { displayStatusInvited, schoolTypes } from 'configs/constants';
import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';
import lodashGet from 'lodash.get';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import SinvitesInItem from './sinvites-in-item/Button';
import AntTable from 'antd/lib/table';
import BatchButton from './batch-actions/Button';
import Icon from 'components/common/Icon';
import { ButtonType } from 'components/common/primary-button/button-type-constants';
import { CourseActions } from 'configs/constants/permission';
import { leaderPositionToText } from 'configs/constants/user';

const invitedStatus = ['compulsory', 1, 'delete', 5, 'accept', 2, 'reject', 4];

class ResultsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  handleInviteChange = () => {
    const { handleInviteChange } = this.props;
    if (typeof handleInviteChange === 'function') {
      handleInviteChange();
    }
  };

  inviteSuccess = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
    this.handleInviteChange();
  };

  handleInvite = (item, action) => {
    const { dispatch } = this.props;
    const target = {
      iid: item.user && item.user.iid,
      type: 'user',
    };
    const params = { item: item.item.iid, act: action, target };
    dispatch(
      handleInviteCourseRequest(params, this.inviteSuccess, {
        success: t1(`${action}_success`),
        error: t1(`${action}_error`),
      }),
    );
  };

  handleRequestBatchSuccessful = () => {
    this.setState({ selectedRowKeys: [] });
  };

  /**
   * Kiểm tra xem user có được thực hiện thành động intive sinh viên hay không
   * TODO Kiểm tra cả quyền cho trường kiểm enterprise
   * TODO Cần check quyền intive thay vì check quyen của course
   * @returns Boolean
   */
  hasPermissionUpdate = () => {
    const { hasPermission, permissions, node, themeConfig } = this.props;
    const isEnterprise =
      lodashGet(themeConfig, 'type') === schoolTypes.ENTERPRISE;
    if (isEnterprise) {
      return true;
    }
    return (
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE,
        node && node.iid,
        permissions,
      )
    );
  };

  getRowSpan = (item, keyToGroupSinvite = 'id') => {
    return lodashGet(item, `rowSpans[${keyToGroupSinvite}]`);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      ntype,
      items,
      searchFormId,
      node,
      hasPermUpdate,
      searchValues,
    } = this.props;

    const width = {
      type: '5%',
      status: '10%',
      action: '10%',
      code: '10%',
    };

    if (!items) {
      return null;
    }

    // we unwind the histories array because we will display each history record as a separated row
    let rows = unwind(
      items,
      'histories',
      'history',
      (item, sinviteIndex, historyIndexInSinvite) => {
        return Object.assign({}, item, {
          key: `invite-${lodashGet(item, 'id')}-${historyIndexInSinvite}`,
        });
      },
    );

    // some sinvites may take more than 1 row (if there are more than one history record)
    const keyToGroupSinvite = 'id';

    rows = populateRowSpanInfoToRenderListOfItemAsTable(rows, [
      keyToGroupSinvite,
    ]);

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        width: width.code,
        render: (item) => {
          return {
            children: (
              <Link to={getUrl('admin_view_student', item.user)}>
                {item.user.code || item.user.iid}
              </Link>
            ),
            rowSpan: this.getRowSpan(item),
          };
        },
      },
      {
        title: t1('name'),
        key: 'name',
        render: (item) => {
          return {
            children: item.user && item.user.iid && (
              <Link to={getUrl('admin_view_student', item.user)}>
                <Avatar user={item.user} size={30} />
                &nbsp; {item.user && item.user.name}{' '}
                <div className="text-muted">{item.user && item.user.mail}</div>
                <div className="text-muted">{item.user && item.user.phone}</div>
              </Link>
            ),
            rowSpan: this.getRowSpan(item),
          };
        },
      },
      ...(window.isETEP
        ? [
            {
              title: t1('position'),
              key: 'position',
              render: (item) =>
                lodashGet(item, 'user.leader_position')
                  ? leaderPositionToText(
                      lodashGet(item, 'user.leader_position'),
                    )
                  : null,
            },
          ]
        : []),
      {
        title: t1('organization'),
        key: 'organization',
        render: (item) => {
          return {
            children: lodashGet(item, 'user.__expand.user_organizations') ? (
              <OrganizationsOrPhongBan
                item={lodashGet(item, 'user')}
                attr={'user_organizations'}
                showParentsInfo
              />
            ) : lodashGet(item, 'user.user_organizations_info', []) ? (
              lodashGet(item, 'user.user_organizations_info', []).map(
                (org) => org.name,
              )
            ) : (
              ''
            ),
            rowSpan: this.getRowSpan(item),
          };
        },
      },
      ...(!node || !node.iid
        ? [
            {
              title: `${t1('major')} / ${t1('ico')}`,
              key: 'major',
              render: (item) => [
                {
                  children: (
                    <>
                      {lodashGet(item, 'item.major_name') &&
                        `${lodashGet(item, 'item.major_name')} / `}
                      {lodashGet(item, 'item.ico_name')}
                    </>
                  ),
                  rowSpan: this.getRowSpan(item),
                },
              ],
            },
            {
              title: `${t1('training_mode')} / ${t1('training_level')}`,
              key: 'training',
              render: (item) => [
                {
                  children: (
                    <>
                      {lodashGet(item, 'item.training_mode') &&
                        `${t1(lodashGet(item, 'item.training_mode'))} / `}
                      {t1(lodashGet(item, 'item.training_level'))}
                    </>
                  ),
                  rowSpan: this.getRowSpan(item),
                },
              ],
            },
            {
              title: t1('credit_syllabus'),
              key: 'credit_syllabus',
              render: (item) => [
                {
                  children: (
                    <>
                      {lodashGet(item, 'item.credit_syllabus_name') &&
                        lodashGet(item, 'item.credit_syllabus_name')}
                    </>
                  ),
                  rowSpan: this.getRowSpan(item),
                },
              ],
            },
            {
              title: t1('learn_item'),
              key: 'learn_item',
              render: (item) => [
                {
                  children: item.item && item.item.iid && (
                    <SinvitesInItem item={item.item} />
                  ),
                  rowSpan: this.getRowSpan(item),
                },
              ],
            },
          ]
        : []),
      ...(!window.isETEP
        ? [
            {
              title: t1('status'),
              key: 'status',
              width: width.status,
              render: (item) => {
                const history = lodashGet(item, 'history');
                return history ? displayStatusInvited(history.status) : null;
              },
            },
          ]
        : []),
      /*...(!window.isETEP
        ? [
            {
              title: t1('actions'),
              key: 'actions',
              width: width.action,
              render: (item) => {
                const history = lodashGet(item, 'history');
                if (hasPermUpdate) {
                  return (
                    <div>
                      {(!ntype || ntype !== 'contest') && (
                        <span>
                          {history &&
                            !invitedStatus.includes(history.status) && (
                              <IconButton
                                title={t1('accept')}
                                iconClassName="mi mi-done"
                                onClick={() =>
                                  this.handleInvite(item, 'accept')
                                }
                              />
                            )}
                          {history &&
                            !invitedStatus.includes(history.status) && (
                              <IconButton
                                title={t1('reject')}
                                iconClassName="mi mi-close"
                                onClick={() =>
                                  this.handleInvite(item, 'reject')
                                }
                              />
                            )}
                        </span>
                      )}
                      <DeleteItem
                        alternativeApi="/invite/api/delete"
                        params={{
                          target: {
                            type: 'user',
                            iid: item.user && item.user.iid,
                          },
                          historyId: history && history.ts,
                        }}
                        itemId={item.id}
                        formid={searchFormId}
                        onRequestSuccessful={this.handleInviteChange}
                      />
                    </div>
                  );
                }
                return null;
              },
            },
          ]
        : []),*/
    ];

    const { selectedRowKeys } = this.state;
    const idInCurrentPage = Array.isArray(items)
      ? items.map(({ id }) => id)
      : [];

    const selectedItems = selectedRowKeys
      ? items.filter((item) => {
          return selectedRowKeys.indexOf(item.id) !== -1;
        })
      : [];

    return (
      <div className="table-result">
        <AntTable
          columns={columns}
          dataSource={items}
          bordered
          className="white-background"
          pagination={false}
          childrenColumnName={null}
          rowKey="id"
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
                    let currentSelectedRowKeys = lodashGet(
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
                    let currentSelectedRowKeys = lodashGet(
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
        {hasPermUpdate && (
          <div className="m-t-10">
            {/*{// hack for etep, we will find a better way
            !window.isETEP ? (
              <>
                <span className="p-t-10 p-r-10">
                  <BatchButton
                    primary
                    searchFormId={searchFormId}
                    items={selectedItems}
                    label={t1('accept_%s_selected_users', [
                      lodashGet(selectedItems, 'length') || 0,
                    ])}
                    act="accept"
                    requestSuccessful={this.handleRequestBatchSuccessful}
                    icon={<Icon icon="check" />}
                  />
                </span>
                <span className="p-t-10 p-r-10">
                  <BatchButton
                    primary
                    searchFormId={searchFormId}
                    items={selectedItems}
                    label={t1('reject_%s_selected_users', [
                      lodashGet(selectedItems, 'length') || 0,
                    ])}
                    act="reject"
                    requestSuccessful={this.handleRequestBatchSuccessful}
                    icon={<Icon icon="delete" />}
                    buttonType={ButtonType.danger}
                  />
                </span>
                <span className="p-t-10 p-r-10">
                  <BatchButton
                    primary
                    searchFormId={searchFormId}
                    searchValues={searchValues}
                    label={t1('accept_all_uses')}
                    act="accept"
                    icon={<Icon icon="check" />}
                  />
                </span>
                <span className="p-t-10 p-r-10">
                  <BatchButton
                    primary
                    searchFormId={searchFormId}
                    searchValues={searchValues}
                    label={t1('reject_all_uses')}
                    act="reject"
                    icon={<Icon icon="delete" />}
                    buttonType={ButtonType.danger}
                  />
                </span>
              </>
            ) : null}*/}
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                items={selectedItems}
                label={t1('delete_%s_selected_users', [
                  lodashGet(selectedItems, 'length') || 0,
                ])}
                act="delete"
                requestSuccessful={this.handleRequestBatchSuccessful}
                icon={<Icon icon="delete" />}
                buttonType={ButtonType.danger}
              />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ResultsTable;
