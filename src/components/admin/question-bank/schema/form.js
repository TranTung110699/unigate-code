import { required } from 'common/validators';
import { t1 } from 'translate';
import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { slugifier } from 'common/normalizers';
import skillsAutoComplete from 'components/admin/skill/schema/elements/skills-auto-complete';

const schema = (formid, values, step, xpath, props) => ({
  positions: positions(formid, {}, values.organizations),
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('managing_organizations')} (*)`,
    defaultValue: props.orgIids,
  }),
  name: {
    type: 'text',
    floatingLabelText: t1('question_bank_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [
      required(t1("question_bank_name_is_required_and_can't_be_empty")),
    ],
  },
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1("code_is_required_and_can't_be_empty"))],
  },
  skills: skillsAutoComplete('skill', {
    text: 'name',
    value: 'data',
    transformData: (res) =>
      res.map((data) => ({
        name: data.name,
        data,
      })),
  }),
});

const ui = (step) => {
  const fields = [
    'name',
    'code',
    'organizations',
    // 'positions',
    // 'skills',
  ];

  return [
    {
      id: 'default',
      title:
        step === 'new' ? t1('new_question_bank') : t1('edit_question_bank'),
      fields,
    },
  ];
};

export default { schema, ui };
