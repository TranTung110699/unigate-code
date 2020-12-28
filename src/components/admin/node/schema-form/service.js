import filter from 'utils/json-schema-filter';
// import { finalProcessing } from 'components/admin/node/new/schema/configs';
import { treeNodeSchema } from 'components/admin/node/schema/tree';
import apiUrls from 'api-endpoints';

export const filterDataToUpdate = ({ step, ntype, node, fullData }) => {
  let data = Object.assign(
    {},
    {
      iid: node.iid,
      id: node.id,
      ntype,
      type: node.type,
      // description: node.description,.
    },
    fullData,
  );

  // TODO:
  // data = finalProcessing(ntype, `edit_${step}`, data);

  const extra = {
    id: node.id,
    ntype: node.ntype,
    iid: node.iid,
    _sand_step: step,
  };

  // TODO: move this into finalProcessing
  if (node.ntype === 'question') {
    data.type = node.type;
  }

  data = Object.assign({}, data, extra);
  if (step === 'metadata') {
    // data = Object.assign({}, data, {children : data.metadata});
    // delete data.metadata;
    data = filter(treeNodeSchema, data);
    data.children = data.metadata;
    data._sand_step = 'children';
    // console.log('metadata saga', data);
  }

  // return { ...data, metadata: null }
  return data;
};

export const generateFormId = (props) =>
  (props && props.formid) ||
  `${props.ntype}_${props.mode}${(props.mode === 'edit' &&
    props.node &&
    props.node.iid) ||
    ''}`;

export const preparePayloadForNodeRequestSaga = (data, props) => {
  const {
    ntype,
    editingItemIid,
    syllabus,
    closeModal,
    step,
    alternativeApi,
    fieldEdit,
    actionsToDoOnSuccess,
    searchFormId,
    requestSuccessful,
    getEditItemUrl,
    showAddNewAndEditButton,
    requestFailedCallback,
    dialogKey,
    preSubmitUrl,
    preSubmitErrorCallback,
    turnOffNotifications,
    turnOffSuccessNotifications,
    turnOffFailureNotifications,
  } = props;

  const resetForm =
    typeof props.resetForm !== 'undefined' ? props.resetForm : true;
  const formid = props.formid || generateFormId(props);

  const newNType = ntype ? ntype.replace(/_/g, '-') : '';

  let apiUrl;

  if (alternativeApi) {
    apiUrl = alternativeApi;
  } else if (props.mode === 'new') {
    apiUrl = apiUrls.post_new_node(newNType);
  } else {
    // console.log({fullData}, this.props);
    apiUrl = apiUrls.update_node(newNType);
  }

  // let action;
  let payload = {
    closeModal,
    dialogKey,
    apiUrl,
    formid,
    resetForm,
    ntype: newNType,
    searchFormId,
    actionsToDoOnSuccess,
    editingItemIid, // if we're adding an item to a metadata
    syllabus, // syllabus iid
    fieldEdit, // 'metadata' for example
    requestSuccessful, // TODO: remove this if we can
    getEditItemUrl,
    showAddNewAndEditButton,
    requestFailedCallback,
    preSubmitUrl,
    preSubmitErrorCallback,
    step,
    mode: props.mode,
    turnOffNotifications,
    turnOffSuccessNotifications,
    turnOffFailureNotifications,
  };

  let fullData = { ...(data || {}), submit: 1, _sand_step: step };

  payload = {
    ...payload,
    data: fullData,
  };

  if (props.mode === 'edit') {
    // edit
    const node = props.node;
    const localNType = !newNType ? node.ntype : newNType;
    const localStep = step;

    const dataToSubmit = filterDataToUpdate({
      ntype: localNType,
      node,
      fullData,
      step: localStep,
    });

    payload = {
      ...payload,
      iid: node.iid,
      data: dataToSubmit,
    };
  }

  // console.log('preparePayloadForNodeRequestSaga', payload);
  return payload;
};
