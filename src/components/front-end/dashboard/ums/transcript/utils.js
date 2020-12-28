import { scoreScaleTypes } from 'configs/constants';
import { t1 } from 'translate';

export const getFinalScoreOfSubject = (scoreScale, score) => {
  if (scoreScale !== scoreScaleTypes.pmd || !score) {
    return score;
  }

  switch (score) {
    case 'd':
    case 'D': {
      return t1('pmd_distinction');
    }
    case 'm':
    case 'M': {
      return t1('pmd_merit');
    }
    case 'p':
    case 'P': {
      return t1('pmd_pass');
    }
    default: {
      return t1('pmd_fail');
    }
  }
};
