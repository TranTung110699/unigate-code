import React from 'react';
import { connect } from 'react-redux';
import { t3 } from 'translate';
import apiUrls from 'api-endpoints';
import Loading from 'components/common/loading';
import sagaActions from 'actions/node/saga-creators';
import ExampleCourses from './viewer/index';
import './stylesheet.scss';

const slugPathExampleCourse = 'list_featured_courses_or_path';

class Courses extends React.Component {
  componentWillMount() {
    this.onFetchExampleCourses(this.props);
  }

  cssClass = 'lotus-home-page-courses';

  onFetchExampleCourses(props) {
    const { dispatch } = props;
    const params = {
      slug: slugPathExampleCourse,
      ntype: 'path',
      depth: -1,
      editing_syllabus: 1,
    };
    const url = apiUrls.fetch_node;
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: slugPathExampleCourse },
        params,
      ),
    );
  }

  render() {
    const { data } = this.props;
    const title = t3('sample_courses');
    return (
      <div className={this.cssClass}>
        <div className="container">
          <div
            className={`${this.cssClass}__title col-12
           col-lg-offset-1 col-lg-10 col-lg-offset-1
            col-xl-offset-1 col-xl-10 col-xl-offset-1`}
          >
            {title}
          </div>
        </div>
        <div className={`${this.cssClass}__content`}>
          {data ? <ExampleCourses data={data} /> : <Loading />}
        </div>
      </div>
    );
  }
}

Courses.propTypes = {};
Courses.defaultProps = {};

const mapStateToProps = (state) => {
  const data = state.dataApiResults[slugPathExampleCourse];
  return {
    data,
  };
};

export default connect(mapStateToProps)(Courses);
