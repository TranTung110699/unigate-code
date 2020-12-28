import { t1 } from 'translate';
import get from 'lodash.get';
import { required } from 'common/validators';
import endpoints from 'api-endpoints';

const schema = (formid, values, step, xpath, rubricMarkingIid) => {
  const isLeaf = !xpath.includes('children');

  return {
    name: {
      type: 'text',
      classWrapper: isLeaf ? 'flex-item' : 'col-md-4',
      hintText: t1('name'),
      floatingLabelText: t1('content'),
      defaultValue: '',
      validate: [required()],
      fullWidth: true,
    },
    description: {
      type: 'text',
      classWrapper: isLeaf ? 'flex-item' : 'col-md-4',
      hintText: t1('description'),
      floatingLabelText: t1('description'),
      defaultValue: '',
      // validate: [required()],
      fullWidth: true,
    },

    input_submit: {
      type: 'multiCheckbox',
      inline: true,
      classWrapper: isLeaf ? 'flex-item' : 'col-md-4',
      validate: [required()],
      fullWidth: true,
      floatingLabelText: t1('input_to_submit'),
      options: [
        {
          name: t1('text'),
          value: 'text',
          label: t1('text'),
          primaryText: t1('text'),
        },
        {
          name: t1('youtube'),
          value: 'youtube',
          label: t1('youtube'),
          primaryText: t1('youtube'),
        },
        {
          name: t1('file_attachment'),
          value: 'attachment',
          label: t1('file_attachment'),
          primaryText: t1('file_attachment'),
        },
      ],
    },
    rubric_iid_marking: {
      type: 'select',
      multiple: true,
      fullWidth: true,
      options: 'async',
      classWrapper: 'flex-item',
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      floatingLabelText: t1('choose_rubric_marking'),
      paramsasync: {
        __url__: endpoints.bank_search,
        key: `rubric_iid_marking_by_${rubricMarkingIid}`,
        value: {
          get_children_from_parent: 1,
          piid: rubricMarkingIid,
          ptype: 'skill',
          ntype: 'skill',
          subType: 'skill',
          items_per_page: -1,
        },
        transformData: (skillChildren) => {
          if (!Array.isArray(skillChildren) || !skillChildren.length) {
            return [];
          }

          return skillChildren.map((s) => ({
            value: String(get(s, 'iid')),
            primaryText: get(s, 'name'),
          }));
        },
      },
    },
    children: {
      type: 'array',
      classWrapper: 'col-md-12',
      schema: structureAnswer(rubricMarkingIid),
      floatingLabelText: t1('constituent_content'),
    },
  };
};

const ui = (step, values, themeConfig, xpath) => {
  const { input_submit, children } = get(values, xpath, {});
  const isLeaf = !xpath.includes('children');

  const fields = ['name', 'description'];

  if (!Array.isArray(children) || !children.length) {
    fields.push('input_submit');
  }

  if (isLeaf) {
    fields.push('rubric_iid_marking');
  }

  if (
    (!Array.isArray(input_submit) || !input_submit.length) &&
    !window.isDHSP1
  ) {
    fields.push('children');
  }

  return [
    {
      id: 'default',
      wrapperClass: isLeaf ? 'flex-container-wrap' : null,
      fields,
    },
  ];
};

const structureAnswer = (rubricMarkingIid) => ({
  schema: (formid, values, step, xpath) =>
    schema(formid, values, step, xpath, rubricMarkingIid),
  ui,
});

export const structureAnswerDefault = [
  {
    name: t1('objective'),
    input_submit: ['text'],
  },
  {
    name: t1('activities'),
    children: [
      {
        name: t1('plan'),
        input_submit: ['text'],
      },
      {
        name: t1('execution'),
        input_submit: ['attachment'],
      },
    ],
  },
  {
    name: t1('assessment '),
    input_submit: ['text'],
  },
];

export default structureAnswer;
