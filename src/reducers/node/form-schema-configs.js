/**
 * Created by hungvo on 18/04/2017.
 */
function formSchemaConfigs(state = {}, action) {
  switch (action.type) {
    case 'SET_FORM_SCHEMA_CONFIGS': {
      const { data, fieldName, formid } = action;
      const formConfig =
        !data && !fieldName ? {} : Object.assign({}, state[formid]);
      formConfig[fieldName] = data;

      return { ...state, [formid]: formConfig };
    }
    default: {
      return state;
    }
  }
}

export default formSchemaConfigs;
