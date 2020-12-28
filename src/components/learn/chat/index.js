import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatComponent from 'components/chat';
import lodashGet from 'lodash.get';
import apiUrls from 'api-endpoints';
import nodeSagaActions from 'actions/node/saga-creators';
import withUserInfo from 'common/hoc/withUserInfo';

const chatKeyState = 'chat_info';
class Chat extends Component {
  componentDidMount() {
    if (this.shouldShowChat()) {
      this.getChatInfo();
    }
  }
  shouldShowChat = () => {
    const { isPreview, isReview, showChat } = this.props;
    if (isPreview || isReview) {
      return false;
    }

    if (showChat) return true;

    return false;
  };

  getChatInfo = () => {
    const { dispatch } = this.props;
    const chatConfig = {
      url: apiUrls.get_chat_info,
      keyState: chatKeyState,
    };

    dispatch(nodeSagaActions.getDataRequest(chatConfig, {}));
  };

  render() {
    const { chatInfo, userInfo } = this.props;
    const roomList = chatInfo.courses || [];
    const userChat = {
      id: userInfo.id,
      fullname: userInfo.name,
    };

    if (this.shouldShowChat())
      return <ChatComponent roomList={roomList} user={userChat} />;
    else return null;
  }
}

const emptyObject = {};
const mapStateToProps = (state) => {
  return {
    showChat: lodashGet(state, 'domainInfo.conf.show_chat_system'),
    userInfo: state.user.info,
    chatInfo: state.dataApiResults[chatKeyState] || emptyObject,
  };
};
export default connect(mapStateToProps)(withUserInfo(Chat));
