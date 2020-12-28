import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { surveyStatuses } from 'configs/constants/survey';

import { rootRubricElement } from 'components/admin/rubric/schema/elements';

const schema = (formid, values) => {
  return {
    code: {
      type: 'text',
      hintText: t1('training_plan_code'),
      floatingLabelText: t1('training_plan_code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    name: {
      type: 'text',
      hintText: t1('training_plan_name'),
      floatingLabelText: t1('training_plan_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    start_date: {
      type: DatePicker,
      floatingLabelText: t1('from_date'),
      fullWidth: true,
      maxDate: values.end_date ? new Date(values.end_date * 1000) : undefined,
      getStartDate: true,
    },
    end_date: {
      type: DatePicker,
      floatingLabelText: t1('to_date'),
      fullWidth: true,
      minDate: values.start_date
        ? new Date(values.start_date * 1000)
        : undefined,
      getEndDate: true,
    },
    global_survey_application: {
      type: 'select',
      floatingLabelText: t1('global_survey_application'),
      options: 'async',
      multiple: true,
      paramsasync: {
        value: {
          items_per_page: -1,
          status: [surveyStatuses.APPROVED],
        },
        __url__: sApiUrls.survey_search,
        transformData: (result) =>
          Array.isArray(result)
            ? result.map((map) => ({
                value: map.iid,
                primaryText: map.name,
              }))
            : [],
      },
      fullWidth: true,
    },
    rubric_iid: rootRubricElement('training_plan'),
  };
};

const ui = (step, values) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: [
          'code',
          'name',
          'start_date',
          'end_date',
          'global_survey_application',
          'rubric_iid',
        ],
      },
    ],
    edit: [
      {
        id: 'default',
        fields: [
          'code',
          'name',
          'start_date',
          'end_date',
          'global_survey_application',
          'rubric_iid',
        ],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
