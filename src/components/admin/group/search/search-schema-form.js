import { t1 } from 'translate/index';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { socialFunctionGroups } from 'configs/constants';
import { required, validationWithCondition } from 'common/validators';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { addPropsToEverySchemaElements } from '../../../../common/utils/schema-form';
import { elementDisplayModes } from '../../../../schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from '../../../../schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import get from 'lodash.get';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    type: {
      type: 'multiCheckbox',
      options: Object.values(socialFunctionGroups).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
      defaultValue: Object.values(socialFunctionGroups),
      inline: true,
      floatingLabelText: t1('type_fee_template'),
      hintText: t1('type_of_status'),
      floatingLabelFixed: false,
    },
    organizations: organizations({
      formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
      rootIids: values.organizationRootIids,
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
      text: {
        type: 'text',
        floatingLabelText: t1('search_text'),
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false, props) => (step, values) => {
  let fields = [];
  const hiddenFields = get(props, 'hiddenFields', {});

  if (!forAdvanceSearch) {
    fields.push('text');
  }

  if (!values.isSIS && !hiddenFields.hasOwnProperty('organizations')) {
    fields.push('organizations', 'include_sub_organizations');
  }

  if (values.isSocialFunctionGroups && !hiddenFields.hasOwnProperty('type')) {
    fields.push('type');
  }

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false, props) => ({
  schema: schema(forRecap, forAdvance),
  ui: ui(forAdvance, props),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
          isSIS: true,
        }
      : { freestyle: 0, isSIS: true }
    : { component: SearchFormLayoutFreestyle, freestyle: 1, isSIS: true },
});

export const searchFormSchema = (props = {}) => getSchema(false, true, props);
export const searchRecapFormSchema = (props = {}) =>
  getSchema(true, true, props);

export default getSchema();
