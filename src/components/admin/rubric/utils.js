import React from 'react';
import { t1 } from 'translate';

export const allRubricSubTypes = {
  RUBRIC_FORMULA_WEIGHTED_AVERAGE: 'weighted_average',
  RUBRIC_FORMULA_BEST_CHILD: 'best_child',
  RUBRIC_FORMULA_ATTENDANCE_ONLINE: 'attendance_online',
  RUBRIC_FORMULA_ATTENDANCE_OFFLINE: 'attendance_offline',
  RUBRIC_FORMULA_EXERCISE_COMPUTER_GRADED: 'exercise_computer_graded_only',
  RUBRIC_FORMULA_EXERCISE_AVERAGE: 'exercise_average',
  RUBRIC_FORMULA_SYLLABUS_SCORE: 'syllabus_score',
  RUBRIC_FORMULA_LAST_EXERCISE: 'last_exercise',

  RUBRIC_FORMULA_OPEN_ENDED_SCORE: 'open_ended_score',
  RUBRIC_FORMULA_TAKE_SURVEY: 'take_survey',
  RUBRIC_FORMULA_MANUAL_INPUT: 'manual_input',

  RUBRIC_PASS_COMMON_AND_AT_LEAST_ONE_OTHER_SUBJECT:
    'pass_common_and_at_least_one_other_subject',
  RUBRIC_PASS_ALL_ENROLMENT_PLANS_IN_TP: 'pass_all_enrolment_plans_in_tp',

  RUBRIC_PASS_ALL_COURSES_ASSIGNED: 'pass_all_courses_assigned',
};

export const FormulaHelp = (type) => {
  switch (type) {
    case allRubricSubTypes.RUBRIC_FORMULA_WEIGHTED_AVERAGE:
      return t1('rubric_score_will_be_based_on_the_score_of_the_children');
      break;

    case allRubricSubTypes.RUBRIC_FORMULA_BEST_CHILD:
      return t1('rubric_score_will_be_the_best_score_of_all_of_its_children');
      break;

    case allRubricSubTypes.RUBRIC_FORMULA_ATTENDANCE_OFFLINE:
      return (
        <div>
          {t1(
            'score_will_be_automatically_calculated_from_offline_sessions_attendance',
          )}
        </div>
      );

      break;
    case allRubricSubTypes.RUBRIC_FORMULA_ATTENDANCE_ONLINE:
      return t1(
        'score_will_be_automatically_calculated_from_completion_progress_of_syllabus_online_items',
      );
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_OPEN_ENDED_SCORE:
      return t1(
        'score_will_be_the_score_of_open_ended_questions_in_the_online_syllabus',
      );
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_EXERCISE_COMPUTER_GRADED:
      return t1('score_will_be_the_score_of_all_computer_graded_exercises');
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_EXERCISE_AVERAGE:
      return t1('score_will_be_the_average_of_all_exercises');
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_LAST_EXERCISE:
      return t1('score_will_be_the_score_of_the_last_exercise_in_the_syllabus');
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_TAKE_SURVEY:
      return t1('user_only_pass_if_he_has_taken_survey');
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_MANUAL_INPUT:
      return t1('score_will_be_enter_manually_be_teacher');
      break;
    case allRubricSubTypes.RUBRIC_FORMULA_SYLLABUS_SCORE:
      return t1('score_will_simply_be_the_progress_of_syllabus');
      break;
    case allRubricSubTypes.RUBRIC_PASS_COMMON_AND_AT_LEAST_ONE_OTHER_SUBJECT:
      return t1('pass_common_and_at_least_one_other_subject');
      break;
    case allRubricSubTypes.RUBRIC_PASS_ALL_ENROLMENT_PLANS_IN_TP:
      return t1('pass_all_enrolment_plans_in_training_plan');
      break;
    case allRubricSubTypes.RUBRIC_PASS_ALL_COURSES_ASSIGNED:
      return t1('pass_all_courses_assigned');
      break;
    default:
      return type;
  }
};

export const rubricTypes = (enables) => {
  const options = [
    {
      value: 'normal_rubric',
      label: t1('normal'),
      primaryText: t1('normal'),
    },
    {
      value: 'pmd_rubric',
      label: t1('pmd'),
      primaryText: t1('pmd'),
    },
  ];

  if (!Array.isArray(enables)) {
    return options;
  }
  return options.filter((item) => enables.includes(item.value));
};

/**
 * sub_type is where the scores come from
 * @param enables array<string>[attenance, academic_score, test]
 * @returns {*[]}
 */
export const rubricSubTypes = (enables, { sub_type, metadata } = {}) => {
  if (sub_type === 'attendance') {
    const currentSubTypes = Array.isArray(metadata)
      ? metadata.map((chil) => chil.sub_type)
      : [];
    return ['attendance_online', 'attendance_offline']
      .filter((x) => !currentSubTypes.includes(x))
      .map((x) => {
        return {
          value: x,
          label: t1(x),
          primaryText: t1(x),
        };
      });
  }

  return enables.map((x) => {
    return {
      value: x,
      label: t1(x),
      primaryText: t1(x),
      guide: FormulaHelp(x),
    };
  });
};
