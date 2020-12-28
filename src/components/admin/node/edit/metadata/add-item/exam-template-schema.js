import { t1 } from 'translate';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import { required } from 'common/validators';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values) => ({
  exam_template: {
    nameElement: 'exam_template',
    type: InputAutoComplete,
    limit: 1,
    floatingLabelText: t1('choose_exam_template'),
    fullWidth: true,
    baseUrl: examTemplateApiUrls.exam_template_search,
    dataSourceConfig: {
      text: 'name',
      value: 'data',
      transformData: (res) =>
        res.map((data) => ({
          name: data.name,
          data: {
            iid: data.iid,
            code: data.code,
            name: data.name,
          },
        })),
    },
    params: {
      status: 'approved',
      contest_code: values.contest_code,
    },
    validate: [required(t1('exam_template_cannot_be_empty'))],
  },
  number_of_scos: {
    type: 'number',
    fullWidth: true,
    floatingLabelText: t1('total_of_exams'),
    defaultValue: 1,
    max: 10,
    validate: [required(t1('number_of_scos_cannot_be_empty'))],
  },
  from_template_bank_only: {
    type: 'checkbox',
    fullWidth: true,
    label: t1('only_get_questions_in_the_template_bank'),
    defaultValue: 1,
  },
});

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  { examTemplateExists = false },
) => {
  return [
    {
      id: 'default',
      fields: [
        !examTemplateExists && 'exam_template',
        'number_of_scos',
        'from_template_bank_only',
      ].filter(Boolean),
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
