import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import Links from 'routes/links';
import { scorePeriods } from 'configs/constants';
import { t1, t2 } from 'translate';
import './stylesheet.scss';

class Completed extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch, mode } = params;
    const url = apiUrls.dashboard_configs(mode);
    dispatch(sagaActions.getDataRequest({ url, keyState: mode }, {}));
  }

  getProgressClass(progress) {
    let progressClass = 'finish';

    if (!progress || progress <= scorePeriods.BAD) {
      progressClass = 'label-danger';
    } else if (progress > 10 && progress <= scorePeriods.IMPROVEMENT) {
      progressClass = 'label-warning';
    } else if (progress > 50 && progress < scorePeriods.FINISH) {
      progressClass = 'label-success';
    }

    return progressClass;
  }

  render() {
    const { completedCourses, rootPathIid } = this.props;
    return (
      <div className="completed-courses">
        {completedCourses && completedCourses.length > 0 && (
          <div className="col-md-12 col-sm-12 padding-b-40">
            <h4 className="uppercase mb40 text-center">
              {t2('completed_courses')}
            </h4>
            <table className="table mb0">
              <thead>
                <tr>
                  <th width="120px">{t1('date')}</th>
                  <th width="80px;">{t1('score')}</th>
                  <th>{t1('course')}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses &&
                  completedCourses.map((item) => (
                    <tr>
                      <td>{item.created_ts}</td>
                      <td>
                        <span
                          className={`label ${this.getProgressClass(item.p)}`}
                        >
                          {item.p}
                        </span>
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <Link
                          to={Links.overviewCourseByPath(rootPathIid, item)}
                          className="btn btn-sm mb0 pull-right"
                        >
                          {t1('go_to_course')}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mode = 'completedCourses';
  const completedCourses = state.dataApiResults[mode] || [];

  return {
    mode,
    completedCourses,
  };
};

export default connect(mapStateToProps)(Completed);
