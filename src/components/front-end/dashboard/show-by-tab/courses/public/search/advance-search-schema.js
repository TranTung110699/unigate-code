import { t1 } from 'translate';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false) => (formid) => {
  let element = {
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
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
      id: 'default',
      fields: ['academic_categories'],
    },
  ];
};

const getSchema = (forRecap = false) => ({
  schema: schema(forRecap),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema(false);
export const searchRecapFormSchema = getSchema(true);
