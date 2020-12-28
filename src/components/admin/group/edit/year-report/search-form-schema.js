/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import K12SearchFormDetailFreestyle from './SearchFormFreeStyle';
import lodashGet from 'lodash.get';
import {
  gradeElement,
  groupElement,
  schoolYearSelect,
  trainingModeElement,
} from 'common/utils/form';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  let statusOptions = constants.StatusOptions();
  let defaultStatuses = ['queued', 'approved'];

  if (Array.isArray(values.exclude_statuses)) {
    statusOptions = statusOptions.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
    defaultStatuses = defaultStatuses.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
  }

  return {
    grade: gradeElement(domainInfo, true, t1('grade')), // for search
    training_mode: trainingModeElement(true, true), // for search
    name: {
      type: 'text',
      floatingLabelText: t1('student_name'),
      // defaultValue: 'name',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    status: {
      type: 'multiCheckbox',
      options: statusOptions,
      inline: true,
      defaultValue: defaultStatuses,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    credit_syllabus: {
      type: 'select',
      multiple: true,
      floatingLabelText: t1('credit_syllabus'),
      errorText: t1('loading_credit_syllabus....'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: '/k12/api/get-available-syllabuses',
        value: {
          // training_mode: values.training_mode,
          grade: values.grade,
        },
        key: `syllabus-${values.grade ? values.grade.join('-') : ''}`,
      },
      // defaultValue: 'online',
      fullWidth: true,
    },
    year: schoolYearSelect(),
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    school__group: groupElement(values),
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const fields = [
    'name',
    'training_mode',
    'year',
    'grade',
    'credit_syllabus',
    'school__group',
  ];

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: K12SearchFormDetailFreestyle,
    freestyle: 1,
  },
};
