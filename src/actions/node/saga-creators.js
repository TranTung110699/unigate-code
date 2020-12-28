import { preparePayloadForNodeRequestSaga } from 'components/admin/node/schema-form/service';

const sagaActions = {
  // formSchemaConfigsRequest: (fieldName, formid, params) => ({
  //   type: 'FORM_SCHEMA_CONFIGS_REQUEST',
  //   fieldName,
  //   formid,
  //   params,
  // }),
  // payload = {step, iid, data, closeModal, alternativeApi, params, searchFormId, actionsToDoOnSuccess}
  updateNodeRequest: (payload) => {
    const { data } = payload;

    return sagaActions.upsertNodeRequest(
      preparePayloadForNodeRequestSaga(data, {
        step: payload.step,
        iid: payload.iid,
        mode: 'edit',
        ntype: data.ntype,
        node: data,
        searchFormId: payload.searchFormId,
        alternativeApi: payload.alternativeApi,
        requestSuccessful: payload.requestSuccessful,
        closeModal: payload.closeModal,
        turnOffNotifications: payload.turnOffNotifications,
        turnOffSuccessNotifications: payload.turnOffSuccessNotifications,
        turnOffFailureNotifications: payload.turnOffFailureNotifications,
      }),
    );
    // return {
    //   {
    //     type: 'UPDATE_NODE_REQUEST',
    //     payload,
    //   }
    // }
  },
  deleteNodeRequest: ({
    formid,
    ntype,
    itemId,
    step,
    alternativeApi,
    params,
    onRequestSuccessful,
    message,
  }) => ({
    type: 'DELETE_NODE_REQUEST',
    formid,
    ntype,
    id: itemId,
    step,
    alternativeApi,
    params,
    onRequestSuccessful,
    message,
  }),
  fetchNodesRequest: (
    values,
    formid,
    searchResultKey,
    alternativeApi = null,
    options,
  ) => ({
    type: 'FETCH_NODES_REQUEST',
    values,
    formid,
    alternativeApi,
    searchResultKey,
    options,
  }),
  newNodeRequest: (payload) => ({
    type: 'NEW_NODE_REQUEST',
    payload,
  }),
  upsertNodeRequest: (payload) => ({
    type: 'UPSERT_NODE_REQUEST',
    payload,
  }),
  submitFormRequest: (formid, options) => ({
    type: 'FORM_SUBMIT_REQUEST',
    formid,
    options,
  }),
  getDataRequest: (config, params) => ({
    // config: {url, keyState}
    type: 'API_GET_DATA_REQUEST',
    config,
    params,
  }),
  deepCloneNodeRequest: (payload) => ({
    type: 'DEEP_CLONE_NODE_REQUEST',
    payload,
  }),
};

export default sagaActions;
