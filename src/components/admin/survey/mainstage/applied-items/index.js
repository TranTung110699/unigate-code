import React from 'react';
import PropTypes from 'prop-types';
import Search from './search';
import { connect } from 'react-redux';
import { getSearchFormId } from './common';

class SurveyAppliedItems extends React.Component {
  render() {
    const { node } = this.props;
    return <Search formid={getSearchFormId(node)} node={node} />;
  }
}

SurveyAppliedItems.propTypes = {
  className: PropTypes.string,
};

SurveyAppliedItems.defaultProps = {
  className: '',
};

export default connect()(SurveyAppliedItems);
