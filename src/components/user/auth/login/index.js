import React, { Component } from 'react';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { getConf } from 'utils/selectors/index';
import Perm from 'common/utils/Perm';
import LayoutHelper from 'layouts/LayoutHelper';
import Configuration from 'configs/configuration';
import LoginForm from 'components/user/auth/login/Login';
import RaisedButton from 'components/common/mui/RaisedButton';
import HomepageSlider from 'components/front-end/homepage/evn/header';
import GJHomepageSlider from 'components/front-end/homepage/gojapan/header';
import IntroVideo from './IntroVideo';
import './stylesheet.scss';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  max-width: ${({ isGoJapan }) => (isGoJapan ? '30vw' : '500px')};
  margin: 30px auto;
  min-width: 300px;
  position: relative;
`;

class Index extends Component {
  componentWillMount() {
    const { history } = this.props;
    if (!Perm.isGuest()) {
      history.push('/');
    }
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  renderDefaultLogin = () => {
    const { themeConfig } = this.props;
    const layout = lGet(themeConfig, 'layout', '');
    const isSeabank = layout && ['sb'].includes(layout);
    const isGoJapan = layout && ['gj'].includes(layout);
    return (
      <div>
        {isSeabank ? <HomepageSlider /> : null}
        {isGoJapan ? <GJHomepageSlider /> : null}
        <Container isGoJapan={isGoJapan}>
          <LoginForm nextUrl={lGet(this.props, 'location.query.nextUrl', '')} />
        </Container>
      </div>
    );
  };

  renderLearnOnMobileBlock = () => {
    const imgPath = lGet(Configuration, 'media.img.path');
    const appleBadge = `${imgPath}/App_Store_Badge_US.svg`;
    const googleBadge = `${imgPath}/google-play-badge.png`;
    const googleLinkStore =
      'https://play.google.com/store/apps/details?id=com.evn.elearning';
    const appleLinkStore = '#';
    return (
      <div className="evn-download-store-wrapper">
        <h3>{t1('learn_on_mobile')}</h3>
        <hr className="indicator" />
        <div className="evn-download-store">
          <a target="_blank" rel="noopener noreferrer" href="/#">
            <img className="apple-badge" src={appleBadge} alt="apple-badge" />
          </a>
          <a
            className="google-badge-link"
            target="_blank"
            rel="noopener noreferrer"
            href={googleLinkStore}
          >
            <img
              className="google-badge"
              src={googleBadge}
              alt="google-badge"
            />
          </a>
        </div>
      </div>
    );
  };

  renderEvnLogin = () => {
    const { introVideoId, showHomePageVideo } = this.props;
    const videoId = introVideoId || '300218846';
    // const header = 'CHƯƠNG TRÌNH ĐÀO TẠO TRỰC TUYẾN E-LEARNING'; // TODO: get from school config
    const header = 'THẮP SÁNG ĐAM MÊ HỌC TẬP';
    let introVideoWrapperLeftClassname = 'col-xs-12 col-md-4 evn-intro-desc';
    let loginToLearnClassname = 'pull-left login-to-learn-btn';
    let headerCenterClassname = 'recruitment-video-fun';

    if (!showHomePageVideo) {
      introVideoWrapperLeftClassname = 'col-xs-12 col-md-12 evn-intro-desc';
      loginToLearnClassname = 'login-to-learn-btn';
      headerCenterClassname = 'text-center recruitment-video-fun';
    }

    const loginToLearnWrapperClassname = showHomePageVideo ? '' : 'text-center';
    return (
      <div style={{ background: '#f3f3f3' }}>
        <div className="evn-intro-video-wrapper">
          <div className="login-background-image-layer">
            <div className="container">
              <div className="row intro-video-wrapper">
                {showHomePageVideo ? (
                  <div className="col-xs-12 col-md-6" style={{ zIndex: 2 }}>
                    <IntroVideo introVideoId={videoId} />
                  </div>
                ) : null}
                <div
                  className={introVideoWrapperLeftClassname}
                  style={{ zIndex: 2 }}
                >
                  <div className={loginToLearnWrapperClassname}>
                    <h1 className={headerCenterClassname}>{t1(header)}</h1>
                    <div>
                      <RaisedButton
                        className={loginToLearnClassname}
                        label={t1('login_to_learn')}
                        href={'#login-section'}
                        backgroundColor="#164e99"
                        labelColor="#fff"
                        disabledBackgroundColor={false}
                        raisedButton
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="evn-login-section">
            <div className="evn-login-form-border" />
            <div className="evn-login-form-wrapper">
              <Paper className="evn-login-form-paper" zDepth={2}>
                <div className="evn-login-form-1" id="login-section">
                  <LoginForm />
                </div>
              </Paper>
            </div>
            {showHomePageVideo ? (
              <React.Fragment>{this.renderLearnOnMobileBlock()}</React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { themeConfig } = this.props;
    const layout = lGet(themeConfig, 'layout', '');
    const isEvn = layout && ['evn'].includes(layout);

    if (isEvn) return this.renderEvnLogin();

    return this.renderDefaultLogin();
  }
}

const mapStateToProps = (state) => {
  const config = getConf(state);

  return {
    themeConfig: lGet(state, 'domainInfo.school.theme'),
    introVideoId: lGet(config, 'school_intro_video_vimeo_id'),
    showHomePageVideo: lGet(config, 'show_home_page_video'),
  };
};

Index.defaultProps = {
  themeConfig: [],
};

Index.propTypes = {
  themeConfig: PropTypes.arrayOf(),
};
export default connect(mapStateToProps)(withRouter(Index));
