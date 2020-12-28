import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LayoutHelper from 'layouts/LayoutHelper';
import { t3 } from 'translate';
import { DefinedUrlParams } from 'routes/links/common';
import Perm from 'common/utils/Perm';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import ImageBackGround from 'components/common/views/image-background';
import { layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import PropTypes from 'prop-types';
import DashboardShowByTab from './show-by-tab/Layout';
import AssignedCourses from './courses/assigned';
import InProgressCourses from './courses/in-progress';
import OpenCourses from './courses/open';
import CompletedCourses from './courses/completed';
import UmsDashboard from './ums/index';
import get from 'lodash.get';

import './stylesheet.scss';

class DashboardLayout extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  renderContent = () => {
    const { themeConfig } = this.props;
    const { userInfo, isGuest } = this.props;
    // if (isGuest) {
    //   return <Redirect to={getUrl('/')} />;
    // }

    if (
      themeConfig.layout === layouts.LOTUS ||
      themeConfig.layout === layouts.EVN ||
      themeConfig.layout === layouts.GJ
    )
      return <DashboardShowByTab {...this.props} />;

    if (themeConfig.layout === layouts.UMS)
      return (
        <div>
          <UmsDashboard {...this.props} />
        </div>
      );

    return (
      <div>
        <FlyPanel breakPoint={445}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround
          width="100%"
          height={445}
          src="/media/images/pixelz/dashboard.png"
        >
          <Menu />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                {themeConfig.layout === layouts.PIXELZ ? (
                  <h3 className="uppercase dashboard-header">
                    {userInfo && userInfo.name}
                    <br />
                    TRAINING DASHBOARD
                  </h3>
                ) : (
                  <h3>{t3('dashboard')}</h3>
                )}
              </div>
            </div>
          </div>
        </ImageBackGround>
        <div className="dashboard">
          <div className="container">
            {!isGuest && (
              <div className="row">
                <AssignedCourses />
                <InProgressCourses />
                <CompletedCourses />
              </div>
            )}
          </div>
          <OpenCourses />
        </div>
      </div>
    );
  };

  render() {
    const { userInfo } = this.props;
    const titleHelmet = `${userInfo && userInfo.name}'s training dashboard`;

    // TODO: Pagination
    return (
      <div>
        <Helmet title={titleHelmet} />

        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userInfo = state.user.info;
  const isGuest = Perm.isGuest();

  const action = get(props, 'match.params.dashboard');
  const type = get(props, `match.params[${DefinedUrlParams.NTYPE}]`);
  const params = get(props, 'match.params');

  return {
    action,
    type,
    params,
    userInfo,
    isGuest,
    themeConfig: getThemeConfig(state),
  };
};

DashboardLayout.propTypes = {
  userInfo: PropTypes.instanceOf(Object),
  isGuest: PropTypes.bool,
};

DashboardLayout.defaultProps = {
  userInfo: null,
  isGuest: true,
};

export default connect(mapStateToProps)(connect()(DashboardLayout));
