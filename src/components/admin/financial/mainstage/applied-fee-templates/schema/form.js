import React from 'react';
import Store from 'store';
import { change } from 'redux-form';
import get from 'lodash.get';
import { t1 } from 'translate';
import {
  appliedScope,
  feesTemplateTypes,
  targetItems,
} from 'configs/constants';
import apiUrls from 'api-endpoints';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { dateGreaterThan, required } from 'common/validators';
import Elemets from 'components/common/elements';
import List from 'schema-form/elements/list';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

const { schoolYear, semester } = Elemets;

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];

const schema = (formid, values, step, xpath, props) => {
  const feeTemplate = values && values.fee_template && values.fee_template[0];
  let applicableBenefits =
    (feeTemplate && feeTemplate.applicable_benefits) || [];
  applicableBenefits = [...applicableBenefits];
  const categoryIid =
    feeTemplate && feeTemplate.category && feeTemplate.category.iid;

  return {
    fee_template: {
      nameElement: 'fee_template',
      type: InputAutoComplete,
      limit: 1,
      baseUrl: '/finance-template/search?classification[]=fee',
      floatingLabelText: t1('choose_fee_template'),
      fullWidth: true,
      onChange: () => {
        Store.dispatch(change(formid, 'applicable_benefits', null));
        Store.dispatch(change(formid, 'target_items', null));
        Store.dispatch(change(formid, 'target_item_applied', null));
      },
      classWrapper: 'col-md-12',
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
      params: {
        template_type: [values.type],
        status: ['approved'],
      },
    },
    target_payers_applied: {
      type: 'cascade',
      sectionCascade: true,
      schema: getMajorBoxSchema({
        floatingLabelText: t1('target_payers_applied'),
        displayFields,
        notValidate: true,
        forSearch: true,
      }),
    },
    target_item_applied: {
      fullWidth: true,
      type: 'checkbox',
      defaultValue: feeTemplate && feeTemplate.target_item,
      classWrapper: 'col-md-12',
      valueSet: feeTemplate && feeTemplate.target_item,
      label: t1(
        `possible_target_items_${feeTemplate && feeTemplate.target_item}`,
      ),
    },
    target_items: {
      nameElement: 'target_items',
      type: InputAutoComplete,
      classWrapper: 'col-md-12',
      baseUrl:
        '/applied-fee-template/api/search-target-items-based-on-fee-template',
      floatingLabelText: t1('choose_target_items'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: (res) =>
          res
            .map((data) => {
              const { ntype, name, code } = data || {};
              if (ntype === 'course') {
                const key = t1('course:_%s - %s', [name, code]);
                return {
                  key,
                  data,
                };
              } else if (ntype === 'syllabus') {
                const key = t1('subject:_%s - %s', [name, code]);
                return { key, data };
              } else if (ntype === 'req_type') {
                const key = t1(`type_${data.type}:_%s`, [name]);
                return {
                  key,
                  data,
                };
              } else if (name) {
                return {
                  key: name,
                  data,
                };
              }
              return false;
            })
            .filter(Boolean),
      },
      params: {
        target_item: feeTemplate && feeTemplate.target_item,
        faculty: values && values.faculty,
        major: values && values.major,
        training_mode: values && values.training_mode,
        training_level: values && values.training_level,
        ico: values && values.ico,
      },
      validate: required(),
    },
    name: {
      type: 'text',
      classWrapper: 'col-md-12',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      multiLine: true,
      fullWidth: true,
    },
    applied_scope: {
      type: 'select',
      fullWidth: true,
      floatingLabelFixed: true,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('applied_scope'),
      options: Object.values(appliedScope).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
      validate: required(),
    },
    note: {
      type: RTE,
      classWrapper: 'col-md-12',
      hintText: t1('enter_note'),
      floatingLabelText: t1('note'),
      defaultValue: '',
      errorText: '',
      multiLine: true,
      rows: 4,
      fullWidth: true,
    },
    start_date: {
      type: DatePicker,
      getStartDate: true,
      classWrapper: 'col-md-6',
      floatingLabelText: t1('start_date_with_effect'),
      fullWidth: true,
    },
    end_date: {
      type: DatePicker,
      classWrapper: 'col-md-6',
      floatingLabelText: t1('end_date_valid_until'),
      fullWidth: true,
      getEndDate: true,
      validate: [
        dateGreaterThan(
          values.start_date,
          t1('end_time_must_be_after_start_time'),
        ),
      ],
    },
    number_of_effective_days: {
      type: 'number',
      hintText: t1('enter_number_of_effective_days'),
      floatingLabelText: t1('number_of_effective_days'),
      defaultValue: 0,
      classWrapper: 'col-md-12',
      min: 0,
      fullWidth: true,
      validate: required(),
    },
    applicable_benefits_from_fee_template: {
      type: List,
      classWrapper: 'col-md-12',
      label: t1('benefits_pre-defined_in_template'),
      defaultValue: applicableBenefits,
      fullWidth: true,
    },
    applicable_benefits: {
      nameElement: 'applicable_benefits',
      type: InputAutoComplete,
      classWrapper: 'col-md-12',
      baseUrl: apiUrls.get_benefits,
      params: {
        applicable_categories: categoryIid && [categoryIid],
      },
      floatingLabelText: t1('additional_benefit(s)_for_this_particular_item'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: 'name',
      },
    },
    school_year: schoolYear({
      formid,
      classWrapper: 'col-md-4',
      paramsasync: {
        values: {
          type: 'school_year',
          status: ['approved'],
          effective_time: Math.floor(new Date().getTime() / 1000),
        },
      },
    }),
    semester: semester({
      classWrapper: 'col-md-8',
      formid,
      values,
      paramsasync: {
        values: {
          type: 'semester',
          status: ['approved'],
          effective_time: Math.floor(new Date().getTime() / 1000),
          school_year: values && values.school_year,
        },
      },
    }),
  };
};

const ui = (step, values) => {
  let result = [];
  const type = get(values, 'type');

  switch (step) {
    case 'new': {
      let fields = ['target_payers_applied', 'fee_template'];

      let numberOfEffectiveDaysIndex = 3;
      const feeTemplate =
        values && values.fee_template && values.fee_template[0];
      if (
        feeTemplate &&
        feeTemplate.target_item ===
          targetItems.ANOTHER_FEE_TARGET_ITEM_DYNAMIC_FEE
      ) {
        fields = fields.concat(['name', 'applied_scope']);
      }

      fields = fields.concat(
        type === feesTemplateTypes.TUITION_FEE_BY_SEMESTER
          ? ['note']
          : ['start_date', 'end_date', 'note'],
      );

      if (
        !feeTemplate ||
        feeTemplate.target_item !==
          targetItems.ANOTHER_FEE_TARGET_ITEM_DYNAMIC_FEE
      ) {
        if (
          [
            feesTemplateTypes.TUITION_FEE_BY_SUBJECT,
            feesTemplateTypes.TUITION_FEE_BY_CREDIT,
            feesTemplateTypes.EXAMINATION_FEES,
            feesTemplateTypes.OTHER_FEES,
          ].includes(feeTemplate && feeTemplate.template_type)
        ) {
          fields.splice(2, 0, 'target_item_applied');
          if (!values.target_item_applied) {
            fields.splice(3, 0, 'target_items');
          }
        } else if (type !== feesTemplateTypes.TUITION_FEE_BY_SEMESTER) {
          fields.splice(2, 0, 'target_items');
        }
      } else {
        numberOfEffectiveDaysIndex = 3;
      }

      if (feeTemplate && feeTemplate.recurring_type === 'recurring') {
        fields.splice(
          numberOfEffectiveDaysIndex,
          0,
          'number_of_effective_days',
        );
      }

      if (feeTemplate) {
        fields.push('applicable_benefits_from_fee_template');
      }

      fields.push('applicable_benefits');

      if (type === feesTemplateTypes.TUITION_FEE_BY_SEMESTER) {
        fields = fields.filter((field) => field !== 'target_payers_applied');
      }

      result = [
        {
          id: 'default',
          title: t1('new_applied_fee_template'),
          fields,
        },
      ];
      break;
    }
    case 'edit': {
      let fieldsEdit = [];

      if (values && values.name) {
        fieldsEdit = fieldsEdit.concat(['name', 'applied_scope']);
      }
      if (
        get(values, 'fee_template.template_type') ===
          feesTemplateTypes.TUITION_FEE_BY_SEMESTER &&
        !get(values, 'start_date') &&
        !get(values, 'end_date')
      ) {
        fieldsEdit = fieldsEdit.concat(['note']);
      } else {
        fieldsEdit = fieldsEdit.concat(['start_date', 'end_date', 'note']);
      }
      result = [
        {
          id: 'default',
          fields: fieldsEdit,
        },
      ];
      break;
    }
    case 'search': {
      result = [
        {
          id: 'search',
          fields: ['target_payers_applied', 'school_year', 'semester'],
        },
      ];
      break;
    }
    default:
      return [];
  }
  return result;
};

export default { schema, ui };
