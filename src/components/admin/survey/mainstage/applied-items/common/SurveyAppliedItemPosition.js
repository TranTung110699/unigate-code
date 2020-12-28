import {
  courseSurveyAppliedPositionToText,
  creditSyllbusSurveyAppliedPositionToText,
  surveyAppliedItemTypes,
} from 'configs/constants/survey';
import lodashGet from 'lodash.get';

export default ({ item }) => {
  switch (lodashGet(item, 'type')) {
    case surveyAppliedItemTypes.COURSE: {
      return courseSurveyAppliedPositionToText(
        lodashGet(item, 'applied_position'),
      );
    }
    case surveyAppliedItemTypes.CREDIT_SYLLABUS: {
      return creditSyllbusSurveyAppliedPositionToText(
        lodashGet(item, 'applied_position'),
      );
    }
    default:
      return null;
  }
};
