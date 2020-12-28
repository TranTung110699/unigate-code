import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from './images/avatar_male.png';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 11/08/2017
 **/
class ChatBox extends React.Component {
  divStyle = { height: '210px' };
  divStyle1 = { height: '250px' };

  constructor(props) {
    super(props);
    this.state = { value: '', messages: [], viewFull: true };
  }

  switchMode = () => {
    this.setState({ viewFull: !this.state.viewFull });
  };
  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };

  sendMessage = () => {
    const { value } = this.state;
    const { connection, room, user } = this.props;
    if (value && value.trim()) {
      const message = {
        sender: user,
        message: value.trim(),
        roomId: room.id,
      };
      connection.emit('CHAT_MESSAGES', JSON.stringify(message));
      this.setState({ value: '' });
      this.scrollMessageBody.scrollToBottom();
    }
  };

  onMessageChanged = (event) => {
    this.setState({ value: event.target.value });
  };

  formatDate(time) {
    if (!time) {
      return '';
    }
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}  ${strTime}`;
  }

  isMyMessage(id) {
    const { user } = this.props;
    if (!user || !user.id) {
      return false;
    }
    return id === user.id;
  }

  render() {
    const { className, room, users, onClose } = this.props;
    const { messages } = this.props;
    console.log('users', users);
    const { viewFull } = this.state;
    return (
      <div
        className={`${className} chat-box-component`}
        style={{
          width: viewFull ? '530px' : '180px',
          display: room.show ? 'block' : 'none',
        }}
      >
        <div className="header-box clearfix" onClick={this.switchMode}>
          <div className="pull-left">{room.roomName}</div>
          <div className="pull-right">
            <span>--</span>
            <i
              className="mi mi-close"
              onClick={() => {
                onClose(room.id);
              }}
            />
          </div>
        </div>
        <div
          className="ui-chat-content ui-box-content clearfix"
          style={{ display: viewFull ? 'block' : 'none' }}
        >
          <div className="pull-left messages-content">
            <div className="" style={this.divStyle}>
              <Scrollbars
                ref={(scrollMessageBody) => {
                  this.scrollMessageBody = scrollMessageBody;
                }}
              >
                <div className="ui-content-panel">
                  <ul className="message-list">
                    {messages &&
                      messages.map((message, index) => (
                        <li
                          key={`message-${index}`}
                          className={`item ${
                            this.isMyMessage(message.sender.id) ? 'right' : ''
                          }`}
                        >
                          <img src={Avatar} />
                          <div className="content">{message.message}</div>
                          <div className="info">
                            {this.formatDate(message.timestamp)}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </Scrollbars>
            </div>
            <div className="ui-input-chat">
              <input
                onChange={this.onMessageChanged}
                value={this.state.value}
                onKeyDown={this.onKeyDown}
              />
              <i className="mi mi-send mi-24" onClick={this.sendMessage} />
            </div>
          </div>
          <div className="pull-right member-list" style={this.divStyle1}>
            <Scrollbars
              ref={(scrollUserList) => {
                this.scrollUserList = scrollUserList;
              }}
            >
              <ul className="user-list">
                {users &&
                  users.map((user) => (
                    <li className="item" key={`user-${user.id}`}>
                      <img src={Avatar} />
                      <div className="content">{user.fullname}</div>
                    </li>
                  ))}
              </ul>
            </Scrollbars>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
