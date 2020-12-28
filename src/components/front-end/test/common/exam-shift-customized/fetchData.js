import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { ntype } from 'configs/constants';
import actions from 'actions/node/creators';

const fetchData = (Component) => {
  class Wrapped extends React.Component {
    componentWillMount() {
      const { dispatch, iid } = this.props;
      dispatch(
        actions.fetchNode({
          iid,
          ntype: ntype.COURSE,
          depth: 0,
          executeOnSuccess: (course) => this.fetchSyllabus(course),
        }),
      );
    }

    fetchSyllabus = (course) => {
      const { dispatch } = this.props;
      dispatch(
        actions.fetchNode({
          iid: course.syllabus,
          ntype: ntype.SYLLABUS,
          depth: 0,
        }),
      );
    };

    render() {
      const { course, syllabus } = this.props;
      return <Component {...this.props} course={course} syllabus={syllabus} />;
    }
  }

  Wrapped.propTypes = {
    course: PropTypes.shape(),
    syllabus: PropTypes.shape(),
  };

  Wrapped.defaultProps = {
    course: null,
    syllabus: null,
  };

  const mapStateToProps = (state, props) => {
    const { iid } = props;
    const course = getNodeSelector(state)(iid, null, 0);
    const syllabus =
      course &&
      course.syllabus &&
      getNodeSelector(state)(course.syllabus, null, 0);
    return {
      course,
      syllabus,
    };
  };

  return connect(mapStateToProps)(Wrapped);
};

export default fetchData;
