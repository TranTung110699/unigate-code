import { createSelector } from 'reselect';
import { isNodeFreeze } from 'components/admin/node/utils';

// input selectors
const getNodes = (state) => state.tree;
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
  (
    nodes,
    editingItem,
    itemAncestors,
    bankDialogNtype,
    bankDialogNodeSubtype,
  ) => {
    let node = {};
    node =
      nodes && editingItem && nodes[editingItem.iid]
        ? nodes[editingItem.iid]
        : {};

    if (node.metadata) {
      node.metadata = node.metadata.map((item) => {
        const iid = item.iid;
        if (nodes[iid]) {
          const tmp = Object.assign({}, nodes[iid], item);
          // item's name always overrides metadata's name
          tmp.name = nodes[iid].name;
          // other fields like 'duration', 'percent' follow metadata
          return tmp;
        }
        return item;
      });
    }

    let link = '/admin';

    const ancestors = itemAncestors
      ? itemAncestors.map((item) => {
          let i = {};
          if (nodes[item.iid]) {
            i = nodes[item.iid];
          } else {
            i = { iid: item.iid, name: 'xxx', ntype: item.ntype };
          }
          i.link = `${link}/${item.ntype}/${item.iid}`;
          link = i.link;
          return i;
        })
      : [];

    return {
      node,
      ancestors,
      bankDialogNtype,
      bankDialogNodeSubtype,
      location: window.location,
    };
  },
);

export const isEditingItemFreeze = createSelector(
  getEditingItem,
  getNodes,
  (item, nodes) => {
    if (item && item.iid) {
      const fullItem = nodes[item.iid];
      return isNodeFreeze(fullItem);
    }
    return false;
  },
);

export default getEditingItemSelector;
