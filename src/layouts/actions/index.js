/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const SET_APP_LAYOUTS = 'SET_APP_LAYOUTS';
export const WINDOW_RESIZE = 'WINDOW_RESIZE';

export function setLayout(layoutId, params) {
  const config = { layoutId, params };
  return { type: SET_APP_LAYOUTS, layoutConfigs: config };
}

export function windowResize(screenSize, bodyScreenSize) {
  return { type: WINDOW_RESIZE, screenSize, bodyScreenSize };
}
