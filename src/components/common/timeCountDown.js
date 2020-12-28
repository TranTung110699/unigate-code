import React from 'react';
import { connect } from 'react-redux';
import { getTimeInSeconds, secondsToTimeString } from 'common/utils/Date';

const timeCountDown = (config) => (Component) => {
  const getValueByKey = (props, key, defaultValue) => {
    if (typeof config === 'function') {
      const result = config(props)[key];
      if (typeof result !== 'undefined') {
        return result;
      }
    }

    if (typeof props[key] !== 'undefined') {
      return props[key];
    }

    if (typeof config[key] !== 'undefined') {
      return config[key];
    }

    return defaultValue;
  };

  class Wrapped extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        countdownStatus: 'stopped',
      };
    }

    componentWillMount() {
      const { count, countdownStatus } = this.props;
      if (count <= 0) {
        return;
      }
      this.handleSetState(
        count,
        countdownStatus || count ? 'started' : 'stopped',
      );
      this.startTimer();
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        getValueByKey(this.props, 'reCountDown', () => false)(
          this.props,
          prevProps,
        )
      ) {
        const { count, countdownStatus } = this.props;
        this.handleSetState(
          count,
          countdownStatus || count ? 'started' : 'stopped',
        );
      }
      if (this.state.countdownStatus !== prevState.countdownStatus) {
        switch (this.state.countdownStatus) {
          case 'started':
            this.startTimer();
            break;
          case 'stopped':
            this.handleSetState(0);
            break;
          case 'paused':
            clearInterval(this.timer);
            this.timer = undefined;
            break;
          default: {
            break;
          }
        }
      }
    }

    startTimer = () => {
      this.timer = setInterval(() => {
        const newCount = this.state.count - 1;
        this.handleSetState(newCount >= 0 ? newCount : 0);
      }, 1000);
    };

    handleSetState = (count, countdownStatus) => {
      const countDown = count || this.state.count;
      const status =
        countdownStatus || countDown > 0
          ? this.state.countdownStatus
          : 'stopped';
      this.setState({
        count: countDown,
        countdownStatus: status,
      });
    };

    executeOnSuccess = (data) => {
      this.setState({ data });
    };

    render() {
      const { originalProps } = this.props;
      const { count, countdownStatus } = this.state;

      const props = {
        ...originalProps,
        countDown: count,
        countdownStatus,
        timeLeft: secondsToTimeString(count),
      };

      return <Component {...props} />;
    }
  }

  Wrapped.propTypes = {};

  Wrapped.defaultProps = {};

  const mapStateToProps = (state, props) => ({
    count: getTimeInSeconds(getValueByKey(props, 'duration')),
    countdownStatus: getValueByKey(props, 'countdownStatus'),
    originalProps: props,
  });

  return connect(mapStateToProps)(Wrapped);
};

export default timeCountDown;
