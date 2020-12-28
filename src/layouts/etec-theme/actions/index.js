export const WINDOW_RESIZE = 'WINDOW_RESIZE';

export function windowResize(screenSize, bodyScreenSize) {
  return { type: WINDOW_RESIZE, screenSize, bodyScreenSize };
}
