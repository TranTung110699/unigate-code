import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import { constants } from 'configs/constants';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  localStep,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    status: {
      type: 'multiCheckbox',
      floatingLabelText: t1('status'),
      floatingLabelFixed: true,
      inline: true,
      options: constants.QuestionBankStatusOptions(),
      fullWidth: true,
    },
    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: 1,
    }),
  };

  if (forRecap) {
    return addPropsToEverySchemaElements(element, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }

  return element;
};

const ui = () => {
  return [
    {
      fields: ['status', 'organizations', 'include_sub_organizations'],
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false) => ({
  schema: schema(forRecap, forAdvance),
  ui,
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
