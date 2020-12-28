import React, { Component } from 'react';
import { connect } from 'react-redux';
// import VarDump from 'components/common/VarDump';
import ChatForm from './ChatForm';

const References = () => (
  <div>
    <h1>Documents & References</h1>
    To run: go to $v/socket & npm install & npm start. The socket server is
    available in http://localhost:3001/ . There you can also find a simple
    compatible chat client done in simple jquery
    <ul>
      <li>
        <a href="http://matthewminer.com/2015/02/21/pattern-for-async-task-queue-results.html">
          Overall architecture
        </a>
      </li>
      <li>
        rabbitmq
        <a href="https://www.rabbitmq.com/tutorials/tutorial-one-php.html">
          PHP
        </a>{' '}
        &
        <a href="https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html">
          JS tutorials
        </a>
      </li>
      <li>
        <a href="https://github.com/socketio/chat-example">
          Socket.io push service done in express{' '}
        </a>
      </li>
      <li>
        <a href="https://github.com/kuy/redux-saga-chat-example">
          Redux-saga, react & socket (Chat example)
        </a>
      </li>
    </ul>
    <h1>TODO</h1>
    Express shouldn't include the rabbitmq client worker in the http? rabbitmq
    has a way to invoke a remote http URL.
  </div>
);

class Chat extends Component {
  divStyle = { border: '1px solid #eee' };

  componentDidMount() {
    // dispatch so that socket will start connection
    console.log('CHAT_INITCHAT_INITCHAT_INIT');
    this.props.dispatch({ type: 'CHAT_INIT' });
  }

  render() {
    const style = {
      borderBottom: '1px solid #eee',
    };

    return (
      <div className="form-content">
        <ChatForm />
        <div style={this.divStyle}>
          {this.props.messages &&
            this.props.messages.map((message) => (
              <div style={style}>
                <b>{`@${message.user}`}</b>: {message.msg}
              </div>
            ))}
        </div>
        <References />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const messages = state.chat || [];
  return {
    messages,
  };
}

export default connect(mapStateToProps)(Chat);
