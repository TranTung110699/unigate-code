/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const MM_SWITCH_VIEW_TYPE = 'MM_SWITCH_VIEW_TYPE';
export const MM_SET_TARGET_ELEMENT = 'MM_SET_TARGET_ELEMENT';
export const MM_ON_DATA_LOADED = 'MM_ON_DATA_LOADED';
export const MM_ADD_FOLDER = 'MM_ADD_FOLDER';
export const MM_MEDIA_ITEM_STATUS = 'MM_MEDIA_ITEM_STATUS';
export const MM_OPEN_DIALOG = 'MM_OPEN_DIALOG';
export const MM_VIEW_DETAIL = 'MM_VIEW_DETAIL';
export const MM_PUSH_QUILL = 'MM_PUSH_QUILL'; // push quill js

export function switchToListView() {
  return { type: MM_SWITCH_VIEW_TYPE, listView: true };
}

export function setTargetElement(element, onSelectAction, accept = null) {
  return { type: MM_SET_TARGET_ELEMENT, element, onSelectAction, accept };
}

export function switchToGridView() {
  return { type: MM_SWITCH_VIEW_TYPE, gridView: true };
}

export function onMMDataLoaded(mediaDB) {
  return { type: MM_ON_DATA_LOADED, mediaDB };
}

export function onMMShowAddFolderBox(isAddingFolder) {
  return { type: MM_ADD_FOLDER, isAddingFolder };
}

export function setMediaMenuContextState(mediaMenuContextState) {
  return { type: MM_MEDIA_ITEM_STATUS, mediaMenuContextState };
}

export function openMediaManagerDialog(openMediaDialog) {
  return { type: MM_OPEN_DIALOG, openMediaDialog };
}

export function viewMediaDetail(viewDetailMedia) {
  return { type: MM_VIEW_DETAIL, viewDetailMedia };
}

export function pushQuillJS(quillJs) {
  return { type: MM_PUSH_QUILL, quillJs };
}
