import { t1 } from 'translate';
// import delivery_methods from 'components/admin/invite/schema/elements/delivery_methods';
import groupApiUrls from 'components/admin/group/endpoints';
import get from 'lodash.get';
import { categoryRelationTypes } from 'configs/constants';

const schema = (formid, values) => {
  // console.log({values});
  return {
    items: {
      // list of current learning items of the groups
      type: 'multiCheckbox',
      options: 'async',
      paramsasync: {
        __url__: groupApiUrls.invited_items_of_group_search,
        valueKey: 'iid',
        params: {
          iid: values.sid,
          async_field: 1,
        },
      },
      primaryText: t1('items_that_are_assigned_to_group._tick_to_invite_them'),
    },
    compulsory: {
      type: 'checkbox',
      label: t1('users_must_learn_the_above_courses'),
      floatingLabelText: t1('users_must_learn_the_above_courses'),
    },
    // delivery_methods,
  };
};

const ui = (step, values, themeConfig, xpath) => {
  const items = get(values, `${xpath}.items`);

  let subTitle =
    values.mode === 'add'
      ? t1("also_enrol_users_to_group's_attached_courses")
      : t1("also_remove_users_from_current_group's_attached_courses");

  if (
    values &&
    values.type &&
    [
      categoryRelationTypes.FINISHING_SENIOR,
      categoryRelationTypes.GRADUATING_SENIOR,
    ].includes(values.type)
  ) {
    subTitle = '';
  }

  const invite = {
    subTitle,
    id: 'invitation-list',
    fields: ['items'],
  };

  const compulsory = {
    title: t1('compulsory_settings'),
    id: 'compulsory-group',
    fields: ['compulsory'],
  };

  // const delivery = {
  //   id: 'xxx',
  //   fields: ['delivery_methods'],
  // };

  return [
    invite,
    ...(items && items.length ? [compulsory] : []),
    // delivery,
  ];
};

export default { schema, ui };
