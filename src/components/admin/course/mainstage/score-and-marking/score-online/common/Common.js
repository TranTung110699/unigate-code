export function getProgressKeyState(rubric, user) {
  return `progress-${rubric.iid}-${user.iid}`;
}
