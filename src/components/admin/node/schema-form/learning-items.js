import syllabusSchema from 'components/admin/syllabus/schema/form';
import scoSchema from 'components/admin/sco/schema/form';
import videoSchema from 'components/admin/video/schema/form';
import exerciseSchema from 'components/admin/exercise/schema/form';
import questionSchema from 'components/admin/question/schema/form';
import pathSchema from 'components/admin/path/schema/form';
import courseSchema from 'components/admin/course/schema/form';
import vocabsetSchema from 'components/admin/vocabset/schema/form';
import vocabSchema from 'components/admin/vocab/schema/form';

export const getLearningItemFormSchema = (ntype) => {
  switch (ntype) {
    case 'syllabus': {
      return syllabusSchema;
    }
    case 'sco': {
      return scoSchema;
    }
    case 'exercise': {
      return exerciseSchema;
    }
    case 'question': {
      return questionSchema;
    }
    case 'video': {
      return videoSchema;
    }
    case 'path': {
      return pathSchema;
    }
    case 'vocabset': {
      return vocabsetSchema;
    }
    case 'vocab': {
      return vocabSchema;
    }
    case 'course': {
      return courseSchema;
    }
  }
};
