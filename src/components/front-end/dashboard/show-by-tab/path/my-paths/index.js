import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import { Link } from 'react-router-dom';
import Loading from 'components/common/loading';
import { loadingStatuses } from 'configs/constants';
import PropTypes from 'prop-types';

import './../../stylesheet.scss';

class MyPaths extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch, mode, node } = params;
    const url = apiUrls.dashboard_configs(mode);
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: mode },
        { user_iid: node && node.iid },
      ),
    );
  }

  render() {
    const { myPaths, loadingStatus, display } = this.props;
    return (
      <div className="my-paths">
        <div className="row">
          <div className="col-md-12">
            <h3 className="uppercase">{t1('my_paths')}</h3>
          </div>
          {loadingStatus && loadingStatus === loadingStatuses.LOADING && (
            <Loading blackLoadingIcon />
          )}
          {(!loadingStatus || loadingStatus === loadingStatuses.FINISHED) && (
            <div>
              {myPaths && myPaths.length > 0 && (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-condensed">
                      <thead>
                        <th>{t1('code')}</th>
                        <th>{t1('path_name')}</th>
                        <th>{t1('number_of_courses')}</th>
                        <th>{t1('progress')}</th>
                      </thead>
                      <tbody>
                        {myPaths.map((item) => (
                          <tr>
                            <td>{item.iid}</td>
                            <td>
                              <Link
                                className={
                                  display === 'view-only'
                                    ? 'admin-disable-link'
                                    : ''
                                }
                                to={`/learn/course-list/${item.iid}`}
                              >
                                {item.name}
                              </Link>
                            </td>
                            <td>{item.count_course}</td>
                            <td>{item.p} %</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {(!myPaths || myPaths.length === 0) && (
                <div className="col-md-12">
                  <p>{t1('there_are_no_paths_yet')}.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

MyPaths.propTypes = {
  myPaths: PropTypes.arrayOf(PropTypes.any),
};

MyPaths.defaultProps = {
  myPaths: [],
};

const mapStateToProps = (state) => {
  const mode = 'myPaths';
  const myPaths = state.dataApiResults[mode];

  return {
    mode,
    myPaths,
    loadingStatus:
      state.loading && state.loading.status ? state.loading.status : null,
  };
};

export default connect(mapStateToProps)(MyPaths);
