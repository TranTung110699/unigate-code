const setDataState = (currentData = {}, newData, searchValues) => {
  const data = Object.assign(currentData, newData);
  const selectedItems =
    newData.selectedItems || currentData.selectedItems || [];
  const checkKey = newData.checkKey || currentData.checkKey || '';
  let result = newData.result || currentData.result;
  if (newData && typeof newData.success !== 'undefined') {
    result = newData.result;
  }
  const selectedList = [];
  selectedItems.forEach((item) => {
    selectedList.push(item[checkKey]);
  });

  if (result && result.length) {
    result.forEach((item) => ({
      ...item,
      selected: selectedList.indexOf(item[checkKey]) !== -1,
    }));
  }

  const resultId = new Date().getTime();
  return { ...data, resultId, result, selectedItems, checkKey, searchValues };
};

function searchResults(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS_FETCHED': {
      const { data, formid, searchValues } = action;
      const currentData = state[formid] || {};
      return {
        ...state,
        [formid]: { ...setDataState(currentData, data, searchValues) },
      };
    }
    case 'CLEAN_SEARCH_RESULTS': {
      const { formid } = action;
      const newState = { ...state };
      delete newState[formid];

      return newState;
    }
    case 'UPDATE_DATA_OF_ROW': {
      const { formid, dataId, data } = action;
      const newState = { ...state };
      const searchData = newState[formid];
      let result = [];
      let dataUpdated = false;
      if (searchData) {
        const tableData = searchData.result || [];
        tableData.map((row) => {
          if (row.id === dataId) {
            result.push(data);
            dataUpdated = true;
          } else {
            result.push(row);
          }
        });
      }
      if (!dataUpdated) {
        result = [data, ...result];
      }

      return { ...newState, [formid]: { ...searchData, result } };
    }
    case 'DELETE_DATA_OF_ROW': {
      const { formid, id } = action;
      const newState = { ...state };
      const searchData = newState[formid];
      let result = [];
      if (searchData) {
        const dataResult = searchData.result || [];
        dataResult.map((row) => {
          if (row.id != id) {
            result.push(row);
          }
        });
        return { ...newState, [formid]: { ...searchData, result } };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}

export default searchResults;
