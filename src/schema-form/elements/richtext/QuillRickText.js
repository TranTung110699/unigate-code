import React from 'react';
import { connect } from 'react-redux';
import { openMediaManagerDialog, pushQuillJS } from 'components/media/actions';
import QuillComponent from './QuillComponent';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';

const mapDispatchToProps = (dispatch) => ({
  openMediaManagerDialog: () => {
    dispatch(openMediaManagerDialog(true));
  },
  pushQuillJSAction: (quill) => {
    dispatch(pushQuillJS(quill));
  },
});

const populateStateToProps = (state) => ({
  openMediaDialog: state.mm.openMediaDialog,
});

export default makeReduxFormCompatible({})(
  connect(
    populateStateToProps,
    mapDispatchToProps,
  )(QuillComponent),
);
