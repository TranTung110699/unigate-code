import { t1 } from 'translate';
import { required, validationWithCondition } from 'common/validators';
import { customMonth, reportBy, year } from 'configs/constants';
import { change } from 'redux-form';
import Store from 'store';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { hasOrganization } from 'common/conf';
import SearchFormLayout from './SearchFormLayout';
import get from 'lodash.get';
import { positions } from 'components/admin/job-position/schema/elements';

const getCurrentYear = () => {
  const time = new Date();
  return time.getFullYear();
};
const handleChange = (formid, values, value) => {
  Store.dispatch(change(formid, value, ''));
};
const getEndMonth = (values) => {
  // tim index start month
  const startMonth = customMonth(values && values.year);
  const index = startMonth.findIndex((el) => el.value === values.start_month);
  return startMonth.slice(index + 1);
};

const typeReport = (modeConfig) => {
  if (modeConfig === 'equivalent_positions') {
    return [
      {
        value: 'equivalent_positions',
        primaryText: t1('report_by_equivalent_positions'),
      },
      {
        value: 'report_type_equivalent_positions_positions',
        primaryText: t1('report_type_job_positions'),
      },
      {
        value: 'report_type_equivalent_positions_programs',
        primaryText: t1('report_by_programs'),
      },
      {
        value: 'report_type_equivalent_positions_users',
        primaryText: t1('report_by_user'),
      },
    ];
  }
  return [
    {
      value: 'credit_program',
      primaryText: t1('report_by_credit_or_programs'),
    },
    {
      value: 'positions',
      primaryText: t1('report_by_positions'),
    },
    {
      value: 'organizations',
      primaryText: t1('report_by_organizations'),
    },
  ];
};

const schema = (formid, values, localStep, xpath, props, domainInfo) => ({
  positions: positions(formid, {}, get(values, 'organizations')),
  report_type: {
    type: 'select',
    floatingLabelText: t1('type_report'),
    floatingLabelFixed: true,
    options: typeReport(get(values, 'modeConfig')),
    fullWidth: true,
    defaultValue:
      get(values, 'modeConfig') === 'equivalent_positions'
        ? 'equivalent_positions'
        : 'credit_program',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  name: {
    type: 'text',
    floatingLabelText: t1('search_by_name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  text: {
    type: 'text',
    floatingLabelText: t1('search_by_name_or_code'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  organizations: organizations({
    formid,
    label: `${t1('organizations')} (*)`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required(), values.requireOrganization)],
  }),
  reportBy: {
    type: 'select',
    floatingLabelText: t1('report_by'),
    floatingLabelFixed: true,
    options: reportBy(),
    fullWidth: true,
    defaultValue: 'month',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    onChange: (event, value) => handleChange(formid, values, value),
  },
  year: {
    type: 'select',
    floatingLabelText: t1('choose_year'),
    floatingLabelFixed: true,
    options: year(),
    fullWidth: true,
    defaultValue: getCurrentYear(),
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  forMonth: {
    type: 'select',
    hintText: t1('month'),
    floatingLabelText: t1('month'),
    options: customMonth(values && values.year),
    // minDate: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    defaultValue: customMonth(values && values.year)[0].value,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  forMonthMultiple: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('select_months'),
    options: customMonth(values && values.year),
    // errorText: t1("value_is_required_and_can't_be_empty"),
    multiple: true,
    // validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  start_month: {
    type: 'select',
    hintText: t1('start_month'),
    floatingLabelText: t1('start_month'),
    options: customMonth(values && values.year),
    // minDate: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  end_month: {
    type: 'select',
    hintText: t1('end_month'),
    floatingLabelText: t1('end_month'),
    options:
      values && values.start_month
        ? getEndMonth(values)
        : customMonth(values && values.year),
    // min                                  Date: values && values.year ? new Date(values.year, 1, 1, 0, 0, 0) : null,
    // maxDate: values && values.year ? new Date(values.year, 12, 31, 23, 59, 0) : null,
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  include_sub_organizations: includeSubOrganizations(domainInfo.conf),
});
const monthMulti = ['forMonthMultiple'];
const monthOnce = ['forMonth'];
const period = ['start_month', 'end_month'];

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
  let fields = ['report_type', 'year'];
  switch (get(values, 'report_type')) {
    case 'credit_program': {
      fields = fields.concat(['text', 'reportBy']);
      if (values.reportBy && values.reportBy === 'period') {
        fields = fields.concat(period);
      } else {
        fields = fields.concat(monthMulti);
      }
      // if (hasOrganization(domainInfo)) fields.push('organizations');
      break;
    }
    case 'equivalent_positions': {
      fields = fields.concat(['reportBy']);
      if (values.reportBy && values.reportBy === 'period') {
        fields = fields.concat(period);
      } else {
        fields = fields.concat(monthOnce);
      }
      break;
    }
    case 'report_type_equivalent_positions_programs':
      break;
    case 'report_type_equivalent_positions_users': {
      fields = fields.concat(['text']);
      break;
    }
    case 'report_type_equivalent_positions_positions': {
      fields.push('include_sub_organizations');
      if (hasOrganization(domainInfo)) fields.push('organizations');
      break;
    }
    case 'positions': {
      if (hasOrganization(domainInfo)) {
        fields = fields.concat(['reportBy']);
        fields.push('organizations');
        fields.push('positions');
        if (values.reportBy && values.reportBy === 'period') {
          fields = fields.concat(period);
        } else {
          fields = fields.concat(monthOnce);
        }
      }
      break;
    }
    default: {
      if (hasOrganization(domainInfo)) fields.push('organizations');
      fields = fields.concat(['reportBy']);
      if (values.reportBy && values.reportBy === 'period') {
        fields = fields.concat(period);
      } else {
        fields = fields.concat(monthOnce);
      }
      break;
    }
  }
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
