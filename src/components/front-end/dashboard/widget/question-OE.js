import React from 'react';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import List from 'antd/lib/list';
import get from 'lodash.get';
import { t1 } from 'translate';
import Html from 'components/common/html';
import Links from 'routes/links';
import ViewAnswer from 'components/common/forms/questions/open-ended/submission-area/viewAnswer';
import { Link } from 'react-router-dom';

const getDescriptionQuestion = (question) => {
  const answer = get(question, 'answer.content.0');
  const score = get(question, 'score');
  const course = get(question, 'course');
  return (
    <ul>
      <li>
        {`${t1('question_in_course')}: `}
        <Link title={t1('go_to_learning')} to={Links.overViewCourse(course)}>
          {get(course, 'name')}
        </Link>
      </li>
      {answer && (
        <li>
          <ViewAnswer answer={answer} showHeader={false} />
        </li>
      )}
      {typeof score !== 'undefined' && <li>{`${t1('score')}: ${score}`}</li>}
    </ul>
  );
};

const AssignmentQuestionOE = ({ courses }) => {
  if (!Array.isArray(courses) || !courses.length) {
    return <div className="text-center">{t1('no_open_ended_questions')}</div>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={courses.reduce((result, { questions, ...course }) => {
        const length = Array.isArray(questions) && questions.length;
        if (!length) {
          return result;
        }
        const questionIndex = result.length;

        return result.concat(
          questions.map((question, index) => {
            return {
              questionIndex: questionIndex + index,
              ...question,
              course,
            };
          }),
        );
      }, [])}
      renderItem={(item) => (
        <List.Item key={`${get(item, 'id')}_${get(item, 'course.iid')}`}>
          <List.Item.Meta
            title={<Html content={get(item, 'content')} />}
            description={getDescriptionQuestion(item)}
          />
        </List.Item>
      )}
    />
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_list_question_oe_assigned_in_course_of_user,
  propKey: 'courses',
  fetchCondition: true,
}))(AssignmentQuestionOE);
