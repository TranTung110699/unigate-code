import { createSelector } from 'reselect';
import { getNodeSelector } from 'components/admin/node/utils';
import { itemPathForAdmin } from '../../../node/edit/metadata/utils-configs';

// input selectors
const getNodes = (state) => state.tree;
const getAction = (state) => state.editing.action;
const getEditingItem = (state) => state.editing.item;
const getEditingItemAncestors = (state) => state.editing.itemAncestors;
// const routings = (state) => state.routings;
const bankDialogNtype = (state) => state.editing.bankDialogNtype;
const bankDialogNodeSubtype = (state) => state.editing.bankDialogNodeSubtype;

const getEditingItemSelector = createSelector(
  getNodes,
  getEditingItem,
  getEditingItemAncestors,
  bankDialogNtype,
  bankDialogNodeSubtype,
  getAction,
  getNodeSelector,
  (
    nodes,
    editingItem,
    itemAncestors,
    bankDialogNtype,
    bankDialogNodeSubtype,
    action = '',
    getNode,
  ) => {
    let link = '/admin';
    const parentMapping = {};
    let pIid = null;

    const ancestors = itemAncestors
      ? itemAncestors.map((item) => {
          parentMapping[item.iid] = pIid;
          pIid = item.iid;
          let i = {};
          if (nodes[item.iid]) {
            i = nodes[item.iid];
          } else {
            i = { iid: item.iid, name: '', ntype: item.ntype, type: item.type };
          }
          // TODO: probably .link is not needed. see itemPathForAdmin()
          i.link = `${link}/${item.ntype}/${item.iid}`;
          link = i.link;
          return i;
        })
      : [];

    const node =
      (editingItem &&
        editingItem.iid &&
        getNode(editingItem.iid, parentMapping[editingItem.iid])) ||
      {};

    // console.log({editingItem});
    return {
      node,
      action,
      ancestors,
      bankDialogNtype,
      bankDialogNodeSubtype,
    };
  },
);

export default getEditingItemSelector;
