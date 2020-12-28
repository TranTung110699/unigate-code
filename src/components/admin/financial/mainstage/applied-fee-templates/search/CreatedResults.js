import React, { Component } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { submit } from 'redux-form';
import AntdTable from 'antd/lib/table';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { timestampToDateString } from 'common/utils/Date';
import routes from 'routes';
import { formatMoney } from 'common';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';
import DetailOnDialog from 'components/common/detail-on-dialog';
import UpdateUpdate from '../new/Form';

const label = {
  iid: t1('iid'),
  feeTemplate: t1('fee_template'),
  targetItem: t1('target_item'),
  targetPayers: t1('target_payers'),
  benefit: t1('benefits'),
  actions: t1('action'),
  edit: t1('edit'),
  delete: t1('delete'),
  syncFee: t1('synchronizer_fee'),
  status: t1('status'),
  date: t1('date'),
  confirmDelete: t1('are_you_sure_you_want_to_do_this'),
  confirmSync: t1('are_you_sure_you_want_to_do_this'),
  messageSync: { success: t1('async_successfully'), error: t1('async_error') },
};

const width = {
  iid: '5%',
  feeTemplate: '20%',
  benefit: '15%',
  targetItem: '15%',
  targetPayers: '15%',
  status: '5%',
  actions: '10%',
  date: '15%',
};

const ntype = 'applied-fee-template';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  handleRefreshForm = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  columns = [
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
      title: t1('target_item_payer'),
      render: (text, row, index) => {
        const targetPayers = get(row, 'fee_template.target_payers');
        return (
          <ul>
            {get(row, 'name') && (
              <li>{`${t1('name')}: ${get(row, 'name')}`}</li>
            )}
            <li>
              {`${t1('type')}: ${t1(get(row, 'fee_template.template_type'))}`}
              {get(row, 'target_item_applied') &&
                `(${t1(get(row, 'target_item_applied'))})`}
            </li>
            {Array.isArray(targetPayers) && !!targetPayers.length && (
              <li>
                {t1('target_payers')}:{' '}
                <ul>
                  {get(row, 'fee_template.target_payers', []).map((target) => {
                    return <li>{t1(get(target, 'type'))}</li>;
                  })}
                </ul>
              </li>
            )}
            {get(row, 'target_item.type') && (
              <li>{`${t1('target_item')}: ${get(
                row,
                'target_item.name',
              )} (#${t1(get(row, 'target_item.type'))})`}</li>
            )}
          </ul>
        );
      },
    },
    {
      title: t1('form_of_training_applied'),
      render: (text, row, index) => {
        const targetItem = get(row, 'target_item') || {};
        const trainingLevel = get(row, 'training_level');
        const trainingMode = get(row, 'training_mode');
        const major = get(row, 'majorObject') || {};
        const ico = get(row, 'icoObject') || {};

        return [
          targetItem.ntype === 'multi-degree' && (
            <p>{`${t1('multi_degree')}: ${targetItem.name}`}</p>
          ),
          major.iid && <p>{`${t1('major')}: ${major.name}(#${major.code})`}</p>,
          trainingLevel && (
            <p>{`${t1('training_level')}: ${t1(trainingLevel)}`}</p>
          ),
          trainingMode && (
            <p>{`${t1('training_mode')}: ${t1(trainingMode)}`}</p>
          ),
          ico.iid && <p>{`${t1('ico')}: ${ico.name}(#${ico.code})`}</p>,
        ].filter(Boolean);
      },
    },
    {
      title: t1('date_applied'),
      render: (text, row, index) => {
        return [
          get(row, 'start_date') && (
            <p>{`${t1('start_date')}: ${timestampToDateString(
              row.start_date,
            )}`}</p>
          ),
          get(row, 'end_date') && (
            <p>{`${t1('end_date')}: ${timestampToDateString(row.end_date)}`}</p>
          ),
          get(row, 'semesterObject.iid') && (
            <p>{`${t1('semester')}: ${get(row, 'semesterObject.name')} (${get(
              row,
              'semesterObject.start_month',
            )}/${get(row, 'semesterObject.start_year')}-
        ${get(row, 'semesterObject.end_month')}/${get(
              row,
              'semesterObject.end_year',
            )})`}</p>
          ),
        ].filter(Boolean);
      },
    },
    {
      title: t1('fee_template_applied'),
      className: 'text-center',
      children: [
        {
          title: t1('fee_template'),
          key: 'id',
          render: (text, row, index) => get(row, 'fee_template.name'),
        },
        {
          title: t1('amount'),
          key: 'id',
          render: (text, row, index) => {
            return [
              get(row, 'fee_template.amount_for_theory_credit') && (
                <p>{`${t1('amount_for_theory_credit')}: ${formatMoney(
                  get(row, 'fee_template.amount_for_theory_credit'),
                )}
             ${convertValueToLabel(
               'feeCurrencies',
               get(row, 'fee_template.currency'),
             )}`}</p>
              ),
              get(row, 'fee_template.amount_for_practice_credit') && (
                <p>{`${t1('amount_for_practice_credit')}: ${formatMoney(
                  get(row, 'fee_template.amount_for_practice_credit'),
                )}
             ${convertValueToLabel(
               'feeCurrencies',
               get(row, 'fee_template.currency'),
             )}`}</p>
              ),
              get(row, 'fee_template.amount') && (
                <p>{`${formatMoney(get(row, 'fee_template.amount'))}
             ${convertValueToLabel(
               'feeCurrencies',
               get(row, 'fee_template.currency'),
             )}`}</p>
              ),
            ].filter(Boolean);
          },
        },
        {
          title: t1('applicable_benefits'),
          key: 'id',
          render: (text, row, index) => {
            const benefits = get(row, 'applicable_benefits');
            if (!Array.isArray(benefits) || !benefits.length) {
              return null;
            }

            return (
              <div style={{ maxWidth: 300 }}>
                {benefits
                  .map((benefit) => {
                    return get(benefit, 'name');
                  })
                  .join(' | ')}
              </div>
            );
          },
        },
      ],
    },
    {
      title: t1('status'),
      className: 'text-center',
      render: (text, row, index) => {
        return t1(get(row, 'status') || 'queued');
      },
    },
    {
      title: t1('actions'),
      render: (text, row, index) => {
        return (
          <div>
            <ActionToggle
              baseURL={routes.url('node_update', {
                ...row,
                ntype,
                step: 'status',
              })}
              dataSet={this.actionToggleDataSet}
              value={get(row, 'status') || 'queued'}
              name="status"
            />
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <IconButton
                  title={label.edit}
                  iconClassName="mi mi-edit"
                  onClick={showFull}
                />
              )}
              renderFull={() => (
                <UpdateUpdate
                  mode="edit"
                  title={t1('edit_applied_fee_template')}
                  node={row}
                  step=""
                  searchFormId={this.props.formid}
                  formid="edit_applied_fee_template"
                />
              )}
              dialogOptionsProperties={{
                modal: true,
                handleClose: true,

                title: t1('edit_applied_fee_template'),
              }}
            />
            <ButtonAction
              title={label.delete}
              textConfirm={label.confirmDelete}
              formid={this.props.formid}
              ntype={ntype}
              itemId={get(row, 'id')}
            />
          </div>
        );
      },
    },
  ];

  render() {
    const { items } = this.props;

    return (
      <AntdTable
        columns={this.columns}
        dataSource={Array.isArray(items) ? items : []}
        pagination={false}
        bordered
        size="middle"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
