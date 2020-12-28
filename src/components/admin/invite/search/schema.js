import React from 'react';
import { t1 } from 'translate';
import {
  displayStatusInvited,
  sinviteStatuses,
} from 'configs/constants/index.js';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import SearchFormLayoutFreestyleForCourseInvite from './SearchFormLayoutFreestyleForCourseInvite';
import DatePicker from 'schema-form/elements/date-picker';

const sinviteStatusOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    [
      sinviteStatuses.STATUS_REGISTERED,
      sinviteStatuses.STATUS_REJECTED,
      sinviteStatuses.STATUS_ACCEPTED,
      sinviteStatuses.STATUS_MUST_LEARN,
      // NOTE: right now this search form only need this statuses, add more if needed
    ],
    displayStatusInvited,
  );

const schema = () => ({
  q: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('search_target'),
    label: t1('name'),
    hintText: t1('e.g:_%s', ['iid, mail@domain.com']),
  },
  date_gte: {
    type: DatePicker,
    fullWidth: true,
    container: 'inline',
    floatingLabelText: t1('start_date'),
  },
  date_lte: {
    type: DatePicker,
    fullWidth: true,
    container: 'inline',
    floatingLabelText: t1('end_date'),
  },
  user_codes: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: `${t1('user_codes')} (${t1(
      'multiple_user_codes_separated_by_commas',
    )})`,
    label: t1('user_codes'),
    hintText: t1('user_codes'),
  },
  major_box: {
    type: 'cascade',
    schema: getMajorBoxSchema({ forSearch: true, notValidate: true }),
  },
  course_text: {
    type: 'text',
    hintText: t1('search_course_name_or_iid_or_code'),
    floatingLabelText: t1('search_course_name_or_iid_or_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  course_credit_syllabus_text: {
    type: 'text',
    hintText: t1('search_subject_name_or_iid_or_code'),
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    fullWidth: true,
  },
  sinvite_status: {
    type: 'multiCheckbox',
    options: sinviteStatusOptions(),
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const displayFields = values.displayFields;

  let res;

  if (props.isCourseInvite)
    return [
      {
        id: 'default',
        fields: ['q', 'user_codes'],
      },
    ];
  else
    res = [
      {
        id: 'default',
        fields: [
          'q',
          'date_gte',
          'date_lte',
          'user_codes',
          'major_box',
          'course_text',
          'course_credit_syllabus_text',
          'sinvite_status',
        ],
      },
    ];

  if (Array.isArray(displayFields) && displayFields.length > 0) {
    res = res.map((group) => ({
      ...group,
      fields: group.fields.filter((f) => displayFields.includes(f)),
    }));
  }

  return res;
};

export default {
  schema,
  ui,
  layout: (step, values, xpath, props) => {
    if (props.isCourseInvite)
      return {
        component: SearchFormLayoutFreestyleForCourseInvite,
        freestyle: 1,
        optionsProperties: {
          formNewInvite: props.formNewInvite,
          buttonImportInvite: props.buttonImportInvite,
          buttonBatchInviteEnrolmentPlanMembers:
            props.buttonBatchInviteEnrolmentPlanMembers,
          hasInvite: props.hasInvite,
          exportMembers: props.exportMembers,
        },
      };

    return {
      component: SearchFormLayoutFreestyle,
      freestyle: 1,
      optionsProperties: {
        formNewInvite: props.formNewInvite,
        buttonImportInvite: props.buttonImportInvite,
        buttonBatchInviteEnrolmentPlanMembers:
          props.buttonBatchInviteEnrolmentPlanMembers,
        hasInvite: props.hasInvite,
      },
    };
  },
};
