// contains a list of sample fields
// const fields = ['name'];
import React from 'react';
import { change } from 'redux-form';
import store from 'store';
import Layout from './Layout';

import select from './elements/select';
import selectMultiple from './elements/select.multiple';
import selectAsync from './elements/select.async';
import radio from './elements/radio';
import text from './elements/text';
import rte from './elements/rte';
import checkbox from './elements/checkbox';
import cascade from './elements/cascade';
import arraySchema from './elements/array';
import multiCheckbox from './elements/multiCheckbox';
import section from './elements/section';
import arrayFreeLayout from './elements/array/free-layout';
import date from './elements/picker/date';
import tg from './tg';
import hidden from './elements/hidden';
import multiCheckboxAsync from './elements/multiCheckbox.async';
import attachment, { attachment_multiple } from './elements/attachments';
import { guide, guideSimple } from './elements/guide';

const onRadioChange = (formid, value) => {
  store.dispatch(change(formid, 'radioDerived', `${value}...xxx`));
};

const elementsSchema = (formid, values) => {
  // availableFilters: selectMultiple(),
  return {
    guide,
    guideSimple,
    attachment: attachment(formid, values),
    attachment_multiple: attachment_multiple(formid, values),
    name: text('enter some name', true),
    date: date(),
    radio: radio(onRadioChange, formid, values),
    radioDerived: text('value derived from radio above', false),
    checkbox: checkbox('checkbox: Is video on youtube?'),
    multiCheckbox: multiCheckbox(),
    multiCheckboxAsync: multiCheckboxAsync(),
    select,
    selectMultiple: selectMultiple(),
    selectAsync: selectAsync(formid),
    rte,
    video__vid: text('enter youtube vid', false),
    is_youtube: checkbox('is_youtube', false),
    address_section: section,
    comment_array: arraySchema,
    target_group_filters: tg(formid, values),
    arrayFreeLayout: arrayFreeLayout,
    cascade,
    show_vardump: checkbox('show_vardump'),
    show_errors: checkbox('show_errors'),
    hidden,
    collapser_element: checkbox('abc', 'xyz'),
  };
};

const controls = ['show_vardump', 'show_errors', 'availableFilters'];

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  // const schema = (formid, values) => {
  const ret = elementsSchema(formid, values);

  const availableFilters = Object.keys(elementsSchema());

  // const availableFilters = ['date'];

  const options = availableFilters.map((elName) => {
    return !controls.includes(elName)
      ? {
          value: elName,
          label: elName,
        }
      : undefined;
  });

  ret.availableFilters = multiCheckbox(options.filter((x) => x !== undefined));
  return ret;
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
  // const ui = (step, values, themeConfig, xpath, formid, props) => {
  // const ui = (step, values) => {
  const allFields = [
    'collapser_element',
    'guide',
    'guideSimple',
    'name',
    'attachment',
    'attachment_multiple',
    'date',
    'radio',
    'radioDerived',
    'checkbox',
    'multiCheckbox',
    'multiCheckboxAsync',
    'select',
    'selectMultiple',
    'selectAsync',
    'is_youtube',
    // 'form_section',
    ...(values.is_youtube ? ['video__vid'] : []),
    'rte',
    'address_section',
    'comment_array',
    'arrayFreeLayout',
    'hidden',
  ];

  const config = {
    // step == ''
    new: [
      {
        fields: allFields,
        id: 'g2',
        title: 'All the form elements. Select the right side',
      },
      {
        fields: ['date', 'target_group_filters', 'major'],
        id: 'target_group',
        title: 'dynamic target groups',
      },
      {
        id: 'select_image',
        title: 'Choose a foo type',
        fields: [
          'select_image_single',
          'select_image_multiple',
          'select_image_object',
          'select_image_object_multiple',
        ],
        // schema: {'name' => ....}
      },
      {
        fields: ['availableFilters'],
        id: 'controls',
        title: 'controls',
      },
      {
        fields: ['show_vardump', 'show_errors'],
        id: 'dump',
        title: 'dump',
      },
    ],
  };

  const ret = config[step];
  const defaultFilters = [
    'name',
    // 'radio',
    // 'select',
    // 'selectMultiple',
    // 'selectAsync',
    // 'checkbox',
    // 'multiCheckbox',
    // 'date',
  ];
  const chosenFilters = values.availableFilters || defaultFilters;

  return ret.map((group) => {
    group.fields = group.fields.filter(
      (i) => chosenFilters.includes(i) || controls.includes(i),
    );
    return group;
  });

  return ret;
};

const layout = {
  // each can be one of the following values:
  // 1. a string, which will use a pre-defined layout in schema-form/layouts
  // 2. a React Component
  // 3. a object as follow { component: X, freestyle: 1} where X is a React Component
  // 2 & 3 differ in the sense that layout in 2 deals with groups, where 3 deals with elements,
  // thus 3 is obviously more flexible
  new: Layout,
};

const foo = {
  schema,
  ui,
  layout,
};

console.log({ foo });
export default foo;
