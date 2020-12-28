/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { t1 } from 'translate/index';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new/index';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import InlineEditable from 'components/common/forms/editable/inline';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { getUrl } from 'routes/links/common';
import { getSchemaApplyMultiDegree } from 'components/admin/plan/schema/form';

class Results extends Component {
  getColumns = () => {
    return [
      {
        title: t1('stt'),
        className: 'text-center',
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('name'),
        key: 'id',
        render: (text, row, index) => {
          return (
            <div>
              <InlineEditable
                value={get(row, 'name')}
                propName="name"
                url={getUrl('node_update', {
                  ...row,
                  ntype: 'degree',
                  id: get(row, 'id'),
                  step: 'name',
                  action: 'update-multi-degree',
                })}
                validate={(newValue) => newValue && newValue.length}
              />{' '}
              (#{get(row, 'code')})
            </div>
          );
        },
      },
      {
        title: t1('forms_of_training'),
        key: 'id',
        render: (text, row, index) => {
          const formsOfTraining = get(row, 'forms_of_training') || [];
          return (
            <ol>
              {formsOfTraining.map((formOfTraining) => {
                return (
                  <li>
                    <p>{`${t1('faculty')}: ${get(
                      formOfTraining,
                      'facultyObject.name',
                    )}(#${get(formOfTraining, 'facultyObject.code')}) | ${t1(
                      'major',
                    )}: ${get(formOfTraining, 'majorObject.name')}(#${get(
                      formOfTraining,
                      'majorObject.code',
                    )})`}</p>
                    <p>{`${t1('training_level')}: ${t1(
                      get(formOfTraining, 'training_level'),
                    )} | ${t1('training_mode')}: ${t1(
                      get(formOfTraining, 'training_mode'),
                    )}`}</p>
                  </li>
                );
              })}
            </ol>
          );
        },
      },
      {
        title: t1('ico_has_been_applied'),
        key: 'id',
        render: (text, row, index) => {
          const icos = get(row, 'icos') || [];
          return (
            <ul>
              {icos.map((ico) => {
                return (
                  <li>
                    {`${get(ico, 'name')} (#${get(ico, 'code')})`}{' '}
                    <DeleteItem
                      title={t1('remove_applied')}
                      textComfirm={t1('are_you_sure_you_want_to_do_this')}
                      formid={this.props.formid}
                      ntype="degree"
                      params={{ ico: get(ico, 'iid') }}
                      alternativeApi={getUrl('node_update', {
                        ntype: 'degree',
                        id: get(row, 'id'),
                        step: 'remove_ico',
                        action: 'update-multi-degree',
                      })}
                      itemId={get(row, 'id')}
                    />
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        title: t1('actions'),
        key: 'id',
        render: (text, row, index) => ({
          children: (
            <div>
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <FlatButton
                    style={{ top: '-7px' }}
                    icon={
                      <Icon
                        icon="plus"
                        title={t1('apply_ico')}
                        style={{ fontSize: 20 }}
                      />
                    }
                    onClick={showFull}
                  />
                )}
                renderFull={({ closeDialog }) =>
                  this.formApplyForMultipleDegree(
                    {
                      id: get(row, 'id'),
                    },
                    closeDialog,
                    {},
                    {
                      alternativeApi: getUrl('node_update', {
                        ...row,
                        ntype: 'degree',
                        id: get(row, 'id'),
                        step: 'apply_ico',
                        action: 'update-multi-degree',
                      }),
                      step: 'apply_ico',
                    },
                  )
                }
              />
              <DeleteItem
                title={t1('delete_this_degree')}
                textComfirm={t1('are_you_sure_you_want_to_do_this')}
                formid={this.props.formid}
                ntype="degree"
                alternativeApi={getUrl('node_update', {
                  ntype: 'degree',
                  id: get(row, 'id'),
                  action: 'delete-multi-degree',
                })}
                itemId={get(row, 'id')}
              />
            </div>
          ),
          props: {
            className: 'text-center',
          },
        }),
      },
    ];
  };

  formApplyForMultipleDegree = (
    hiddenFields,
    closeDialog,
    node = {},
    propsRender = {},
  ) => {
    return (
      <NodeNew
        resetForm
        ntype={'degree'}
        schema={getSchemaApplyMultiDegree(hiddenFields)}
        hiddenFields={hiddenFields}
        mode="new"
        node={node}
        step="multi-dregree"
        formid={'apply_for_multi_dregree'}
        searchFormId={this.props.formid}
        requestSuccessful={closeDialog}
        submitButton={
          hiddenFields && Object.keys(hiddenFields).length ? (
            <div className="text-center">
              <RaisedButton
                icon={<Icon icon="update" />}
                label={t1('apply')}
                primary
                type="submit"
              />
            </div>
          ) : null
        }
        {...propsRender}
      />
    );
  };

  render() {
    const { items, paramsSearch, searchFormValues } = this.props;

    return [
      <div>
        <AntdTable
          columns={this.getColumns()}
          dataSource={Array.isArray(items) ? items : []}
          pagination={false}
          bordered
          size="middle"
        />
      </div>,
      <div className="m-t-30 m-b-30">
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <RaisedButton
              label={t1('apply_for_multiple_degree_programs')}
              icon={<Icon icon="plus" />}
              onClick={showFull}
            />
          )}
          renderFull={({ closeDialog }) =>
            this.formApplyForMultipleDegree(paramsSearch || {}, closeDialog, {
              forms_of_training: [
                {
                  faculty: get(searchFormValues, 'faculty'),
                  major: get(searchFormValues, 'major'),
                  training_mode: get(searchFormValues, 'training_mode'),
                  training_level: get(searchFormValues, 'training_level'),
                },
                {
                  faculty: '',
                  major: '',
                  training_mode: '',
                  training_level: '',
                },
              ],
              ico: get(searchFormValues, 'ico'),
            })
          }
          dialogOptionsProperties={{
            width: '80%',
          }}
        />
      </div>,
    ];
  }
}

export default Results;
