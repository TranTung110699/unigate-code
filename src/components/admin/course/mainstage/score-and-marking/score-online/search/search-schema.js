import { t1 } from 'translate';

const schema = () => {
  return {
    q: {
      type: 'text',
      floatingLabelText: t1('search_by_student_name_or_iid'),
      floatingLabelFixed: false,
      fullWidth: true,
      hintText: t1('please_type_search_text'),
      classWrapper: 'col-md-12',
    },
    min_score: {
      type: 'number',
      floatingLabelText: t1('score_from'),
      min: 0,
      max: 100,
      classWrapper: 'col-md-3',
      fullWidth: true,
    },
    max_score: {
      type: 'number',
      floatingLabelText: t1('score_to'),
      min: 0,
      max: 100,
      classWrapper: 'col-md-3',
      fullWidth: true,
    },
    max_cp: {
      type: 'number',
      floatingLabelText: `${t1('progress')} ≤`,
      min: 0,
      max: 100,
      classWrapper: 'col-md-3',
      fullWidth: true,
    },
    min_cp: {
      type: 'number',
      floatingLabelText: `${t1('progress')} >=`,
      min: 0,
      max: 100,
      classWrapper: 'col-md-3',
      fullWidth: true,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['q', 'min_score', 'max_score', 'min_cp', 'max_cp'],
    },
  ];
};

export default { schema, ui };
