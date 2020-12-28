import { t1 } from 'translate';
import { change } from 'redux-form';
import {
  courseSurveyAppliedPositionOptions,
  creditSyllabusSurveyAppliedPositionOptions,
  creditSyllabusSurveyAppliedPositions,
  surveyAppliedItemTypeOptions,
  surveyAppliedItemTypes,
} from 'configs/constants/survey';
import creditSyllabuses from 'components/admin/group/schema/elements/filterset/filter/schema/creditSyllabuses';
import courses from 'components/admin/group/schema/elements/filterset/filter/schema/courses';
import surveys from 'components/admin/group/schema/elements/filterset/filter/schema/surveys';
import Store from 'store';
import lodashGet from 'lodash.get';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    type: {
      type: 'select',
      floatingLabelText: t1('type'),
      floatingLabelFixed: true,
      options: surveyAppliedItemTypeOptions(),
      defaultValue: surveyAppliedItemTypes.COURSE,
      fullWidth: true,
      onChange: (event, value) =>
        Store.dispatch(change(formid, 'item_iids', null)),
    },
    item_iids:
      values.type === 'semester'
        ? {
            type: 'cascade',
            floatingLabelText: t1('form_of_training'),
            schema: getMajorBoxSchema({
              displayFields: ['school_year', 'semester'],
              forSearch: false,
              multiple: true,
            }),
          }
        : values.type === surveyAppliedItemTypes.COURSE
        ? courses(formid, null, values.survey_iids, props.orgIids)
        : creditSyllabuses(formid, null, values.survey_iids, props.orgIids),
    survey_iids: surveys(formid, null, values.item_iids),
    applied_position: {
      type: 'select',
      floatingLabelText: t1('apply_at'),
      floatingLabelFixed: true,
      options:
        values.type === surveyAppliedItemTypes.COURSE
          ? courseSurveyAppliedPositionOptions()
          : creditSyllabusSurveyAppliedPositionOptions(),
      defaultValue: creditSyllabusSurveyAppliedPositions.END,
      fullWidth: true,
    },
  };
};

const ui = (step, values) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: [
          'type',
          'item_iids',
          values.type !== 'semester' && 'applied_position',
        ].filter(Boolean),
      },
    ],
    new_add_surveys_to_applied_item: [
      {
        id: 'default',
        fields: [
          'survey_iids',
          values.type !== 'semester' && 'applied_position',
        ].filter(Boolean),
      },
    ],
    edit_applied_position: [
      {
        id: 'default',
        fields: ['applied_position'],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: '',
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  const semesters = lodashGet(fullData, 'semester');
  if (
    !lodashGet(fullData, 'item_iids') &&
    Array.isArray(semesters) &&
    semesters.length
  ) {
    fullData.item_iids = semesters;
  }

  let returnedData = fullData || {};
  ['item_iids', 'survey_iids'].forEach((key) => {
    if (Array.isArray(lodashGet(fullData, key))) {
      returnedData = {
        ...returnedData,
        [key]: lodashGet(fullData, key).map((item) =>
          ['string', 'number'].includes(typeof item)
            ? item
            : lodashGet(item, 'iid'),
        ),
      };
    }
  });
  return returnedData;
};

export default { schema, ui, layout, finalProcessBeforeSubmit };
