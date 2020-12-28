import React from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import { types as questionTypes } from 'components/admin/question/schema/question-types';

const templateStructuresLayout = ({
  xpath,
  formValues,
  node,
  numberOfQuestions,
  ...props
}) => {
  const formGroupValues = get(formValues, xpath);
  const questionType = get(formGroupValues, 'question_type');
  const nrOfQuestions = get(formGroupValues, 'nr_of_questions');

  return [
    <div className="flex-container-wrap elementGroup">
      <div className="flex-item">
        {get(props, 'groups.groups.fieldNames.question_type')}
      </div>
      {get(props, 'groups.groups.fieldNames.question_iid') ? (
        <div className="flex-item">
          {get(props, 'groups.groups.fieldNames.question_iid')}
        </div>
      ) : (
        [
          <div className="flex-item">
            {get(props, 'groups.groups.fieldNames.nr_of_questions')}
          </div>,
          <div className="flex-item">
            {get(props, 'groups.groups.fieldNames.score')}
          </div>,
          <div className="flex-item">
            {get(props, 'groups.groups.fieldNames.difficulty')}
          </div>,
          get(props, 'groups.groups.fieldNames.categories') && (
            <div className="flex-item">
              {get(props, 'groups.groups.fieldNames.categories')}
            </div>
          ),
          get(props, 'groups.groups.fieldNames.levels') && (
            <div className="flex-item">
              {get(props, 'groups.groups.fieldNames.levels')}
            </div>
          ),
          get(props, 'groups.groups.fieldNames.skills') && (
            <div className="flex-item">
              {get(props, 'groups.groups.fieldNames.skills')}
            </div>
          ),
          get(props, 'groups.groups.fieldNames.display_by_group') && (
            <div className="flex-item m-t-35">
              {get(props, 'groups.groups.fieldNames.display_by_group')}
            </div>
          ),
        ]
      )}
    </div>,
    get(node, 'iid') &&
      Array.isArray(questionType) &&
      questionType.length &&
      !questionType.includes(questionTypes.TYPE_INTRODUCTION) && (
        <p
          className={`col-md-12`}
          style={
            nrOfQuestions && numberOfQuestions < nrOfQuestions
              ? { color: 'red' }
              : {}
          }
        >
          {t1('%s_valid_questions_with_conditions', [numberOfQuestions || 0])}
        </p>
      ),
  ];
};

export default fetchData((props) => ({
  baseUrl: 'question/api/get-number-of-questions-selected-to-create-exercise',
  params: (() => {
    const xpath = get(props, 'xpath');
    const formGroupValues = get(props, `formValues.${xpath}`);
    const fieldsRender = get(props, 'layoutOptionsProperties.fields') || [];

    const params = {
      exam_template_iid: get(props, 'node.iid'),
      question_type: get(formGroupValues, 'question_type'),
      difficulty: get(formGroupValues, 'difficulty'),
    };

    fieldsRender.forEach((field) => {
      params[field] = get(formGroupValues, field);
    });

    return params;
  })(),
  propKey: 'numberOfQuestions',
  fetchCondition: (() => {
    if (!get(props, 'node.iid')) {
      return false;
    }
    const xpath = get(props, 'xpath');
    const formGroupValues = get(props, `formValues.${xpath}`);
    const questionType = get(formGroupValues, 'question_type');

    return (
      Array.isArray(questionType) &&
      questionType.length &&
      !questionType.includes(questionTypes.TYPE_INTRODUCTION)
    );
  })(),
  refetchCondition: (prevProps) => {
    if (!get(props, 'node.iid')) {
      return false;
    }

    const xpath = get(props, 'xpath');
    const formGroupValues = get(props, `formValues.${xpath}`);
    const questionType = get(formGroupValues, 'question_type');

    if (
      !Array.isArray(questionType) ||
      !questionType.length ||
      questionType.includes(questionTypes.TYPE_INTRODUCTION)
    ) {
      return false;
    }

    const prevFormGroupValues = get(prevProps, `formValues.${xpath}`);

    return (
      !isEqual(
        get(formGroupValues, 'question_type'),
        get(prevFormGroupValues, 'question_type'),
      ) ||
      !isEqual(
        get(formGroupValues, 'difficulty'),
        get(prevFormGroupValues, 'difficulty'),
      ) ||
      !isEqual(
        get(formGroupValues, 'skills'),
        get(prevFormGroupValues, 'skills'),
      ) ||
      !isEqual(
        get(formGroupValues, 'levels'),
        get(prevFormGroupValues, 'levels'),
      ) ||
      !isEqual(
        get(formGroupValues, 'categories'),
        get(prevFormGroupValues, 'categories'),
      )
    );
  },
}))(templateStructuresLayout);
