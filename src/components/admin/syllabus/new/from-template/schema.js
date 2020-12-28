import { required } from 'common/validators';
import { t1 } from 'translate';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('syllabus_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("syllabus_name_is_required_and_can't_be_empty"))],
  },
  code: {
    type: 'text',
    floatingLabelText: t1('syllabus_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("syllabus_code_is_required_and_can't_be_empty"))],
  },
  template_iid: {
    nameElement: 'template_iid',
    type: InputAutoComplete,
    baseUrl: examTemplateApiUrls.exam_template_search,
    floatingLabelText: t1('choose_exam_template'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((data) => ({
          iid: data.iid,
          name: data.name,
        })),
    },
    params: {
      status: 'approved',
    },
  },
  number_of_sco: {
    type: 'number',
    floatingLabelText: t1('total_of_exam'),
  },
});

const ui = (step, values, themeConfig) => [
  {
    id: 'default',
    title: t1('new_exam_template'),
    fields: ['name', 'code', 'template_iid', 'number_of_sco'],
  },
];

const layout = {
  new: '',
};

export default { schema, ui, layout };
