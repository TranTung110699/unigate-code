/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { t1 } from 'translate';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schemaAdvance = (isRecap, props) => {
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
      fullWidth: true,
      floatingLabelText: t1('blog_type'),
      floatingLabelFixed: true,
      options: blogTypes.options,
      readOnly: !!(hiddenFields && hiddenFields.blog_type),
    },
    featured: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('is_featured'),
      floatingLabelFixed: true,
      options: isFeatured.options,
    },
    sub_type: {
      type: 'select',
      floatingLabelText: t1('blog_sub_type'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: blogSubTypes,
    },
    category: {
      type: 'select',
      floatingLabelText: t1('category'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: categoryTrees,
    },
    status: {
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

const uiAdvance = (step, values) => [
  {
    id: 'abccc',
    fields: [
      // 'testxxx',
      // 'blog_type',
      // 'featured',
      // 'sub_type',
      // 'category',
      // 'status'
    ],
  },
];

const getSchema = (isRecap, props) => ({
  schema: schemaAdvance(isRecap, props),
  ui: uiAdvance(),
  layout: isRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    name: {
      // type: Search,
      type: 'text',
      schema: getSchema(false, props),
      recapSchema: getSchema(true, props),
      labelText: t1('search_by_name_or_iid'),
      floatingLabelText: t1('search_by_name_or_iid'),
    },
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  return [
    {
      id: 'id',
      fields: ['name'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
