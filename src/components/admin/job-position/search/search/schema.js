import { t1 } from 'translate';
import { topEquivalentPosition } from 'components/admin/top-equivalent-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
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
    organizations: organizations({
      formid,
      defaultValue: props.orgIids || [],
    }),
    topEquivalentPosition: topEquivalentPosition({}),
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
        floatingLabelText: t1('name...'),
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
  return [
    {
      id: 'id',
      fields: [
        ...(!forAdvanceSearch ? ['text'] : []),
        values.top_equivalent_position ? null : 'topEquivalentPosition',
        values.notShowOrganizationField ? null : 'organizations',
      ].filter(Boolean),
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
    : { component: SearchFormLayoutFreestyle, freestyle: 1 },
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
