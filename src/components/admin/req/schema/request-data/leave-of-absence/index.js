import { t1 } from 'translate';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import { timestampToDateString } from 'common/utils/Date';

export default (values) => ({
  type: 'section',
  classWrapper: 'row',
  schema: {
    schema: {
      course_iid: {
        type: 'select',
        options: 'async',
        floatingLabelText: t1('choose_course'),
        fullWidth: true,
        populateValue: true,
        styleWrapper: { marginLeft: 16, marginRight: 16 },
        paramsasync: {
          __url__: 'course/api/get-current-course-leaning-of-user',
          transformData: (data) => {
            if (!Array.isArray(data) || !data.length) {
              return [];
            }

            return data.map((row) => {
              const label = get(row, 'name');

              return {
                value: row.iid,
                label,
                primaryText: label,
              };
            });
          },
        },
      },
      session_iid: {
        type: 'select',
        options: 'async',
        floatingLabelText: t1('choose_session'),
        fullWidth: true,
        populateValue: true,
        styleWrapper: { marginLeft: 16, marginRight: 16 },
        paramsasync: {
          key: `course-iid-${get(
            values,
            'request_data.leave_of_absence.course_iid',
            0,
          )}`,
          __url__: `${apiUrls.sessions_search}?perm=student&from=${parseInt(
            new Date().getTime() / 1000,
          )}&ciid=${get(
            values,
            'request_data.leave_of_absence.course_iid',
            0,
          )}`,
          transformData: (data) => {
            if (!Array.isArray(data) || !data.length) {
              return [];
            }

            return data.map((row) => {
              const teacher = get(row, 'teachers[0].name');

              const label = ` ${timestampToDateString(
                get(row, 'scheduled.date_time'),
              )} ${get(row, 'course.name')} (${get(row, 'name')}) - ${
                teacher ? teacher : ''
              }`;

              return {
                value: row.iid,
                label,
                primaryText: label,
              };
            });
          },
        },
      },
    },
    ui: (step, values) => {
      return [
        {
          id: 'leave_of_absence',
          fields:
            get(values, 'request_data.leave_of_absence.course_iid', 0) > 0
              ? ['course_iid', 'session_iid']
              : ['course_iid'],
        },
      ];
    },
  },
});
