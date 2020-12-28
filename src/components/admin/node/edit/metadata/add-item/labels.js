import { t } from 'translate';
import { questionTypeInText } from 'components/admin/question/schema/question-types';

export const genAddItemLabel = (ntype, subType) => {
  if (ntype == 'sco') {
    if (subType == 'standard') return t('standard_sco');
    else if (subType == 'scorm') return 'SCORM';
    else if (subType == 'group_assignment') return t('group_assignment');
    else if (subType == 'exam') return t('exam_sco');
    else if (subType == 'exam-by-template') return t('exam_by_template');
  } else if (ntype == 'video') {
    if (subType == 'video') return t('video');
    else if (subType == 'pdf') return 'PDF';
    else if (subType == 'image') return t('image');
    else if (subType == 'text') return t('text');
  } else if (ntype == 'exercise') {
    if (subType == 'exam') return t('exam_exercise');
    else return t('exercise');
  } else if (ntype == 'question') {
    if (subType == 'import') return t('import_excel');
    else return questionTypeInText(subType);
  }
};
