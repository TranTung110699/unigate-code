import React from 'react';
import Search from 'schema-form/elements/advance-search';
import {
  searchFormSchema,
  searchRecapFormSchema,
} from 'components/admin/user/account/account-search/schema/advance.js';
import { t1 } from 'translate';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import { defaultStatuses } from 'components/admin/enrolment-plan/search/common';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    text: {
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
      labelText: t1('user_name,_email,_id_or_code...'),
    },
    pass_status: {
      type: 'radio',
      floatingLabelText: t1('status'),
      floatingLabelFixed: true,
      inline: true,
      defaultValue: 'all',
      options: [
        {
          value: 'all',
          label: t1('all'),
        },
        {
          value: 'pass_only',
          label: t1('pass_only'),
        },
        {
          value: 'fail_only',
          label: t1('fail_only'),
        },
      ],
    },
    enrollment_plan_iid: {
      type: 'select',
      options: 'async',
      showSearch: true,
      floatingLabelText: t1('enrolment_plan'),
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      allowClear: true,
      paramsasync: {
        __url__: epApiUrls.enrolment_plan_search,
        value: {
          items_per_page: -1,
          status: defaultStatuses,
        },
        transformData: (result) => {
          return (
            Array.isArray(result) &&
            result.filter(Boolean).map((item) => ({
              value: item.iid,
              label: item.name,
              primaryText: item.name,
            }))
          );
        },
      },
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
      fields: ['pass_status', 'enrollment_plan_iid', 'text'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
