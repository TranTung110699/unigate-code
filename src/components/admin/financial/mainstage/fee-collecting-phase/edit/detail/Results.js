import React from 'react';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import NodeNew from 'components/admin/node/new';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import schema from './schema/form';
import { formatMoney } from 'common';
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';

const label = {
  faculty: t1('faculty'),
  major: t1('major'),
  training_mode: t1('training_mode'),
  training_level: t1('training_level'),
  information: t1('information'),
  actions: t1('action'),
  confirmDelete: t1('are_you_sure_you_want_to_do_this'),
};

const columns = (searchFormId) => {
  return [
    {
      title: t1('stt'),
      className: 'text-center',
      key: 'id',
      render: (text, row) => ({
        children: get(row, 'stt'),
        props: {
          rowSpan: get(row, 'rowSpan'),
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('form_of_training'),
      key: 'id',
      render: (text, row, index) => ({
        children: (
          <div>
            <p>{`${t1('major')}: ${get(row, 'majorObject.name')}(#${get(
              row,
              'majorObject.code',
            )}) | ${t1('ico')}: ${get(row, 'icoObject.name')}(#${get(
              row,
              'icoObject.code',
            )})`}</p>
            <p>{`${t1('training_level')}: ${t1(
              get(row, 'training_level'),
            )} | ${t1('training_mode')}: ${t1(get(row, 'training_mode'))}`}</p>
          </div>
        ),
        props: {
          rowSpan: get(row, 'rowSpan'),
        },
      }),
    },
    {
      title: t1('fees_in_collecting_phase'),
      children: [
        {
          title: t1('finance_template_type'),
          render: (text, row) => t1(get(row, 'template_type')),
        },
        {
          title: t1('finance_template_applied '),
          render: (text, row) => {
            const appliedFeeTemplatesDetail = get(
              row,
              'appliedFeeTemplatesDetail',
            );
            const examResitNths = get(row, 'exam_resit_nths');

            return [
              Array.isArray(appliedFeeTemplatesDetail) &&
                !!appliedFeeTemplatesDetail.length && (
                  <ul>
                    {appliedFeeTemplatesDetail.map((appliedFeeTemplate) => {
                      return (
                        <li>{`${get(
                          appliedFeeTemplate,
                          'fee_template.name',
                        )} (${formatMoney(
                          get(appliedFeeTemplate, 'fee_template.amount'),
                        )} ${convertValueToLabel(
                          'feeCurrencies',
                          get(appliedFeeTemplate, 'fee_template.currency'),
                        )})`}</li>
                      );
                    })}
                  </ul>
                ),
              Array.isArray(examResitNths) &&
                !!examResitNths.length &&
                `${t1('exam_resit_nths')}: ${examResitNths.join(',')}`,
              get(row, 'semesterObject.iid') && (
                <p>{`${t1('semester')}: ${get(
                  row,
                  'semesterObject.name',
                )} (${get(row, 'semesterObject.start_month')}/${get(
                  row,
                  'semesterObject.start_year',
                )} -
        ${get(row, 'semesterObject.end_month')}/${get(
                  row,
                  'semesterObject.end_year',
                )})`}</p>
              ),
            ].filter(Boolean);
          },
        },
      ],
    },
    {
      title: t1('actions'),
      className: 'text-center',
      render: (text, row) => ({
        children: (
          <ButtonAction
            title={label.delete}
            textConfirm={label.confirmDelete}
            formid={searchFormId}
            ntype="fcp"
            itemId={get(row, 'id')}
            step="fee_collecting_phase_detail"
          />
        ),
        props: {
          className: 'text-center',
        },
      }),
    },
  ];
};

const getDataSource = (items) => {
  if (!Array.isArray(items) || !items.length) {
    return [];
  }
  let stt = 0;
  return items.reduce(
    (result, { fees_in_collecting_phase, ...formOfTraining }) => {
      if (
        !Array.isArray(fees_in_collecting_phase) ||
        !fees_in_collecting_phase.length
      ) {
        return result;
      }

      stt += 1;

      return result.concat(
        fees_in_collecting_phase.map((row, index) => {
          console.log(row);

          return Object.assign(
            { stt, rowSpan: index ? 0 : fees_in_collecting_phase.length },
            formOfTraining,
            row,
          );
        }),
      );
    },
    [],
  );
};

const fcpDetailResult = ({
  items,
  fcp = {},
  searchFormId,
  maxNumberOfExamResit = 1,
}) => {
  return [
    <AntdTable
      columns={columns(searchFormId)}
      dataSource={getDataSource(items)}
      pagination={false}
      bordered
      size="middle"
    />,
    <DetailOnDialog
      renderPreview={({ showFull }) => {
        return (
          <RaisedButton
            className="m-t-30"
            icon={<Icon icon="plus" />}
            label={t1('apply_target_receivable_details')}
            onClick={showFull}
          />
        );
      }}
      renderFull={({}) => {
        const hiddenFields = {
          fee_collecting_phase: fcp.iid,
        };
        return (
          <NodeNew
            resetForm
            hiddenFields={hiddenFields}
            schema={schema}
            className="white-box"
            mode="new"
            step="fcp-detail"
            ntype={'fcp'}
            searchFormId={searchFormId}
            maxNumberOfExamResit={maxNumberOfExamResit}
          />
        );
      }}
      dialogOptionsProperties={{
        width: '80%',
      }}
    />,
  ].filter(Boolean);
};

export default fcpDetailResult;
