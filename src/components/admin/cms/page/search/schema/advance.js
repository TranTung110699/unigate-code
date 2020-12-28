import { t1 } from 'translate';
import {
  examShiftsSelectBox,
  examRoundsSelectBox,
} from 'components/admin/contest/common/elements';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (isRecap = false, props) => {
  const {
    blogSubTypes,
    categoryTrees,
    statuses,
    blogTypes,
    isFeatured,
    hiddenFields,
  } = props;
  let element = {
    blog_type: {
      type: 'select',
      name: 'blog_type',
      fullWidth: true,
      floatingLabelText: t1('blog_type'),
      floatingLabelFixed: true,
      options: blogTypes.options,
      readOnly: !!(hiddenFields && hiddenFields.blog_type),
    },
    featured: {
      type: 'select',
      name: 'featured',
      fullWidth: true,
      floatingLabelText: t1('is_featured'),
      floatingLabelFixed: true,
      options: isFeatured.options,
    },
    sub_type: {
      type: 'select',
      name: 'sub_type',
      floatingLabelText: t1('blog_sub_type'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: blogSubTypes,
    },
    category: {
      type: 'select',
      name: 'category',
      floatingLabelText: t1('category'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: categoryTrees,
    },
    status: {
      name: 'status',
      inline: true,
      type: 'multiCheckbox',
      hintText: `${t1('hint')} : ${t1('type_of_status')}`,
      floatingLabelText: t1('status'),
      options: statuses.options,
      defaultValue: ['queued', 'approved'],
    },
  };

  if (isRecap) {
    return addPropsToEverySchemaElements(element, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }

  return element;
};

const ui = (step, values) => [
  {
    fields: ['blog_type', 'featured', 'sub_type', 'category', 'status'],
  },
];

const getSchema = (forRecap = false, props) => ({
  schema: schema(forRecap, props),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema(false, {});
export const searchRecapFormSchema = getSchema(true, {});
