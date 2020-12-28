import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Select from 'antd/lib/select';
import AntdTable from 'antd/lib/table';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import ResolveConflictUsersMapping from './resolveConflictUsersMapping';
import ShowFullWhenHover from 'components/common/html/show-full-when-hover';
import Tag from 'antd/lib/tag';

const { Option } = Select;

const DATA_PROCESSED = 'data_processed';
const DATA_CORRECT = 'data_correct';
const DATA_CONFLICT = 'data_conflict';
const DATA_NOT_FOUND = 'data_not_found';
const DATA_ERROR = 'data_error';

const defaultPageSize = 30;

class CompareDataResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resolvedConflict: {},
      selectedRowKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resetCompare !== nextProps.resetCompare) {
      this.setState(() => ({
        resolvedConflict: {},
        selectedRowKeys: [],
      }));
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getColumns = () => {
    let fields = get(this.props, 'importInformation.extra_info.fields');
    if (!Array.isArray(fields) || !fields.length) {
      fields = ['code', 'name', 'mail'];
    }
    const { type } = this.props;

    return fields
      .map((field) => {
        if (!field) {
          return false;
        }
        return {
          title: t1(field),
          key: field,
          dataIndex: field,
        };
      })
      .concat([
        type === DATA_CONFLICT && {
          title: t1('resolve_conflict'),
          render: (text, { number_of_users_match, id }) => {
            const userResolved = get(this.state, `resolvedConflict.${id}`);

            return {
              children: [
                userResolved && userResolved.iid && (
                  <h3>
                    {t1('user_selected_%s', [
                      userResolved.name || userResolved.id,
                    ])}
                  </h3>
                ),
                <DetailOnDialog
                  renderPreview={({ showFull }) => (
                    <Tag
                      color={
                        userResolved && userResolved.iid ? null : '#faad14'
                      }
                      onClick={showFull}
                    >
                      {number_of_users_match}
                    </Tag>
                  )}
                  renderFull={({ closeDialog }) => (
                    <ResolveConflictUsersMapping
                      user_id={id}
                      valuesToCompare={this.props.valuesToCompare}
                      handleSelectedUserToResolvedConflict={(user) =>
                        this.setState(({ resolvedConflict }) => {
                          resolvedConflict[id] = user;
                          return { resolvedConflict };
                        }, closeDialog)
                      }
                    />
                  )}
                />,
              ],
              props: {
                className: 'text-center',
              },
            };
          },
        },
        type === DATA_ERROR && {
          title: t1('errors'),
          render: (text, row) => {
            return (
              Array.isArray(row.err) &&
              row.err.map((err) => (
                <span>
                  <p style={{ backgroundColor: '#faad14' }}>
                    <ShowFullWhenHover content={err} style={{ width: 100 }} />
                  </p>
                  <br />
                </span>
              ))
            );
          },
        },
      ])
      .filter(Boolean);
  };

  getLabelToSubmit = (
    type = DATA_CORRECT,
    node = {},
    numberSelectedRow = 0,
  ) => {
    switch (type) {
      case 'all': {
        return this.props.type === DATA_CORRECT
          ? t1(`invite_all_users_to_for_${node && node.ntype}`)
          : t1(`import_and_invite_all_users_to_for_${node && node.ntype}`);
      }
      case DATA_CONFLICT:
      case DATA_CORRECT: {
        return t1(`invite_%s_users_to_for_${node && node.ntype}`, [
          numberSelectedRow,
        ]);
      }
      case DATA_NOT_FOUND: {
        return t1(`import_and_invite_%s_users_to_for_${node && node.ntype}`, [
          numberSelectedRow,
        ]);
      }
    }
  };

  getMappingUserToImport = () => {
    const { users, type } = this.props;
    const { selectedRowKeys, resolvedConflict } = this.state;
    if (!Array.isArray(selectedRowKeys) || !selectedRowKeys.length) {
      return [];
    }

    return users
      .map((user) => {
        const user_temp_id = selectedRowKeys.includes(user.id) && user.id;

        if (!user_temp_id) {
          return user_temp_id;
        }
        switch (type) {
          case DATA_CORRECT: {
            return {
              user_temp_id,
              user_iid: get(user, 'user_match.iid'),
            };
          }
          case DATA_CONFLICT: {
            const userResolved =
              resolvedConflict && resolvedConflict[user_temp_id];
            if (!userResolved || !userResolved.iid) {
              return false;
            }
            return {
              user_temp_id,
              user_iid: userResolved.iid,
            };
          }
          case DATA_NOT_FOUND: {
            return {
              user_temp_id,
            };
          }
        }
      })
      .filter(Boolean);
  };

  elementFormInvite = (type = 'all') => {
    let { valuesToCompare, node, searchFormId } = this.props;
    const { selectedRowKeys } = this.state;

    const import_for_item = {
      id: get(node, 'id'),
      iid: get(node, 'iid'),
      type: get(node, 'type'),
      ntype: get(node, 'ntype'),
      credit_syllabus: get(node, 'credit_syllabus'),
    };

    let hiddenFields = {};
    let submitButton = '';
    let alternativeApi = '/user/import/execute-import-users';

    if (type === 'all') {
      hiddenFields = {
        type: this.props.type,
        import_for_item,
        values_to_compare: valuesToCompare,
      };

      submitButton = (
        <RaisedButton
          type="submit"
          className="m-t-30 m-r-20"
          label={this.getLabelToSubmit(type, node)}
          primary
        />
      );

      alternativeApi = '/user/import/execute-import-all-user';
    } else {
      hiddenFields = {
        type,
        mapping_user: this.getMappingUserToImport(),
        import_for_item,
      };
      submitButton = () => (
        <RaisedButton
          name="submit"
          type="submit"
          className="m-t-30 m-r-20"
          disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
          label={this.getLabelToSubmit(type, node, selectedRowKeys.length)}
          primary
        />
      );
    }

    return (
      <NodeNew
        className="pull-left"
        schema={{
          schema: () => ({}),
          ui: () => [],
        }}
        hiddenFields={hiddenFields}
        searchFormId={searchFormId}
        formid="import-users"
        alternativeApi={alternativeApi}
        submitButton={submitButton}
      />
    );
  };

  render() {
    let {
      users,
      node,
      type,
      searchFormId,
      allowInserting,
      elementExportDataError,
    } = this.props;
    const { selectedRowKeys, resolvedConflict } = this.state;

    const dataSource = Array.isArray(users) ? users : [];

    const hiddenRowSelection =
      [DATA_PROCESSED, DATA_ERROR].includes(type) ||
      (type === DATA_NOT_FOUND && !allowInserting);

    return (
      <div>
        <AntdTable
          rowKey="id"
          columns={this.getColumns()}
          dataSource={dataSource}
          rowSelection={
            hiddenRowSelection
              ? null
              : {
                  selectedRowKeys,
                  onChange: this.onSelectChange,
                  getCheckboxProps: (record) => ({
                    disabled:
                      type === DATA_CONFLICT && !resolvedConflict[record.id],
                  }),
                }
          }
          pagination={
            dataSource.length <= defaultPageSize
              ? false
              : {
                  pageSizeOptions: [10, 30, 50, 100],
                  defaultPageSize,
                  showSizeChanger: true,
                }
          }
          bordered
          size="middle"
        />
        {!hiddenRowSelection &&
          dataSource.length &&
          this.elementFormInvite(type)}
        {(type === DATA_CORRECT ||
          (type === DATA_NOT_FOUND && allowInserting)) &&
          !!dataSource.length &&
          this.elementFormInvite()}
        {type === DATA_ERROR && elementExportDataError}
      </div>
    );
  }
}

const contentTabsToImportUsersInNode = ({
  dataCompare = {},
  importInformation = {},
  node = {},
  resetCompare = false,
  searchFormId = '',
  allowInserting = false,
  valuesToCompare = {},
  elementExportDataError = null,
}) => {
  let activeTab = null;
  const tabs = [
    DATA_PROCESSED,
    DATA_CORRECT,
    DATA_CONFLICT,
    DATA_NOT_FOUND,
    DATA_ERROR,
  ]
    .map((key) => {
      const data = get(dataCompare, key);
      const length = Array.isArray(data) ? data.length : 0;

      if (!length && [DATA_PROCESSED, DATA_ERROR].includes(key)) {
        return false;
      }

      if (length && activeTab === null) {
        activeTab = key;
      }

      let style = {};
      const content = (
        <CompareDataResult
          type={key}
          resetCompare={resetCompare}
          users={data}
          importInformation={importInformation}
          node={node}
          searchFormId={searchFormId}
          allowInserting={allowInserting}
          valuesToCompare={valuesToCompare}
          elementExportDataError={elementExportDataError}
        />
      );

      switch (key) {
        case DATA_PROCESSED:
        case DATA_CORRECT: {
          style = {
            color: '#08B5E5',
          };
          break;
        }
        case DATA_CONFLICT: {
          style = {
            color: '#E6C107',
          };
          break;
        }
        case DATA_ERROR:
        case DATA_NOT_FOUND: {
          style = {
            color: '#DF2716',
          };
          break;
        }
        default: {
          break;
        }
      }

      style.textTransform = 'none';

      return {
        buttonStyle: style,
        value: key,
        label: `${t1(key)} (${Array.isArray(data) ? data.length : 0})`,
        content,
      };
    })
    .filter(Boolean);

  return {
    tabs,
    initialSelectedIndex: activeTab || DATA_CORRECT,
  };
};

export default contentTabsToImportUsersInNode;
