import React, { Component } from 'react';
import axios from 'axios';

class AsyncState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dollars: 10,
    };
    this._onClickHandler = this._onClickHandler.bind(this);
    this._onMouseLeaveHandler = this._onMouseLeaveHandler.bind(this);
    this._onTimeoutHandler = this._onTimeoutHandler.bind(this);
    this._onAjaxCallback = this._onAjaxCallback.bind(this);
  }

  componentDidMount() {
    // Add custom event via `addEventListener`
    //
    // The list of supported React events does include `mouseleave`
    // via `onMouseLeave` prop
    //
    // However, we are not adding the event the `React way` - this will have
    // effects on how state mutates
    //
    // Check the list here - https://facebook.github.io/react/docs/events.html
    this.btn.addEventListener('mouseleave', this._onMouseLeaveHandler);

    // Add JS timeout
    //
    // Again,outside React `world` - this will also have effects on how state
    // mutates
    setTimeout(this._onTimeoutHandler, 5000); // 2 seconds

    // Make AJAX request
    axios
      .get('http://vlms.dev/dev/playground/sleep')
      .then(this._onAjaxCallback);
  }

  _onClickHandler() {
    // console.log(
    //   `State before (_onClickHandler+10): ${JSON.stringify(this.state)}`,
    // );
    this.setState({
      dollars: this.state.dollars + 10,
    });
    // console.log(
    //   `State after (_onClickHandler+10): ${JSON.stringify(this.state)}`,
    // );
  }

  _onMouseLeaveHandler() {
    // console.log(`State before (mouseleave+20): ${JSON.stringify(this.state)}`);
    this.setState({
      dollars: this.state.dollars + 20,
    });
    // console.log(`State after (mouseleave+20): ${JSON.stringify(this.state)}`);
  }

  _onTimeoutHandler() {
    // console.log(`State before (timeout+30): ${JSON.stringify(this.state)}`);
    this.setState({
      dollars: this.state.dollars + 30,
    });
    // console.log(`State after (timeout+30): ${JSON.stringify(this.state)}`);
  }

  _onAjaxCallback(err) {
    if (err) {
      // console.log('Error in AJAX call: ' + JSON.stringify(err));
      // return;
    }

    // console.log(`State before (AJAX call+40): ${JSON.stringify(this.state)}`);
    this.setState({
      dollars: this.state.dollars + 40,
    });
    // console.log(`State after (AJAX call+40): ${JSON.stringify(this.state)}`);
  }

  render() {
    // console.log(`State in render: ${JSON.stringify(this.state)}`);

    return (
      <div>
        <div>
          <h3>
            Async nature of setState (react-bits) (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/vasanthk/react-bits/blob/master/patterns/19.async-nature-of-setState.md"
            >
              link
            </a>
            )
          </h3>
        </div>
        <div>
          <button
            ref={(btn) => {
              this.btn = btn;
            }}
            onClick={this._onClickHandler}
          >
            Click me and see console.log to see how state are modified
            (enqueued)
          </button>
        </div>
      </div>
    );
  }
}

export default AsyncState;
