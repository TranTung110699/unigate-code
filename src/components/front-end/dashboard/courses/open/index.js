import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { t1, t2 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import FlatButton from 'components/common/mui/FlatButton';
import Links from 'routes/links';
import Xpeak from './images/xpeak.png';
import './stylesheet.scss';

class Open extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: false,
    };
  }

  componentWillMount() {
    this.getFeaturedCourses();
  }

  getFeaturedCourses() {
    this.fetchCourses('featuredCourses');
  }

  getPublicCourses() {
    this.fetchCourses('publicCourses', 4);
  }

  fetchCourses(mode, itemsPerPage) {
    const { dispatch } = this.props;
    const url = apiUrls.dashboard_configs(mode, itemsPerPage);
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: 'publicOrFeaturedCoursesOnDashboard' },
        {},
      ),
    );
    if (typeof itemsPerPage !== 'undefined') {
      this.setState({
        loadMore: true,
      });
    }
  }

  checkExistImage(url) {
    const png = 'png';
    const jpg = 'jpg';
    if (url.includes(png) || url.includes(jpg)) {
      return true;
    }
    return false;
  }

  render() {
    const { courseList, rootPathIid } = this.props;
    return (
      <div>
        <div
          className="bg-secondary padding-b-80 padding-t-60 open-course"
          id="choosingPlan"
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="uppercase">{t2('open_course')}</h3>
              </div>
            </div>
            <div className="row mb32 mb-xs-24">
              <div className="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 text-center">
                {courseList && courseList.length > 0 ? (
                  <p>{t1('upgrade_yourself_with_these_open_courses')}.</p>
                ) : (
                  <p>{t1('there_are_no_open_courses_yet')}.</p>
                )}
              </div>
            </div>
            {courseList && courseList.length > 0 && (
              <div className="row mb40">
                {courseList.map((item, index) => (
                  <div
                    className="col-sm-3 text-center course-box"
                    key={`open-course-${item.iid}-${index}`}
                  >
                    <Link to={Links.overviewCourseByPath(rootPathIid, item)}>
                      {item.avatar && this.checkExistImage(item.avatar) ? (
                        <img src={item.avatar} alt={item.avatar} />
                      ) : (
                        <img src={Xpeak} alt="xpeak" />
                      )}
                    </Link>
                    <div className="feature boxed mb0">
                      <p className="mb16">{item.name}</p>
                      <Link
                        to={Links.overviewCourseByPath(rootPathIid, item)}
                        className="btn btn-sm mb0"
                      >
                        {t1('go_to_course')}
                      </Link>
                    </div>
                  </div>
                ))}
                {!this.state.loadMore && (
                  <div className="text-center col-md-8 col-md-offset-2">
                    <FlatButton
                      label={t1('load_more_...')}
                      rippleColor="#92c36a"
                      hoverColor="#92c36a"
                      fullWidth
                      onClick={() => this.getPublicCourses()}
                      flatButton
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const courseList =
    state.dataApiResults['publicOrFeaturedCoursesOnDashboard'] || [];

  return {
    courseList,
  };
};

export default connect(mapStateToProps)(Open);
