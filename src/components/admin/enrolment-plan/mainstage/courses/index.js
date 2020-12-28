import React from 'react';
import PropTypes from 'prop-types';
import Search from './search';
import { connect } from 'react-redux';
import { getSearchFormId } from './common';

class EnrolmentPlanCourses extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <Search
        formid={getSearchFormId(node)}
        node={node}
        columnsNotToShow={['status']}
      />
    );
  }
}

EnrolmentPlanCourses.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanCourses.defaultProps = {
  className: '',
};

export default connect()(EnrolmentPlanCourses);
