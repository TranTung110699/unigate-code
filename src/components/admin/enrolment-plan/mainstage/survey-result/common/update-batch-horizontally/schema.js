import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Question from 'schema-form/elements/question';

export default {
  schema: (formid, values) => {
    return {
      question_id: {
        type: 'select',
        floatingLabelText: t1('question'),
        floatingLabelFixed: true,
        fullWidth: true,
        options: (values.questions || []).map((q, index) => ({
          value: lodashGet(q, 'id'),
          primaryText: String(index + 1),
        })),
      },
      answer: {
        shouldShowQuestionHeader: false,
        shouldShowQuestionNumber: false,
        shouldShowQuestionHelpText: false,
        type: Question,
        question: (values.questions || []).find(
          (q) => lodashGet(q, 'id') === values.question_id,
        ),
      },
    };
  },
  ui: () => [
    {
      id: 'default',
      fields: ['question_id', 'answer'],
    },
  ],
  finalProcessBeforeSubmit: (fullData) => {
    const questions = lodashGet(fullData, 'questions');
    const questionId = lodashGet(fullData, 'question_id');

    return Object.assign(fullData, {
      questions: null,
      question: (questions || []).find(
        (q) => lodashGet(q, 'id') === questionId,
      ),
    });
  },
};
