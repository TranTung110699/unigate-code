import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from './search';
import SyncProgress from 'components/admin/enrolment-plan/mainstage/syncer';

class LearnersProgressWrapper extends React.Component {
  render() {
    const { node } = this.props;

    return [
      <SyncProgress node={node} />,
      <Search formid="learners_progress" node={node} noSearchForm />,
    ];
  }
}

LearnersProgressWrapper.propTypes = {
  node: PropTypes.shape(),
};

LearnersProgressWrapper.defaultProps = {
  node: {},
};

export default connect()(LearnersProgressWrapper);
