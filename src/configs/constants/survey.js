import { t1 } from 'translate/index';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';

export const surveyStatuses = {
  QUEUED: 'queued',
  APPROVED: 'approved',
  DELETED: 'deleted',
};

export const surveyStatusToText = (key) => {
  const map = {
    [surveyStatuses.QUEUED]: t1('queued'),
    [surveyStatuses.APPROVED]: t1('approved'),
    [surveyStatuses.DELETED]: t1('deleted'),
  };
  return map[key];
};

export const surveyStatusOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(surveyStatuses),
    surveyStatusToText,
  );

export const surveyAppliedItemTypes = {
  CREDIT_SYLLABUS: 'credit_syllabus',
  COURSE: 'course',
};

export const surveyAppliedItemTypeToText = (type) => {
  const map = {
    [surveyAppliedItemTypes.CREDIT_SYLLABUS]: t1('credit_syllabus'),
    [surveyAppliedItemTypes.COURSE]: t1('course'),
  };

  return map[type];
};

export const surveyAppliedItemTypeOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(surveyAppliedItemTypes),
    surveyAppliedItemTypeToText,
  );

export const creditSyllabusSurveyAppliedPositions = {
  BEGIN: 'begin',
  END: 'end',
};

export const creditSyllbusSurveyAppliedPositionToText = (position) => {
  const map = {
    [creditSyllabusSurveyAppliedPositions.BEGIN]: t1('before_learning'),
    [creditSyllabusSurveyAppliedPositions.END]: t1('upon_finish'),
  };
  return map[position];
};

export const creditSyllabusSurveyAppliedPositionOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(creditSyllabusSurveyAppliedPositions),
    creditSyllbusSurveyAppliedPositionToText,
  );

export const courseSurveyAppliedPositions = creditSyllabusSurveyAppliedPositions;

export const courseSurveyAppliedPositionToText = creditSyllbusSurveyAppliedPositionToText;

export const courseSurveyAppliedPositionOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(courseSurveyAppliedPositions),
    courseSurveyAppliedPositionToText,
  );

export const surveyTargetTypes = {
  TEACHER: 'teacher',
  APPLIED_ITEM: 'applied_item',
  STUDENT: 'student',
  SEMESTER: 'semester',
};

export const surveyTargetTypeToText = (target) => {
  const map = {
    [surveyTargetTypes.TEACHER]: t1('teacher'),
    [surveyTargetTypes.APPLIED_ITEM]: t1('survey_applied_item'),
    [surveyTargetTypes.STUDENT]: t1('student'),
    [surveyTargetTypes.SEMESTER]: t1('semester'),
  };
  return map[target];
};

export const surveyTargetTypeOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(surveyTargetTypes),
    surveyTargetTypeToText,
  );

export const globalSurveyApplication = {
  BEFORE_ONLINE_COURSE: 'before_online_course',
  AFTER_ONLINE_COURSE: 'after_online_course',
  OFFLINE: 'offline',
};

export const globalSurveyApplicationToText = (value) => {
  return {
    [globalSurveyApplication.BEFORE_ONLINE_COURSE]: t1('before_online_course'),
    [globalSurveyApplication.AFTER_ONLINE_COURSE]: t1('after_online_course'),
    [globalSurveyApplication.OFFLINE]: t1('offline'),
  }[value];
};

export const globalSurveyApplicationOptions = (values) => {
  let options = convertListOfValuesIntoOptionsForFormElement(
    Object.values(globalSurveyApplication),
    globalSurveyApplicationToText,
  );

  // a global survey can be either at the beginning or end of online courses

  if (
    Array.isArray(values) &&
    values.includes(globalSurveyApplication.BEFORE_ONLINE_COURSE)
  ) {
    options = options.map((opt) => {
      if (opt && opt.value === globalSurveyApplication.AFTER_ONLINE_COURSE) {
        return {
          ...opt,
          disabled: true,
        };
      }
      return opt;
    });
  }

  if (
    Array.isArray(values) &&
    values.includes(globalSurveyApplication.AFTER_ONLINE_COURSE)
  ) {
    options = options.map((opt) => {
      if (opt && opt.value === globalSurveyApplication.BEFORE_ONLINE_COURSE) {
        return {
          ...opt,
          disabled: true,
        };
      }
      return opt;
    });
  }

  return options;
};
