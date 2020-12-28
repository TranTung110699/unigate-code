import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import Checkbox from 'schema-form/elements/checkbox';
import { required } from 'common/validators';
import { formatMoney } from 'common';
import { timestampToDateString } from 'common/utils/Date';
import { feesTemplateTypes, feesTypeApplied } from 'configs/constants';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];

const getKeySearchAFT = (values) => {
  const templateType = get(values, 'template_type');

  const valueCreateKey = [
    'faculty',
    'major',
    'training_mode',
    'training_level',
    'ico',
    'school_year',
    'semester',
    'exam_resit_nths',
  ]
    .map((key) => {
      const val = get(values, key);
      return Array.isArray(val) ? val.join('_') : val;
    })
    .filter(Boolean);

  return `aft_by_${templateType}_${valueCreateKey.join('_')}`;
};

const getParamsToSearchAFT = (values) => {
  const templateType = get(values, 'template_type');
  const params = {
    fee_template__template_type: templateType,
    school_year: get(values, 'school_year'),
    semester: get(values, 'semester'),
    exam_resit_nths: get(values, 'exam_resit_nths'),
    status: ['approved'],
    items_per_page: -1,
  };

  if (
    [feesTypeApplied.TUITION_FEE, feesTypeApplied.OTHER_FEES].includes(
      templateType,
    )
  ) {
    Object.assign(params, {
      faculty: get(values, 'faculty'),
      major: get(values, 'major'),
      training_level: get(values, 'training_level'),
      training_mode: get(values, 'training_mode'),
      ico: get(values, 'ico'),
    });
  }

  return params;
};

const schema = (formid, values, step, xpath, props) => ({
  template_type: {
    classWrapper: 'col-md-12',
    fullWidth: true,
    type: 'radio',
    inline: true,
    floatingLabelText: t1('fee_template_type'),
    options: Object.keys(feesTypeApplied)
      .map((key) => {
        if (
          feesTypeApplied[key] !== feesTypeApplied.TUITION_FEE &&
          !feesTemplateTypes[key]
        ) {
          return null;
        }
        return {
          value: feesTypeApplied[key],
          label: t1(feesTypeApplied[key]),
          primaryText: t1(feesTypeApplied[key]),
        };
      })
      .filter(Boolean),
    validate: [required(t1('fee_template_type_cannot_be_empty'))],
  },
  target_payer: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields,
      forSearch: false,
    }),
  },
  school_year_and_semester: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: ['school_year', 'semester'],
      forSearch: false,
      multiple: false,
    }),
  },
  applied_fee_templates: {
    type: 'multiCheckbox',
    populateValue:
      get(values, 'template_type') !== feesTemplateTypes.OTHER_FEES,
    classWrapper: 'col-md-12',
    floatingLabelText: t1('applied_fee_templates'),
    fullWidth: true,
    options: 'async',
    validate: [required(t1('applied_fee_templates_cannot_be_empty'))],
    paramsasync: {
      __url__: '/applied-fee-template/search',
      key: getKeySearchAFT(values),
      value: getParamsToSearchAFT(values),
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((aft) => ({
          value: aft.iid,
          label: get(aft, 'fee_template.name'),
          primaryText: aft,
          full_data: aft,
        }));
      },
    },
    renderCustomizableOptions: (options) => {
      const columns = [
        {
          title: '',
          key: 'iid',
          render: (text, row, index) => {
            const props = { ...row, label: '' };
            return {
              children:
                get(values, 'template_type') ===
                feesTemplateTypes.OTHER_FEES ? (
                  <Checkbox {...props} />
                ) : (
                  index + 1
                ),
              props: {
                className: 'text-center',
              },
            };
          },
        },
        {
          title: t1('target_payer'),
          render: (text, row) => {
            const targetPayers = get(
              row,
              'full_data.fee_template.target_payers',
            );
            return (
              <ul>
                {get(row, 'full_data.name') && (
                  <li>{`${t1('name')}: ${get(row, 'full_data.name')}`}</li>
                )}
                <li>
                  {`${t1('type')}: ${t1(
                    get(row, 'full_data.fee_template.template_type'),
                  )}`}
                  {get(row, 'full_data.target_item_applied') &&
                    `(${t1(get(row, 'full_data.target_item_applied'))})`}
                </li>
                {Array.isArray(targetPayers) && !!targetPayers.length && (
                  <li>
                    {t1('target_payers')}:{' '}
                    <ul>
                      {get(row, 'full_data.fee_template.target_payers', []).map(
                        (target) => {
                          return <li>{t1(get(target, 'type'))}</li>;
                        },
                      )}
                    </ul>
                  </li>
                )}
                {get(row, 'full_data.target_item.type') && (
                  <li>{`${t1('target_item')}: ${get(
                    row,
                    'full_data.target_item.name',
                  )} (#${t1(get(row, 'full_data.target_item.type'))})`}</li>
                )}
              </ul>
            );
          },
        },
        {
          title: t1('form_of_training_applied'),
          render: (text, row, index) => {
            const targetItem = get(row, 'full_data.target_item') || {};
            const trainingLevel = get(row, 'full_data.training_level');
            const trainingMode = get(row, 'full_data.training_mode');
            const major = get(row, 'full_data.majorObject') || {};
            const ico = get(row, 'full_data.icoObject') || {};

            return [
              targetItem.ntype === 'multi-degree' && (
                <p>{`${t1('multi_degree')}: ${targetItem.name}`}</p>
              ),
              major.iid && (
                <p>{`${t1('major')}: ${major.name}(#${major.code})`}</p>
              ),
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
              get(row, 'full_data.start_date') && (
                <p>{`${t1('start_date')}: ${timestampToDateString(
                  get(row, 'full_data.start_date'),
                )}`}</p>
              ),
              get(row, 'full_data.end_date') && (
                <p>{`${t1('end_date')}: ${timestampToDateString(
                  get(row, 'full_data.end_date'),
                )}`}</p>
              ),
              get(row, 'full_data.semesterObject.iid') && (
                <p>{`${t1('semester')}: ${get(
                  row,
                  'full_data.semesterObject.name',
                )} (${get(row, 'full_data.semesterObject.start_month')}/${get(
                  row,
                  'full_data.semesterObject.start_year',
                )}-
        ${get(row, 'full_data.semesterObject.end_month')}/${get(
                  row,
                  'full_data.semesterObject.end_year',
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
              render: (text, row, index) =>
                get(row, 'full_data.fee_template.name'),
            },
            {
              title: t1('amount'),
              key: 'id',
              render: (text, row, index) => {
                const currency = convertValueToLabel(
                  'feeCurrencies',
                  get(row, 'full_data.fee_template.currency'),
                );

                if (
                  get(row, 'full_data.fee_template.template_type') ===
                  feesTemplateTypes.TUITION_FEE_BY_CREDIT
                ) {
                  return [
                    <p>{`${t1('amount_for_practice_credit')}: ${formatMoney(
                      get(
                        row,
                        'full_data.fee_template.amount_for_practice_credit',
                      ),
                    )} ${currency}`}</p>,
                    <p>{`${t1('amount_for_practice_credit')}: ${formatMoney(
                      get(
                        row,
                        'full_data.fee_template.amount_for_theory_credit',
                      ),
                    )} ${currency}`}</p>,
                  ];
                }

                return `${formatMoney(
                  get(row, 'full_data.fee_template.amount'),
                )}
             ${currency}`;
              },
            },
            {
              title: t1('applicable_benefits'),
              key: 'id',
              render: (text, row, index) => {
                const benefits = get(row, 'full_data.applicable_benefits');
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
      ].filter(Boolean);

      return (
        <div>
          <p>{t1('found_%s_applied_fee_templates', [options.length])}</p>
          <AntdTable
            // className={get(values, 'template_type') === feesTemplateTypes.OTHER_FEES ? '' : 'display-none'}
            columns={columns}
            dataSource={options}
            pagination={false}
            bordered
            size="middle"
          />
        </div>
      );
    },
  },
  exam_resit_nths: {
    type: 'multiCheckbox',
    fullWidth: true,
    inline: true,
    floatingLabelText: t1('exam_resit_nths'),
    classWrapper: 'col-md-12',
    populateValue: true,
    options: [...Array(get(props, 'maxNumberOfExamResit') || 1).keys()].map(
      (n) => ({
        value: n + 1,
        label: `${t1('exam_resit_nth_%s', [n + 1])}`,
        primaryText: `${t1('exam_resit_nth_%s', [n + 1])}`,
      }),
    ),
    validate: [required(t1('exam_resit_nths_cannot_be_empty'))],
  },
});

const ui = (step, values) => {
  const templateType = get(values, 'template_type');

  const fields = ['template_type', 'target_payer'];

  if (templateType && templateType !== feesTypeApplied.OTHER_FEES) {
    fields.push('school_year_and_semester');
  }

  if (templateType === feesTypeApplied.EXAMINATION_FEES) {
    fields.push('exam_resit_nths');
  }

  if (templateType) {
    fields.push('applied_fee_templates');
  }

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
};
