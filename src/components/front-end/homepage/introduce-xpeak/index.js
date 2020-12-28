import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, logout } from 'actions/auth';
import DialogNoHeader from 'schema-form/elements/custom-popup/DialogNoHeader';
import MediaPlayer from 'components/common/media-player/video';
import actions from 'actions/node/creators';
import PracticeVocabset from 'components/learn/items/vocabset/practice';
import { ntype } from 'configs/constants';

import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class HomepageHeader extends React.Component {
  dialogNoHeaderBodyStyle = { fontSize: '15px', background: 'transparent' };
  dialogNoHeaderContentStyle = { width: '90%', height: '430px' };
  dialogNoHeaderContentStyle1 = { width: '90%', height: '800px' };

  constructor(props) {
    super(props);
    this.state = {
      dialogVideoIntroduce: false,
      dialogPracticeVocabset: false,
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(
      actions.fetchNode({
        iid: window.APP_PRACTICE_VOCABSET_IID,
        ntype: ntype.VOCABSET,
        depth: 2,
      }),
    );
  };

  loginAction = () => {
    const { dispatch, loginForm } = this.props;
    dispatch(login(loginForm.values));
  };

  logoutAction = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  closeIntroducePopup = () => {
    this.setState({ dialogVideoIntroduce: false });
  };

  openIntroducePopup = () => {
    this.setState({ dialogVideoIntroduce: true });
  };

  closeIntroduceXpeakPopup = () => {
    this.setState({ dialogPracticeVocabset: false });
  };

  openIntroduceXpeakPopup = () => {
    this.setState({ dialogPracticeVocabset: true });
  };

  render() {
    let { className } = this.props;
    const { dialogVideoIntroduce, dialogPracticeVocabset } = this.state;
    className = className
      ? `${className} ui-header-banner`
      : 'ui-header-banner';
    return (
      <div className={className}>
        <div className="ui-header-banner-content xpeak-font">
          <h1 className="large">
            <em>Luyện phát âm</em> với Xpeak
          </h1>
          <p className="cover">
            Lần đầu tiên tại Việt Nam. Điện thoại của bạn sẽ đóng vai trò như
            một giáo viên thật
          </p>

          <p onClick={this.openIntroducePopup}>
            <i className="mi player-introduce mi-play-circle-outline" />
            <div className="introduce">Giới thiệu</div>
          </p>

          <div className="form-login-home clearfix">
            <div className="description">
              Hãy để Xpeak phát hiện và sửa lỗi phát âm cho bạn!
            </div>
            <div className="learn-more">
              <a onClick={this.openIntroduceXpeakPopup}>Thử ngay</a>
            </div>
          </div>
        </div>
        <DialogNoHeader
          closeOn={this.closeIntroducePopup}
          open={dialogVideoIntroduce}
          className="introduce-video-wrapper"
          contentClassName="content-dialog"
          bodyStyle={this.dialogNoHeaderBodyStyle}
          contentStyle={this.dialogNoHeaderContentStyle}
        >
          {dialogVideoIntroduce && (
            <div className="introduce-video-content">
              <MediaPlayer
                youTubeId="NmS_hLbsmio"
                autoPlay="true"
                width="100%"
                className="youtube-video"
              />
              <div className="slogan">
                Xpeak sẽ giúp bạn giao tiếp tự tin sau 3 tháng
              </div>
            </div>
          )}
        </DialogNoHeader>
        <DialogNoHeader
          closeOn={this.closeIntroduceXpeakPopup}
          open={dialogPracticeVocabset}
          className="introduce-xpeak"
          contentStyle={this.dialogNoHeaderContentStyle1}
        >
          {dialogPracticeVocabset && (
            <div className="practice-intro-vocabset-wrapper">
              <div className="col-md-12 introduce-xpeak-title text-center">
                <h3>Luyện phát âm với Xpeak</h3>
                <div className="underline" />
              </div>
              <PracticeVocabset vid={window.APP_PRACTICE_VOCABSET_IID} />
            </div>
          )}
        </DialogNoHeader>
      </div>
    );
  }
}

const populateStateToProps = (state) => {
  const userInfo = state.user.info;
  return {
    loginForm: state.form.loginFromHomePage,
    userInfo,
  };
};

export default connect(populateStateToProps)(
  reduxForm({
    form: 'loginFromHomePage',
  })(HomepageHeader),
);
