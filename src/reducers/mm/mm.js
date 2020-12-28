import {
  MM_ADD_FOLDER,
  MM_MEDIA_ITEM_STATUS,
  MM_ON_DATA_LOADED,
  MM_OPEN_DIALOG,
  MM_PUSH_QUILL,
  MM_SET_TARGET_ELEMENT,
  MM_SWITCH_VIEW_TYPE,
  MM_VIEW_DETAIL,
} from 'components/media/actions';

const mmInitialState = {
  listView: true,
  gridView: false,
  target: {
    element: null, // đối tượng sử dụng mm ==> input file ??
    onSelectAction: () => {},
    value: null,
  },

  mediaDB: {
    presentId: 0,
    roots: [],
    currentNode: {},
    currentRoot: {},
    data: [],
  },
  isAddingFolder: false,
  mediaMenuContextState: false,
  openMediaDialog: false,
  viewDetailMedia: {
    viewing: false,
    data: {},
  },
  currentRichText: {}, // current quill push from action view detail
  path: [],
};

const mm = (state = mmInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case MM_SET_TARGET_ELEMENT:
      newState = {
        ...state,
        target: {
          element: action.element,
          onSelectAction: action.onSelectAction,
          accept: action.accept,
        },
      };
      break;

    case MM_SWITCH_VIEW_TYPE:
      newState = {
        ...state,
        listView: action.listView,
        gridView: !action.listView,
      };
      break;
    case MM_ON_DATA_LOADED:
      newState = {
        ...state,
        mediaDB: action.mediaDB,
      };
      break;
    case MM_ADD_FOLDER:
      newState = {
        ...state,
        isAddingFolder: action.isAddingFolder,
      };
      break;
    case MM_MEDIA_ITEM_STATUS:
      newState = {
        ...state,
        mediaMenuContextState: action.mediaMenuContextState,
      };
      break;
    case MM_OPEN_DIALOG:
      newState = {
        ...state,
        openMediaDialog: action.openMediaDialog,
      };
      break;
    case MM_VIEW_DETAIL:
      newState = {
        ...state,
        openMediaDialog: false,
        viewDetailMedia: action.viewDetailMedia,
      };
      break;
    case MM_PUSH_QUILL:
      newState = {
        ...state,
        currentRichText: action.quillJs,
      };

      break;
    default:
      return state;
  }
  return newState;
};

export default mm;
