import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import lodashGet from 'lodash.get';
import { createSelector } from 'reselect';

/**
 * @return {function(*): Wrapped}
 *
 * this HOC pass some extra props to component:
 *    - isDialogOpen: a function that
 *        + take dialogKey
 *        + return if that dialog is open
 *    - openDialog: a function that take dialogKey and open that dialog
 *    - closeDialog: a function that take dialogKey and close that dialog
 */
const withGlobalDialogs = () => (Comp) => {
  const Wrapped = ({ dispatch, isDialogOpen, ...originalProps }) => {
    const openDialog = React.useCallback(
      (dialogKey, data) => {
        dispatch(actions.handleOpenDialog(data, dialogKey));
      },
      [dispatch],
    );

    const closeDialog = React.useCallback(
      (dialogKey) => {
        dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));
      },
      [dispatch],
    );

    return (
      <Comp
        {...originalProps}
        isDialogOpen={isDialogOpen}
        openDialog={openDialog}
        closeDialog={closeDialog}
      />
    );
  };

  const mapStateToProps = createSelector(
    (state) => lodashGet(state, 'dialogState'),
    (dialogState) => ({
      isDialogOpen: (dialogKey) => {
        // if a specific dialog is open
        if (dialogKey) {
          return lodashGet(dialogState, [dialogKey, 'openDialog']);
        }

        // if any dialog open
        return Object.values(dialogState || {}).some((dialogInfo) =>
          lodashGet(dialogInfo, 'openDialog'),
        );
      },
    }),
  );

  return connect(mapStateToProps)(Wrapped);
};

export default withGlobalDialogs;
