import filter from 'utils/json-schema-filter';
import { treeNodeSchema } from 'components/admin/node/schema/tree';
import { treeVocabSchema } from 'components/admin/node/schema/vocab';
import { normalize } from 'normalizr';
import { apiNodeSchema } from 'store/schema';
import lodashGet from 'lodash.get';
import { ntype as ntypes } from 'configs/constants';

const fieldToGetFromParentMetadataByNtype = {
  [ntypes.EXERCISE]: ['options'],
};

const getDataFromParentMetadata = (state, data) => {
  const iid = data.iid;
  const dataFromState = lodashGet(state, iid);
  let dataWithMoreInfo = data;

  if (Object.keys(fieldToGetFromParentMetadataByNtype).includes(data.ntype)) {
    fieldToGetFromParentMetadataByNtype[data.ntype].forEach((field) => {
      const pid = lodashGet(data, 'pid') || lodashGet(dataFromState, 'pid');
      const dataFromParentMetadata = (
        lodashGet(state, [pid, 'metadata']) || []
      ).find((child) => lodashGet(child, 'iid') == iid);
      const fieldValue = lodashGet(dataFromParentMetadata, field);

      if (typeof fieldValue !== 'undefined') {
        dataWithMoreInfo = Object.assign({}, dataWithMoreInfo, {
          [field]: fieldValue,
        });
      }
    });
  }

  return dataWithMoreInfo;
};

const getStateAfterUpsertNode = (state, data, mode, notHaveMetadata) => {
  let filteredData = Object.assign({}, data);

  // TODO: find a better way to distinguish if a node have full data (is not meta data cached in its parent document)
  let isMetadata = typeof data.depth === 'undefined';
  isMetadata = !!(isMetadata || mode === 'search');

  if (notHaveMetadata) {
    isMetadata = false;
  }
  if (filteredData.ntype === 'vocab') {
    filteredData = filter(treeVocabSchema, filteredData);
  } else {
    filteredData = filter(treeNodeSchema, filteredData);
  }
  filteredData.isMetadata = isMetadata;

  const iid = filteredData.iid;
  const dataFromState = lodashGet(state, iid);

  if (dataFromState && !mode) {
    filteredData = Object.assign({}, dataFromState, filteredData);
  }

  // unset those in data.__unset , which are set in PHP side in genericUpdate
  if (data.__unset && data.__unset.length) {
    // console.log({filteredData});
    data.__unset.forEach((k) => {
      // console.log(k);
      delete filteredData[k];
    });
    // console.log({'afterUnset': filteredData});
  }

  filteredData = getDataFromParentMetadata(state, filteredData);

  const update = { [iid]: filteredData };
  // TODO: you need to map to the parent's metadata as well
  // if the data contains any key of the metadata Schema
  // const checkIfMetadata = filter(metadataSchema)
  if (
    filteredData.name &&
    filteredData.pid &&
    filteredData.iid &&
    filteredData.pid.toString() !== filteredData.iid.toString()
  ) {
    const parent = Object.assign({}, state[filteredData.pid]);
    if (parent && parent.metadata) {
      update[parent.iid] = parent;
    }
  }

  if (mode && mode === 'INSERT') {
    const newState = Object.assign({}, state);
    newState[iid] = update[iid];

    return newState;
  }

  return Object.assign({}, state, update);
};

const getStateAfterNormalizeAndUpsertNode = (
  state,
  data,
  mode,
  notHaveMetadata,
) => {
  const normalized = normalize(data, apiNodeSchema);
  if (
    !normalized ||
    !normalized.entities ||
    !normalized.entities.apiNodeSchema
  ) {
    return state;
  }

  const nodesToUpsert = normalized.entities.apiNodeSchema;
  return Object.keys(nodesToUpsert).reduce(
    (newState, key) =>
      getStateAfterUpsertNode(
        newState,
        nodesToUpsert[key],
        mode,
        notHaveMetadata,
      ),
    state,
  );
  // TODO: loop all other entities and put them in the
};

function tree(state = {}, action) {
  switch (action.type) {
    case 'TREE_UPSERT_NODE': {
      const { data, mode, notHaveMetadata } = action;
      return getStateAfterNormalizeAndUpsertNode(
        state,
        data,
        mode,
        notHaveMetadata,
      );
    }
    case 'TREE_UPSERT_NODES': {
      const { data, mode } = action;

      const arrayToUpsert = Array.isArray(data) ? data : [data];

      return arrayToUpsert.reduce(
        (oldState, item) =>
          Object.assign(
            {},
            oldState,
            getStateAfterNormalizeAndUpsertNode(oldState, item, mode),
          ),
        state,
      );
    }
    case 'REMOVE_CHILD_FROM_METADATA': {
      const { childIid, iid } = action;
      // console.log(action);
      const node = Object.assign({}, state[iid]);

      if (node && node.children && node.children.length) {
        const x = node.children.indexOf(childIid);

        node.metadata.splice(x, 1);
        node.children.splice(x, 1);

        return Object.assign({}, state, { [iid]: node });
      }
      return state;
    }
    case 'NODE_CHILD_ITEM_ERRORED': {
      const { iid, childIid, errorCode } = action;
      const newNode = Object.assign({}, state[iid]);

      newNode.metadata = newNode.metadata.map((item) => {
        if (item.iid === childIid) {
          return Object.assign({}, item, { errored: errorCode });
        }
        return item;
      });

      return Object.assign({}, state, { [iid]: newNode });
    }
    default:
      return state;
  }
}

export default tree;
