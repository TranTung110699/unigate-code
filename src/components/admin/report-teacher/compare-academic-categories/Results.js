import React from 'react';
import PropTypes from 'prop-types';

import LearningProgressChart from './sections/learning-progress-chart';
import PassedFailedRatioChart from './sections/passed-failed-ratio-chart';
import RatingStarsChart from './sections/rating-stars-chart';

class Results extends React.Component {
  render() {
    let { items } = this.props;
    items = items.map((item) => ({
      ...item,
      averageLearningTimeOfLearners: parseFloat(
        (item.spent_time / item.no_of_learners).toFixed(1),
      ),
      averageLearningTimeOfAllUsers: parseFloat(
        (item.spent_time / item.no_of_users).toFixed(1),
      ),
    }));

    const containerStyle = {
      height: 'auto',
      width: 'auto',
      margin: '0 auto',
    };

    return (
      <div className="sections" style={containerStyle}>
        <div>
          <LearningProgressChart data={items} />
        </div>
        <div>
          <PassedFailedRatioChart data={items} />
        </div>
        <div>
          <RatingStarsChart data={items} />
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
