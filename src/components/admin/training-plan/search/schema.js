import { t1 } from 'translate';
import { year } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false) => (formid) => {
  let element = {
    year: {
      type: 'select',
      floatingLabelText: t1('year'),
      floatingLabelFixed: true,
      options: year(true),
      fullWidth: true,
      // defaultValue: new Date().getFullYear(),
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
      text: {
        type: 'text',
        floatingLabelText: t1('name'),
        floatingLabelFixed: true,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => () => {
  if (forAdvanceSearch) {
    return [
      {
        id: 'default',
        fields: ['year'],
      },
    ];
  }
  return [
    {
      id: 'default',
      fields: ['text', 'year'],
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
