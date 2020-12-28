import { t1 } from 'translate';
import React from 'react';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';

import {
  includeSubOrganizations,
  organizations,
} from '../../../organization/schema/elements';
import { required } from 'common/validators';
import lodashGet from 'lodash.get';
import SearchFormFreestyle from './FormFreeStyle';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  username: {
    type: 'text',
    hintText: t1('enter_username'),
    floatingLabelText: t1('username'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  item_iid: {
    //training_plan
    type: 'select',
    floatingLabelText: `${t1('training_plan')}`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: tpApiUrls.training_plan_search,
      value: {
        items_per_page: -1,
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        return data.map((row) => ({
          value: lodashGet(row, 'iid'),
          primaryText: lodashGet(row, 'name'),
        }));
      },
      valueKey: 'item_iid',
    },
    fullWidth: true,
    validate: [required()],
    // validate: required(t1('province_cant_be_empty')),
  },
  enrolment_plan_iid: {
    type: 'select',
    fullWidth: true,
    options: 'async',
    showSearch: true,
    floatingLabelText: t1('enrolment_plan'),
    optionFilterProp: 'children',
    filterOption: (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    paramsasync: {
      __url__: epApiUrls.enrolment_plan_search,
      value: {
        items_per_page: -1,
        training_plan_iid: lodashGet(values, 'item_iid'),
      },
      transformData: (result) =>
        Array.isArray(result) &&
        result.filter(Boolean).map((item) => ({
          value: item,
          label: item.name,
          primaryText: item.name,
        })),
    },
  },

  organizations: organizations({
    formid,
    label: t1('organizations'),
    defaultValue: props.orgIids,
  }),
  include_sub_organizations: includeSubOrganizations(domainInfo.conf),
});

const ui = () => {
  const fields = [
    'username',
    'item_iid',
    'organizations',
    'include_sub_organizations',
    'enrolment_plan_iid',
  ];

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: SearchFormFreestyle,
    freestyle: 1,
  },
};
