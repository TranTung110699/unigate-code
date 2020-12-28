import React from 'react';
import PropTypes from 'prop-types';
import Search from './search';

class NotStartedLearners extends React.Component {
  columnsNotToShow = ['enrolment_plan'];

  render() {
    const { node } = this.props;
    return (
      <Search
        formid={`not_started_learners_${node && node.iid}`}
        node={node}
        columnsNotToShow={this.columnsNotToShow}
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
