import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = () => {
  return {
    name: {
      type: 'text',
      floatingLabelText: t1('iid,_name_or_code'),
      fullWidth: true,
      label: t1('name'),
      hintText: t1('enter_iid,_name_or_code'),
    },
    status: {
      type: 'select',
      multiple: true,
      name: 'status',
      floatingLabelText: t1('status'),
      options: constants.SkillStatusOptions(),
      inline: true,
      defaultValue: ['queued', 'approved'],
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['name', 'status'],
    },
  ];
};

const layout = { component: SearchFormLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
