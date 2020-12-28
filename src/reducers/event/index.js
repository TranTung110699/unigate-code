export default function(state = { viewType: 'month' }, action) {
  switch (action.type) {
    case 'CHANGE_VIEW_TYPE_OF_EVENT': {
      const { viewType } = action;
      return { ...state, viewType };
    }
    default:
      return state;
  }
}
