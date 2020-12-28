import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  localStep,
  xpath,
  props,
  domainInfo,
) => {
  // const schema = (formid, values) => ({
  let element = {
    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
    element = {
      q: {
        type: 'text',
        fullWidth: true,
        floatingLabelText: t1('enter_name_or_code'),
        label: t1('enter_name_or_code'),
        hintText: t1('enter_name_or_code'),
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => () => {
  return [
    {
      fields: [
        ...(!forAdvanceSearch ? ['q'] : []),
        'organizations',
        'include_sub_organizations',
      ],
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false) => ({
  schema: schema(forRecap, forAdvance),
  ui: ui(forAdvance),
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
