import { timestampToDateTimeString } from 'common/utils/Date';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import apiUrls from 'components/admin/enrolment-plan/endpoints';

export const batchInsertId = (
  formid,
  enrolmentPlanIid,
  surveyIid,
  extraKeyParam, // an extra param to add to 'paramsasync.key' so that the options is re-fetched when it changes
) => ({
  type: 'select',
  floatingLabelText: t1('enrolment_plan_survey_insert_time'),
  floatingLabelFixed: true,
  fullWidth: true,
  options: 'async',
  paramsasync: {
    key: `batch_insert_id_options_${enrolmentPlanIid}_${surveyIid}_${extraKeyParam}`,
    __url__: apiUrls.get_enrolment_plan_surveys_batch_insert_options,
    value: {
      enrolment_plan_iid: enrolmentPlanIid,
      survey_iid: surveyIid,
    },
    transformData: (data) => {
      const allOption = {
        value: '',
        primaryText: t1('all'),
      };
      if (!Array.isArray(data) || !data.length) {
        return [allOption];
      }

      return [allOption].concat(
        data.map((row) => {
          const value = lodashGet(row, 'id');
          const numberToCreate = lodashGet(row, 'number_to_create');
          const createTimeAsText = timestampToDateTimeString(
            lodashGet(row, 'ts'),
          );

          const primaryText = lodashGet(row, 'import_id')
            ? t1('import_surveys_at_%s', [createTimeAsText])
            : t1('create_%s_surveys_at_%s', [numberToCreate, createTimeAsText]);

          return {
            value,
            primaryText,
          };
        }),
      );
    },
  },
});
