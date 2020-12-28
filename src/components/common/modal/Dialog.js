/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import AntdModal from 'antd/lib/modal';
import actions from 'actions/node/creators';
import CloseButton from './CloseButton';
import './stylesheet.scss';
import usePrevious from 'components/common/hook/usePrevious';
import withFeatureFlags from 'feature-flag/withFeatureFlags';

const ModalDialog = ({
  dispatch,
  dialogKey,
  handleCloseDialog,
  optionsProperties,
  openDialog,
  children,
  contentDialog,
  zIndex,
  modal: isModalAccordingToProps,
}) => {
  let {
    clearHashOnClose,
    callbacks,
    actions: dialogActions,
    handleClose: showCloseButton,
    title,
    modal: isModalAccordingToOptionsProperties,
    className,
    closeButtonType,
    width,
    style,
    bodyStyle,
  } = optionsProperties || {};
  let { onCloseDialog: onCloseDialogCallback } = callbacks || {};
  const isModal =
    isModalAccordingToProps || isModalAccordingToOptionsProperties;

  const previousOnCloseDialogCallback = usePrevious(onCloseDialogCallback);

  contentDialog = children || contentDialog;

  const previousOpenDialog = usePrevious(openDialog);

  const triggerOpenDialog = React.useCallback(
    () => {
      dispatch(actions.handleOpenDialog({ openDialog: true }, dialogKey));
    },
    [dispatch, dialogKey],
  );

  const handleRequestClose = React.useCallback(
    () => {
      if (handleCloseDialog) {
        return handleCloseDialog();
      }
      dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));

      if (clearHashOnClose) {
        // always remove the # part from dialog
        const url = window.location.pathname;
        window.history.pushState(null, null, url);
      }
    },
    [dispatch, clearHashOnClose, handleCloseDialog, dialogKey],
  );

  React.useEffect(
    () => {
      if (typeof openDialog !== 'boolean' && contentDialog) {
        triggerOpenDialog();
      }
    },
    [openDialog, contentDialog, triggerOpenDialog],
  );

  React.useEffect(
    () => {
      if (!previousOpenDialog && contentDialog) {
        triggerOpenDialog();
      } else if (
        // you need to use the previous version
        // because when dialog is closed, optionsProperties object will be cleaned
        typeof previousOnCloseDialogCallback === 'function' &&
        previousOpenDialog &&
        !openDialog
      ) {
        previousOnCloseDialogCallback();
      }
    },
    [
      previousOpenDialog,
      openDialog,
      contentDialog,
      triggerOpenDialog,
      previousOnCloseDialogCallback,
    ],
  );

  if (!contentDialog) {
    openDialog = false;
  }

  if (!openDialog) {
    return null;
  }

  const footer = typeof dialogActions !== 'undefined' ? dialogActions : null;

  return (
    <AntdModal
      style={style}
      bodyStyle={bodyStyle}
      visible={!!openDialog}
      title={title}
      onCancel={handleRequestClose}
      closable={false} // we already have CloseButton component
      footer={footer}
      width={width}
      className={`
          modal_dialog_ant
          ${
            typeof width === 'undefined'
              ? 'modal_dialog_ant--default-width'
              : ''
          }
          light-background-dialog no-header-dialog
          ${className || ''}
        `}
      maskClosable={!isModal}
      //================================
      // autoDetectWindowHeight={autoDetectWindowHeight}
      // repositionOnUpdate={repositionOnUpdate}
      // autoScrollBodyContent={autoScrollBodyContent}
      // bodyClassName={bodyClassName}
      // bodyStyle={bodyStyle}
      // contentStyle={contentStyle}
      // overlayStyle={overlayStyle}
      // paperProps={paperProps}
      // style={style}
    >
      {showCloseButton ? (
        <CloseButton
          closeButtonType={closeButtonType}
          onClick={handleRequestClose}
        />
      ) : null}
      {contentDialog}
    </AntdModal>
  );
};

export default withFeatureFlags()(connect()(ModalDialog));
