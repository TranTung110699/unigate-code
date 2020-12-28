import { ntype as ntypes } from 'configs/constants';
import { isExam } from 'common/learn';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { isScormSco } from 'components/admin/scorm/scorm';

export const hasDuration = (ntype, fieldEdit) =>
  ntype !== ntypes.VOCAB && (ntype === 'skill' || fieldEdit !== 'skills');
export const hasWeight = (ntype, parentItem) => {
  if (parentItem && parentItem.average_of_children_score) {
    return false;
  }
  return ntype !== ntypes.VOCAB;
};
export const hasSequential = (
  node,
  action = '',
  nodes,
  parentIndex,
  itemIndex,
) => {
  if (action === 'sequential') {
    return true;
  }
  if (
    ![ntypes.SCO, ntypes.EXERCISE, ntypes.VIDEO, ntypes.VOCABSET].includes(
      node && node.ntype,
    )
  ) {
    return false;
  }
  if (!parentIndex && !itemIndex) {
    return false;
  }
  const pid = node && node.pid;
  if (!pid || !nodes[pid]) {
    return true;
  }
  return !isExam(nodes[pid]);
};
export const hasSettings = (node) => {
  if (isScormSco(node)) return false;

  return ![
    ntypes.VOCAB,
    ntypes.VOCABSET,
    ntypes.VIDEO,
    ntypes.QUESTION,
  ].includes(node.ntype);
};

export const checkable = (ntype) =>
  [ntypes.SCO, ntypes.SYLLABUS].includes(ntype);

export const hasScoreAndPassing = (node) => {
  /* TODO: apply for the rest of the list (the ones we currently commented out)
  // ntypes.SCO,
  // ntypes.EXERCISE,
  // ntypes.VOCABSET,
  */

  if (!node) {
    return false;
  }

  // commented out for question as of March 2019, it's rendering a weird screen
  // if (
  //   node.ntype === ntypes.QUESTION &&
  //   node.type !== questionTypes.TYPE_INTRODUCTION
  // ) {
  //   return true;
  // }

  return false;
};
