import React from 'react';
import { t1 } from 'translate/index';
import { reqTypes, schoolTypes, UiLibs } from 'configs/constants/index';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import getLodash from 'lodash.get';

import {
  requestTypeElement,
  requestTypeIidElement,
  statusElement,
} from '../schema/elements';
import Layout from './search-layout-free-style';
import requesterSchema from './smart-filter/requester-schema';
import requestDataSchema from './smart-filter/request-data-schema';
import organizationAndJobPositionSchema from './smart-filter/orgranization-and-job-position-schema';
import DatePicker from 'schema-form/elements/date-picker';

const schema = (formid, values, hiddenFields, themeConfig) => {
  const isSis = getLodash(themeConfig, 'type') === schoolTypes.SIS;
  const requesterIid = getLodash(hiddenFields, 'requester_iid');

  const result = {
    request_type: requestTypeElement({ populateValue: true }),
    request_type_iid: requestTypeIidElement(
      {
        multiple: true,
        populateValue: false,
      },
      values,
    ),
    status: statusElement(),
    start_date: {
      type: DatePicker,
      uiLib: UiLibs.ANT,
      getStartDate: true,
      validate: [
        dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
      ],
      floatingLabelText: t1('start_date_requested'),
      fullWidth: true,
      maxDate: values.end_date,
    },
    end_date: {
      type: DatePicker,
      uiLib: UiLibs.ANT,
      getEndDate: true,
      floatingLabelText: t1('end_date_requested'),
      validate: [
        dateGreaterThan(
          values.start_date,
          t1('end_date_must_be_after_start_date'),
        ),
      ],
      fullWidth: true,
      minDate: values.start_date,
    },
  };

  if (!requesterIid) {
    result.organization_and_job_position = {
      type: 'cascade',
      schema: organizationAndJobPositionSchema(),
    };
    result.requester = {
      type: 'section',
      schema: requesterSchema(isSis),
    };
    result.request_data = {
      type: 'section',
      schema: requestDataSchema,
    };
  }

  return result;
};

const ui = (step, values, hiddenFields, searchOrganization) => {
  const fields = ['request_type', 'status', 'start_date', 'end_date'];

  const requesterIid = getLodash(hiddenFields, 'requester_iid');
  if (!requesterIid) {
    if (searchOrganization) {
      fields.push('organization_and_job_position');
    }
    fields.push('requester');
    if (
      [
        reqTypes.REGISTER_CREDIT_SYLLABUS,
        reqTypes.POSTPONE_FEE_DEADLINE,
      ].includes(getLodash(values, 'request_type'))
    ) {
      fields.push('request_data');
    }

    if (getLodash(values, 'request_type')) {
      fields.push('request_type_iid');
    }
  }
  return [
    {
      id: 'id',
      fields,
    },
  ];
};

const layout = () => ({ component: Layout, freestyle: 1 });

export default ({ hiddenFields, themeConfig, searchOrganization }) => ({
  schema: (formid, values) => schema(formid, values, hiddenFields, themeConfig),
  ui: (step, values) => ui(step, values, hiddenFields, searchOrganization),
  layout,
});
