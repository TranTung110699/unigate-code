import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { required } from 'common/validators';
import { reqStatuses } from 'configs/constants';
import {
  requestTypeElement,
  requestTypeIidElement,
  statusElement,
} from './elements';
import requestDataSchema from './request-data';
import LayoutFreeStyle from './layout-free-style';

const schema = ({ values, hiddenFields }) => ({
  request_type: requestTypeElement({
    classWrapper: 'col-md-12',
    floatingLabelText: t1('group_request_type'),
    validate: [required(t1('group_request_type_cannot_be_empty'))],
    populateValue: true,
    paramsasync: {
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((val) => ({
          value: val,
          label: t1(val),
          primaryText: t1(val),
        }));
      },
    },
  }),
  request_type_iid: requestTypeIidElement(
    {
      classWrapper: 'col-md-12',
      waringWhenOptionsIsEmpty: (
        <h3 style={{ color: 'red' }}>
          {t1('the_system_does_not_yet_support_request_type:_%s', [
            t1(
              getLodash(hiddenFields, 'request_type') ||
                getLodash(values, 'request_type'),
            ),
          ])}
        </h3>
      ),
      validate: [required(t1('request_type_cannot_be_empty'))],
    },
    values,
  ),
  request_data: {
    type: 'section',
    schema: requestDataSchema(hiddenFields),
    validate: [required(t1('request_data_cannot_be_empty'))],
  },
  status: statusElement({
    type: 'select',
    classWrapper: 'col-md-12',
    floatingLabelText: null,
    paramsasync: {
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data
          .filter((val) =>
            [
              reqStatuses.STATUS_SENT,
              reqStatuses.STATUS_PROCESSING,
              reqStatuses.STATUS_PROCESSED,
            ].includes(val),
          )
          .map((val) => ({
            value: val,
            label: t1(val),
            primaryText: t1(val),
          }));
      },
    },
  }),
});

const ui = (step, values) => {
  const fields = ['request_type'];

  if (values && values.request_type) {
    fields.push('request_type_iid');
  }
  if (values && values.request_type_iid) {
    fields.push('request_data');
  }

  if (getLodash(values, 'processor.iid')) {
    fields.push('status');
  }

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

const layout = { component: LayoutFreeStyle, freestyle: 1 };

export default ({ hiddenFields = {} } = {}) => ({
  schema: (formid, values) => schema({ formid, values, hiddenFields }),
  ui,
  layout,
});
