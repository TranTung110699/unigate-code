import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { UiLibs } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import { timestampToDateString } from 'common/utils/Date';
import DateTimePicker from 'schema-form/elements/date-time-picker';

export default (values) => {
  const userIid = get(values, 'request_data.leave_of_absence_by_date.user_iid');
  const startTime = get(values, 'start_time');
  const endTime = get(values, 'end_time');
  const defaultDate = Math.round(new Date().getTime() / 1000);

  return {
    type: 'section',
    classWrapper: 'row',
    schema: {
      schema: {
        iid: {
          type: 'number',
          classWrapper: 'display-none',
        },
        for_multiple_days: {
          type: 'checkbox',
          classWrapper: 'col-md-12',
          label: t1('for_multiple_days'),
        },
        start_time: {
          type: DateTimePicker,
          uiLib: UiLibs.ANT,
          minDate: new Date(),
          defaultValue: defaultDate,
          classWrapper: 'col-md-6',
          validate: [
            dateLessThan(
              values.end_date,
              t1('start_time_must_be_before_end_date'),
            ),
            required(t1('start_time_cannot_be_empty')),
          ],
          floatingLabelText: t1('start_time_requested'),
          fullWidth: true,
        },
        end_time: {
          type: DateTimePicker,
          uiLib: UiLibs.ANT,
          defaultValue: defaultDate,
          classWrapper: 'col-md-6',
          minDate: new Date(),
          floatingLabelText: t1('end_time_requested'),
          validate: [
            dateGreaterThan(
              values.start_date,
              t1('end_time_must_be_after_start_time'),
            ),
            required(t1('end_time_cannot_be_empty')),
          ],
          fullWidth: true,
        },
        session_iids: {
          type: 'select',
          options: 'async',
          classWrapper: 'col-md-12',
          floatingLabelText: t1('choose_sessions'),
          fullWidth: true,
          multiple: true,
          populateValue: true,
          paramsasync: {
            key: `user-iid-${userIid}`,
            __url__: `${
              apiUrls.sessions_search
            }?perm=student&user_iid=${userIid}${startTime &&
              `&from=${startTime}`}${endTime && `&to=${endTime}`}`,
            transformData: (data) => {
              if (!Array.isArray(data) || !data.length) {
                return [];
              }

              return data.map((row) => {
                const teacher = get(row, 'teachers[0].name');

                const label = ` ${timestampToDateString(
                  get(row, 'scheduled.date_time'),
                )} ${get(row, 'course.name')} (${get(row, 'name')}) ${
                  teacher ? ' - ' + teacher : ''
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
        absence_reason: {
          type: 'select',
          classWrapper: 'col-md-12',
          floatingLabelText: t1('choose_absence_reasons'),
          floatingLabelFixed: true,
          options: 'async',
          paramsasync: {
            __url__: '/req/api/get-absence-reasons',
            transformData: (data) => {
              if (!Array.isArray(data) || !data.length) {
                return [];
              }
              return data.map((val) => ({
                value: val.id,
                label: t1(val.name),
                primaryText: t1(val.name),
              }));
            },
          },
          fullWidth: true,
        },
      },
      ui: (step, values) => {
        return [
          {
            id: 'leave-of-absence-by-date',
            fields: [
              'iid',
              'for_multiple_days',
              'start_time',
              'end_time',
              ...(get(
                values,
                'request_data.leave_of_absence_by_date.for_multiple_days',
              ) === 1
                ? []
                : ['session_iids']),
              'absence_reason',
            ],
          },
        ];
      },
    },
  };
};
