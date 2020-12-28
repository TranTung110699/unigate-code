import SocketClient from 'socket.io-client';

class ChatService {
  constructor(roomId) {
    this.callbacks = [];
    this.socketClient = new SocketClient(
      `${window.APP_CHAT_URL}/${roomId ? `${roomId}` : ''}`,
    );
    this.socketClient.on('connect', () => {
      this.connected = true;
      this.callbacks.forEach((callbackObj) => {
        const roomIdCallBack = Object.keys(callbackObj)[0];
        const roomIdd = roomIdCallBack || 'cmd';
        callbackObj[roomIdd](this.socketClient, roomIdd);
      });
      this.callbacks = [];
    });
    this.socketClient.on('disconnected', () => {
      this.connected = false;
    });
  }

  onConnected(callback, roomId) {
    const roomIdd = roomId || 'cmd';

    if (!this.connected) {
      this.callbacks.push({ [roomId]: callback });
      return undefined;
    }
    console.log('this.socketClient', this.socketClient, roomIdd);
    return callback(this.socketClient, roomIdd);
  }
}

export default ChatService;
