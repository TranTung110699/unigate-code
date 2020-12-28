import SurveysSearch from 'components/admin/user/schema/elements/surveys-search';
import SurveysSelection from 'components/admin/user/schema/elements/surveys-selection';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const surveys = (
  formid,
  statuses = ['approved'],
  itemIidsToAvoidDuplicateApplication,
) => ({
  type: InputAutoComplete,
  fieldSearch: 'name',
  nameElement: 'survey',
  name: 'survey',
  componentElementSearch: SurveysSearch,
  componentElementEditor: SurveysSelection,
  baseUrl: sApiUrls.survey_search,
  shouldNotMergeParamsToSearchPropsHiddenFields: true,
  elementSearchProps: {
    hiddenFields: {
      item_iids_to_avoid_duplicate_application: itemIidsToAvoidDuplicateApplication,
      exclude_statuses: ['deleted'],
      ...(statuses ? { status: statuses } : {}),
    },
  },
  params: {
    item_iids_to_avoid_duplicate_application: itemIidsToAvoidDuplicateApplication,
    exclude_statuses: ['deleted'],
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
  floatingLabelText: t1('survey'),
  hintText: t1('survey'),
});

export default surveys;
