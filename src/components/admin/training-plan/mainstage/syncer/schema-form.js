import { t1 } from 'translate';
import { convertBooleanValueToInt } from 'common/normalizers';

const schema = {
  sync_progress_eps: {
    type: 'checkbox',
    label: t1('recaculate_progress_of_all_enrolment_plans'),
    defaultValue: 0,
    classWrapper: 'col-md-12',
    normalize: convertBooleanValueToInt,
    guide: t1(
      'this_will_recalculate_progress_of_students_in_all_enrolment_plans_of_training_plan',
    ),
  },
  sync_progress_courses: {
    type: 'checkbox',
    label: t1('recalculate_progress_of_all_courses_in_training_plans'),
    defaultValue: 0,
    classWrapper: 'col-md-12',
    normalize: convertBooleanValueToInt,
    guide: t1(
      'this_will_recalculate_progress_of_students_in_all_enrolment_plans_of_training_plan',
    ),
  },
};

const ui = (step, values) => [
  {
    id: 'id',
    fields: [
      'sync_progress_eps',
      ...(values.sync_progress_eps ? ['sync_progress_courses'] : []),
    ],
  },
];

export default { schema, ui };
