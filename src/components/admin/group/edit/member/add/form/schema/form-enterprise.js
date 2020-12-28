import delivery_methods from 'components/admin/invite/schema/elements/delivery_methods';
import { isEnrolmentPlanGroup } from 'components/admin/node/utils';
import allUserRts from 'configs/constants/group-members-relationship-types';
import { t1 } from 'translate';
import invitation from './invitation';

const schema = () => ({
  invitation_to_group_items: {
    type: 'section',
    schema: invitation,
  },
  sendMail: delivery_methods,
  reason: {
    type: 'text',
    multiLine: true,
    floatingLabelText: t1('reason'),
    rows: 2,
    floatingLabelFixed: false,
    fullWidth: true,
    maxLength: 200,
  },
});

const ui = (step, values) => {
  if (isEnrolmentPlanGroup(values.group)) {
    if (values.rt === allUserRts.USER_RT_REJECTED) {
      return [
        {
          fields: ['reason'],
          id: 'default',
        },
      ];
    }
    return [];
  }

  return [
    {
      fields: [],
      id: 'inv',
    },
    // {
    //   title: t1('notify_users_about_group_membership'),
    //   fields: ['sendMail'],
    //   id: 'sendssssMail',
    // },
  ];
};

export default { schema, ui };
