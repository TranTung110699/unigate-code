import React from 'react';
import { t1 } from 'translate';
import { studentLearnTypes } from 'configs/constants';
import { required } from 'common/validators';
import NewButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import commonSagaActions from 'actions/saga-creators';
import store from 'store';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import SearchFormLayout from './SearchFormLayout';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values, step, xpath, props) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('applicable_for_major'),
      displayFields: [
        'school_year',
        'semester',
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      notValidate: !values || !values.create,
      forSearch: true,
      multiple: false,
    }),
  },
  user: {
    type: 'text',
    floatingLabelText: t1('student_name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  course: {
    nameElement: 'course',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-data-schema?ntype=course&type=course',
    floatingLabelText: t1('course_name'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
    validate: values.use_existing_syllabus
      ? [required(t1('course_is_required', 1))]
      : null,
  },
  syllabus: {
    nameElement: 'syllabus',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-data-schema?ntype=syllabus&type=course',
    floatingLabelText: t1('subject_name'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
    validate: values.use_existing_syllabus
      ? [required(t1('subject_is_required', 1))]
      : null,
  },
  learn_type: {
    type: 'select',
    name: 'learn_type',
    floatingLabelText: t1('learn_type'),
    floatingLabelFixed: true,
    fullWidth: true,
    options: studentLearnTypes(),
  },
  export: {
    type: 'cascade',
    component: (
      <NewButton
        name=""
        icon={<Icon icon="export" style={{ color: 'white' }} />}
        label={t1('export')}
        type="button"
        onClick={() => {
          store.dispatch(
            commonSagaActions.exportDataRequest(
              apiUrls.export_students_request_study,
              values,
            ),
          );
        }}
      />
    ),
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['major', 'user', 'course', 'syllabus', 'learn_type', 'export'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
