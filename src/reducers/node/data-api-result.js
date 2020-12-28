function dataApiResults(state = {}, action) {
  switch (action.type) {
    case 'DATA_API_RESULT': {
      // support key === 'xx' or 'xx[0]'
      const { data, keyState } = action;
      if (
        keyState &&
        keyState.indexOf('[') !== -1 &&
        keyState.indexOf(']') !== -1
      ) {
        const tmp = keyState.replace(']', '').split('[');
        const theKey = tmp[0];
        const theIndex = tmp[1];

        const currentData = state[theKey] || [];
        currentData[theIndex] = data;

        return { ...state, [theKey]: currentData.slice(0) };
      }

      return { ...state, [keyState]: data };
    }
    default: {
      return state;
    }
  }
}

export default dataApiResults;
