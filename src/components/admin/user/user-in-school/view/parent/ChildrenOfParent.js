import React, { Component } from 'react';
import { getThemeConfigSelector } from 'utils/selector';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import { t1 } from 'translate';
import RequestAbsenceByDate from './RequestAbsenceByDate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import './stylesheet.scss';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import Locations from 'components/admin/bus/edit/Locations';
import Drivers from 'components/admin/bus/edit/Drivers';
import get from 'lodash.get';

class ChildrenOfParent extends Component {
  componentDidMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const { dispatch, user } = this.props;
    const url = apiUrls.get_detail(user, 'user');

    const params = {
      iid: user && user.iid,
    };

    dispatch(
      sagaActions.getDataRequest({ url, keyState: 'user_detail' }, params),
    );
  };

  render() {
    const { userDetail } = this.props;

    const dashboardActions = [
      // 'in-progress-courses',
      // 'compulsory-courses',
      // 'public-courses',
      // 'assigned-courses',
      // 'rejected-courses',
      // 'timetable',
      'report-attendance',
      'feedback',
      'completed-courses',
      'failed-courses',
      // 'my-paths',
      'my-enrolment-plans',
      // 'my-skills',
      'upcoming-contests',
      'taken-contests',
      'timetable',
      'overview-timetable',
      'assignments',
      'transcript',
    ];

    return (
      <div className="children-of-parent-wrapper">
        {userDetail && userDetail.info_of_children && (
          <div className="table-responsive">
            {userDetail &&
              userDetail.info_of_children &&
              userDetail.info_of_children.map((childOfParent, index) => {
                const bus = get(childOfParent, 'bus', []);
                return (
                  <div className={'container-fluid'}>
                    <div className={'row'}>
                      <div className={'col-md-3'}>
                        <h1>
                          <b>{childOfParent.name}</b>
                        </h1>

                        {childOfParent && childOfParent.avatar ? (
                          <img
                            src={childOfParent.avatar}
                            style={{ maxHeight: '200px' }}
                          />
                        ) : null}

                        <div>
                          {childOfParent && childOfParent.code && (
                            <div>
                              {t1('code')}: <b>{childOfParent.code}</b>
                            </div>
                          )}

                          {childOfParent &&
                            childOfParent.school &&
                            childOfParent.school.grade && (
                              <div>
                                {t1('grade')}:{' '}
                                <b>{childOfParent.school.grade}</b>
                              </div>
                            )}
                          {childOfParent &&
                            childOfParent.school &&
                            childOfParent.school.grade_name && (
                              <div>
                                {t1('class')}:{' '}
                                <b>{childOfParent.school.grade_name}</b>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className={'col-md-9'}>
                        <h1>{t1('learning_progress')}</h1>
                        <List>
                          {dashboardActions &&
                            dashboardActions.map((dashboardAction, index) => {
                              const dashboardActionText = t1(
                                dashboardAction.replace(/-/g, '_'),
                              );

                              return (
                                <ListItem>
                                  <Link
                                    to={Links.viewChildrenOfParentProgress(
                                      childOfParent.iid,
                                      dashboardAction,
                                    )}
                                  >
                                    {index + 1}. {dashboardActionText}
                                  </Link>
                                </ListItem>
                              );
                            })}
                        </List>

                        <h1>{t1('bus_route_information')}</h1>
                        {bus && bus.length
                          ? bus.map((item) => (
                              <div style={{ padding: 10 }}>
                                <Locations item={item} />
                                <div style={{ padding: 10 }}>
                                  {t1('drivers')}
                                  <Drivers item={item} />
                                </div>
                              </div>
                            ))
                          : t1('no_bus')}

                        <h1>{t1('request_for_absence')}</h1>
                        <RequestAbsenceByDate user={childOfParent} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userDetail = state.dataApiResults.user_detail || [];

  return {
    themeConfig: getThemeConfigSelector(state),
    userDetail: userDetail,
  };
};

export default connect(mapStateToProps)(ChildrenOfParent);
