import CreditSyllabusSearch from 'components/admin/user/schema/elements/credit-syllabuses-search';
import CreditSyllabusSelection from 'components/admin/user/schema/elements/credit-syllabuses-selection';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import React from 'react';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const creditSyllabuses = (
  formid,
  statuses = ['approved'],
  surveyIidsToAvoidDuplicateApplication,
  orgIids,
) => ({
  type: InputAutoComplete,
  nameElement: 'credit_syllabuses',
  name: 'credit_syllabuses',
  componentElementSearch: CreditSyllabusSearch,
  componentElementEditor: CreditSyllabusSelection,
  shouldNotMergeParamsToSearchPropsHiddenFields: true,
  elementSearchProps: {
    surveyIidsToAvoidDuplicateApplication,
    orgIids,
    hiddenFields: {
      survey_iids_to_avoid_duplicate_application: surveyIidsToAvoidDuplicateApplication,
      exclude_statuses: ['deleted'],
      ...(statuses ? { status: statuses } : {}),
    },
  },
  baseUrl: apiUrls.syllabus_search,
  params: {
    type: 'credit',
    survey_iids_to_avoid_duplicate_application: surveyIidsToAvoidDuplicateApplication,
    exclude_statuses: ['deleted'],
    organizations: orgIids,
    status: statuses,
  },
  fieldSearch: 'name',
  dataSourceConfig: {
    text: 'key',
    value: 'data',
    transformData: 'name',
  },
  fullWidth: true,
  floatingLabelText: t1('credit_syllabuses'),
  hintText: t1('credit_syllabuses'),
});

export default creditSyllabuses;
