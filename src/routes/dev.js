import Doc from 'dev/Doc';
import Todo from 'dev/Todo';
import DevEditable from 'dev/Editable';
import Bank from 'dev/Bank';
import HelloworldApp from 'dev/helloworld/App';
import Sortable from 'dev/sortable';
import Form from 'dev/form';
import MultipleChoice from 'dev/MultipleChoice';
import PropTypesExample from 'dev/PropTypesExample';
import HiddenField from 'dev/HiddenField';
import AvatarEditor from 'components/common/utils/AvatarEditor';
import InputAutoComplete from 'dev/InputAutoComplete';
import DateTimePicker from 'dev/DateTimePicker';
import Snack from 'dev/Snack';
import Chat from 'dev/Chat';
import SchemaForm from 'dev/DevSchemaForm';
import MailDebug from 'dev/MailDebug';
import SkillReport from 'dev/SkillReport';

import Windowing from 'dev/Windowing';

const DevRouter = (adminRootUrl) => {
  const configs = [
    // {
    //   componentId: 'btc',
    //   path: '/btc',
    //   component: Btc,
    //   title: 'btc',
    // },
    {
      componentId: 'mail_debug',
      path: '/mail_debug',
      component: MailDebug,
      title: 'Debug Mail',
    },
    {
      componentId: 'windowing',
      path: '/windowing',
      component: Windowing,
      title: 'windowing',
    },
    {
      componentId: 'schema',
      path: '/schema',
      component: SchemaForm,
      title: 'schema form',
    },
    {
      componentId: 'chat',
      path: '/chat',
      component: Chat,
      title: 'chat',
    },
    {
      componentId: 'FormComponent',
      path: '/form',
      component: Form,
      title: 'form',
    },
    {
      componentId: 'DevEditableComponent',
      path: '/editable',
      component: DevEditable,
      title: 'Editable',
    },
    {
      componentId: 'DocComponent',
      path: '/doc',
      component: Doc,
      title: 'Documentation',
    },
    {
      componentId: 'TodoComponent',
      path: '/todo',
      component: Todo,
      title: 'Todos',
    },
    {
      componentId: 'BankComponent',
      path: '/bank',
      component: Bank,
      title: 'Bank',
    },
    {
      componentId: 'HelloworldAppComponent',
      path: '/unit-test',
      component: HelloworldApp,
      title: 'jest',
    },
    {
      componentId: 'SortableComponent',
      path: '/sortable',
      component: Sortable,
      title: 'Sortable',
    },
    {
      componentId: 'MultipleChoiceComponent',
      path: '/multiple-choice',
      component: MultipleChoice,
      title: 'Multiple Choice',
    },
    {
      componentId: 'PropTypesExampleComponent',
      path: '/prop-types',
      component: PropTypesExample,
      title: 'E.g. Custom PropTypes',
    },
    {
      componentId: 'HiddenFieldsInSchemaForm',
      path: '/hidden-fields',
      component: HiddenField,
      title: 'Hidden Field',
    },
    {
      componentId: 'avatar-editor',
      path: '/avatar-editor',
      component: AvatarEditor,
      title: 'AvatarEditor',
    },
    {
      componentId: 'inputAutoComplete',
      path: '/input-auto-complete',
      component: InputAutoComplete,
      title: 'Input Auto Complete',
    },

    {
      componentId: 'dateTimePicker',
      path: '/date-time-picker',
      component: DateTimePicker,
      title: 'DateTimePicker',
    },
    {
      componentId: 'snack',
      path: '/snack',
      component: Snack,
      title: 'snack',
    },
    {
      componentId: 'skill-report',
      path: '/skill-report',
      component: SkillReport,
      title: 'Skill Report',
    },
  ];

  return configs.map((e) => {
    e.path = `${adminRootUrl}${e.path}`;
    return e;
  });
};

export default DevRouter;
