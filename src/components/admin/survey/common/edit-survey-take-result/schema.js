import Question from 'schema-form/elements/question';
import RTE from 'schema-form/elements/richtext';

export default {
  schema: (formid, values) => {
    const questions = (values.questions || []).filter(Boolean);

    return {
      comment: {
        type: RTE,
        fullWidth: true,
      },
      answers: {
        type: 'section',
        schema: {
          schema: questions.reduce(
            (schema, q) => ({
              ...schema,
              [q.iid]: {
                type: 'section',
                schema: {
                  schema: {
                    answer: {
                      shouldShowQuestionHeader: false,
                      shouldShowQuestionNumber: false,
                      shouldShowQuestionHelpText: false,
                      type: Question,
                      question: q,
                    },
                  },
                  ui: () => [
                    {
                      id: 'default',
                      fields: ['answer'],
                    },
                  ],
                },
              },
            }),
            {},
          ),
          ui: () => [
            {
              id: 'default',
              fields: questions.map((q) => q.iid),
            },
          ],
        },
      },
    };
  },
  ui: () => [
    {
      id: 'default',
      fields: ['answers', 'comment'],
    },
  ],
  finalProcessBeforeSubmit: (fullData) => {
    return Object.assign(fullData, {
      questions: null,
    });
  },
};
