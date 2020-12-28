import React from 'react';
import { t1 } from 'translate';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';

export const arrangeModes = {
  ALL_MEMBERS_TO_ALL_CREDIT_SYLLABUSES: 'all_members_to_all_credit_syllabuses',
  MEMBERS_TO_CREDIT_SYLLABUSES_WITH_MATCHING_ACADEMIC_CATEGORIES:
    'members_to_credit_syllabuses_with_matching_academic_categories',
};

export const arrangeModesToText = (m) => {
  const mapToText = {
    [arrangeModes.ALL_MEMBERS_TO_ALL_CREDIT_SYLLABUSES]: t1(
      'arrange_all_users_to_all_learn_all_courses',
    ),
    [arrangeModes.MEMBERS_TO_CREDIT_SYLLABUSES_WITH_MATCHING_ACADEMIC_CATEGORIES]: t1(
      'arrange_all_users_to_their_respective_academic_category_courses',
    ),
  };
  return mapToText[m];
};

export const arrangeModeOptions = convertListOfValuesIntoOptionsForFormElement(
  Object.values(arrangeModes),
  arrangeModesToText,
);
