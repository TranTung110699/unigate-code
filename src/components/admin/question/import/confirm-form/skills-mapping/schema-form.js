import { t1 } from 'translate/index';
import apiUrls from 'api-endpoints';
import { required } from 'common/validators/index';
import SkillsMappingLayoutFreestyle from './Layout';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values) => ({
  skill: {
    type: 'text',
  },
  level: {
    type: 'text',
  },
  SkillResult: {
    nameElement: 'SkillResult',
    optionsProperties: {
      classNameWrapper: 'targets-wrapper',
      classNameEditorWrapper: 'targets-wrapper-editor',
      style: {
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        maxHeight: 300,
        paddingRight: 10,
      },
    },
    type: InputAutoComplete,
    baseUrl: apiUrls.bank_search,
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((data) => ({
          name: data.name,
          iid: data.iid,
        })),
    },
    params: {
      ntype: 'skill',
      subType: 'skill',
      status: 'approved',
    },
    floatingLabelText: t1('choose_skills'),
    fullWidth: true,
    doNotFetchDataWillMount: true,
    validate: values.validateSkills
      ? [required(t1('skill_mapping_can_not_empty'))]
      : null,
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: ['skill', 'SkillResult', 'level'],
  },
];

const layout = { component: SkillsMappingLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
