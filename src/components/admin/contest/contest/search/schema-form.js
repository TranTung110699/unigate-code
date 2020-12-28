/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required } from 'common/validators';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    code: {
      type: 'text',
      floatingLabelText: t1('search_by_code'),
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    status: {
      type: 'multiCheckbox',
      options: constants.contestOptions(),
      defaultValue: ['ongoing', 'finished', 'approved', 'queued'],
      inline: true,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    organizations: organizations({
      formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [required(t1('organization_cannot_be_empty'))],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    include_items_from_ancestor_organizations: {
      type: 'checkbox',
      label: t1('include_items_from_ancestor_organizations'),
      defaultValue: 0,
    },
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
    element = {
      name: {
        type: 'text',
        floatingLabelText: t1('search_by_name'),
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => (step, values) => {
  let fields = [];
  if (!forAdvanceSearch) {
    fields.push('name');
  }
  fields.push('code');

  if (!values.isSIS) {
    fields.push(
      'organizations',
      'include_sub_organizations',
      'include_items_from_ancestor_organizations',
    );
  }

  fields.push('status');

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
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
    : { component: SearchFormLayoutFreestyle, freestyle: 1, isSIS: true },
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
