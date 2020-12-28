import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import Links from 'routes/links';
import { t1, t2 } from 'translate';
import './stylesheet.scss';

class Assigned extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch, mode } = params;
    const url = apiUrls.dashboard_configs(mode);
    dispatch(sagaActions.getDataRequest({ url, keyState: mode }, {}));
  }

  autoAccepted = (courseIid) => {
    const { dispatch } = this.props;
    const url = '/user/index/invite-course';
    const param = { course: courseIid, act: 'accept' };
    dispatch(sagaActions.submitFormRequest('', { extraParams: param, url }));
  };

  render() {
    const { assignedCourses, rootPathIid } = this.props;
    return (
      <div className="assigned-courses">
        {assignedCourses && assignedCourses.length > 0 && (
          <div className="col-md-12 col-sm-12 padding-b-40">
            <h4 className="uppercase m-b-40 text-center">
              {t2('assigned_course')}
            </h4>
            {assignedCourses &&
              assignedCourses.map((item) => (
                <div className="bs-callout bs-callout-primary">
                  <Link
                    to={Links.overviewCourseByPath(rootPathIid, item)}
                    className="btn pull-right"
                    onClick={() => this.autoAccepted(item.iid)}
                  >
                    {' '}
                    {t2('take_course')}
                  </Link>
                  <h4>{item.name}</h4>
                  <strong>{t1('created')} :</strong> {item.created_ts}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mode = 'assignedCourses';
  const assignedCourses = state.dataApiResults[mode] || [];

  return {
    mode,
    assignedCourses,
  };
};

export default connect(mapStateToProps)(Assigned);
