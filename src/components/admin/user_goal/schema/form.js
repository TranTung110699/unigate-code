import { t1 } from 'translate';
import { required } from 'common/validators';
import apiUrls from 'api-endpoints';
import CommonSelection from 'components/common/elements/common-selection';
import TreeSelect from 'schema-form/elements/tree-select';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const goalTypes = {
  JOB_POSITION_GOAL: 'job_position_goal',
  CUSTOM_GOAL: 'custom_goal',
};

const fromGoalTypeToText = (type) => {
  switch (type) {
    case goalTypes.JOB_POSITION_GOAL: {
      return t1('job_position_goal');
    }
    case goalTypes.CUSTOM_GOAL: {
      return t1('custom_goal');
    }
    default: {
      return '';
    }
  }
};

const goalTypeOptions = Object.values(goalTypes).map((type) => ({
  value: type,
  primaryText: fromGoalTypeToText(type),
}));

const getGoalIidElementSchema = (formid, values) => {
  switch (values.goal_type) {
    case goalTypes.JOB_POSITION_GOAL: {
      return {
        type: TreeSelect,
        nameElement: 'positions',
        componentElementEditor: CommonSelection,
        optionsProperties: {
          style: {
            maxHeight: '135px',
            overflowY: 'auto',
          },
        },
        fullWidth: true,
        floatingLabelText: t1('positions'),
        hintText: t1('positions'),
        params: {
          user_iid: values.user_iid,
        },
        baseUrl:
          apiUrls.search_job_position_that_user_can_use_to_create_user_goal,
        noFetchDataResultText: `${t1(
          'there_are_no_job_selectable_job_position',
        )}. ${t1(
          'either_there_are_no_job_positions_or_all_of_them_have_been_selected',
        )}`,
        keyState: `${formid}_job_position_iid`,
        mapResultToTreeData: {
          key: 'iid',
          title: 'name',
          value: 'goal',
        },
        mapTreeDataToText: 'title',
        validate: [required(t1('position_cannot_be_empty'))],
      };
    }
    case goalTypes.CUSTOM_GOAL: {
      return {
        nameElement: 'goal_iid',
        type: InputAutoComplete,
        baseUrl: apiUrls.search_custom_goals_to_assign_to_user,
        params: {
          user_iid: values.user_iid,
        },
        floatingLabelText: t1('choose_goal'),
        fullWidth: true,
        dataSourceConfig: {
          text: 'name',
          value: 'iid',
        },
        validate: [required(t1('goal_cannot_be_empty'))],
        limit: 1,
      };
    }
    default: {
      return null;
    }
  }
};

const schema = (formid, values) => ({
  goal_type: {
    type: 'select',
    options: goalTypeOptions,
    floatingLabelText: t1('goal_type'),
    defaultValue: goalTypes.JOB_POSITION_GOAL,
    fullWidth: true,
  },
  goal_iid: getGoalIidElementSchema(formid, values),
  zm_iid: {
    type: 'select',
    floatingLabelText: t1('zm'),
    options: 'async',
    fullWidth: true,
    inline: true,
    paramsasync: {
      key: `${formid}-${values.goal_iid}`,
      valueKey: 'iid',
      value: {
        goal_iid: values.goal_iid,
      },
    },
    validate: [required(t1('zm_cannot_be_empty'))],
  },
  name: {
    type: 'text',
    hintText: t1('name_of_zm'),
    floatingLabelText: t1('name'),
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  deadline: {
    type: DatePicker,
    floatingLabelText: t1('deadline'),
  },
});

const ui = (step) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: ['goal_type', 'goal_iid', 'zm_iid', 'deadline'],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode) => {
  let newData = fullData;
  if (mode === 'new') {
    if (Array.isArray(newData.goal_iid) && newData.goal_iid.length === 1) {
      newData = {
        ...newData,
        goal_iid: newData.goal_iid[0],
      };
    }
  }
  return newData;
};

export default { schema, ui, layout, finalProcessBeforeSubmit };
