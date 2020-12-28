import lodashGet from 'lodash.get';

export const isContestSharedFromAncestorOrganizations = (contest) =>
  lodashGet(contest, 'is_shared_from_ancestor_organizations');
