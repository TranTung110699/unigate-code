import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';

class LearningItemsOfSession extends Component {
  render() {
    const {
      session,
      navsItemsInSessions,
      course,
      getLinkOfViewCreditSyllabusInSession,
      getLinkOfLearningItemsInSession,
    } = this.props;

    return (
      <span>
        {session.learning_items &&
          session.learning_items.map((learningItem, index) => (
            <div
              key={`learningItem-${session.id}-${learningItem.id}-${index}`}
              className="learning-item"
            >
              <Icon icon={learningItem.ntype} />
              <Link
                className="m-l-5"
                to={
                  learningItem && learningItem.iid === course.syllabus
                    ? getLinkOfViewCreditSyllabusInSession(
                        course.syllabus,
                        navsItemsInSessions,
                        session,
                      )
                    : getLinkOfLearningItemsInSession(
                        learningItem,
                        navsItemsInSessions,
                        session,
                      )
                }
                target="_blank"
              >
                <span>{learningItem.name}</span>
              </Link>
            </div>
          ))}
      </span>
    );
  }
}

export default LearningItemsOfSession;
