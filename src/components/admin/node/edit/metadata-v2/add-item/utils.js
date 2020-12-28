import { t, t1 } from 'translate';
import { bankDialogTabDisplayTypes } from 'components/admin/node/bank/utils';

const groupChildren = (childrenTypes, filters) => {
  let ret = [];
  childrenTypes.forEach((item, index) => {
    filters.forEach((filter) => {
      if (filter[0] == item.ntype) {
        if (!filter[1]) ret.push(item);
        else if (
          filter[1] == item.type ||
          filter[1] == item.subType /*sco is using subType*/
        ) {
          ret.push(item);
        }
      }
    });
  });

  return ret;
};

/**
 * if childrenTypes = [
 *  {
 *    ntype: 'video',
 *    type: 'video',
 *   },
 *  {
 *    ntype: 'video',
 *    type: 'pdf',
 *   },
 *  ....
 * ]
 *
 * we group those video ntypes together with a "add lecture" popover
 *
 *
 *
 * @param ntypes can be ['video', 'exercise']
 * @param childrenTypes
 */
export const groupSimilarChildrenV2 = (childrenTypes, node) => {
  if (!Array.isArray(childrenTypes) || childrenTypes.length < 1) {
    return [];
  }

  const scos = groupChildren(childrenTypes, [
    ['sco', 'standard'],
    ['sco', 'scorm'],
  ]);
  const exams = groupChildren(childrenTypes, [
    ['sco', 'exam'],
    ['sco', 'exam-by-template'],
  ]);

  const videos = groupChildren(childrenTypes, [['video']]);

  const questions = groupChildren(childrenTypes, [['question']]);

  const exercises = groupChildren(childrenTypes, [['exercise']]);

  const scorms = groupChildren(childrenTypes, [
    ['sco', 'scorm'],
    // ['sco', 'group_assignment'],
  ]);

  let ret = [];

  const sco = {
    label: t1('add_chapter'),
    children: scos,
  };
  const video = {
    label: t1('add_lecture'),
    children: videos,
  };
  const exercise = {
    label: t1('add_practice_exercise_or_exam'),
    children: exercises,
  };
  const exam = {
    label: t1('add_exam'),
    children: exams,
  };

  if (node.ntype == 'syllabus') {
    if (node.max_depth == 1)
      return [
        video,
        exercise,
        // exam,
        {
          label: t1('add_scorm'),
          children: scorms,
        },
      ];
    else
      return [
        sco,
        video,
        exercise,
        exam,
        // {
        //   label: t1('add_other_item'),
        //   children: scorm,
        // },
      ];
  } else if (node.ntype == 'sco') {
    return [video, exercise, exam, sco];
  } else if (node.ntype == 'exercise')
    return [
      {
        label: t1('add_question'),
        children: questions,
      },
    ];
};

/**
 *
 * @param node
 * @param displayType see bankDialogTabDisplayTypes
 * @returns {string}
 */
export const getAddBankDialogTitle = (node, displayType) => {
  if (!displayType || displayType == bankDialogTabDisplayTypes.NEW_ONLY) {
    return `${
      node.ntype == 'exercise' ? t1('add_question_for') : t1('add_item_for')
    } "${node.name}"`;
  } else if (displayType == bankDialogTabDisplayTypes.SEARCH_ONLY) {
    return `${
      node.ntype == 'exercise' ? t1('add_question_for') : t1('add_item_for')
    } "${node.name}" ${t('from_bank')}`;
  }
};

// dialog properties
export const optionsProperties = (title, onCloseDialog) => {
  return {
    handleClose: true,
    modal: true,
    title,
    width: '80%',
    ...(onCloseDialog
      ? {
          callbacks: {
            onCloseDialog,
          },
        }
      : {}),
  };
};

export const getAddItemButtonLabel = (node = {}, mode) => {
  if (node.ntype == 'exercise') {
    if (mode == bankDialogTabDisplayTypes.NEW_ONLY)
      return t1('add_new_question');
    else if (mode == bankDialogTabDisplayTypes.SEARCH_ONLY)
      return t1('add_question_from_bank');
    else if (mode == bankDialogTabDisplayTypes.BOTH) return t1('add_question');
  } else if (node.ntype == 'syllabus') {
    if (mode == bankDialogTabDisplayTypes.NEW_ONLY)
      return t1('add_new_content');
    else if (mode == bankDialogTabDisplayTypes.SEARCH_ONLY)
      return t1('add_content_from_bank');
    else if (mode == bankDialogTabDisplayTypes.BOTH) return t1('add_content');
  } else {
    if (mode == bankDialogTabDisplayTypes.NEW_ONLY) return t1('add_new_item');
    else if (mode == bankDialogTabDisplayTypes.SEARCH_ONLY)
      return t1('add_item_from_bank');
    else if (mode == bankDialogTabDisplayTypes.BOTH) return t1('add_item');
  }
};
