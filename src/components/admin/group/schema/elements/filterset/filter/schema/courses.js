import CoursesSearch from 'components/admin/user/schema/elements/courses-search';
import CoursesSelection from 'components/admin/user/schema/elements/courses-selection';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const courses = (
  formid,
  statuses = ['approved'],
  surveyIidsToAvoidDuplicateApplication,
  orgIids,
) => ({
  type: InputAutoComplete,
  fieldSearch: 'name',
  nameElement: 'course',
  name: 'course',
  componentElementSearch: CoursesSearch,
  componentElementEditor: CoursesSelection,
  baseUrl: apiUrls.course_search,
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
  params: {
    survey_iids_to_avoid_duplicate_application: surveyIidsToAvoidDuplicateApplication,
    exclude_statuses: ['deleted'],
    organizations: orgIids,
    status: statuses,
  },

  dataSourceConfig: {
    text: 'key',
    value: 'data',
    transformData: (res) =>
      res
        .map((data) => {
          return {
            key: `${data.name} ${data.code ? `(${data.code})` : ''}`,
            data,
          };
        })
        .filter(Boolean),
  },
  fullWidth: true,
  floatingLabelText: t1('course'),
  hintText: t1('course'),
});

export default courses;
