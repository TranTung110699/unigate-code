import {
  templateOptions as templateOptionsSco,
  templateTypes as templateTypesSco,
} from 'components/admin/sco/schema/tpl-types';
import {
  templateOptions as templateOptionsExercise,
  templateTypes as templateTypesExercise,
} from 'components/admin/exercise/schema/tpl-types';
import { isEnrolmentPlanProgram } from 'components/admin/node/utils';
import { ntype as allNtype, schoolTypes, skillType } from 'configs/constants';
import { templateOptions as videoTypes } from 'components/admin/video/schema/videoTypes';
import questionTypesOptions from 'components/admin/question/schema/question-types';
import {
  canUserEditChildrenOfEnrolmentPlanProgram,
  canUserOnlyAddOnlineOnlyCreditToEnrolmentPlanProgram,
} from 'components/admin/enrolment-plan/common';
import { isExam, isExamTemplate } from 'common/learn';
import { t, t1 } from 'translate';
import get from 'lodash.get';
import { groupByKey } from 'common/utils/Array';
import img_excel from './excel.png';

/************questions****************/
// node is an exercise
const getAvailableQuestionTypes = (schoolConfigs, mode = 'exercise') => {
  const childrenTypes = [];

  let key;
  switch (mode) {
    case 'exam':
      key = 'exam_questions_enable';
      break;
    case 'survey':
      key = 'survey_questions_enable';
      break;
    default:
      key = 'exercise_questions_enable';
  }

  const questionsEnable = schoolConfigs && schoolConfigs[key];

  if (!Array.isArray(questionsEnable) || !questionsEnable.length) {
    return childrenTypes;
  }

  questionTypesOptions.forEach((tpl) => {
    if (!questionsEnable.includes(tpl.value)) {
      return;
    }

    childrenTypes.push({
      ntype: mode === 'survey' ? 'survey-question' : 'question',
      subType: tpl.value,
      label: tpl.label,
      avatar: tpl.avatar,
    });
  });

  return childrenTypes;
};

/******************exercise***********************/
const getAvailableExerciseTypes = (schoolConfigs, isExam) => {
  if (isExam) {
    return [
      {
        ntype: 'exercise',
        subType: 'exam',
        label: t1('exam'),
      },
    ];
  }

  const childrenTypes = [];
  templateOptionsExercise().forEach((tpl) => {
    if (
      schoolConfigs &&
      Array.isArray(schoolConfigs.exercises_enable) &&
      schoolConfigs.exercises_enable.indexOf(tpl.value) !== -1
    ) {
      const ntype =
        tpl.value === templateTypesExercise.TYPE_ROLEPLAY
          ? 'vocabset'
          : 'exercise';
      childrenTypes.push({
        ntype,
        subType: tpl.value,
        label: tpl.label,
      });
    }
  });

  return childrenTypes;
};

const getExerciseChildrenTypes = (schoolConfigs, node) => {
  // check if type is speaking => we can add only vocabset too
  if (
    node &&
    node.speaking &&
    ['dictation', 'roleplay'].indexOf(node.speaking_type) !== -1
  ) {
    return getVocabsetTypes();
  }

  if (isExam(node) || isExamTemplate(node)) {
    return getAvailableQuestionTypes(schoolConfigs, 'exam');
  }
  return getAvailableQuestionTypes(schoolConfigs, 'exercise');
};

/******************video***********************/

const getAvailableVideoTypes = (schoolConfigs) => {
  const childrenTypes = [];
  videoTypes().forEach((tpl) => {
    if (
      schoolConfigs &&
      Array.isArray(schoolConfigs.videos_enable) &&
      schoolConfigs.videos_enable.indexOf(tpl.value) !== -1
    ) {
      childrenTypes.push({
        ntype: 'video',
        subType: tpl.value,
        label: tpl.label,
      });
    }
  });
  return childrenTypes;
};

/******************sco***********************/
const getAvailableScoTypes = (schoolConfigs, isExam, fieldEdit) => {
  if (isExam) {
    return [
      {
        ntype: 'sco',
        subType: 'exam',
        label: t1('exam'),
      },
    ];
  }

  const childrenTypes = [];
  templateOptionsSco().forEach((tpl) => {
    if (
      schoolConfigs &&
      Array.isArray(schoolConfigs.scos_enable) &&
      schoolConfigs.scos_enable.indexOf(tpl.value) !== -1
    ) {
      childrenTypes.push({
        ntype: 'sco',
        subType: tpl.value,
        label: tpl.label,
      });
    }
  });
  return childrenTypes;
};

const getScoChildrenTypes = (schoolConfigs, isExam, node, fieldEdit) => {
  if (isExam) {
    return [
      {
        ntype: 'exercise',
        subType: 'exam',
        label: `${t1('test')} (${t('exercise')})`,
      },
    ];
  }

  if (node && node.tpl_type === templateTypesSco.TYPE_GROUP_ASSIGNMENT) {
    return [
      {
        ntype: 'exercise',
        label: t1('exercise'),
      },
    ];
  }

  // aggregate video, exercise
  let childrenTypes = [];

  if (schoolConfigs.modules.indexOf('video') !== -1) {
    childrenTypes = childrenTypes.concat(getAvailableVideoTypes(schoolConfigs));
  }

  if (schoolConfigs.modules.indexOf('vocabset') !== -1) {
    childrenTypes = childrenTypes.concat(getVocabsetTypes());
  }

  if (schoolConfigs.modules.indexOf('exercise') !== -1) {
    childrenTypes = childrenTypes.concat(
      getAvailableExerciseTypes(schoolConfigs, isExam),
    );
  }

  // add scorm
  // if (
  //   schoolConfigs &&
  //   Array.isArray(schoolConfigs.scos_enable) &&
  //   schoolConfigs.scos_enable.indexOf('scorm') !== -1
  // ) {

  childrenTypes.push({
    ntype: 'sco',
    subType: templateTypesSco.TYPE_STANDARD,
    label: t1('chapter'),
  });
  childrenTypes.push({
    ntype: 'sco',
    subType: templateTypesSco.TYPE_SCORM,
    label: 'SCORM',
  });

  return childrenTypes;
};

/******************vocab & vocabset***********************/

const getVocabsetTypes = () => [
  {
    ntype: 'vocabset',
    label: t1('vocabset'),
  },
];

/******************survey***********************/

const getSurveyChildrenTypes = (schoolConfigs) =>
  getAvailableQuestionTypes(schoolConfigs, 'survey');

/******************syllabus***********************/

const getSyllabusChildrenTypes = (schoolConfigs, node, fieldEdit) => {
  if (node.isExam || node.is_exam) {
    return [
      {
        ntype: 'sco',
        subType: 'exam',
        label: t1('exam'),
      },
    ];
  }

  if (node.max_depth === 1) {
    // get video, vocabset, exercise
    return getScoChildrenTypes(schoolConfigs, false);
  }

  return getAvailableScoTypes(schoolConfigs, node.isExam, fieldEdit);
};

/******************program & path***********************/
const getPathChildrenTypes = (node, domainInfo) => {
  switch (node.type) {
    case allNtype.PROGRAM: {
      if (isEnrolmentPlanProgram(node)) {
        if (canUserEditChildrenOfEnrolmentPlanProgram(node)) {
          return [
            {
              ntype: 'path',
              subType: allNtype.PROGRAM,
              label: t1('program'),
            },
            /*...(canUserOnlyAddOnlineOnlyCreditToEnrolmentPlanProgram(node)
              ? [
                  {
                    ntype: 'syllabus-online-only',
                    subType: 'credit',
                    label: t1('subject'),
                  },
                ]
              : [
                  {
                    ntype: 'syllabus',
                    subType: 'credit',
                    label: t1('subject'),
                  },
                ]),*/
          ];
        }
        return [];
      }

      const childrenTypes = [
        /*{
          ntype: 'syllabus',
          subType: 'credit',
          label: t1('subject'),
        },*/
      ];

      if (get(domainInfo, 'conf.program_module_enable')) {
        childrenTypes.push({
          ntype: 'path',
          subType: allNtype.PROGRAM_MODULE,
          label: t1('program_module'),
        });
      }

      if (get(domainInfo, 'school.type') === schoolTypes.ENTERPRISE) {
        return childrenTypes;
      }

      // add specialization program if it's SIS
      if (
        Array.isArray(node.metadata) &&
        node.metadata.length &&
        node.metadata.find(
          (row) => row.type === allNtype.SPECIALIZATION_PROGRAM,
        )
      ) {
        return childrenTypes;
      }

      return [
        {
          ntype: 'path',
          subType: allNtype.SPECIALIZATION_PROGRAM,
          label: t1('program_specialization'),
        },
      ].concat(childrenTypes);
    }
    case allNtype.SPECIALIZATION_PROGRAM: {
      return [
        {
          ntype: 'path',
          subType: allNtype.PROGRAM_MODULE,
          label: t1('program_module'),
        },
      ];
    }
    case allNtype.PROGRAM_MODULE: {
      return [
        {
          ntype: 'path',
          subType: allNtype.PROGRAM_MODULE,
          label: t1('program_module'),
        },
        {
          ntype: 'syllabus',
          subType: 'credit',
          label: t1('subject'),
        },
      ];
    }
    case allNtype.CLASS_GROUP: {
      return [
        {
          ntype: 'course',
          label: t1('course'),
          subType: 'classgroup',
        },
      ];
    }
    case allNtype.SUBJECT_GROUP: {
      return [
        {
          ntype: 'syllabus',
          subType: 'credit',
          label: t1('subject'),
        },
      ];
    }
    case 'plan': {
      return [
        {
          ntype: 'path',
          subType: 'semester',
          label: t1('semester'),
        },
      ];
    }
    default: {
      return [
        {
          ntype: 'path',
          label: t1('path'),
        },
        {
          ntype: 'course',
          label: t1('course'),
        },
      ];
    }
  }
};

/******************skill***********************/

/*
 return [
 {
 ntype: 'exercise',
 subType: 'exam',
 label: 'exam exercise',
 }

 ]
 */
const getSkillTypes = (node) => {
  if ([skillType.PMD_RUBRIC, skillType.RUBRIC].includes(get(node, 'type'))) {
    return [
      {
        ntype: 'skill',
        subType: skillType.RUBRIC,
        label: t1('rubric'),
      },
    ];
  }

  return [
    {
      ntype: 'skill',
      subType: skillType.SKILL,
      label: t1('skill'),
    },
  ];
};

const getLearningItemsToAddToSkill = (schoolConfigs, fieldEdit) => {
  const childrenTypes = [];
  let items;
  switch (fieldEdit) {
    case 'entry_items':
    case 'output_items':
      items = [
        {
          ntype: 'sco',
          subType: 'exam',
          label: t1('sco_exam'),
        },
        {
          ntype: 'sco',
          subType: 'exam',
          label: t1('exercise_exam'),
        },
      ];
      break;
    case 'practice_items':
      items = [
        {
          ntype: 'sco',
          label: t1('sco'),
        },
        {
          ntype: 'exercise',
          label: t1('exercise'),
        },
      ];
      break;
    case 'apply_items':
      items = [
        {
          ntype: 'exercise',
          subType: 'applied', // apply skill at work
          label: t1('applied_exercise'),
        },
      ];
      break;
    case 'refresh_items':
      items = [
        {
          ntype: 'sco',
          label: t1('sco'),
        },
        {
          ntype: 'exercise',
          label: t1('exercise'),
        },
      ];
      break;

    case 'learning_items':
    default:
      items = [
        {
          ntype: 'path',
          subType: 'program',
          label: t1('program'),
        },
        {
          ntype: 'syllabus',
          subType: 'credit',
          label: t1('subject'),
        },
        {
          ntype: 'sco',
          label: t1('sco'),
        },
        ...(getAvailableVideoTypes(schoolConfigs) || []),
        {
          ntype: 'exercise',
          label: t1('exercise'),
        },
        {
          ntype: 'vocabset',
          label: t1('vocabset'),
        },
        {
          ntype: 'vocab',
          label: t1('vocab'),
        },
      ];
      break;
  }

  items.forEach((item) => {
    if (fieldEdit === 'learning_items') {
      const supportedLearningItemsInSkill =
        (schoolConfigs && schoolConfigs.supported_learning_items_in_skill) ||
        [];

      if (
        (item.subType &&
          supportedLearningItemsInSkill.indexOf(item.subType) !== -1) ||
        (typeof item.subType === 'undefined' &&
          supportedLearningItemsInSkill.indexOf(item.ntype) !== -1)
      ) {
        childrenTypes.push(item);
      }
    } else if (item.ntype === 'exercise') {
      if (schoolConfigs.modules.indexOf(item.ntype) !== -1) {
        if (
          typeof item.subType === 'undefined' ||
          schoolConfigs.exercises_enable.indexOf(item.subType) !== -1
        ) {
          childrenTypes.push(item);
        }
      }
    } else if (
      (item.subType && schoolConfigs.modules.indexOf(item.subType) !== -1) ||
      (typeof item.subType === 'undefined' &&
        schoolConfigs.modules.indexOf(item.ntype) !== -1)
    ) {
      childrenTypes.push(item);
    }
  });

  return childrenTypes;
};

//
const getGoalChildrenTypes = (node) => [
  {
    ntype: 'zm',
    label: t1('zm'),
  },
];

const getZmChildrenTypes = (node) => [
  {
    ntype: 'skill',
    label: t1('skill'),
  },
];

/******************common function***********************/

const getChildrenTypes = (
  domainInfo,
  node,
  fieldEdit,
  rootItemNtype,
  depth,
  itemAncestors,
  checkIfEnableExamTemplate = false,
) => {
  const schoolConfigs = domainInfo ? domainInfo.school : {};

  // in screen edit enroment plan program, you can only select program or credit syllabuses but cannot edit here
  if (
    (itemAncestors || []).find(isEnrolmentPlanProgram) &&
    !isEnrolmentPlanProgram(node)
  ) {
    return [];
  }

  // default fieldEdit would be 'metadata';
  switch (fieldEdit) {
    // editing skills of a node. Then we can only add skill
    case 'skills':
      if (node.ntype === 'skill') return [];
      return getSkillTypes(null);
    case 'learning_items':
    case 'practice_items':
    case 'entry_items':
    case 'output_items':
    case 'apply_items':
    case 'refresh_items':
      return getLearningItemsToAddToSkill(schoolConfigs, fieldEdit);
    default:
      break;
  }

  let childrenTypes = [];
  switch (node.ntype) {
    case 'syllabus':
      if (node.type === 'credit' && rootItemNtype === 'path') {
        // adding credit syllabus to path, we don't wanna expand the syllabus in this view
        return childrenTypes;
      }
      childrenTypes = getSyllabusChildrenTypes(schoolConfigs, node, fieldEdit);
      if (
        Array.isArray(childrenTypes) &&
        childrenTypes.find((op) => op.subType === 'exam') &&
        checkIfEnableExamTemplate
      ) {
        return childrenTypes.concat([
          {
            label: t1('exam'),
            ntype: 'sco',
            subType: 'exam-by-template',
          },
        ]);
      }
      return childrenTypes;
    case 'sco':
      return getScoChildrenTypes(
        schoolConfigs,
        node.isExam || node.tpl_type === 'exam',
        node,
      );
    case 'exercise':
      childrenTypes = getExerciseChildrenTypes(schoolConfigs, node);
      if (
        !['children', 'metadata'].includes(fieldEdit) ||
        !Array.isArray(childrenTypes) ||
        !childrenTypes.length
      ) {
        return childrenTypes;
      }

      // return childrenTypes;
      return [
        {
          label: t1('import_questions'),
          ntype: 'question',
          subType: 'import',
          avatar: img_excel,
        },
      ].concat(childrenTypes);
    case 'exam-template':
    case 'question-bank':
      return getExerciseChildrenTypes(schoolConfigs, node);
    case 'video':
      return [];
    case 'question':
      return [];
    case 'vocabset':
      return [
        {
          ntype: 'vocab',
          label: 'vocab',
        },
      ];
    case 'skill':
      return getSkillTypes(node);
    case 'path':
      return getPathChildrenTypes(node, domainInfo);
    case 'goal':
      return getGoalChildrenTypes(node);
    case 'zm':
      return getZmChildrenTypes(node);
    case 'survey':
      return getSurveyChildrenTypes(schoolConfigs);
    default:
      break;
  }

  return [];
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
export const groupSimilarChildren = (childrenTypes, ntypes = null) => {
  if (!Array.isArray(childrenTypes) || childrenTypes.length < 1) {
    return [];
  }

  const childrenTypeGroupByNtype = groupByKey(childrenTypes, 'ntype');
  const ntypesToGroup = Object.keys(childrenTypeGroupByNtype);

  if (Array.isArray(ntypesToGroup) && ntypesToGroup.length === 1) {
    return childrenTypeGroupByNtype[ntypesToGroup[0]];
  }

  let ret = [];
  ntypesToGroup.forEach((ntype) => {
    const childrenTypeByNtype = childrenTypeGroupByNtype[ntype];
    if (!Array.isArray(childrenTypeByNtype) || !childrenTypeByNtype.length) {
      return;
    } else if (
      childrenTypeByNtype.length === 1 ||
      (Array.isArray(ntypes) && !ntypes.includes(ntype))
    ) {
      ret = ret.concat(childrenTypeByNtype);
      return;
    }

    ret.push({
      label: ntype === 'video' ? t1('add_lecture') : t(`add_${ntype}`),
      ntype,
      options: childrenTypeByNtype,
    });
  });
  return ret;
};

export default getChildrenTypes;
