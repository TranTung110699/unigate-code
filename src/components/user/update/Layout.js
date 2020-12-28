import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t3 } from 'translate';
import { DefinedUrlParams } from 'routes/links/common';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import Perm from 'common/utils/Perm';
import { layouts } from 'configs/constants';
import DashboardProfile from 'components/user/profile';
import Profile from 'components/user/profile/Profile';
import AvatarLayout from 'components/user/profile/AvatarLayout';
import ChangePassword from 'components/user/profile/ChangePassword';
import { getThemeConfig } from 'utils/selectors';
import { loginSuccess } from 'actions/auth';
import { withRouter } from 'react-router';
import { getOption } from './configs/stepOptions';
import Nav from './nav';
import './Layout.scss';
import MyOrder from '../profile/MyOrder';

class UserUpdateLayout extends React.Component {
  cssClass = 'front-end-user-update-layout';

  componentDidMount() {
    const { history } = this.props;
    if (Perm.isGuest()) {
      history.push('/');
    }
    window.scrollTo(0, 0);
    this.getUserInfo();
  }

  getUserInfoAction = () => {
    const { dispatch } = this.props;
    const config = {
      url: apiUrls.user_info,
      keyState: 'userInfo',
      executeOnSuccess: (user) => {
        dispatch(
          loginSuccess(user, [
            'id',
            'iid',
            'name',
            'avatar',
            'code',
            'settings',
          ]),
        );
      },
    };

    return nodeSagaActions.getDataRequest(config, {});
  };

  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch(this.getUserInfoAction());
  };

  render() {
    const { screenSize, user, step, updateType, themeConfig } = this.props;
    const option = getOption(step, user);
    const MainComponent = option && option.component;

    if (!user || !MainComponent) return null;

    if (themeConfig.layout !== layouts.XPEAK) {
      if (updateType === 'avatar') {
        return (
          <AvatarLayout
            {...this.props}
            actionsToDoOnSuccess={[this.getUserInfoAction()]}
            requestSuccessful={this.getUserInfo}
          />
        );
      } else if (updateType === 'change-password') {
        return <ChangePassword {...this.props} />;
      } else if (window.isETEP) {
        return <DashboardProfile {...this.props} />;
      } else if (updateType === 'my-order') {
        return <MyOrder {...this.props} />;
      }

      const hiddenFields = {
        school_type: themeConfig && themeConfig.type,
      };

      return (
        <Profile
          {...this.props}
          hiddenFields={hiddenFields}
          step={updateType === 'setting' ? updateType : null}
          actionsToDoOnSuccess={[this.getUserInfoAction()]}
        />
      );
    }

    return (
      <div className="clearfix">
        <FlyPanel breakPoint={250}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround
          width={screenSize.width}
          height={250}
          src="/media/images/account.png"
        >
          <Menu />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>{t3('update_account')}</h3>
              </div>
            </div>
          </div>
        </ImageBackGround>
        <div className={this.cssClass}>
          <div className="container">
            <div className={`${this.cssClass}__nav col-md-4`}>
              <Nav user={user} optionId={option.id} />
            </div>
            <div className={`${this.cssClass}__main col-md-8`}>
              <div className={`${this.cssClass}__main-title col-md-8`}>
                {t3(option.label)}
              </div>
              <div className="col-md-12">
                <MainComponent
                  actionsToDoOnSuccess={[this.getUserInfoAction()]}
                  key={option.id}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserUpdateLayout.propTypes = {
  screenSize: PropTypes.shape().isRequired,
  step: PropTypes.string,
  user: PropTypes.shape(),
};

UserUpdateLayout.defaultProps = {
  user: null,
  step: '',
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const step = match && match.params && match.params[DefinedUrlParams.STEP];

  const userInfoFromApi = state.dataApiResults && state.dataApiResults.userInfo;

  return {
    screenSize: state.common.screenSize,
    user: userInfoFromApi || {},
    step,
    themeConfig: getThemeConfig(state),
  };
};

export default withRouter(connect(mapStateToProps)(UserUpdateLayout));
