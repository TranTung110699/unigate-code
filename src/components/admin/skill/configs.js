import React, { Component } from 'react';
import { constants } from 'configs/constants';
import { t1 } from 'translate';

export const aspects = [
  'learning_items',
  'practice_items',
  'entry_items',
  'output_items',
  'apply_items',
  'refresh_items',
];

export const skillOpToText = (skillOp) => {
  let ret = skillOp;
  constants.BeingOptions().forEach((option) => {
    if (option.value === skillOp) {
      ret = option.primaryText;
    }
  });
  return ret;
};

/**
 * Sometimes user has to take a survey in order to pass a course
 * This survey can come from different places like below
 *
 * @type {{TRAINING_PLAN: string, ENROLMENT_PLAN: string, GLOBAL_SURVEY: string, COURSE_SURVEY: string}}
 */
export const surveyTypes = {
  TRAINING_PLAN: 'tp',
  ENROLMENT_PLAN: 'ep',
  GLOBAL_SURVEY: 'global',
  COURSE_SURVEY: 'course',
  SPECIFIC_SURVEY_IID: 'specific_iid',
};
