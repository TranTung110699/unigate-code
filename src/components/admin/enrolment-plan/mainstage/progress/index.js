import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from './search';

class LearnersProgressWrapper extends React.Component {
  render() {
    const { node } = this.props;

    return [<Search formid="progress" node={node} noSearchForm />];
  }
}

LearnersProgressWrapper.propTypes = {
  node: PropTypes.shape(),
};

LearnersProgressWrapper.defaultProps = {
  node: {},
};

export default connect()(LearnersProgressWrapper);
