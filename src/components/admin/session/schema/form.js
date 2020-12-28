import React from 'react';
import { t1 } from 'translate';
import Store from 'store';
import { change } from 'redux-form';
import { required } from 'common/validators';
import { isOfflineExam } from 'common/learn';
import lodashGet from 'lodash.get';
import { convertBooleanValueToInt } from 'common/normalizers';
import { filterLocationTypesBaseOnSupportedLearningMethods } from 'utils/Util';
import { classHourOptions } from 'configs/constants';
import {
  getLocationTypes,
  ILT_BBB,
  locationTypes,
  roomTypes,
} from '../common/constants';
import scheduledSchema from './schedule-schema';

import LayoutFreeStyle from './layout_free_style';

const getLocationTypesByTypeOfCourse = (course, domainInfo) => {
  if (isOfflineExam(course)) {
    return getLocationTypes().filter(
      (opt) => opt.value === locationTypes().ILT_PHYSICAL,
    );
  }

  const supportedLearningMethods = lodashGet(
    domainInfo,
    'school.supported_learning_methods',
  );

  return filterLocationTypesBaseOnSupportedLearningMethods(
    supportedLearningMethods,
    getLocationTypes(),
  );
};

const practiceClassHourDefault = 30;
const theoryClassHourDefault = 15;

const numberClassHourDefault = 1;
const durationOfClassHourDefault = 60;

const sessionBreakTimeDefault = 0;

// Gợi ý số lượng buổi học cần được tạo theo số tín chỉ trong 1 môn học
const suggestedNumberOfSessionsShouldBeCreatedByNumberCreditsOfTheSubject = (
  subject,
  numberClassHourOfTheSession,
  domainInfo,
) => {
  const practiceCredit = lodashGet(subject, 'practice_credit') || 0;
  const theoryCredit = lodashGet(subject, 'theory_credit') || 0;

  if (!numberClassHourOfTheSession || (!practiceCredit && !theoryCredit)) {
    return 1;
  }

  const practiceClassHour =
    lodashGet(domainInfo, 'conf.class_hour_formula.practice') ||
    practiceClassHourDefault;
  const theoryClassHour =
    lodashGet(domainInfo, 'conf.class_hour_formula.theory') ||
    theoryClassHourDefault;

  const totalClassHour =
    practiceCredit * practiceClassHour + theoryCredit * theoryClassHour;
  return Math.ceil(totalClassHour / numberClassHourOfTheSession);
};

const handleChangeFormValueByField = (formid, field, value) =>
  Store.dispatch(change(formid, field, value));

const numberClassHourElement = (formid, subject, domainInfo) => {
  const numberClassHour =
    lodashGet(
      domainInfo,
      'conf.create_session_default_values.number_class_hour_default',
    ) || numberClassHourDefault;

  const durationOfClassHour =
    lodashGet(
      domainInfo,
      'conf.create_session_default_values.duration_of_class_hour_default',
    ) || durationOfClassHourDefault;

  return {
    type: 'radio',
    inline: true,
    onChange: (event, newValue) => {
      const newCount = suggestedNumberOfSessionsShouldBeCreatedByNumberCreditsOfTheSubject(
        subject,
        newValue,
        domainInfo,
      );
      handleChangeFormValueByField(formid, 'count', newCount);
      handleChangeFormValueByField(
        formid,
        'learn_duration',
        newValue * durationOfClassHour,
      );
    },
    classWrapper: 'col-md-12',
    hintText: t1('number_class_hour_of_the_session'),
    defaultValue: numberClassHour,
    options: classHourOptions,
  };
};

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const { node, syllabusObject } = props;
  const numberClassHour =
    lodashGet(
      domainInfo,
      'conf.create_session_default_values.number_class_hour_default',
    ) || numberClassHourDefault;

  const count = suggestedNumberOfSessionsShouldBeCreatedByNumberCreditsOfTheSubject(
    syllabusObject,
    numberClassHour,
    domainInfo,
  );
  const durationOfClassHour =
    lodashGet(
      domainInfo,
      'conf.create_session_default_values.duration_of_class_hour_default',
    ) || durationOfClassHourDefault;

  const sessionBreakTime =
    lodashGet(
      domainInfo,
      'conf.create_session_default_values.session_break_time',
    ) || sessionBreakTimeDefault;

  return {
    name: {
      type: 'text',
      floatingLabelText: t1('session_name'),
      required: 1,
    },
    session_ids: {
      type: 'array',
    },
    rename_session: {
      type: 'checkbox',
      label: t1('rename_session_cloned'),
      defaultValue: 0,
      normalize: convertBooleanValueToInt,
    },
    number_class_hour: numberClassHourElement(
      formid,
      syllabusObject,
      domainInfo,
    ),
    count: {
      type: 'number',
      step: 1,
      min: 1,
      defaultValue: count,
      floatingLabelText: t1('number_of_sessions_to_create'),
      fullWidth: true,
    },
    location: {
      type: 'radio',
      floatingLabelText: t1('location'),
      floatingLabelFixed: true,
      options: getLocationTypesByTypeOfCourse(node, domainInfo),
      fullWidth: true,
      defaultValue: locationTypes().ILT_PHYSICAL,
    },
    room_types: {
      type: 'select',
      multiple: true,
      floatingLabelText: t1('required_room_type'),
      floatingLabelFixed: true,
      options: roomTypes(),
      fullWidth: true,
      defaultValue: ['theory'],
    },
    learn_duration: {
      type: 'number',
      defaultValue: numberClassHour * durationOfClassHour,
      floatingLabelText: t1('duration(_minutes)'),
      fullWidth: true,
      validate: [required(t1('invoice_type_cannot_be_empty'))],
    },
    break_time: {
      type: 'number',
      fullWidth: true,
      defaultValue: sessionBreakTime,
      floatingLabelText: t1('break_time'),
    },
    scheduled: {
      type: 'section',
      schema: scheduledSchema,
    },
    enable_recording: {
      type: 'checkbox',
      label: t1('enable_recording'),
      normalize: convertBooleanValueToInt,
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props = {}) => {
  const syllabus = props.syllabusObject;
  const sessionIds = lodashGet(values, 'session_ids');
  if (Array.isArray(sessionIds) && sessionIds.length) {
    return [
      {
        id: 'default',
        title: t1("clones_%s_session('s)_by_session('s)_selected", [
          sessionIds.length,
        ]),
        fields: ['session_ids', 'rename_session'],
      },
    ];
  }

  const { practice_credit, theory_credit } = syllabus || {};
  const fields = [
    'count',
    'location',
    'room_types',
    'learn_duration',
    'break_time',
  ];

  if (step === 'new_create') {
    return [
      {
        id: 'default',
        fields: [practice_credit || theory_credit ? 'number_class_hour' : null]
          .concat(fields)
          .filter(Boolean),
      },
    ];
  } else if (step === 'edit') {
    return [
      {
        id: 'default',
        fields: [
          'name',
          'location',
          // 'room_types',
          ...(values.location != ILT_BBB ? ['room_types'] : []),
          'learn_duration',
          'break_time',
          'scheduled',
          ...(values.location == ILT_BBB ? ['enable_recording'] : []),
        ],
      },
    ];
  }
  //
};

const layout = (step, values, xpath, props) => {
  const sessionIds = lodashGet(values, 'session_ids');
  const { node, syllabusObject } = props;
  if (step == 'edit' || (Array.isArray(sessionIds) && sessionIds.length))
    return null;
  else {
    return {
      component: LayoutFreeStyle,
      freestyle: 1,
      optionsProperties: {
        node,
        syllabus: syllabusObject,
      },
    };
  }
};

export default {
  schema,
  ui,
  layout,
};
