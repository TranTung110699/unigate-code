import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';
import { district, province } from 'components/admin/pds/schema/elements';
import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

// import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import { getTimestampTheEndADay } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import Store from 'store';
import { change } from 'redux-form';
import DatePicker from 'schema-form/elements/date-picker';

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
    defaultValue: defaultFromDate,
    maxDate: values.to_date,
  },
  to_date: {
    type: DatePicker,
    getEndDate: true,
    fullWidth: true,
    floatingLabelText: t1('to_date'),
    defaultValue: defaultToDate,
    minDate: values.from_date,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      // 'province',
      // 'district',
      // 'organizations',
      'training_plan_iids',
      'enrolment_plan_iids',
      // 'positions',
      // 'credit_syllabus_iids',
      // 'course_iids',
      // 'from_date',
      // 'to_date',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
