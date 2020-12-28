import { required } from 'common/validators';
import { t1 } from 'translate';
import { commonFormLayouts } from 'schema-form/constants';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const dateDefaultFrom = new Date();
const dateDefaultTo = new Date(
  dateDefaultFrom.setDate(dateDefaultFrom.getDay() + 7),
);

const schema = (formid, values, step) => ({
  start_time: {
    type: DatePicker,
    hintText: 'From date',
    floatingLabelText: 'From date',
    container: 'inline',
    defaultValue: dateDefaultFrom,
    validate: [required('name cannot be empty')],
    errorText: '',
  },
  end_time: {
    type: DatePicker,
    hintText: 'To date',
    container: 'inline',
    floatingLabelText: 'To date',
    defaultValue: dateDefaultTo,
    errorText: '',
    validate: [required('name cannot be empty')],
  },
  input_search: {
    type: 'text',
    hintText: t1('enter_the_input'),
    container: 'inline',
    floatingLabelText: t1('search_input'),
    fullWidth: true,
  },
  class: {
    nameElement: t1('class_name'),
    type: InputAutoComplete,
    limit: 1,
    // baseUrl: '/site/api/get-user-or-group',
    baseUrl: '/site/api/get-data-schema?ntype=user',
    floatingLabelText: t1('class_name'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
  },
  course: {
    nameElement: t1('course'),
    type: InputAutoComplete,
    limit: 1,
    // baseUrl: '/site/api/get-user-or-group',
    baseUrl: '/site/api/get-data-schema?ntype=user',
    floatingLabelText: t1('course'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'primaryText',
      value: 'value',
    },
  },
  venue: {
    type: 'text',
    hintText: t1('venue'),
    container: 'inline',
    floatingLabelText: t1('venue'),
    errorText: '',
  },
  room: {
    type: 'text',
    hintText: t1('room'),
    container: 'inline',
    floatingLabelText: t1('room'),
    errorText: '',
  },
  floor: {
    type: 'text',
    hintText: t1('floor'),
    container: 'inline',
    floatingLabelText: t1('floor'),
    errorText: '',
  },
});

const ui = (step) => {
  const config = {
    // step == ''
    new: [
      {
        id: 'col1',
        title: '',
        fields: ['start_time'],
      },
      {
        id: 'col2',
        title: '',
        fields: ['end_time'],
      },
      {
        id: 'col3',
        title: '',
        fields: ['input_search'],
      },
      // {
      //   id: 'col1',
      //   title: '',
      //   fields: ['venue', 'start_time'],
      //   // schema: {'name' => ....}
      // },
      // {
      //   id: 'col2',
      //   title: '',
      //   fields: ['floor', 'end_time'],
      //   // schema: {'name' => ....}
      // },
      // {
      //   id: 'col3',
      //   title: '',
      //   fields: ['room',],
      //   // schema: {'name' => ....}
      // },
      // {
      //   id: 'last_row_left',
      //   title: '',
      //   fields: ['course'],
      //   // schema: {'name' => ....}
      // },
      // {
      //   id: 'last_row_right',
      //   title: '',
      //   fields: ['class'],
      //   // schema: {'name' => ....}
      // },
    ],
  };

  return config[step];
};

const layout = {
  new: commonFormLayouts.THREE_COLS,
};

const foo = {
  schema,
  ui,
  layout,
};

export default foo;
