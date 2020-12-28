import { t1 } from 'translate';
import { convertBooleanValueToInt } from 'common/normalizers';

const schema = {
  sync_progress_courses: {
    type: 'checkbox',
    label: t1('recalculate_progress_of_all_courses_in_enrolment_plan'),
    defaultValue: 0,
    classWrapper: 'col-md-12',
    normalize: convertBooleanValueToInt,
    guide: t1('this_will_recalculate_progress_of_students_in_enrolment_plan'),
  },
};

const ui = () => [
  {
    id: 'id',
    fields: ['sync_progress_courses'],
  },
];

export default { schema, ui };
