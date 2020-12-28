import React from 'react';
import get from 'lodash.get';
import { t1, t3 } from 'translate';
import Select from 'antd/lib/select';
import AntdTable from 'antd/lib/table';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import Tag from 'antd/lib/tag';
import ShowFullWhenHover from 'components/common/html/show-full-when-hover';
import LoginableFieldsHelp from './LoginableFieldsHelp';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';

const { Option } = Select;

const DATA_PROCESSED = 'data_processed';
const DATA_CORRECT = 'data_correct';
const DATA_DUPLICATE = 'data_duplicate';
const DATA_ERROR = 'data_error';

const defaultPageSize = 30;
const alternativeApi = '/user/import/execute-import-users';

class CompareDataResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resetCompare !== nextProps.resetCompare) {
      this.setState(() => ({
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
          render: (text, item) => {
            const warningFields = get(item, 'warning_fields');
            if (Array.isArray(warningFields) && warningFields.includes(field)) {
              return (
                <div
                  style={{ color: '#DF2716' }}
                  title={t1('go_to_resolve_warning_attribute')}
                >
                  {text}
                </div>
              );
            }
            return text;
          },
        };
      })
      .concat([
        type === DATA_DUPLICATE && {
          title: (
            <div>
              {t1('duplicate_users')}{' '}
              <Tooltip
                title={<LoginableFieldsHelp />}
                overlayStyle={{ maxWidth: 'unset' }}
                placement="right"
                arrowPointAtCenter={true}
              >
                <Icon type="question-circle" />
              </Tooltip>
            </div>
          ),
          render: (text, { number_of_users_match }) => {
            if (!number_of_users_match) {
              return null;
            }

            // TODO: mở dialog để hiện thị danh sách bị trùng
            return number_of_users_match;
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

  getLabelToSubmit = (type, numberSelectedRow = 0) => {
    if (type === DATA_DUPLICATE) {
      return t1("update_%s_user's_in_the_system", [numberSelectedRow]);
    }
    return t1("import_%s_user's_into_the_system", [numberSelectedRow]);
  };

  getMappingUserToImport = () => {
    const { users, type } = this.props;
    const { selectedRowKeys } = this.state;
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
          case DATA_DUPLICATE:
          case DATA_CORRECT: {
            return {
              user_temp_id,
            };
          }
          default:
            return false;
        }
      })
      .filter(Boolean);
  };

  render() {
    let {
      users,
      type,
      searchFormId,
      importValidationId,
      uniqueFields,
      elementExportDataError,
    } = this.props;
    const { selectedRowKeys } = this.state;

    const dataSource = Array.isArray(users) ? users : [];
    const hiddenRowSelection = [DATA_PROCESSED, DATA_ERROR].includes(type);

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
                  getCheckboxProps: (record) => {
                    if (
                      type !== DATA_DUPLICATE ||
                      get(record, 'number_of_users_match') === 1
                    ) {
                      return {};
                    }

                    return {
                      disabled: true,
                    };
                  },
                }
          }
          pagination={
            !Array.isArray(users) || users.length <= defaultPageSize
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
        {!hiddenRowSelection && dataSource.length > 0 && (
          <NodeNew
            className="pull-left"
            schema={{
              schema: () => ({}),
              ui: () => [],
            }}
            hiddenFields={{
              type,
              unique_fields: uniqueFields,
              mapping_user: this.getMappingUserToImport(),
            }}
            searchFormId={searchFormId}
            formid="import-users"
            alternativeApi={alternativeApi}
            submitButton={() => (
              <RaisedButton
                name="submit"
                type="submit"
                className="m-t-30"
                disabled={
                  !Array.isArray(selectedRowKeys) || !selectedRowKeys.length
                }
                label={this.getLabelToSubmit(
                  type,
                  Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
                )}
                primary
              />
            )}
          />
        )}

        {(() => {
          if (type === DATA_ERROR) {
            return elementExportDataError;
          }
          if (
            ![DATA_CORRECT, DATA_DUPLICATE].includes(type) ||
            !dataSource.length
          ) {
            return null;
          }

          if (
            type === DATA_DUPLICATE &&
            !dataSource.find(
              ({ number_of_users_match }) => number_of_users_match === 1,
            )
          ) {
            return null;
          }

          return (
            <NodeNew
              className="pull-left"
              schema={{
                schema: () => ({}),
                ui: () => [],
              }}
              hiddenFields={{
                type,
                all: true,
                unique_fields: uniqueFields,
                import_validation_id: importValidationId,
              }}
              searchFormId={searchFormId}
              formid="import-users"
              alternativeApi={alternativeApi}
              submitButton={() => (
                <RaisedButton
                  name="submit"
                  type="submit"
                  className="m-l-20 m-t-30"
                  label={t1(
                    type === DATA_DUPLICATE ? 'update_all' : 'import_all',
                  )}
                  primary
                />
              )}
            />
          );
        })()}
      </div>
    );
  }
}

const contentTabsToImportUsersInTheSystem = ({
  dataCompare = {},
  importInformation = {},
  node = {},
  resetCompare = false,
  searchFormId = '',
  allowInserting = false,
  valuesToCompare,
  elementExportDataError = null,
}) => {
  let activeTab = null;
  const importValidationId = get(dataCompare, 'import_validation_id');

  const tabs = [DATA_PROCESSED, DATA_CORRECT, DATA_DUPLICATE, DATA_ERROR]
    .map((key) => {
      const data = get(dataCompare, key);
      const length = Array.isArray(data) ? data.length : 0;

      // if (!length && [DATA_PROCESSED, DATA_ERROR].includes(key)) {
      //   return false;
      // }

      if (length && activeTab === null) {
        activeTab = key;
      }

      let style = {};
      const content = (
        <CompareDataResult
          importValidationId={importValidationId}
          type={key}
          resetCompare={resetCompare}
          users={data}
          importInformation={importInformation}
          node={node}
          searchFormId={searchFormId}
          allowInserting={allowInserting}
          uniqueFields={get(valuesToCompare, 'unique_fields')}
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
        case DATA_DUPLICATE: {
          style = {
            color: '#E6C107',
          };
          break;
        }
        case DATA_ERROR: {
          style = {
            color: '#DF2716',
          };
          break;
        }
        default: {
          return false;
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

export default contentTabsToImportUsersInTheSystem;
