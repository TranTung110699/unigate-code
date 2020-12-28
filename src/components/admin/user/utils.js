import lodashGet from 'lodash.get';
import { leaderPositions } from 'configs/constants/user';

export const userPreviewLink = (user, mode, action) => {
  let tmp;
  if (mode === 'account') tmp = 'user';
  else tmp = mode || 'student';

  const a = action ? action : 'dashboard';
  return `/admin/${tmp}/${user.iid}/${a}`;
};

export const isHieuTruong = (user) => {
  return [leaderPositions.LEADER, leaderPositions.VICE_LEADER].includes(
    lodashGet(user, 'leader_position'),
  );
};

export const isLeader = (user) => {
  return [
    leaderPositions.LEADER,
    leaderPositions.VICE_LEADER,
    leaderPositions.GIAM_DO_SO,
    leaderPositions.PHO_GIAM_DOC_SO,
    leaderPositions.TRUONG_PHONG_GIAO_DUC,
    leaderPositions.PHO_PHONG_GIAO_DUC,
  ].includes(lodashGet(user, 'leader_position'));
};

export const isReviewApprover = (user) => {
  const leaderPosition = lodashGet(user, 'leader_position');

  return (
    [
      leaderPositions.GIAM_DO_SO,
      leaderPositions.TRUONG_PHONG_GIAO_DUC,
      leaderPositions.LEADER,
      leaderPositions.VICE_LEADER,
    ].includes(leaderPosition) ||
    (leaderPosition === leaderPositions.TEACHER &&
      lodashGet(user, 'current_position') === 'leader')
  );
};
