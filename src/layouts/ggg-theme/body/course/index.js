import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import Links from 'routes/links';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import Image from 'common/images/default-learning-material-avatar.png';
import './stylesheet.scss';

class Course extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch, mode, itemsPerPage } = params;
    const url = apiUrls.dashboard_configs(mode, itemsPerPage);
    dispatch(sagaActions.getDataRequest({ url, keyState: mode }, {}));
  }

  render() {
    const { openCourses, rootPathIid } = this.props;

    return (
      <div className="section home-courses-wrapper">
        <div className="course">
          <div className="container">
            <div className="row">
              <h3 className="text-transform text-center margin-top-0 course-title course-title">
                khóa học
              </h3>
              {openCourses &&
                openCourses.length > 0 &&
                openCourses.map((item) => (
                  <div className="col-md-4 col-sm-6">
                    <div className="course-box">
                      <div className="box-image">
                        <Link
                          to={Links.overviewCourseByPath(rootPathIid, item)}
                        >
                          {item.avatar ? (
                            <img src={item.avatar} alt={item.avatar} />
                          ) : (
                            <img src={Image} alt="" />
                          )}
                        </Link>
                        <div className="box-time">
                          <div className="date col-md-6 col-xs-6">
                            {timestampToDateString(item.ts, '-')}
                          </div>
                          <div className="time col-md-6 col-xs-6">
                            {item.duration || '00:00'}
                          </div>
                        </div>
                      </div>
                      <div className="box-description">
                        <Link
                          to={Links.overviewCourseByPath(rootPathIid, item)}
                        >
                          <h3>{item.name}</h3>
                        </Link>
                        <p dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                      <div className="box-price">
                        <button className="text-transform right">
                          {item.price && item.price !== 0
                            ? item.price
                            : t1('free')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const location = window.location.href;
  const tmp = location.split('/').splice(3, 1);
  const mode = 'openCourses';
  let itemsPerPage;

  {
    tmp[0] !== 'dashboard' && (itemsPerPage = 3);
  }

  const openCourses = state.dataApiResults[mode] || [];

  return {
    mode,
    itemsPerPage,
    openCourses,
  };
};

export default connect(mapStateToProps)(Course);
