import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { t1 } from 'translate';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import DatePicker from 'schema-form/elements/date-picker';
import { packageStatus } from 'configs/constants/sales-package';

const schema = (forRecap = false, forAdvanceSearch = false, props) => (
  formid,
  values,
  step,
  xpath,
  domainInfo,
) => {
  let element = {
    status: {
      type: 'multiCheckbox',
      options: [
        ...Object.keys(packageStatus).map((item) => ({
          name: item,
          value: item,
          label: t1(item),
          primaryText: t1(item),
        })),
      ],
      defaultValue: [packageStatus.approved, packageStatus.created],
      inline: true,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    from_date: {
      type: DatePicker,
      getStartDate: true,
      fullWidth: true,
      floatingLabelText: t1('from_date'),
    },
    to_date: {
      type: DatePicker,
      getEndDate: true,
      fullWidth: true,
      floatingLabelText: t1('to_date'),
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
      name: {
        type: 'text',
        floatingLabelText: t1('name'),
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
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
) => {
  let fields = [];
  if (!forAdvanceSearch) {
    fields.push('name');
  }

  fields.push('status');

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false, props = {}) => ({
  schema: schema(forRecap, forAdvance, props),
  ui: ui(forAdvance),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : {},
});

export const searchFormSchema = (props = {}) => getSchema(false, true, props);
export const searchRecapFormSchema = (props = {}) =>
  getSchema(true, true, props);

export default getSchema();
