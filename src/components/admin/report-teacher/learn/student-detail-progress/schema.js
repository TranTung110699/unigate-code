import { t1 } from 'translate/index';
import SearchFormLayout from './SearchFormLayout';
import FrontendSearchFormLayout from './FrontendSearchFormLayout';
import { district, province } from 'components/admin/pds/schema/elements/index';
import { positions } from 'components/admin/job-position/schema/elements/index';
import { organizations } from 'components/admin/organization/schema/elements/index';
import apiUrls from 'api-endpoints/index';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';

import { getTimestampTheEndADay } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import Store from 'store/index';
import { change } from 'redux-form';
import DatePicker from 'schema-form/elements/date-picker/index';
import InputAutoComplete from 'schema-form/elements/input-auto-complete/index';

const defaultToDate = getTimestampTheEndADay();
const defaultFromDate = defaultToDate - 30 * 24 * 60 * 60;

const schema = (formid, values) => ({
  province: province({
    onChange: () =>
      ['district', 'organizations'].forEach((field) =>
        Store.dispatch(change(formid, field, null)),
      ),
  }),
  district: district(values, () =>
    ['organizations'].forEach((field) =>
      Store.dispatch(change(formid, field, null)),
    ),
  ),
  organizations: organizations({
    formid,
    label: `${t1('organizations')}`,
    provinceId: values.province,
    districtId: values.district,
  }),
  training_plan_iids: {
    type: 'select',
    floatingLabelText: t1('training_plan'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
    multiple: true,
    paramsasync: {
      __url__: tpApiUrls.get_training_plan_options,
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        return data.map((item) => ({
          value: lodashGet(item, 'iid'),
          primaryText: lodashGet(item, 'name'),
        }));
      },
    },
    onChange: () =>
      ['enrolment_plan_iids', 'credit_syllabus_iids', 'course_iids'].forEach(
        (field) => Store.dispatch(change(formid, field, null)),
      ),
  },
  enrolment_plan_iids: {
    type: InputAutoComplete,
    baseUrl: epApiUrls.get_enrolment_plan_options,
    floatingLabelText: t1('enrolment_plan'),
    floatingLabelFixed: true,
    fullWidth: true,
    params: {
      training_plan_iids: values.training_plan_iids,
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((item) => ({
          name: `${item.name} - ${item.code}`,
          iid: item.iid,
        })),
    },
    onChange: () =>
      ['credit_syllabus_iids', 'course_iids'].forEach((field) =>
        Store.dispatch(change(formid, field, null)),
      ),
  },
  text: {
    type: 'text',
    // hintText: t1('user_name'),
    floatingLabelText: t1('student_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  positions: positions(formid, undefined, values.organization),
  credit_syllabus_iids: {
    type: InputAutoComplete,
    baseUrl: epApiUrls.get_enrolment_plan_credit_syllabus_options,
    floatingLabelText: t1('syllabus'),
    fullWidth: true,
    params: {
      limit: 10,
      training_plan_iids: values.training_plan_iids,
      enrolment_plan_iids: values.enrolment_plan_iids,
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((item) => ({
          name: `${item.name} - ${item.code}`,
          iid: item.iid,
        })),
    },
    onChange: () =>
      ['course_iids'].forEach((field) =>
        Store.dispatch(change(formid, field, null)),
      ),
  },
  course_iids: {
    type: InputAutoComplete,
    baseUrl: epApiUrls.get_enrolment_plan_course_options,
    floatingLabelText: t1('course'),
    fullWidth: true,
    params: {
      limit: 10,
      training_plan_iids: values.training_plan_iids,
      enrolment_plan_iids: values.enrolment_plan_iids,
      credit_syllabus_iids: values.credit_syllabus_iids,
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((item) => ({
          name: `${item.name} - ${item.code}`,
          iid: item.iid,
        })),
    },
  },
  from_date: {
    type: DatePicker,
    getStartDate: true,
    fullWidth: true,
    floatingLabelText: t1('from_date'),
    // defaultValue: defaultFromDate,
    // maxDate: values.to_date,
  },
  to_date: {
    type: DatePicker,
    getEndDate: true,
    fullWidth: true,
    floatingLabelText: t1('to_date'),
    // defaultValue: defaultToDate,
    // minDate: values.from_date,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'province',
      // 'district',
      'organizations',
      'training_plan_iids',
      'enrolment_plan_iids',
      'text',
      // 'positions',
      'credit_syllabus_iids',
      'course_iids',
      'from_date',
      'to_date',
    ],
  },
];

const frontendUi = () => [
  {
    id: 'default',
    fields: ['organizations', 'province', 'credit_syllabus_iids', 'text'],
  },
];

export default (mode) => {
  if (mode == 'frontend')
    return {
      schema,
      ui: frontendUi,
      layout: { component: FrontendSearchFormLayout, freestyle: 1 },
    };

  return {
    schema,
    ui,
    layout: { component: SearchFormLayout, freestyle: 1 },
  };
};
