/* eslint-disable quotes,jsx-a11y/anchor-is-valid */
import { t1 } from 'translate/index';
import { required } from 'common/validators/index';
import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import skillsMappingSchema from './skills-mapping/schema-form';
import ConfirmSchemaLayoutFreestyle from './Layout';
import { UsedFor, UsedForOptions } from 'configs/constants';
import InputToken from 'schema-form/elements/input-token';

const schema = (formid, values) => ({
  organizations: organizations({
    formid,
    label: t1('organization'),
    hintText: t1('click_to_add_organization'),
    multiple: false,
    normalize: (value) => (value && value[0]) || null,
    format: (value) => (value ? [value] : []),
    validate: values.validateOrganization
      ? [required(t1('organization_can_not_empty'))]
      : null,
  }),
  import_tags: {
    type: InputToken,
    floatingLabelText: t1('import_tags'),
    fullWidth: true,
  },
  used_for: {
    type: 'multiCheckbox',
    floatingLabelText: t1('used_for'),
    defaultValue: values.exam_template ? [UsedFor.EXAM] : [UsedFor.LEARN],
    options: UsedForOptions(),
    inline: true,
  },
  job_positions: positions(
    formid,
    {},
    values.organizations ? [values.organizations] : undefined,
  ),
  skills: {
    type: 'array',
    schema: skillsMappingSchema,
    floatingLabelText: t1('skills_mapping'),
    hiddenAddButton: true,
    hiddenRemoveButton: true,
  },
  remove_current_questions: {
    type: 'checkbox',
    label: t1(
      'clear_all_current_exam_template_bank_(including_practice_courses_as_well)',
    ),
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => [
  {
    id: 'default',
    fields: props.confirmImportParams
      ? []
      : [
          ...(values.exam_template
            ? ['remove_current_questions']
            : ['organizations', 'job_positions', 'used_for', 'import_tags']),
          !props.onlyPreviewScreen && 'skills',
        ].filter(Boolean),
  },
];

const layout = { component: ConfirmSchemaLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
