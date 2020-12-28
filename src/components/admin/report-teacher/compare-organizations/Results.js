import React from 'react';
import PropTypes from 'prop-types';

import NoOfCreditSyllabusesChart from './sections/no-of-credit-syllabuses-chart';
import LearningProgressChart from './sections/learning-progress-chart';
import PassedFailedRatioChart from './sections/passed-failed-ratio-chart';
import RatingStarsChart from './sections/rating-stars-chart';
import LearningTimeSpentChart from './sections/learning-time-spent-chart';

class Results extends React.Component {
  render() {
    let { items } = this.props;
    if (!items) {
      return <div />;
    }

    let maxLearningTime = 0;

    items = items
      .map((item) => {
        if (!item) {
          return null;
        }
        const averageLearningTimeOfLearnersOriginal = item.no_of_learners
          ? parseFloat(item.spent_time / item.no_of_learners)
          : 0;
        const averageLearningTimeOfAllUsersOriginal = item.no_of_users
          ? parseFloat(item.spent_time / item.no_of_users)
          : 0;
        maxLearningTime = Math.max(
          maxLearningTime,
          averageLearningTimeOfLearnersOriginal,
          averageLearningTimeOfAllUsersOriginal,
        );

        return {
          ...item,
          no_of_credit_syllabuses: item.no_of_credit_syllabuses || 0,
          averageLearningTimeOfLearners: averageLearningTimeOfLearnersOriginal.toFixed(
            1,
          ),
          averageLearningTimeOfLearnersByMinute: (
            averageLearningTimeOfLearnersOriginal * 60
          ).toFixed(1),
          averageLearningTimeOfAllUsers: averageLearningTimeOfAllUsersOriginal.toFixed(
            1,
          ),
          averageLearningTimeOfAllUsersByMinute: (
            averageLearningTimeOfAllUsersOriginal * 60
          ).toFixed(1),
        };
      })
      .filter(Boolean);

    const containerStyle = {
      height: 'auto',
      width: 'auto',
      margin: '0 auto',
    };

    return (
      <div className="sections" style={containerStyle}>
        <div>
          <NoOfCreditSyllabusesChart data={items} />
        </div>
        <div>
          <LearningProgressChart data={items} />
        </div>
        <div>
          <PassedFailedRatioChart data={items} />
        </div>
        <div>
          <RatingStarsChart data={items} />
        </div>
        <div>
          <LearningTimeSpentChart
            data={items}
            maxLearningTime={maxLearningTime}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};

Results.defaultProps = {
  items: [],
};

export default Results;
