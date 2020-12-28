import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Loading from 'components/common/loading';
import { withRouter } from 'react-router';
import { getRootUrl } from 'routes/links/common';
import './stylesheet.scss';
import lGet from 'lodash.get';
import Widget from 'components/common/Widget';
import { Link } from 'react-router-dom';
import { leftMenuSelector } from 'components/front-end/dashboard/show-by-tab/selectors';
import getMenus from 'components/front-end/dashboard/show-by-tab/left-menu/configs';
import { getThemeConfig } from 'utils/selectors';
import withUserInfo from 'common/hoc/withUserInfo';
import Icon from 'components/common/Icon';

class ProfileDashboard extends Component {
  render() {
    const { user, dashboardMenuConfigs, userInfo } = this.props;

    if (!user) return <Loading />;

    const pathname = lGet(this.props, 'match.path');
    const res = pathname.split('/');
    const path =
      res[res.length - 1] === 'update-info' ? 'profile' : res[res.length - 1];

    const menus = getMenus(dashboardMenuConfigs, null, null, path, userInfo, {
      fontSize: '500%',
      marginBottom: '20px',
    });

    let listMenuToShow = [];
    menus.map(
      (menu) => (listMenuToShow = listMenuToShow.concat(menu.children)),
    );

    if (!listMenuToShow) return null;

    return (
      <div>
        <div className="text-center m-b-10">
          <h1>
            <Icon icon="profile" antIcon /> {t1('manage_profile')}
          </h1>
        </div>
        <div className="container-fluid">
          <div className="flex-container-wrap">
            {listMenuToShow.map(({ href, icon, label }) => (
              <div className="col-md-4 flex-item ">
                <Widget className="text-center m-10">
                  <Link to={href} className="m-20">
                    <div>{icon}</div>
                    <div style={{ 'text-transform': 'uppercase' }}>{label}</div>
                  </Link>
                </Widget>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loadingStatus:
    state.loading && state.loading.status ? state.loading.status : null,
  rootUrl: getRootUrl(props),
  dashboardMenuConfigs: lGet(leftMenuSelector(state), 'dashboardMenuConfigs'),
  themeConfig: getThemeConfig(state),
  pathname: lGet(props, 'location.pathname'),
});

export default withRouter(
  connect(mapStateToProps)(withUserInfo(ProfileDashboard)),
);
