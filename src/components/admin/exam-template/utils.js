import { types as questionTypes } from '../question/schema/question-types';

// v: question types selected within a group
export const tplGroupContainsIntro = (v) => {
  if (v && v.length && v.includes(questionTypes.TYPE_INTRODUCTION)) return true;
  else return false;
};

export const bankUrl = (node) => `/admin/exam-template/${node.iid}/bank`;

export const importBankUrl = (node) =>
  `/admin/exam-template/${node.iid}/bank-import`;

export const addBankUrl = (node) => `/admin/exam-template/${node.iid}/bank-add`;

export const bankPracticeSyllabusUrl = (node) =>
  `/admin/exam-template/${node.iid}/bank-practice-course`;
