import Store from 'store';
import { change } from 'redux-form';
import { t, t1 } from 'translate';
import { dateGreaterThan, required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { getTimestampTheStartADay } from 'common/utils/Date';
import deliveryMethods from './elements/delivery_methods';
import LayoutFreestyle from './layout-freestyle';
import learningItemsSchema from './learningItemSchema';
import learnersSchema from './learnersSchema';
import { organizations } from 'components/admin/organization/schema/elements';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';
import salePackageApi from 'components/admin/sales-package/endpoints';
import { order_status } from '../../sales-order/mainstage/status/schema';
import get from 'lodash.get';
import { orderStatus, packageStatus } from 'configs/constants/sales-package';

const defaultStep = 'new_enrolment-session';
const changeForm = (formId, fieldName, values) => {
  Store.dispatch(change(formId, fieldName, values));
};

const getSchema = ({
  formid,
  values,
  hiddenFields,
  readOnly,
  showPackage,
}) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    errorText: '',
    fullWidth: true,
    validate: [required(t1('code_cannot_be_empty'))],
    normalize: slugifier,
  },
  organizations: organizations({
    formid,
    label: `${t1('organizations')} (*)`,
    validate: [required()],
  }),
  learning_items: {
    type: 'array',
    schema: learningItemsSchema,
    hiddenAddButton: true,
    hiddenRemoveButton:
      readOnly || (hiddenFields && hiddenFields.includes('learning_items')),
    hiddenLabel: true,
  },
  learners: {
    type: 'array',
    schema: learnersSchema,
    hiddenRemoveButton:
      readOnly || (hiddenFields && hiddenFields.includes('learners')),
    hiddenAddButton: true,
    hiddenLabel: true,
  },
  reset_progress: {
    type: 'checkbox',
    label: t1('reset_all'),
    onChange: (event, toggled) => {
      const learners =
        (Array.isArray(values.learners) &&
          values.learners.map((item) => {
            item.reset_progress = toggled ? 1 : 0;
            return item;
          })) ||
        [];
      changeForm(formid, 'learners', learners);
    },
  },
  items: {
    nameElement: 'items',
    type: InputAutoComplete,
    classWrapper:
      hiddenFields && hiddenFields.includes('items') ? 'display-none' : '',
    baseUrl: '/site/api/get-course-or-path',
    floatingLabelText: `${t1('items')} (${t('course')} ${t('or')} ${t(
      'path',
    )})`,
    fullWidth: true,
    dataSourceConfig: {
      text: 'key',
      value: 'data',
    },
  },
  delivery_methods: { ...deliveryMethods, inline: true },
  note: {
    type: RTE,
    floatingLabelText: t1('invite_note'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  compulsory: {
    type: 'checkbox',
    defaultValue: 1,
    label: `${t1('compulsory')} (${t(
      'tick_if_it_is_required_that_all_users_or_groups_of_users_must_take_the_course',
    )})`,
    fullWidth: true,
  },
  valid_duration: {
    type: 'number',
    step: 1,
    min: 1,
    floatingLabelText: t1('invite_valid_duration_(in_day)'),
    errorText: '',
    fullWidth: true,
  },
  learning_now: {
    type: 'checkbox',
    defaultValue: 1,
    label: t1('learning_now'),
    fullWidth: true,
  },
  start_date: {
    type: DatePicker,
    getStartDate: true,
    fullWidth: true,
    floatingLabelText: t1('the_start_date_is_allowed_to_learning'),
    defaultValue: showPackage ? getTimestampTheStartADay() : undefined,
    validate: [
      ...(!showPackage
        ? [
            dateGreaterThan(
              getTimestampTheStartADay(),
              t1('time_must_start_today'),
            ),
          ]
        : []),
      (!values || !values.learning_now || showPackage) &&
        required(t1('start_date_cannot_be_empty')),
    ],
  },
  deadline: {
    type: DatePicker,
    getEndDate: true,
    fullWidth: true,
    floatingLabelText: t1('the_deadline_is_allowed_to_learning'),
    validate: [
      dateGreaterThan(
        (values && values.start_date) || getTimestampTheStartADay(),
        t1(
          values && values.start_date
            ? 'end_date_must_be_after_start_date'
            : 'end_date_must_be_after_today',
        ),
      ),
    ],
  },
  package_iid: {
    type: 'select',
    options: 'async',
    fullWidth: true,
    floatingLabelText: `${t1('package')} (*)`,
    validate: [required(t1('package_cannot_be_empty'))],
    paramsasync: {
      key: 'package_iid',
      __url__: salePackageApi.searchPackage,
      value: {
        page: 1,
        items_per_page: -1,
        status: [packageStatus.approved, packageStatus.created],
      },
      transformData: (fields) => {
        if (!Array.isArray(fields) || !fields.length) {
          return [];
        }

        return fields
          .map((field) => {
            if (!field) {
              return;
            }
            return {
              value: field.iid,
              label: `${field.name} (${t1('%s_month', [field.duration])})`,
              primaryText: `${field.name} (${t1('%s_month', [
                field.duration,
              ])})`,
            };
          })
          .filter(Boolean);
      },
    },
  },
  status: order_status({
    defaultValue: orderStatus.FULLFILLED,
  }),
});

const getUi = ({
  step,
  values,
  fieldsFilter = [],
  simpleMode,
  showPackage,
}) => {
  let fields = [];
  const newFieldsFilter = Array.isArray(fieldsFilter) ? [...fieldsFilter] : [];

  switch (step) {
    case 'new_learning_item': {
      fields = [
        'items',
        'compulsory',
        'valid_duration',
        'learning_now',
        'start_date',
        'deadline',
        'note',
        'delivery_methods',
      ];
      break;
    }
    default:
      fields = [
        'learners',
        ...(!simpleMode
          ? [
              'reset_progress',
              'compulsory',
              'valid_duration',
              'learning_now',
              'start_date',
              'deadline',
            ]
          : []),
        ...(showPackage ? ['package_iid', 'start_date', 'status'] : []),
        'note',
        'delivery_methods',
      ].filter(Boolean);
      break;
  }

  if (values && values.compulsory) {
    newFieldsFilter.push('valid_duration');
  }
  if (values && values.learning_now) {
    newFieldsFilter.push('start_date');
  }

  if (newFieldsFilter.length > 0) {
    fields = fields.filter((field) => !newFieldsFilter.includes(field));
  }
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const getLayout = ({ step, hiddenFields, readOnly }) => ({
  component: LayoutFreestyle,
  freestyle: 1,
  optionsProperties: {
    hiddenFields,
    readOnly,
  },
});

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  let values = fullData;

  if (get(schema, 'fields', []).includes('package_iid')) {
    values.customers = values.learners;
    values._sand_step = undefined;
    delete values.learners;
  }

  return values;
};

const schema = (
  hiddenFields = {},
  mode = 'new',
  readOnly = false,
  simpleMode = false,
  showPackage = false,
) => {
  const fieldsFilter = Object.keys(hiddenFields) || [];

  return {
    schema: (formid, values) =>
      getSchema({
        formid,
        values,
        hiddenFields: fieldsFilter,
        readOnly,
        showPackage,
      }),
    ui: (step, values) => getUi({ step, values, simpleMode, showPackage }),
    layout: (step) => getLayout({ step, hiddenFields: fieldsFilter, readOnly }),
    finalProcessBeforeSubmit,
  };
};

export default schema;
