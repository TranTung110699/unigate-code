import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import {
  gradeElement,
  semesterElement,
  schoolYearSelect,
  groupElement,
} from 'common/utils/form';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    code: {
      type: 'text',
      hintText: t1('training_plan_code'),
      floatingLabelText: t1('training_plan_code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    name: {
      type: 'text',
      hintText: t1('training_plan_name'),
      floatingLabelText: t1('training_plan_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    is_homeroom: {
      type: 'checkbox',

      hintText: t1('is_homeroom'),
      label: t1('is_homeroom'),
      floatingLabelText: t1('is_homeroom'),
      validate: [required(t1('is_homeroom'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    school_year_iid: schoolYearSelect(),
    semester_iids: semesterElement(values, true),
    grade: gradeElement(domainInfo, false),
    group_iids: groupElement(values),
  };
};

const ui = (step, values) => {
  const fields = [
    // 'code',
    'name',
    'school_year_iid',
    // 'semester_iids',
    'grade',
    'group_iids',
    'is_homeroom',
  ];
  const config = {
    new: [
      {
        id: 'default',
        fields,
      },
    ],
    edit: [
      {
        id: 'default',
        fields,
      },
    ],
  };
  return config[step];
};

export default { schema, ui };
