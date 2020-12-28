/**
 * Created by quandv on 18/08/17.
 */
import Store from 'store';

const getTranslationsFromStore = () => Store && Store.getState().translations;

// export const translationsLocalStorage = (field, getStore = false) => {
//   let translations = Store.getState().translations;
//
//   if (field) {
//     return translations['messages'][field];
//   }
//
//   return translations;
// };

export const translationsLocalStorage = (field, getStore = false) => {
  let data;
  if (getStore) {
    data = getTranslationsFromStore();
  }
  if (!data && !localStorage.getItem('reduxPersist:translations')) {
    return null;
  }

  if (!data || (field && !data[field]) || (!field && data.messages)) {
    data = JSON.parse(localStorage.getItem('reduxPersist:translations')) || {
      messages: {},
    };
  }
  if (field) {
    return data[field];
  }

  return data;
};

export const formatDataDrawTableRender = (item, index = 0) => {
  let result = [];
  if (!item) {
    return result;
  }
  if (Array.isArray(item)) {
    item.forEach((row) => {
      result = result.concat(formatDataDrawTableRender(row));
    });
    return result;
  }
  if (item.node && item.dataNode && item.dataNode.length) {
    item.dataNode.forEach((node) => {
      const tmp = formatDataDrawTableRender(node, index + 1);
      result = result.concat(tmp);
    });
    if (result.length) {
      const newNode = result[0];
      const rowSpan = newNode.rowSpan || {};
      rowSpan[index] = result.length;
      const colData = newNode.colData || {};
      colData[index] = item.node;
      result[0] = { ...result[0], rowSpan, colData };
    }
  } else {
    result.push(item);
  }
  return result;
};
