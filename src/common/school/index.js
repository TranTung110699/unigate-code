import lodashGet from 'lodash.get';

export const hasRemindFinishCourseSettings = (domainInfo) => {
  return lodashGet(domainInfo, 'school.course_deadline_reminder_settings');
};
