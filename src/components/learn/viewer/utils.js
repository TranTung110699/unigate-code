import { lectureType, ntype } from '../../../configs/constants';

export const getLectureContent = (learnItem, type = lectureType.VIDEO) => {
  if (learnItem && learnItem.ntype === ntype.VIDEO && learnItem.type === type) {
    return learnItem.content;
  }
  return '';
};
