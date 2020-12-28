import { call, put, select, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import { reset, startSubmit, stopSubmit, submit } from 'redux-form';
import { t, t1 } from 'translate';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import errorCodes from 'common/errorCodes';
import { preparePayloadForNodeRequestSaga } from 'components/admin/node/schema-form/service';
import { confSelector } from 'common/selectors';
import routes from 'routes';
import getEditingItem from './selectors';
import lodashGet from 'lodash.get';
import { push } from 'react-router-redux';

const postSuccess = (node, mode) => {
  if (mode === 'new')
    return `${t1(node.ntype || 'item')} ${t('was_inserted_successfully')}`;
  if (mode === 'edit')
    return `${t1(node.ntype || 'item')} ${t('was_updated_successfully')}`;
  return ''; // t('request_successful');
};

function* addItemToEditingItemMetadata(
  editingItemIid,
  syllabusIid,
  child,
  fieldEdit,
  mode,
) {
  const conf = yield select(confSelector);
  // console.log('addItemToEditingItemMetadata');
  // console.log(editingItemIid);
  // console.log(child);
  // console.log(fieldEdit);
  // console.log(schema);

  // const editingItemIid = payload.editingItemIid ;
  // alert(editingItemIid);
  // get current node and add metadata to it
  const item = yield select(getEditingItem);
  // const child = post.result;

  //Trường hợp này thêm danh sách câu hỏi trong ngân hàng câu hỏi của exam template
  if (['exam-template', 'question-bank'].includes(item && item.ntype)) {
    yield put(actions.setBankNtype('', '', ''));
    return;
  }

  let metadata = item[fieldEdit] || [];
  if (item && item.ntype === 'exercise') {
    child.group = item.group || !metadata.length ? 1 : metadata.length + 1;
  }
  if (child && child.ntype === 'exercise') {
    if (
      conf.default_exercise_options &&
      Object.keys(conf.default_exercise_options)
    ) {
      child.options = conf.default_exercise_options;
    }
  }
  if (mode === 'edit') {
    metadata = metadata.map((item) => (item.iid === child.iid ? child : item));
  } else {
    metadata = metadata.length ? [...metadata, child] : [child];
  }

  // console.log('editingItem,,,,,,,,,,,,,,,,,,,,,', meta, ntype, iid, id);
  const data = {
    [fieldEdit]: metadata,
    ntype: item.ntype,
  }; // Object.assign({}, item);

  // data[fieldEdit] = metadata;

  // console.log('addItemToEditingItemMetadata: update node...', {editingItemIid, fieldEdit, data, item});
  // console.log({syllabusIid});
  const payload = preparePayloadForNodeRequestSaga(data, {
    step: fieldEdit,
    iid: editingItemIid,
    syllabus: syllabusIid,
    mode: 'edit',
    ntype: item.ntype,
    node: item,
    hiddenFields: { syllabus: syllabusIid },
    turnOffNotifications: true,
  });
  // console.log({payload});
  // dispatch(sagaActions.upsertNodeRequest(payload));

  yield put(sagaActions.upsertNodeRequest(payload));
  yield put(actions.setBankNtype('', '', ''));
}

// when the syllabus is approved and we change some content
// we should make the syllabus queued
function* makeSyllabusQueued() {
  const itemAncestors = yield select((state) => state.editing.itemAncestors);
  const nodes = yield select((state) => state.tree);
  let syllabus;
  if (itemAncestors && itemAncestors.length) {
    itemAncestors.forEach((item) => {
      if (item && item.ntype === 'syllabus' && nodes[item.iid]) {
        syllabus = Object.assign({}, nodes[item.iid], { status: 'queued' });
      }
    });
  }
  // make the syllabus status 'queued'
  if (syllabus) {
    yield put(actions.treeUpsertNode({ ...syllabus }));
  }
}

function* updateTreeInStore(node, payload) {
  const { data, mode, step, closeModal } = payload;

  const turnOffSuccessNotifications =
    payload.turnOffSuccessNotifications || payload.turnOffNotifications;

  // console.log('updateTreeInStore', node, payload);
  if (mode === 'edit') {
    const values = Object.assign({}, data, node);
    delete values._sand_step;
    if (step === 'metadata') {
      // extract the children iids
      values.children = values.metadata
        ? values.metadata.map((item) => item.iid)
        : [];
    } else if (step === 'avatar') {
      values.avatar = node.avatar;
    }

    yield put(actions.treeUpsertNode(values));
    if (!turnOffSuccessNotifications) {
      yield put(actions.snackbar(true, t1('item_successfully_updated')));
    }
    if (closeModal) yield put(actions.setBankNtype(null, null, null));
  } else if (mode === 'new') {
    if (Array.isArray(node && node.children)) {
      yield put(actions.treeUpsertNodes(node.children));
      yield put(
        actions.treeUpsertNode({ ...node, ...{ metadata: node.children } }),
      );
    } else {
      yield put(actions.treeUpsertNode(node));
    }
  }
}

function* upsertNode(action) {
  try {
    const payload = action.payload || {};
    const {
      ntype,
      data = {},
      editingItemIid,
      closeModal,
      dialogKey,
      apiUrl,
      searchFormId,
      formid,
      requestSuccessful,
      getEditItemUrl,
      showAddNewAndEditButton,
      requestFailedCallback,
      preSubmitUrl,
      preSubmitErrorCallback,
      resetForm,
      actionsToDoOnSuccess,
      mode,
      step,
    } = payload;

    const turnOffSuccessNotifications =
      payload.turnOffSuccessNotifications || payload.turnOffNotifications;

    const turnOffFailureNotifications =
      payload.turnOffFailureNotifications || payload.turnOffNotifications;

    if (['metadata', 'children'].includes(step)) {
      const childrenIids = Array.isArray(data.children)
        ? data.children.map((child) => {
            return typeof child === 'object'
              ? String(child.iid)
              : String(child);
          })
        : [];
      data.metadata =
        !Array.isArray(data.metadata) || !childrenIids.length
          ? null
          : data.metadata.filter((child) =>
              childrenIids.includes(String(child.iid)),
            );
    }

    let syllabusIid = data && data.syllabus;

    if (!syllabusIid) {
      syllabusIid = payload.syllabus;
    }

    if (formid) {
      yield put(startSubmit(formid));
    }

    if (preSubmitUrl && !data.__resolved__) {
      const preSubmitPost = yield call(
        Requester.post,
        preSubmitUrl,
        mode === 'edit' ? { ...data, metadata: null } : data,
      );

      if (
        !preSubmitPost.success &&
        preSubmitErrorCallback &&
        typeof preSubmitErrorCallback === 'function'
      ) {
        preSubmitErrorCallback(formid, preSubmitPost, data);
        yield put(stopSubmit(formid));
        return;
      }
    }
    if (!data.syllabus && syllabusIid) {
      data.syllabus = syllabusIid;
    }

    const post = yield call(
      Requester.post,
      apiUrl,
      mode === 'edit' ? { ...data, metadata: null } : data,
    );

    let submitErr = {};
    if (post.success) {
      if (closeModal) {
        yield put(actions.handleOpenDialog({ openDialog: false }, dialogKey));
      }

      if (post.objects && post.objects.url) {
        window.location.assign(post.objects.url);
        // return;
      }

      // There are a few things to do after success, all optionally
      // 1. reset form 2. close the modal 3. re-trigger search form
      // 4. some passed callbacks. 5. Some passed actions to dispatch
      // 6. alert or snackbar...
      // 7. update client store (the tree)
      if (mode === 'new' && resetForm && formid) {
        yield put(reset(formid));
      }

      if (searchFormId) {
        // because some post data with result is null
        yield put(submit(searchFormId));
      }

      if (showAddNewAndEditButton) {
        let url = routes.url('node_edit', {
          ...post.result,
          ntype,
        });

        if (getEditItemUrl) {
          url = getEditItemUrl(post);
        }
        yield put(push(url));
      }

      if (Array.isArray(actionsToDoOnSuccess)) {
        yield actionsToDoOnSuccess.map((todo) => put(todo));
      }

      if (post.result) {
        if (!lodashGet(post, 'result.iid') && typeof post.result === 'object') {
          post.result.iid = data.iid || post.result.id;
        }

        if (
          !lodashGet(post, 'result.ntype') &&
          typeof post.result === 'object'
        ) {
          post.result.ntype = ntype;
        }

        // console.log('afterUpdateNode');
        // console.log(post.result, payload);
        if (mode === 'edit' && editingItemIid) {
          let fieldEdit = payload.fieldEdit || 'metadata';
          if (fieldEdit === 'children' || fieldEdit === 'rubric')
            fieldEdit = 'metadata';
          yield call(
            addItemToEditingItemMetadata,
            editingItemIid,
            syllabusIid,
            post.result,
            fieldEdit,
            mode,
          );
        }

        yield updateTreeInStore(post.result, {
          ...payload,
          turnOffNotifications: true,
        });

        if (mode === 'edit' && post.result.dirty) {
          yield makeSyllabusQueued();
        }

        // snackbar notification
        if (!turnOffSuccessNotifications) {
          yield put(
            actions.snackbar(true, postSuccess(post.result) || post.message),
          );
        }

        if (mode === 'new' && editingItemIid) {
          let fieldEdit = payload.fieldEdit || 'metadata';
          if (fieldEdit === 'children' || fieldEdit === 'rubric')
            fieldEdit = 'metadata';
          yield call(
            addItemToEditingItemMetadata,
            editingItemIid,
            syllabusIid,
            post.result,
            fieldEdit,
          );
        }
      } else if (post.message && !turnOffSuccessNotifications) {
        yield put(actions.snackbar('success', post.message));
      }

      if (requestSuccessful) {
        yield call(requestSuccessful, post);
      }
    } else if (typeof post.success !== 'undefined') {
      // populate errors
      if (post.success === false && post.err && formid) {
        if (typeof post.err === 'object') {
          submitErr = { ...submitErr, ...post.err };
        } else if (typeof post.err === 'string') {
          // sometimes it is a string
          submitErr = { ...submitErr, _error: post.err };
        }
      }

      if (post.message) {
        submitErr = { ...submitErr, _error: post.message };
      }

      if (!submitErr._error) {
        submitErr = {
          ...submitErr,
          _error: `${t1('error')}: ${t('request_failed')}`,
        };
      }

      if (requestFailedCallback) {
        yield call(requestFailedCallback, post);
      }

      // TODO: some failed action here. put it in a job queue
      if (mode === 'edit' && step === 'metadata' && data.newlyAddedChildIid) {
        yield put(
          actions.makeChildErrored(
            data.iid,
            data.newlyAddedChildIid,
            errorCodes.syncChildFailed,
          ),
        );
      } else {
        // TODO:
      }
    }

    if (
      submitErr &&
      Object.values(submitErr).length > 0 &&
      !turnOffFailureNotifications
    ) {
      if (submitErr._error) {
        yield put(actions.snackbar('error', submitErr._error));
      } else {
        yield put(
          actions.snackbar(
            'error',
            t1('something_went_wrong_please_try_again', 0),
          ),
        );
      }
    }
    if (formid) {
      yield put(stopSubmit(formid, submitErr));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* upsertNodeSaga() {
  yield takeEvery('UPSERT_NODE_REQUEST', upsertNode);
}
