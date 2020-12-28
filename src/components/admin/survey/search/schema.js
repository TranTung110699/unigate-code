import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { surveyStatuses, surveyStatusOptions } from 'configs/constants/survey';
import { remove } from 'common/utils/Array';
import lodashGet from 'lodash.get';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];
const schema = (formid, values, step, xpath, { isSIS, ...props }) => {
  let statusOptions = surveyStatusOptions();
  let defaultStatuses = remove(
    Object.values(surveyStatuses),
    surveyStatuses.DELETED,
  );

  if (Array.isArray(values.exclude_statuses)) {
    statusOptions = statusOptions.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
    defaultStatuses = defaultStatuses.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
  }

  return {
    text: {
      type: 'text',
      fullWidth: true,
      classWrapper: isSIS ? 'col-md-5' : 'col-md-6',
      floatingLabelText: `${t1('name')} / ${t1('code')}`,
      label: `${t1('name')} / ${t1('code')}`,
      hintText: `${t1('name')} / ${t1('code')}`,
    },
    status: {
      fullWidth: true,
      type: 'multiCheckbox',
      classWrapper: isSIS ? 'col-md-4' : 'col-md-6',
      floatingLabelText: t1('status'),
      hintText: t1('status'),
      inline: true,
      options: statusOptions,
      defaultValue: defaultStatuses,
    },
    apply_survey_for: {
      fullWidth: true,
      type: 'multiCheckbox',
      classWrapper: 'col-md-3',
      floatingLabelText: t1('status'),
      hintText: t1('status'),
      inline: true,
      options: [
        {
          value: 'start_semester',
          primaryText: t1('start_semester'),
          label: t1('start_semester'),
        },
        {
          value: 'end_semester',
          primaryText: t1('end_semester'),
          label: t1('end_semester'),
        },
      ],
      defaultValue: ['start_semester', 'end_semester'],
    },
    form_of_training_apply: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        floatingLabelText: t1('form_of_training'),
        displayFields,
        notValidate: true,
        forSearch: true,
      }),
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props = {}) => {
  const { isSIS } = props;
  let fields = ['text', 'status'];
  if (isSIS) {
    fields = fields.concat(['form_of_training_apply', 'apply_survey_for']);
  }
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
