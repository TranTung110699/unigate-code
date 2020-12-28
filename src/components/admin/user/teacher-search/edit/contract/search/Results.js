import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';
import actions from 'actions/node/creators';
import { timestampToDateString } from 'common/utils/Date';
import ActionToggle from 'components/common/toggle/ActionToggle';
import AntdTable from 'antd/lib/table';
import DetailOnDialog from 'components/common/detail-on-dialog';
import routes from 'routes';

import { addContractMethods } from 'configs/constants';
import UpdateForm from '../new/Form';

const editContractLabel = t1('edit_contract');
const removeLabel = t1('remove');
const textConfirm = t1('are_you_sure_you_want_to_do_this');

const tableResult = ({ items, formid, ntype, hasContractNormal, teacher }) => {
  const columns = [
    hasContractNormal && {
      title: t1('code,name'),
      key: 'id',
      render: (text, row) =>
        get(row, 'is_simple_contract')
          ? null
          : `${get(row, 'code')} - ${get(row, 'name')}`,
    },
    {
      title: t1('from_to_date'),
      key: 'id',
      render: (text, row) => {
        const startDate = get(row, 'start_date');
        const endDate = get(row, 'end_date');

        return `${startDate ? timestampToDateString(startDate) : '-/-/-/'} - ${
          endDate ? timestampToDateString(endDate) : '-/-/-/'
        }`;
      },
    },
    {
      title: t1('contract_type'),
      render: (text, row) => {
        const is_simple_contract = get(row, 'is_simple_contract');
        return is_simple_contract
          ? t1(addContractMethods.SIMPLE)
          : t1(addContractMethods.NORMAL);
      },
    },
    {
      title: t1('credits'),
      render: (text, row) => {
        const credits = get(row, 'credit_syllabuses');
        if (!Array.isArray(credits) || !credits.length) {
          return null;
        }

        return credits
          .map((credit) => {
            return `${get(credit, 'name')} (#${get(credit, 'code')})`;
          })
          .join(', ');
      },
    },
    {
      title: t1('details'),
      render: (text, row) => {
        return (
          <ul>
            <li>
              {t1('%s_teaching_hours_to_complete', [
                get(row, 'teaching_hours_to_complete', 0),
              ])}
            </li>
            <li>
              {t1('%s_specialize_hours_to_complete', [
                get(row, 'specialize_hours_to_complete', 0),
              ])}
            </li>
            <li>
              {t1('%s_specialize_to_teaching_hours_conversion_rate', [
                get(row, 'specialize_to_teaching_hours_conversion_rate', 0),
              ])}
            </li>
            <li>{t1('%s_hourly_rate', [get(row, 'hourly_rate', 0)])}</li>
            <li>
              {t1('%s_overtime_hourly_rate', [
                get(row, 'overtime_hourly_rate', 0),
              ])}
            </li>
            <li>
              {t1('%s_weekend_hourly_rate', [
                get(row, 'weekend_hourly_rate', 0),
              ])}
            </li>
          </ul>
        );
      },
    },
    {
      title: t1('actions'),
      render: (text, row) => (
        <div>
          <ActionToggle
            hideLabel
            title={t1('status_%s', [get(row, 'status') || 'queued'])}
            baseURL={routes.url('node_update', {
              ...row,
              step: 'status',
            })}
            dataSet={{ on: 'approved', off: 'queued' }}
            value={get(row, 'status') || 'queued'}
            name="status"
          />
          <DetailOnDialog
            renderPreview={({ showFull }) => (
              <IconButton
                title={editContractLabel}
                iconClassName="mi mi-edit"
                onClick={showFull}
              />
            )}
            renderFull={({ closeDialog }) => (
              <UpdateForm
                resetForm
                teacher={teacher}
                mode="edit"
                title={t1('edit_contract')}
                node={row}
                step=""
                formid="edit_contract"
                searchFormId={formid}
                requestSuccessful={closeDialog}
                isSimpleContract={get(row, 'is_simple_contract')}
              />
            )}
          />
          <DeleteItem
            title={removeLabel}
            textConfirm={textConfirm}
            formid={formid}
            ntype={ntype}
            itemId={get(row, 'id')}
          />
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <AntdTable
      columns={columns}
      dataSource={items}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default tableResult;
