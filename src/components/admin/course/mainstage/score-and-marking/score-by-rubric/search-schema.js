import { t1 } from 'translate';
import {
  searchByRubricElement,
  passFailedRubric,
} from 'components/admin/rubric/schema/elements';

const schema = (formid, values) => {
  return {
    q: {
      type: 'text',
      floatingLabelText: t1('search_by_student_name_or_iid'),
      floatingLabelFixed: false,
      fullWidth: true,
      hintText: t1('please_type_search_text'),
      classWrapper: 'col-md-12',
    },
    selected_rubric_iid: searchByRubricElement(values.rubric_iid, 'col-md-4'),
    rubric_passed: passFailedRubric(),
    min_score: {
      type: 'number',
      floatingLabelText: t1('score_from'),
      min: 0,
      max: 100,
      classWrapper: 'col-md-1',
      fullWidth: true,
    },
    max_score: {
      type: 'number',
      floatingLabelText: t1('score_to'),
      min: 0,
      max: 100,
      classWrapper: 'col-md-1',
      fullWidth: true,
    },
    min_cp: {
      type: 'number',
      floatingLabelText: `${t1('progress')} >=`,
      min: 0,
      max: 100,
      classWrapper: 'col-md-2',
      fullWidth: true,
    },
    max_cp: {
      type: 'number',
      floatingLabelText: `${t1('progress')} ≤`,
      min: 0,
      max: 100,
      classWrapper: 'col-md-2',
      fullWidth: true,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: [
        'q',
        'selected_rubric_iid',
        'min_score',
        'max_score',
        'rubric_passed',
        'min_cp',
        'max_cp',
      ],
    },
  ];
};

export default { schema, ui };
