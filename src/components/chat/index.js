import React from 'react';
import ChatBox from './chatbox';
import RoomList from './room-list';
import ChatService from './Services';
import './stylesheet.scss';

const listRoomWidth = 230;
const paddingBetweenElement = 20;
const roomSize = 530;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 11/08/2017
 **/
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBoxes: [],
      messages: {},
      roomUsers: {},
      connections: {},
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    const { roomList } = this.props;
    // nếu chưa có sẽ tạo mới namespace để connect vào
    const roomCommandLineService = new ChatService();
    roomCommandLineService.onConnected(this.initConnection);

    // connect với các namespace đã có sẵn
    roomList.forEach((room) => {
      const chatService = new ChatService(room.id);
      chatService.onConnected(this.onSocketConnected, room.id);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (!this.refs.chatComponent) {
      return;
    }
    const { chatBoxes } = this.state;
    this.setState({ chatBoxes: this.getChatBoxAvailable(chatBoxes) });
  };

  newChatBox = (room) => {
    const { chatBoxes } = this.state;
    let newChatBoxs = [];
    chatBoxes.forEach((chatbox) => {
      if (room.id !== chatbox.id) {
        newChatBoxs.push(chatbox);
      }
    });
    newChatBoxs = [room, ...newChatBoxs];
    this.setState({ chatBoxes: this.getChatBoxAvailable(newChatBoxs) });
  };

  onCloseBox = (boxId) => {
    console.log('boxId', boxId);
    const { chatBoxes } = this.state;

    const newChatBoxs = [];
    chatBoxes.forEach((chatbox) => {
      if (boxId !== chatbox.id) {
        newChatBoxs.push(chatbox);
      }
    });
    this.setState({ chatBoxes: this.getChatBoxAvailable(newChatBoxs) });
  };

  getChatBoxAvailable = (chatBoxs) => {
    const screenWidth = window.innerWidth;
    // const total = 1;
    // const newChatBoxs = [];
    let spaceAvailable = listRoomWidth + paddingBetweenElement;
    chatBoxs.forEach((chatbox) => {
      spaceAvailable += roomSize;
      if (spaceAvailable <= screenWidth) {
        chatbox.show = 1;
        spaceAvailable += paddingBetweenElement;
      } else {
        chatbox.show = 0;
      }
    });
    return chatBoxs;
  };

  onSocketConnected = (connection, roomId) => {
    const { connections } = this.state || {};
    const { user } = this.props;
    // const sender = JSON.stringify(user);
    this.userJoinToTheRoom(connection, roomId);
    connection.emit('CHAT_HISTORY', roomId);

    connection.on('CHAT_MESSAGES', (msgString) => {
      console.log('messages', msgString);
      const message = JSON.parse(msgString);
      const { messages } = this.state;
      const msgsForRomId = messages[message.roomId] || [];
      msgsForRomId.push(message);
      this.addUserToListChat(message.sender, message.roomId);
      this.setState({
        messages: { ...messages, [message.roomId]: msgsForRomId },
      });
    });

    connections[roomId] = connection;
    this.setState({ connections: { ...connections } });
  };

  initConnection = (connection) => {
    const { connections } = this.state || {};
    const { roomList } = this.props;
    roomList.forEach((room) => {
      connection.emit('CREATE_ROOM', JSON.stringify(room));
    });
    connection.on('CREATE_ROOM', (room) => {
      const roomObject = JSON.parse(room);
      if (roomObject.isNew) {
        const chatService = new ChatService(roomObject.roomId);
        chatService.onConnected(this.onSocketConnected, roomObject.roomId);
      }
    });
    connections.cmd = connection;
    this.setState({ connections: { ...connections } });
  };

  userJoinToTheRoom = (connection, roomId) => {
    const { user } = this.props;
    const userInfo = { ...user, roomId };
    connection.emit('JOIN_ROOM', JSON.stringify(userInfo));
    connection.on('JOIN_ROOM', (user) => {
      const userObject = JSON.parse(user);
      this.addUserToListChat(userObject, roomId);
    });
  };

  addUserToListChat = (user, roomId) => {
    const { roomUsers } = this.state || {};
    const usersInRoom = roomUsers[roomId] || [];
    let exits = false;
    usersInRoom.forEach((u) => {
      if (u.id === user.id) exits = true;
    });
    if (exits) return;
    roomUsers[roomId] = [...usersInRoom, user];
    this.setState({ roomUsers });
  };

  render() {
    const { chatBoxes, messages, roomUsers, connections } = this.state;
    const { roomList, user } = this.props;
    return (
      <div
        className="chat-component clearfix"
        ref="chatComponent"
        style={{ paddingRight: `${listRoomWidth + paddingBetweenElement}px` }}
      >
        <RoomList
          onClick={this.newChatBox}
          roomList={roomList}
          style={{ width: `${listRoomWidth}px` }}
          className="pull-right m-l-20"
        />
        {chatBoxes &&
          connections &&
          chatBoxes.map((chatBox) => {
            console.log('roomUsers[chatBox.id]', roomUsers[chatBox.id]);
            return (
              <ChatBox
                key={`chatBox-${chatBox.id}`}
                connection={connections[chatBox.id]}
                room={chatBox}
                user={user}
                onClose={this.onCloseBox}
                users={roomUsers[chatBox.id]}
                messages={messages[chatBox.id]}
                className="pull-right m-l-20"
              />
            );
          })}
      </div>
    );
  }
}

export default index;
