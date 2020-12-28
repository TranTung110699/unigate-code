import { createSelector } from 'reselect';
import { checkIfUseV1FileManagerFromConf } from 'common/conf';
import lodashGet from 'lodash.get';

export const confSelector = createSelector(
  (state) => state.domainInfo.conf,
  (conf) => conf || {},
);

export const userInfoSelector = createSelector(
  (state) => state.user && state.user.info,
  (userInfo) => userInfo,
);

export const shouldUseV1FileManager = createSelector(
  confSelector,
  (conf) => checkIfUseV1FileManagerFromConf(conf),
);

export const userOrganizationsSelector = createSelector(
  userInfoSelector,
  (userInfo) => lodashGet(userInfo, 'organizations'),
);

export const userPhongbansSelector = createSelector(
  userInfoSelector,
  (userInfo) => lodashGet(userInfo, 'phongbans'),
);

export const userOrgIidsSelector = createSelector(
  userInfoSelector,
  (userInfo) => lodashGet(userInfo, 'user_organizations'),
);

export const userOrgIids = (state) =>
  lodashGet(state, 'user.info.user_organizations');

export const userPhongbanIidsSelector = createSelector(
  userPhongbansSelector,
  (phongbans) =>
    (phongbans || []).map((pb) => lodashGet(pb, 'iid')).filter(Boolean),
);

export const userOrganizationAndPhongbanIidsSelector = createSelector(
  userOrgIidsSelector,
  userPhongbanIidsSelector,
  (userDepartmentIids, userPhongbanIids) =>
    (userDepartmentIids || []).concat(userPhongbanIids || []),
);

export const uzeEquivalentJobPositionSystemSelector = createSelector(
  confSelector,
  (conf) => conf && conf.use_equivalent_job_position_system,
);

export const orgTypesSelector = (state) =>
  lodashGet(state, 'domainInfo.school.org_types');
