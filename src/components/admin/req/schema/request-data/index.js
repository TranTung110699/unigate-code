import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import RTE from 'schema-form/elements/richtext';

import { reqTypes } from 'configs/constants';
import leaveOfAbsence from './leave-of-absence';
import postponeFeeDeadline from './postpone-fee-deadline';
import registerCreditSyllabus from './register-credit-syllabus';
import leaveOfAbsenceByDate from './leave-of-absence-by-date';
import Attachments from 'schema-form/elements/attachments';

const getRequestData = (requestType, values, hiddenFields) => {
  switch (requestType) {
    case reqTypes.POSTPONE_FEE_DEADLINE: {
      return postponeFeeDeadline(values, hiddenFields);
    }
    case reqTypes.REGISTER_CREDIT_SYLLABUS: {
      return registerCreditSyllabus(values);
    }
    case reqTypes.LEAVE_OF_ABSENCE_BY_DATE: {
      return leaveOfAbsenceByDate(values);
    }
    case reqTypes.TYPE_LEAVE_OF_ABSENCE: {
      return leaveOfAbsence(values);
    }
    default: {
      return null;
    }
  }
};

const result = {
  note: {
    type: RTE,
    hintText: t1('note'),
    classWrapper: 'col-md-12',
    floatingLabelText: t1('note'),
    defaultValue: '',
    multiLine: true,
    fullWidth: true,
  },
  attachments: {
    type: Attachments,
    label: t1('attachments'),
    classWrapper: 'col-md-12',
    allowDownload: false,
    limit: 1,
    multiple: false,
    fullWidth: true,
  },
};

const schema = ({ formid, values, hiddenFields }) => {
  const requestType = getLodash(values, 'request_type');
  const requestData = getRequestData(requestType, values, hiddenFields);

  return !requestData
    ? { ...result }
    : { ...result, [requestType]: requestData };
};

const getFields = (values) => {
  const requestType = getLodash(values, 'request_type');

  switch (requestType) {
    case reqTypes.REGISTER_CREDIT_SYLLABUS:
    case reqTypes.POSTPONE_FEE_DEADLINE:
      return [requestType, 'attachments', 'note'];

    case reqTypes.REQUEST_OTHER:
      return ['attachments', 'note'];

    case reqTypes.TYPE_LEAVE_OF_ABSENCE:
      return [requestType, 'note'];

    case reqTypes.LEAVE_OF_ABSENCE_BY_DATE:
      return [requestType, 'note'];

    default:
      return [];
  }
};

const ui = ({ values }) => {
  const fields = getFields(values);
  return [
    {
      id: 'default',
      title:
        getLodash(fields, 'length', 0) === 0 ? (
          <h2 style={{ color: 'red' }}>{t1('coming_soon')}</h2>
        ) : null,
      fields,
    },
  ];
};

export default (hiddenFields = {}) => ({
  schema: (formid, values) => schema({ formid, values, hiddenFields }),
  ui: (step, values) => ui({ step, values, hiddenFields }),
});
