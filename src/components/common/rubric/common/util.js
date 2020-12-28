export const setScore = (score, rubric, p, type) => {
  if (!rubric) return;
  if (!score[rubric.iid]) {
    score[rubric.iid] = {};
  }
  if (type) {
    score[rubric.iid][type] = p;
  } else {
    score[rubric.iid].p_original = p;
  }
};
