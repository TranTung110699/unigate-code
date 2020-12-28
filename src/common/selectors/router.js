import lodashGet from 'lodash.get';

export const getLocation = (state) => lodashGet(state, 'router.location');
export const getPathname = (state) => lodashGet(getLocation(state), 'pathname');
export const getSearch = (state) => lodashGet(getLocation(state), 'search');
