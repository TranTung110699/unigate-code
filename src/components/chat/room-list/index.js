import React from 'react';
import './stylesheet.scss';
import { t1 } from 'translate';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 11/08/2017
 **/
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewFull: true };
  }

  onSocketConnected = (connection) => {
    // connection.on('CHAT_MESSAGES', (msg, myid) => {
    //   console.log("msg", msg, myid);
    //   const {messages} = this.state;
    //   this.setState({messages: [...messages, msg]});
    // });
    // this.setState({connection});
    // console.log("connection", connection);
  };

  switchMode = () => {
    this.setState({ viewFull: !this.state.viewFull });
  };

  render() {
    const { roomList, className, onClick } = this.props;
    const style = this.props.style || {};
    const { viewFull } = this.state;
    return (
      <div
        className={`${className} room-list-component`}
        style={{
          ...style,
          width: '230px',
          height: viewFull ? '500px' : 'auto',
        }}
      >
        <div style={{ display: viewFull ? 'block' : 'none' }}>
          <div className="Header clearfix" onClick={this.switchMode}>
            {t1('chat_room')}
            <span>--</span>
          </div>
          <ul className="room-list">
            {roomList &&
              roomList.map((room, index) => (
                <li
                  key={`chat-room-${room.id}`}
                  onClick={() => {
                    onClick(room);
                  }}
                  className="item"
                >
                  <img src="https://www.tnaflix.com/images/avatar_male.png" />
                  <div className="content">{room.roomName}</div>
                </li>
              ))}
          </ul>
        </div>
        <div
          onClick={this.switchMode}
          className="Header clearfix"
          style={{ display: viewFull ? 'none' : 'block' }}
        >
          {t1('chat_room')}
        </div>
      </div>
    );
  }
}

export default ChatBox;
