import React from 'react';
import PropTypes from 'prop-types';

import LearningProgressChart from './sections/learning-progress-chart';
import PassedFailedRatioChart from './sections/passed-failed-ratio-chart';
import RatingStarsChart from './sections/rating-stars-chart';

class Results extends React.Component {
  render() {
    const { items } = this.props;

    const containerStyle = {
      height: 'auto',
      width: 'auto',
      margin: '0 auto',
    };
    return (
      <div className="sections" style={containerStyle}>
        <div className="row">
          <div className="col-md-6">
            <PassedFailedRatioChart data={items.overall_passed_failed_ratio} />
          </div>
          <div className="col-md-6">
            <RatingStarsChart data={items.overall_rating_stars} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-t-20">
            <LearningProgressChart data={items.overall_learning_progress} />
          </div>
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
