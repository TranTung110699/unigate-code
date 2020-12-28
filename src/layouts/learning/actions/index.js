/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const WINDOW_RESIZE = 'WINDOW_RESIZE';
export const STICKY_HEADER_HEIGHT = 'STICKY_HEADER_HEIGHT';

export function windowResize(screenSize, bodyScreenSize) {
  return { type: WINDOW_RESIZE, screenSize, bodyScreenSize };
}

export const stickyHeaderHeight = (height) => {
  return {
    type: STICKY_HEADER_HEIGHT,
    height,
  };
};
