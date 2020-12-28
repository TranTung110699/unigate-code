import lodashGet from 'lodash.get';
import { max } from 'common/utils/Array';
import {
  alertInDevelopment,
  onlyDoInDevelopment,
} from 'common/utils/development';

const getNewStateAtDialogKeyAfterCloseDialog = (stateAtDialogKey) => ({
  ...(stateAtDialogKey || {}),
  contentDialog: null,
  optionsProperties: {},
});

function handleOpenDialog(state = {}, action) {
  switch (action.type) {
    case 'HANDLE_MODAL_DIALOG': {
      const { data } = action;

      let { dialogKey } = action;
      if ([undefined, null].includes(dialogKey) || !String(dialogKey).trim()) {
        // so that we can gradually add key to all dialogs
        onlyDoInDevelopment(() => {
          alertInDevelopment(
            `You try to open or close a dialog without specifying the dialog key. This can cause unwanted behaviors.\nPlease add unique key to the dialog by using:\n- dialogKey prop of schema-form component\n- dialogKey prop of detail-on-dialog component\n- dialogKey parameter of actions.handleOpenDialog\n`,
          );
          console.log(action);
        });
        dialogKey = '_MISSING_DIALOG_KEY';
      }
      const { openDialog } = data;

      const stateAtDialogKey = state[dialogKey];
      let newStateAtDialogKey = Object.assign({}, stateAtDialogKey, data);

      if (
        !lodashGet(stateAtDialogKey, 'openDialog') &&
        lodashGet(newStateAtDialogKey, 'openDialog')
      ) {
        let { max: currentMaxZIndex } = max(
          Object.values(state).map((item) => lodashGet(item, 'zIndex')),
        );
        currentMaxZIndex = currentMaxZIndex || 1500;
        newStateAtDialogKey = {
          ...newStateAtDialogKey,
          zIndex: currentMaxZIndex + 1,
        };
      }

      if (typeof openDialog !== 'undefined' && !openDialog) {
        newStateAtDialogKey = getNewStateAtDialogKeyAfterCloseDialog(
          newStateAtDialogKey,
        );
      }

      const newState = Object.assign({}, state, {
        [dialogKey]: newStateAtDialogKey,
      });

      return newState;
    }
    case 'CLOSE_ALL_MODAL_DIALOGS': {
      return (
        state &&
        Object.keys(state).reduce(
          (newState, key) => ({
            ...newState,
            [key]: getNewStateAtDialogKeyAfterCloseDialog(state[key]),
          }),
          state,
        )
      );
    }
    default: {
      return state;
    }
    case 'GOOGLE_AUTHENTICATOR_DIALOG': {
      const openGoogleAuthenticator =
        action.openGoogleAuthenticator || !state.openGoogleAuthenticator;
      return Object.assign({}, state, { openGoogleAuthenticator });
    }
  }
}

export default handleOpenDialog;
