import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { constants } from 'configs/constants';
import lodashGet from 'lodash.get';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required } from 'common/validators';
import { hasOrganization } from 'common/conf';
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
    credit_syllabus: {
      type: 'select',
      floatingLabelText: t1('credit_syllabus'),
      options: 'async',
      paramsasync: {
        key: `credit-syllabuses-of-${lodashGet(values, 'enrolment_plans')}`,
        __url__: epApiUrls.get_credit_syllabuses_of_enrolment_plans,
        value: {
          enrolment_plans: lodashGet(values, 'enrolment_plans'),
        },
        valueKey: 'iid',
      },
      multiple: true,
    },
    status: {
      type: 'multiCheckbox',
      options: constants
        .StatusOptions()
        .filter((opt) => lodashGet(opt, 'value') !== 'deleted'),
      defaultValue: ['approved', 'queued'],
      inline: true,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    organizations: organizations({
      formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [required()],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: 1,
    }),
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
        fullWidth: true,
        floatingLabelText: `${t1('name')} / ${t1('code')}`,
        label: `${t1('name')} / ${t1('code')}`,
        hintText: `${t1('name')} / ${t1('code')}`,
      },

      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => [
  {
    id: 'default',
    fields: [
      ...(!forAdvanceSearch ? ['text'] : []),
      'credit_syllabus',
      'status',
      ...(hasOrganization(domainInfo)
        ? ['organizations', 'include_sub_organizations']
        : []),
    ],
  },
];

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
    : { component: SearchFormLayoutFreestyle, freestyle: 1 },
});

export const searchFormSchema = () => getSchema(false, true);
export const searchRecapFormSchema = () => getSchema(true, true);

export default getSchema();
