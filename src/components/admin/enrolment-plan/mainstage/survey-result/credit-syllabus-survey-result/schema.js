import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import { required } from 'common/validators';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { batchInsertId } from '../common/schema-elements';

const schema = (formid, values) => ({
  survey_iid: {
    type: 'select',
    floatingLabelText: t1('survey'),
    floatingLabelFixed: true,
    fullWidth: true,
    options: 'async',
    validate: [required()],
    paramsasync: {
      key: values.enrolment_plan_iid,
      __url__: apiUrls.get_surveys_targeting_enrolment_plan_credit_syllabuses,
      value: {
        enrolment_plan_iid: values.enrolment_plan_iid,
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        return data.map((row) => ({
          value: lodashGet(row, 'survey.iid'),
          primaryText: lodashGet(row, 'survey.name'),
        }));
      },
    },
  },
  batch_insert_id: batchInsertId(
    formid,
    values.enrolment_plan_iid,
    values.survey_iid,
    values.newestBatchInsertIdFromServer,
  ),
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['survey_iid', 'batch_insert_id'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
