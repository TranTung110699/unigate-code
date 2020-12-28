import { statuses as examStatus } from 'common/learn';
import lodashGet from 'lodash.get';

export const examFinish = (course, learnInfo) =>
  (learnInfo && learnInfo.status === examStatus.FINISHED) ||
  (course && course.examStatus === examStatus.FINISHED);

export const examDoing = (course, learnInfo) =>
  course && course.examStatus === examStatus.DOING && !startedExam(learnInfo);

export const examRetake = (course, learnInfo) =>
  course && course.examStatus === examStatus.RETAKE && !startedExam(learnInfo);

export const examStart = (course, learnInfo) =>
  course && course.examStatus === examStatus.STARTED && !startedExam(learnInfo);

export const examInit = (course, learnInfo) =>
  course && course.examStatus === examStatus.INIT && !startedExam(learnInfo);

export const startedExam = (learnInfo) =>
  learnInfo &&
  [examStatus.STARTED, examStatus.DOING].includes(learnInfo.status);

// don't know why exam_round_info is a key in a course, but it is anyway
// we're trying to get no_fullscreen key
export const shouldNotGoFullscreen = (course) =>
  lodashGet(course, 'exam_round_info.no_fullscreen');
