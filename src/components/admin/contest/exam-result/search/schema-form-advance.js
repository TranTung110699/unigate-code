/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema-form';
import { t1 } from 'translate';
import {
  examRoundsSelectBox,
  examShiftsSelectBox,
} from '../../common/elements';
import FormLayoutFreestyle from './FormFreeStyle';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    exam_round_iid: examRoundsSelectBox(values, null, true),
    exam_shift_iid: examShiftsSelectBox(values),
    name: {
      title: t1('search'),
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
      labelText: t1('search_contestant_(name,_email...)'),
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
      fields: ['exam_round_iid', 'exam_shift_iid'],
    },
    {
      id: 'name',
      title: t1('search'),
      fields: ['name'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
  layout: {
    component: FormLayoutFreestyle,
    freestyle: 1,
  },
};
