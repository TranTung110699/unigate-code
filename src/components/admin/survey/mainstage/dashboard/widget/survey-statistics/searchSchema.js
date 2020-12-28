import { t1 } from 'translate';
import get from 'lodash.get';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import DatePicker from 'schema-form/elements/date-picker';
import { UiLibs } from 'configs/constants';
import { dateGreaterThan, dateLessThan } from 'common/validators';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    user_organizations: organizations({
      formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      classWrapper: 'col-md-9 m-b-0',
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: true,
      classWrapper: 'col-md-3 m-t-35',
    }),
    enrolment_plan_iid: {
      classWrapper: 'col-md-12 m-b-0',
      type: 'select',
      multiple: true,
      fullWidth: true,
      options: 'async',
      showSearch: true,
      floatingLabelText: t1('enrolment_plan'),
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      paramsasync: {
        __url__: apiUrls.enrolment_plan_search,
        value: {
          items_per_page: -1,
          training_plan_iid:
            get(values, 'item_ntype') === 'training_plan'
              ? get(values, 'item_iid')
              : null,
        },
        transformData: (result) =>
          Array.isArray(result) &&
          result.filter(Boolean).map((item) => ({
            value: item.iid,
            label: item.name,
            primaryText: item.name,
          })),
      },
      defaultValue: null,
    },
    start_date: {
      classWrapper: 'col-md-6',
      type: DatePicker,
      getStartDate: true,
      validate: [
        dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
      ],
      floatingLabelText: t1('start_date_of_the_report'),
      fullWidth: true,
      maxDate: values.end_date,
    },
    end_date: {
      classWrapper: 'col-md-6',
      type: DatePicker,
      uiLib: UiLibs.ANT,
      getEndDate: true,
      floatingLabelText: t1('end_date_of_the_report '),
      validate: [
        dateGreaterThan(
          values.start_date,
          t1('end_date_must_be_after_start_date'),
        ),
      ],
      fullWidth: true,
      minDate: values.start_date,
      maxDate: new Date().getTime() / 1000,
    },
    user_characteristics: {
      classWrapper: 'col-md-6',
      type: 'multiCheckbox',
      floatingLabelText: t1('user_characteristics'),
      options: [
        {
          value: 'female',
          label: t1('female'),
        },
        {
          value: 'dtts',
          label: t1('dtts'),
        },
      ],
      fullWidth: true,
      inline: true,
    },
  };
};

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: [
        'user_organizations',
        'include_sub_organizations',
        get(values, 'item_ntype') === 'training_plan' && 'enrolment_plan_iid',
        'start_date',
        'end_date',
        'user_characteristics',
      ].filter(Boolean),
    },
  ];
};

export default { schema, ui };
