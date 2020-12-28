import { t1 } from 'translate';
import { change, submit } from 'redux-form';
import lodashGet from 'lodash.get';
import memoize from 'fast-memoize';
import Store from 'store';

// we need to use this function so that for each formid, there are only one handle submit function
// because schema-form elements could be re-rendered when the handleSubmit prop changed
const getMemoizedHandleSubmitFormFunction = memoize((formid) => () =>
  Store.dispatch(submit(formid)),
);

const isRequired = (fieldSchema) => {
  if (fieldSchema.required) return true;

  let bool;
  if (fieldSchema.validate) {
    if (Array.isArray(fieldSchema.validate)) {
      for (const func of fieldSchema.validate) {
        if (func.name === 'requiredValidatorFunc') {
          bool = true;
          break;
        }
      }
    } else if (
      typeof fieldSchema.validate === 'function' &&
      fieldSchema.validate.name === 'requiredValidatorFunc'
    ) {
      bool = true;
    }
  }

  return bool;
};

// append "(*)"" to form field label if the field is required
const addRequiredIndicator = (fieldSchema) => {
  if (isRequired(fieldSchema)) {
    if (
      fieldSchema.floatingLabelText &&
      !fieldSchema.floatingLabelText.endsWith('(*)')
    ) {
      fieldSchema.floatingLabelText += ' (*)'; // <Html>asdfsdf</Html>; //` <span style={color: "red"}>(*)</span>`;
    } else if (fieldSchema.hintText && !fieldSchema.hintText.endsWith('(*)')) {
      fieldSchema.hintText += ' (*)';
    }
  }

  return fieldSchema;
};

const getSchema = (
  schema,
  formid,
  values,
  step,
  params = {},
  hiddenFields = {},
  xpath = '',
  props,
  domainInfo,
  themeConfig,
) => {
  // console.log('getSchema.....', step);
  const localStep = step || 'new';
  let result = schema;
  if (typeof schema === 'function') {
    result = schema(
      formid,
      Object.assign({}, params, hiddenFields, values),
      localStep,
      xpath,
      { ...props },
      domainInfo,
      themeConfig,
    );
  }
  // add (*) for required field
  for (const field in result) {
    result[field] = addRequiredIndicator(result[field]);
  }
  return result;
};

const getUi = (
  ui,
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
  hiddenFields,
) => {
  if (step === 'edit_avatar') {
    return [
      {
        fields: ['avatar', 'oavatar'],
        title: '',
      },
    ];
  }

  if (typeof ui === 'undefined') return [];
  else if (typeof ui === 'function') {
    return ui(
      step,
      values,
      themeConfig,
      xpath,
      formid,
      props,
      mode,
      domainInfo,
      hiddenFields,
    );
  } else if (ui[step]) {
    return ui[step];
  }
  return [];
};

const getLayout = (layout, step, values, xpath, props, domainInfo) => {
  let newLayout;
  if (!layout) {
    return newLayout;
  }

  if (typeof layout === 'function') {
    return layout(step, values, xpath, props, domainInfo);
  }

  if (layout[step]) {
    newLayout = layout[step];
  } else if (layout.default) {
    newLayout = layout.default;
  } else {
    newLayout = layout;
  }

  return newLayout;
};

/*
 return groups,
 each group is
 {
 id,
 title,
 fields,
 schema: {
 name: someConfig,
 vid: someConfig
 }
 }
 */
const emptyArray = [];

/**
 * Process async, hidden fields
 */
export const processAsyncAndSpecialFields = ({
  schema,
  ui = [],
  layout,
  formSchemaConfigs,
  props,
  formid,
  values,
  xpath = '',
}) => {
  // console.log("filter-form-builder.js", formSchemaConfigs);
  const asyncFields = [];
  const fields = [];
  const mappingAsyncFields = {};
  const defaultValues = lodashGet(props, 'defaultValues');

  const groupsSchema = ui.map((group, index) => {
    const tmp = {};
    if (group.fields) {
      group.fields.forEach((fieldName) => {
        const xpathByField =
          xpath && xpath !== '' ? `${xpath}.${fieldName}` : fieldName;

        fields.push(fieldName);

        if (!schema[fieldName]) {
          // group.fields.splice(index, 1);
          console.error(`form element "${fieldName}" not yet defined`);
          alert(`form element "${fieldName}" not yet defined`);
        }

        const field = Object.assign({}, schema[fieldName]);

        if (
          ['select', 'multiCheckbox', 'radio'].includes(field.type) &&
          field.options === 'async'
        ) {
          const paramsasync = field.paramsasync || {};
          const theKey = paramsasync.key || fieldName;

          if (
            formSchemaConfigs &&
            formSchemaConfigs[theKey] &&
            formSchemaConfigs[theKey] === '__EMPTY__'
          ) {
            // server returns ['success' => true] but empty list
            field.options = emptyArray; // formSchemaConfigs[theKey];
            if (!field.renderCustomizableOptions) {
              field.disabled = true;
            }
          } else if (
            formSchemaConfigs &&
            formSchemaConfigs[theKey] &&
            Object.keys(formSchemaConfigs[theKey]).length > 0
          ) {
            // the async field options have been fetched. Now use it
            // console.log({abc: formSchemaConfigs[theKey]});

            const transformData = paramsasync && paramsasync.transformData;

            field.options =
              typeof transformData === 'function'
                ? transformData(formSchemaConfigs[theKey])
                : formSchemaConfigs[theKey];

            delete field.errorText; // by default, we declare the errorText for loading-from-server instruction
          } else {
            // async field first time discovered, we put it mappingAsyncFields so they
            // can be dispatched for fetching

            asyncFields.push(fieldName);
            if (paramsasync) {
              mappingAsyncFields[fieldName] = paramsasync;
            }

            field.options =
              field.type === 'select'
                ? [{ value: '', primaryText: field.floatingLabelText }]
                : emptyArray;
            field.multiple = false;
            field.disabled = true;
          }

          if (
            isRequired(field) &&
            field.options.length == 1 &&
            field.options[0].value &&
            values[field.name] !== field.options[0].value
          ) {
            // populate this value to redux store.
            props.dispatch(
              change(formid, xpathByField, field.options[0].value),
            );
          }
        }

        let filterField = false;
        if (
          field.hiddenWhenOptionEmpty &&
          (!Array.isArray(field.options) || !field.options.length)
        ) {
          filterField = true;
          field.validate = [];
        }

        if (!filterField) {
          const defaultValue = lodashGet(defaultValues, xpathByField);
          if (typeof defaultValue !== 'undefined') {
            field.defaultValue = defaultValue;
          }

          tmp[fieldName] = field;
        }
      });
    }

    const id = group.id || index;
    return {
      id,
      schema: tmp,
      title: group.title,
      isBlock: group.isBlock,
      subTitle: group.subTitle,
      wrapperClass: group.wrapperClass,
    };
  });
  return { groupsSchema, asyncFields, layout, mappingAsyncFields, fields };
};

export const configsBySchema = (
  nodeFormSchema,
  step,
  formSchemaConfigs,
  formid,
  node,
  formValues,
  params,
  hiddenFields,
  themeConfig,
  xpath = '',
  props,
  mode,
  domainInfo,
) => {
  const values = Object.assign({}, node, formValues, params);

  let ui = getUi(
    nodeFormSchema.ui,
    step,
    Object.assign({}, values, hiddenFields || {}),
    themeConfig,
    xpath,
    formid,
    props,
    mode,
    domainInfo,
    hiddenFields,
  );

  const layout = getLayout(
    nodeFormSchema.layout,
    step,
    Object.assign({}, values, hiddenFields || {}),
    xpath,
    props,
    domainInfo,
  );

  // filter out fields that already in params or hiddenFields
  const allParams = Object.assign({}, params, hiddenFields);

  const keysToFilterOut = Object.keys(allParams).filter(
    (key) => lodashGet(allParams, key) !== undefined,
  );

  if (keysToFilterOut.length && Array.isArray(ui)) {
    ui = ui.map((part) => {
      if (xpath) {
        // only filter at top level
        return part;
      }
      if (!part || !Array.isArray(part.fields)) {
        return part;
      }
      return {
        ...part,
        fields: part.fields.filter((field) => !keysToFilterOut.includes(field)),
      };
    });
  }

  // alert(step);
  let schema = {};
  if (step === 'edit_avatar') {
    schema = {
      avatar: {
        type: 'text',
        hintText: t1('avatar'),
      },
    };
  } else {
    schema = getSchema(
      nodeFormSchema.schema,
      formid,
      values,
      step,
      params,
      hiddenFields,
      xpath,
      props,
      domainInfo,
      themeConfig,
    );
  }

  // add advanced filters
  /**
   * This element is used for search form and is effective at frontend only
   * It is used to show/hide advanced filters so usually when you first come to
   * a search screen, it only show simple filters. This way, the search-form screen will
   * be more compact
   */

  const compactSearch =
    typeof nodeFormSchema.compactSearch === 'function'
      ? nodeFormSchema.compactSearch(domainInfo)
      : nodeFormSchema.compactSearch;
  if (compactSearch) {
    ui.push({
      id: '__collapser__',
      fields: ['fe_advanced_search'],
    });

    schema.fe_advanced_search = {
      type: 'checkbox',
      label: t1('advanced_filters'),
    };

    // add wrapper class show the groups can be display-none'ed or not
    // ui = decorateUiForCompactSearch(ui, values.fe_advanced_search);

    ui = ui
      .map((grp) =>
        grp.hiddenWhenCompact && !values.fe_advanced_search ? null : grp,
      )
      .filter(Boolean);
  }

  schema = schema || {};
  // schema = schema.map(el => {
  //   el.formid = formid;
  //   return el;
  // });
  const filteredSchema = {};
  Object.keys(schema).forEach((field) => {
    if (schema[field]) {
      filteredSchema[field] = {
        ...schema[field],
        name: field,
        formid,
        /**
         * This is a hack so that we can pass handleSubmit props to form elements because some elements need to be able to call handle submit when user press 'Enter' key or something
         * However, this is only work with redux form
         * So in the future, if you can, please refactor this
         */
        handleSubmit: getMemoizedHandleSubmitFormFunction(formid),
      };
    }
  });
  schema = filteredSchema;

  const r = processAsyncAndSpecialFields({
    schema,
    ui,
    layout,
    formSchemaConfigs,
    props,
    formid,
    values,
    xpath,
  });

  if (nodeFormSchema.finalProcessBeforeSubmit) {
    r.finalProcessBeforeSubmit = nodeFormSchema.finalProcessBeforeSubmit;
  }

  if (nodeFormSchema.validate) {
    r.validate = nodeFormSchema.validate;
  }

  return r;
};

// a simple "decorator" interface for configsBySchema , but receiving the whole props as param
export const buildSchema = (props) => {
  const {
    node,
    params,
    mode,
    formSchemaConfigs,
    formid,
    hiddenFields,
    themeConfig,
    xpath,
    domainInfo,
  } = props;

  let { formValues, schema, step } = props;

  step = step ? `${mode}_${step}` : mode; // + props.step;

  // const formSchema = schema || {}; // getNodeFormSchema(props.ntype);

  const t = configsBySchema(
    schema || {},
    step,
    formSchemaConfigs,
    formid,
    node,
    formValues,
    params,
    hiddenFields,
    themeConfig,
    xpath,
    props,
    mode,
    domainInfo,
  );
  // console.log({buildSchema:t, schema, step, props});
  return t;
};
