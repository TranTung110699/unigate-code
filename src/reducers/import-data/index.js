function importData(state = {}, action) {
  switch (action.type) {
    case 'SAVE_IMPORT_DATA_STATUS': {
      const data = action.data || {};
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
}

export default importData;
