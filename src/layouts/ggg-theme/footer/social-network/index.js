import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import commonSagaActions from 'actions/saga-creators';

import Facebook from './images/facebook.png';
import Instagram from './images/instagram.png';
import Youtube from './images/youtube.png';
import './stylesheet.scss';

class SocialNetwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.subscribeNewsletter();
    }
  };

  subscribeNewsletter = () => {
    const { dispatch } = this.props;

    dispatch(
      commonSagaActions.subscribeNewsletter(apiUrls.subscribe_newsletter, {
        subscriber: this.state.email,
      }),
    );
  };

  render() {
    return (
      <div className="social-network">
        <div className="container">
          <div className="col-md-4 social">
            <a href="https://www.facebook.com/GoldenGateRestaurantGroup/?fref=ts">
              <img src={Facebook} alt="" />
            </a>
            <a href="https://www.youtube.com/channel/UCxleVZLZJhOSQr-eOmck6HA">
              <img src={Youtube} alt="" />
            </a>
            <a href="https://www.instagram.com/goldengaterestaurantgroup/">
              <img src={Instagram} alt="" />
            </a>
          </div>
          <div className="col-md-8">
            <p className="left">Đăng ký để nhận thông tin khóa học</p>
            <input
              type="text"
              className="left"
              placeholder="Địa chỉ email"
              value={this.state.email}
              onChange={(e) => {
                this.handleChange(e);
              }}
              onKeyPress={this.handleKeyPress}
            />
            <button
              className="text-transform right"
              onClick={() => this.subscribeNewsletter()}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SocialNetwork);
