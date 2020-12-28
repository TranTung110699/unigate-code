import React from 'react';
import { t1 } from 'translate';
import { types as questionTypes } from 'components/admin/question/schema/question-types';

const QuestionTextExplanation = ({ ntype, subType, link }) => {
  const descriptionList = {
    [questionTypes.TYPE_INLINE]:
      'a_type_of_question_which_is_a_flexible_and_extensible_form_of_free_response_question_that_can_include_multiple_response_cells._lotuslms_supports_in_line_typing_and_in_line_dropdown_list_questions._this_type_of_question_is_not_recommended_for_high_accuracy_demanding_question.',
    [questionTypes.TYPE_MC]:
      'a_type_of_question_which_is_a_form_of_an_objective_assessment_in_which_students_are_asked_to_select_one_or_some_correct_answers_from_the_choices_offered_as_a_list.',
    [questionTypes.TYPE_REORDER]:
      'a_type_of_question_which_is_broken_down_to_small_pieces_of_information,_student_is_required_to_reorder_said_pieces_to_the_correct_order._this_type_of_question_is_ideal_for_learning_new_language,_workflow,_etc.',
    [questionTypes.TYPE_MATCHING_PAIRS]:
      'a_type_of_question_which_includes_two_adjacent_lists_of_related_words,_phrases,_pictures,_or_symbols._each_item_in_one_list_is_paired_with_one_item_in_the_other_list._matching_may_be_considered_to_be_a_variant_of_multiple-choice_in_which_more_than_one_choice_is_correct.',
    [questionTypes.TYPE_OPEN_ENDED]: `a_type_of_question_which_cannot_be_answered_with_a_"yes"_or_"no"_response,_or_with_a_static_response._open-ended_questions_are_phrased_as_a_statement_which_requires_a_response._in_lotuslms,_an_open-ended_question's_answer_needs_manual_marking,_performed_by_real_human,_to_get_result_(if_need_be).`,
    [questionTypes.TYPE_INTRODUCTION]: `a_special_question_which_contains_only_the_"asking"_part,_or_being_the_information_provider_item._it_can_be_used_as_a_guide,_some_warm-up_reading,_or_a_place-holding_common_question_for_another_questions_in_the_same_group._it_can_fully_utilize_all_of_lotuslms's_rich-text_features,_can_be_pinned_on_screen_for_better_reading.`,
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.ctrlKey) {
          prompt('Translate ID: ', descriptionList[subType]);
        }
      }}
    >
      {t1(descriptionList[subType])}
    </div>
  );
};

export default QuestionTextExplanation;
