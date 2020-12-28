import lodashGet from 'lodash.get';

export function parseScoreToString(score, scoreScale) {
  if (score && !isNaN(score)) {
    return parseFloat(score).toFixed(2);
  }
  return score;
}

export function getLabelOfScoreFromScale(score, scoreScale) {
  return lodashGet(
    (scoreScale || []).find((s) => lodashGet(s, 'id') == score),
    'name',
  );
}
