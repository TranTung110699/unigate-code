/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const WINDOW_RESIZE = 'WINDOW_RESIZE';

export function windowResize(screenSize, bodyScreenSize) {
  return { type: WINDOW_RESIZE, screenSize, bodyScreenSize };
}
