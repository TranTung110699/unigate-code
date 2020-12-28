import { constants, UiLibs, userMajorStatus } from 'configs/constants';
import get from 'lodash.get';
import { t1 } from 'translate';
import { required } from 'common/validators';
import DatePicker from 'schema-form/elements/date-picker';
import RTE from 'schema-form/elements/richtext';

export const getUserMajorStatusToChangeCurrentStatus = (curentStatus) => {
  switch (curentStatus) {
    case userMajorStatus.APPLIED: {
      return [
        userMajorStatus.APPLIED,
        userMajorStatus.QUALIFIED,
        userMajorStatus.STATUS_REJECTED,
        userMajorStatus.CANCEL,
      ];
    }
    case userMajorStatus.QUALIFIED: {
      return [
        userMajorStatus.STUDYING,
        userMajorStatus.QUALIFIED,
        userMajorStatus.CANCEL,
      ];
    }
    case userMajorStatus.STUDYING: {
      return [
        userMajorStatus.STUDYING,
        userMajorStatus.ON_LEAVE,
        userMajorStatus.CANCEL,
        userMajorStatus.SUSPENSION,
        userMajorStatus.FAILED,
        userMajorStatus.DROP_OUT,
        userMajorStatus.EXPULSION,
        userMajorStatus.PASSED,
      ];
    }
    case userMajorStatus.PASSED: {
      return [userMajorStatus.PASSED, userMajorStatus.CERTIFIED];
    }
    case userMajorStatus.ON_LEAVE: {
      return [
        userMajorStatus.STUDYING,
        userMajorStatus.ON_LEAVE,
        userMajorStatus.DROP_OUT,
      ];
    }
    case userMajorStatus.SUSPENSION: {
      return [
        userMajorStatus.STUDYING,
        userMajorStatus.SUSPENSION,
        userMajorStatus.DROP_OUT,
      ];
    }
    case userMajorStatus.CANCEL:
    case userMajorStatus.DROP_OUT: {
      return [curentStatus, userMajorStatus.STUDYING];
    }
    case userMajorStatus.FAILED:
    case userMajorStatus.CERTIFIED:
    case userMajorStatus.STATUS_REJECTED:
    case userMajorStatus.EXPULSION: {
      return [];
    }
    default:
      return Object.values(userMajorStatus);
  }
};

const schema = (formid, values, step, xpath, props) => {
  const availableStatuses = getUserMajorStatusToChangeCurrentStatus(
    props.currentStatus,
  );
  return {
    status: {
      type: 'select',
      classWrapper: 'col-md-12',
      options: availableStatuses.map((status) => ({
        value: status,
        label: t1(status),
        primaryText: t1(status),
      })),
      fullWidth: true,
    },
    status_note: {
      type: 'section',
      schema: {
        schema: () => ({
          start_date: {
            type: DatePicker,
            uiLib: UiLibs.ANT,
            floatingLabelText: t1('start_date'),
            fullWidth: true,
            getStartDate: true,
            validate: [
              userMajorStatus.ON_LEAVE,
              userMajorStatus.SUSPENSION,
            ].includes(values.status)
              ? [required(t1('end_date_cannot_be_empty'))]
              : [],
          },
          end_date: {
            type: DatePicker,
            uiLib: UiLibs.ANT,
            floatingLabelText: t1('end_date'),
            getEndDate: true,
            fullWidth: true,
            validate: [
              userMajorStatus.ON_LEAVE,
              userMajorStatus.SUSPENSION,
            ].includes(values.status)
              ? [required(t1('end_date_cannot_be_empty'))]
              : [],
          },
          note: {
            type: RTE,
            floatingLabelText: t1('note'),
            multiple: true,
            fullWidth: true,
          },
        }),
        ui: () => [
          {
            id: 'default',
            fields: [
              userMajorStatus.ON_LEAVE,
              userMajorStatus.SUSPENSION,
            ].includes(values.status)
              ? ['start_date', 'end_date', 'note']
              : ['start_date', 'note'],
          },
        ],
      },
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: ['status', 'status_note'],
  },
];

export const editInformationAfterGraduationSchema = {
  schema: (formid, values) => {
    return {
      after_graduation: {
        type: 'array',
        addButtonLabel: t1('over_period_time_new'),
        schema: {
          schema: () => {
            return {
              start_date: {
                classWrapper: 'col-md-6',
                type: DatePicker,
                uiLib: UiLibs.ANT,
                getStartDate: true,
                floatingLabelText: t1('start_date'),
                fullWidth: true,
              },
              end_date: {
                classWrapper: 'col-md-6',
                type: DatePicker,
                uiLib: UiLibs.ANT,
                getEndDate: true,
                floatingLabelText: t1('end_date'),
                fullWidth: true,
              },
              status: {
                type: 'radio',
                classWrapper: 'col-md-12',
                options: [
                  { value: 'unemployment', label: t1('unemployment') },
                  { value: 'professional', label: t1('professional') },
                  { value: 'amateur', label: t1('amateur') },
                ],
                inline: true,
                defaultValue: 'unemployment',
                floatingLabelText: t1('status'),
                fullWidth: true,
              },
              work_unit: {
                type: 'text',
                classWrapper: 'col-md-6',
                floatingLabelText: t1('work_unit'),
                floatingLabelFixed: false,
                fullWidth: true,
              },
              caree_block: {
                type: 'text',
                classWrapper: 'col-md-6',
                floatingLabelText: t1('caree_block'),
                floatingLabelFixed: false,
                fullWidth: true,
              },
              income: {
                type: 'number',
                classWrapper: 'col-md-8',
                floatingLabelText: t1('income'),
                floatingLabelFixed: false,
                fullWidth: true,
                errorText: '',
              },
              currency: {
                type: 'select',
                fullWidth: true,
                classWrapper: 'col-md-4',
                floatingLabelText: t1('currency'),
                floatingLabelFixed: true,
                options: constants.feeCurrencies,
                defaultValue: get(constants, 'feeCurrencies.[0].value'),
                validate: required('currency_cannot_be_empty'),
              },
              note: {
                type: RTE,
                floatingLabelText: t1('note'),
                multiple: true,
                fullWidth: true,
              },
            };
          },
          ui: (step, values, themeConfig, xpath) => {
            let fields = ['start_date', 'end_date', 'status'];

            if (get(values, `${xpath}.status`) !== 'unemployment') {
              fields = fields.concat([
                'work_unit',
                'caree_block',
                'income',
                'currency',
              ]);
            }

            fields.push('note');

            return [
              {
                id: 'default',
                fields,
              },
            ];
          },
        },
      },
    };
  },
  ui: () => [
    {
      id: 'id',
      fields: ['after_graduation'],
    },
  ],
};

export default {
  schema,
  ui,
};
