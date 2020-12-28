import Question from 'schema-form/elements/question';

export default {
  schema: (formid, values) => ({
    answer: {
      shouldShowQuestionHeader: false,
      shouldShowQuestionNumber: false,
      shouldShowQuestionHelpText: false,
      type: Question,
      question: values.question,
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['answer'],
    },
  ],
};
