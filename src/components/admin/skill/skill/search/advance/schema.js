import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const getElementsSchema = (forRecap = false) => {
  let elementsSchema = {
    status: {
      type: 'select',
      multiple: true,
      name: 'status',
      floatingLabelText: t1('status'),
      options: constants.SkillStatusOptions(),
      inline: true,
      defaultValue: ['queued', 'approved'],
    },
  };

  if (forRecap) {
    return addPropsToEverySchemaElements(elementsSchema, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }

  return elementsSchema;
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['status'],
    },
  ];
};

const getSchema = (forRecap = false) => ({
  schema: getElementsSchema(forRecap),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema();
export const searchRecapFormSchema = getSchema(true);
