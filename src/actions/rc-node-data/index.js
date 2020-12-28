export const dataActionTypes = {
  FEETCH_DATA: 'RC_FEETCH_DATA',
  UPDATE_NODE_DATA: 'RC_UPDATE_NODE_DATA',
  STORE_DATA_USING_NAMESPACE: 'RC_STORE_DATA_USING_NAMESPACE',
  STORE_SINGLE_DATA: 'RC_STORE_SINGLE_DATA',
};

export default {
  feetch: (url, values, options, method) => ({
    type: dataActionTypes.FEETCH_DATA,
    url,
    values,
    options,
    method,
  }),
  feetchWithoutParam: (url, options, method) => ({
    type: dataActionTypes.FEETCH_DATA,
    url,
    options,
    method,
  }),
  updateNode: (url, values, options, method) => ({
    type: dataActionTypes.UPDATE_NODE_DATA,
    url,
    values,
    options,
    method,
  }),
  storeDataUsingNamespace: (values, namespace) => ({
    type: dataActionTypes.STORE_DATA_USING_NAMESPACE,
    values,
    namespace,
  }),
  storeSingleData: (value) => ({
    type: dataActionTypes.STORE_SINGLE_DATA,
    value,
  }),
};
