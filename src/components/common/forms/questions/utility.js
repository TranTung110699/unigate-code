import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';

export const questionTakeState = (courseIid, questionId) =>
  `course-${courseIid}-question-${questionId}-take`;

const fetchAnswerAndFeedback = (props) => {
  const { isTesting, exam, userIid } = props;
  const question = props.question || {};
  const { dispatch, courseIid } = props;
  const url = apiUrls.getTakeDetail;

  let params = {
    course: courseIid,
    question_id: question.id,
  };

  if (userIid) {
    params = {
      ...params,
      userIid,
    };
  }

  if (isTesting) {
    params.exam = exam;
  }

  const keyState = questionTakeState(courseIid, question.id);

  dispatch(
    nodeSagaActions.getDataRequest(
      {
        url,
        keyState,
      },
      params,
    ),
  );
};

export default fetchAnswerAndFeedback;
