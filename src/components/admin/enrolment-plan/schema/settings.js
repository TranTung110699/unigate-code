import { t1 } from 'translate';
import { isSmartGroupEnrolmentPlan } from 'components/admin/node/utils';

const schema = () => {
  return {
    need_to_invite_all_members_to_all_credit_syllabuses: {
      type: 'checkbox',
      label: t1(
        'all_members_must_learn_all_credit_syllabuses_in_the_enrolment_plan_materials',
      ),
    },
    compulsory: {
      type: 'checkbox',
      label: t1(
        'compulsory_(tick_if_invited_users_must_learn_the_credit_syllabuses_in_enrolment_plan)',
      ),
      hintText: t1(
        'compulsory_(tick_if_invited_users_must_learn_the_credit_syllabuses_in_enrolment_plan)',
      ),
      errorText: '',
    },
    stop_settings: {
      type: 'cascade',
      schema: {
        schema: () => ({
          when_user_leave_smart_group: {
            type: 'section',
            schema: {
              schema: () => ({
                remove_from_enrolment_plan: {
                  type: 'checkbox',
                  label: t1('remove_from_enrolment_plan'),
                  hintText: t1('remove_from_enrolment_plan'),
                  errorText: '',
                },
              }),
              ui: () => [
                { id: 'default', fields: ['remove_from_enrolment_plan'] },
              ],
            },
          },
          when_user_leave_enrolment_plan: {
            type: 'section',
            schema: {
              schema: () => ({
                remove_from_courses: {
                  type: 'checkbox',
                  label: t1('remove_from_courses'),
                  hintText: t1('remove_from_courses'),
                  errorText: '',
                },
              }),
              ui: () => [
                {
                  id: 'default',
                  fields: ['remove_from_courses'],
                },
              ],
            },
          },
          when_stopped: {
            type: 'section',
            schema: {
              schema: () => ({
                remove_users_from_courses: {
                  type: 'checkbox',
                  label: t1('remove_users_from_courses'),
                  hintText: t1('remove_users_from_courses'),
                  errorText: '',
                },
              }),
              ui: () => [
                {
                  id: 'default',
                  fields: ['remove_users_from_courses'],
                },
              ],
            },
          },
        }),
        ui: (values) => [
          ...(isSmartGroupEnrolmentPlan(values)
            ? [
                {
                  id: 'when_user_leave_smart_group',
                  subTitle: t1('when_user_leave_smart_group'),
                  fields: ['when_user_leave_smart_group'],
                },
              ]
            : []),
          {
            id: 'when_user_leave_enrolment_plan',
            subTitle: t1('when_user_leave_enrolment_plan'),
            fields: ['when_user_leave_enrolment_plan'],
          },
          {
            id: 'when_stopped',
            subTitle: t1('when_enrolment_plan_stopped'),
            fields: ['when_stopped'],
          },
        ],
      },
    },
  };
};

const ui = (step, values, themeConfig, xpath) => [
  {
    id: 'id',
    title: t1('basic_settings'),
    fields: ['need_to_invite_all_members_to_all_credit_syllabuses'],
  },
  {
    id: 'stop_settings',
    title: t1('enrolment_plan_stop_settings'),
    subTitle: t1(
      'settings_related_to_when_an_enrolment_plan_stops_or_a_user_is_removed_from_the_enrolment_plan',
    ),
    fields: ['stop_settings'],
  },
];

export default { schema, ui };
