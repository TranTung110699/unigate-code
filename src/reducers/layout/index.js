import { SET_APP_LAYOUTS } from 'layouts/actions';

const layoutState = {};

const CommonState = (state = layoutState, action) => {
  switch (action.type) {
    case SET_APP_LAYOUTS:
      return action.layoutConfigs;

    default:
      return state;
  }
};
export default CommonState;
