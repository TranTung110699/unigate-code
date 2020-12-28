import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/admin/enrolment-plan/mainstage/not-started-learners/search/index';

class NotStartedLearners extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <Search
        formid={`not_started_learners_${node && node.iid}`}
        trainingPlan={node}
      />
    );
  }
}

NotStartedLearners.propTypes = {
  node: PropTypes.shape(),
};

NotStartedLearners.defaultProps = {
  node: {},
};

export default NotStartedLearners;
