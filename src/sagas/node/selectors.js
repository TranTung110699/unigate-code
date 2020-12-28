// select() for saga
// http://stackoverflow.com/questions/37772877/how-to-get-something-from-the-state-store-inside-a-redux-saga-function
// https://github.com/redux-saga/redux-saga/tree/master/docs/api#selectselector-args
const getEditingItem = (state) => {
  const iid =
    state.editing.editingItemIid ||
    (state.editing.item && state.editing.item.iid);
  return state.tree[iid];
};

export default getEditingItem;
