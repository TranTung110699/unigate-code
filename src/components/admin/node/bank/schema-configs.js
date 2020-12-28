import course from 'components/admin/course/schema/form';
import question from 'components/admin/question/schema/form';
import sco from 'components/admin/sco/schema/form';
import syllabus from 'components/admin/syllabus/schema/form';
import path from 'components/admin/path/schema/form';
import category from 'components/admin/pds/schema/form';
import skill from 'components/admin/skill/schema/form';
import video from 'components/admin/video/schema/form';
import exercise from 'components/admin/exercise/schema/form';
import vocabset from 'components/admin/vocabset/schema/form';
import vocab from 'components/admin/vocab/schema/form';

const configs = {
  course,
  category,
  exercise,
  question,
  syllabus,
  sco,
  skill,
  video,
  vocabset,
  vocab,
  path,
};

const getBankNtypeSchema = (ntype) => {
  return configs[ntype] || {};
};

export default getBankNtypeSchema;
