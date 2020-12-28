// item = {iid, ntype, depth}
import groupApiUrls from 'components/admin/group/endpoints';
import organizationApiUrls from 'components/admin/organization/endpoints';

const actions = {
  /**
   *
   * @param {boolean|('notification'|'error'|'warning')} messageType
   * @param message
   * @param {number} duration seconds (for example 1.5 seconds)
   * @returns {{type: string, messageType: *, message: *, duration: *}}
   */
  snackbar: (messageType, message, duration = 4.5) => {
    return {
      type: 'SNACKBAR',
      messageType,
      message,
      duration,
    };
    // TODO: action
  },
  fetchNode: (item) => {
    const ret = {
      ...item,
      type: 'FETCH_NODE',
    };

    // mapping apiUrl so that we're getting away from apiUrls.fetch_node;
    // /syllabus/api/get
    if (item.ntype === 'job-position' || item.type === 'job-position')
      ret.apiUrl = '/job-position/api/get';
    if (item.ntype === 'organization' || item.type === 'organization')
      ret.apiUrl = organizationApiUrls.get_organization_info;
    if (item.ntype === 'group' || item.type === 'group')
      ret.apiUrl = groupApiUrls.get_group_info;
    if (item.ntype === 'exam-template') ret.apiUrl = '/exam-template/get';
    if (item.ntype === 'venue') ret.apiUrl = '/venue/api/get';
    if (item.ntype === 'sales-package') ret.apiUrl = '/sales/package/get';
    if (item.ntype === 'sales-order') ret.apiUrl = '/sales/order/get';

    return ret;
  },
  setBankNtype: (
    ntype,
    subType,
    editingItemIid,
    fieldEdit,
    pSubtype,
    options,
  ) => ({
    type: 'BANK_DIALOG_NODE_TYPE',
    ntype,
    subType,
    editingItemIid,
    fieldEdit,
    pSubtype,
    options,
  }),
  setSlugMapping: (slug, iid) => ({
    type: 'SLUGS_IID_MAPPING',
    slug,
    iid,
  }),
  // editingItem = {iid, ntype, name...}
  // itemAncestors = array of objects
  setEditingItem: (data = {}) => ({
    type: 'EDITING_ITEM',
    data,
  }),
  // data contains the whole object
  // mode is 'INSERT' or 'search'
  treeUpsertNode: (data, mode, notHaveMetadata) => ({
    type: 'TREE_UPSERT_NODE',
    data,
    mode,
    notHaveMetadata,
  }),
  treeUpsertNodes: (data, mode) => ({
    type: 'TREE_UPSERT_NODES',
    data,
    mode,
  }),
  updateNodeMetadata: (data) => ({
    type: 'UPDATE_NODE_METADATA',
    newlyAddedChildIid: data.newlyAddedChildIid,
  }),
  updateNodeName: (data) => ({
    type: 'UPDATE_NODE_NAME',
    name: data.name,
  }),
  updateSearchResults: (data, formid, searchValues) => ({
    type: 'SEARCH_RESULTS_FETCHED',
    data,
    formid,
    searchValues,
  }),
  updateRowOnSearChResults: (formid, dataId, data) => ({
    type: 'UPDATE_DATA_OF_ROW',
    formid,
    dataId,
    data,
  }),
  deleteRowOnSearChResults: (formid, id) => ({
    type: 'DELETE_DATA_OF_ROW',
    formid,
    id,
  }),
  cleanSearchResults: (formid) => ({
    type: 'CLEAN_SEARCH_RESULTS',
    formid,
  }),
  handleOpenDialog: (data, dialogKey) => ({
    type: 'HANDLE_MODAL_DIALOG',
    data,
    dialogKey,
  }),
  closeAllDialogs: () => ({
    type: 'CLOSE_ALL_MODAL_DIALOGS',
  }),
  handleGoogleAuthenticatorDialog: (openGoogleAuthenticator) => ({
    type: 'GOOGLE_AUTHENTICATOR_DIALOG',
    openGoogleAuthenticator,
  }),
  handleEditable: (data) => ({
    type: 'HANDLE_EDITABLE',
    data,
  }),
  setFormSchemaConfigs: (data, fieldName, formid) => ({
    type: 'SET_FORM_SCHEMA_CONFIGS',
    data,
    fieldName,
    formid,
  }),
  makeChildErrored: (iid, childIid, errorCode) => ({
    type: 'NODE_CHILD_ITEM_ERRORED',
    iid,
    childIid,
    errorCode,
  }),

  removeChildFromMetadata: (childIid, iid) => ({
    type: 'REMOVE_CHILD_FROM_METADATA',
    childIid,
    iid,
  }),

  updateDataApiRequestResults: (data, keyState) => ({
    type: 'DATA_API_RESULT',
    data,
    keyState,
  }),
};

export default actions;
