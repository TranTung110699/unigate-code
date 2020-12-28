export const setMaximumDepth = (depth) => ({
  type: 'EDIT_METADATA_SET_MAX_DEPTH',
  depth,
});

export const increaseMaximumDepth = () => ({
  type: 'EDIT_METADATA_INCREASE_MAX_DEPTH',
});

export const decreaseMaximumDepth = () => ({
  type: 'EDIT_METADATA_DECREASE_MAX_DEPTH',
});

export const addNtype = (ntype) => ({
  type: 'EDIT_METADATA_FILTER_ADD_NTYPE',
  ntype,
});

export const setListItemRender = (itemIid, reset = false) => ({
  type: 'EDIT_LIST_ITEM_IID_RENDERER',
  itemIid,
  reset,
});

export const removeNtype = (ntype) => ({
  type: 'EDIT_METADATA_FILTER_REMOVE_NTYPE',
  ntype,
});

export const setAvailableNtypeFilters = (availableNtypeFilters) => ({
  type: 'EDIT_METADATA_AVAILABLE_NTYPE_FILTERS',
  availableNtypeFilters, // array
});

export const setMetadataFilters = (metadataFilters) => ({
  type: 'EDIT_METADATA_SET_FILTER',
  metadataFilters, // object of { key: true|false }
});

export const setVisualTreeDepth = (depth, force, iid) => ({
  type: 'EDIT_METADATA_SET_VISUAL_TREE_DEPTH',
  depth,
  force,
  iid,
});
