import { layoutContextActionTypes } from 'actions/layout-context';

const layoutContextDefaultState = {
  isOpenLeftMenu: true,
  topMenu: {
    schema: null,
  },
  menuLeft: {
    schema: null,
  },
  subMenuLeft: {
    main: {
      schema: null,
      messages: null,
    },
    dialog: {
      schema: null,
      messages: null,
    },
  },
  subMenuTop: {
    main: {
      schema: null,
      buttons: null,
      lastBreadcrumbName: null,
    },
    dialog: {
      schema: null,
      buttons: null,
      lastBreadcrumbName: null,
    },
  },
  // subMenuRight: {
  //   schema: null,
  // },
  breadcrumb: {
    schema: null,
  },
};

const layoutContext = (state = layoutContextDefaultState, action) => {
  const { type, data } = action;
  const isHashbang = data && data.isHashbang;

  // applicable for sub left menu & sub top menu
  const menuNamespace = isHashbang ? 'dialog' : 'main';

  let newState = {};
  switch (type) {
    case layoutContextActionTypes.SET_STATE_OF_LEFT_MENU:
      newState = {
        ...state,
        isOpenLeftMenu: action.isOpenLeftMenu,
      };
      break;
    case layoutContextActionTypes.SET_MENU_LEFT:
      newState = {
        ...state,
        menuLeft: { ...data },
      };
      break;
    case layoutContextActionTypes.SET_SUBMENU_LEFT:
      const subMenuLeft = Object.assign({}, state.subMenuLeft);

      newState = {
        ...state,
        subMenuLeft: Object.assign(subMenuLeft, { [menuNamespace]: data }),
      };

      break;

    case layoutContextActionTypes.SET_MENU_TOP:
      newState = {
        ...state,
        topMenu: { ...data },
      };
      break;

    case layoutContextActionTypes.SET_SUBMENU_TOP:
      // let subMenuTop = Object.assign({}, state.subMenuTop[menuNamespace]); // the (main/dialog) name spaced subMenuTop
      const subMenuTop = Object.assign({}, state.subMenuTop);

      // if (action.data.fromLayout) {
      //   const breadcrumbSchema = action.data.breadcrumbSchema || [];
      //   subMenuTop.breadcrumbSchema = [...breadcrumbSchema];
      // } else {
      // subMenuTop = Object.assign(subMenuTop, data);
      // }

      // TODO: switch to different name space
      newState = {
        ...state,
        subMenuTop: Object.assign(subMenuTop, { [menuNamespace]: data }),
      };

      break;

    case layoutContextActionTypes.SET_BREADCRUMB:
      newState = {
        ...state,
        menuLeft: { ...data },
      };
      break;

    case layoutContextActionTypes.SET_APPLICABLE_WORKING_MODES:
      newState = {
        ...state,
        applicableWorkingModes: [...data],
      };

      break;

    default:
      return state;
  }
  return newState;
};
export default layoutContext;
