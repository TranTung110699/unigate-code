import { t1 } from 'translate';

export const inviteTargetTypes = {
  USER: 'user',
  USER_GROUP: 'user_group',
  GROUP: 'group',
};

export const inviteDeliveryMethods = {
  EMAIL: 'email',
  SMS: 'sms',
};

export const inviteDeliveryMethodsOptions = [
  {
    name: 'email',
    value: inviteDeliveryMethods.EMAIL,
    label: t1('email'),
  },
  {
    name: 'sms',
    value: inviteDeliveryMethods.SMS,
    label: t1('sms'),
  },
];
