import React from 'react';
import { t1 } from 'translate';
import { templateTypes } from 'components/admin/sco/schema/tpl-types';

const ItemTextExplanation = ({ ntype, subType, link }) => {
  const descriptionList = {
    [templateTypes.TYPE_STANDARD]:
      'a_wrapping_layer,_containing_other_learning_items._sco_represents_a_learning_unit_serving_in_credit_syllabus,_small_enough_to_learn_in_short-term,_big_enough_to_deliver_learning_materials_in_term_of_quantity,_quality_and_duration.',
    [templateTypes.TYPE_SCORM]:
      'shareable_content_object_reference_model_(scorm)_is_a_collection_of_standards_and_specifications_for_web-based_e-learning._it_is_a_self-contained,_portable_package,_typically_under_.zip_format._older_scorm_versions_requires_flash_player_to_be_used,_modern_ones_can_be_learned_natively_in_any_web_browser_which_support_html5._in_lotuslms,_scorm_can_be_used_as_a_typical_sco.',
    [templateTypes.TYPE_GROUP_ASSIGNMENT]: 'group_assignment',
    [templateTypes.TYPE_EXAM]: `a_sco_which_contains_one_or_many_collection_of_questions_from_different_types_(multiple_choice,_open_ended,_inline,_etc.)_to_test_student's_knowledge_or_skill_in_a_particular_subject.`,
    video:
      'a_media_lecture_which_utilizes_a_video_to_present_knowledge_to_the_audience._lotuslms_supports_playing_videos_hosted_in_popular_services_(youtube,_vimeo)_or_self-hosted_cdn_server.',
    text:
      'a_lecture_which_utilizes_rich-text_and_multimedia_content_to_present_knowledge._this_type_of_lecture_can_take_advantage_of_paragraphs_with_inline_images,_tables,_etc.',
    pdf:
      'a_lecture_which_utilizes_pdf_files_to_present_knowledge._lotuslms_recommends_using_pdf_with_landscape_layout_for_optimized_viewing,_thus_learning,_experience_in_web,_and_portrait_layout_for_mobile_devices.',
    examByTemplate:
      'an_exam,_being_generated_automatically_by_lotuslms_based_on_a_pre-definded_exam_template_(including_question_bank,_passing_definition_and_exam_generating_structure)',
    image:
      'a_lecture_which_utilizes_and_takes_benefit_from_large_images._sketches,_maps,_diagrams_and_graphs_are_encouraged_to_fit_here.',
    examExercise: `a_collection_of_questions_from_different_types_(multiple_choice,_open_ended,_inline,_etc.)_to_test_student's_knowledge_or_skill_in_a_particular_subject.`,
    exercise:
      'a_collection_of_questions_from_different_types_(multiple_choice,_open_ended,_inline,_etc.)_to_help_student_taking_a_graphs_of_concepts,_practicing_and_better_understanding_of_the_related_subject.',
  };

  if (subType === 'exam-by-template') {
    subType = 'examByTemplate';
  }
  if (ntype === 'exercise') {
    if (subType === 'exam') {
      subType = 'examExercise';
    } else {
      subType = 'exercise';
    }
  }

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

export default ItemTextExplanation;
