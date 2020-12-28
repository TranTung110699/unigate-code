import React from 'react';
import { connect } from 'react-redux';
import Display from 'components/learn/items/lecture/media-lecture/display';

const DEFAULT_NUMBER_OF_INTERVAL = 10;

class MediaLecture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spentTimeCalculatePoint: null,
      startTime: null,
      endTime: null,
      watchedIntervals: [],
      currentInterval: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentInterval } = this.state;
    if (currentInterval !== prevState.currentInterval) {
      this.saveLearningProgress();
    }
  }

  getSpentTimeCalculatePointState = (spentTimeCalculatePoint) => ({
    spentTimeCalculatePoint,
  });

  getTimeState = (startTime, endTime) => ({
    startTime,
    endTime,
  });

  getWatchedIntervalsState = (watchedIntervals) => ({
    watchedIntervals,
  });

  getCurrentIntervalState = (interval) => ({
    currentInterval: interval,
  });

  handleMediaPlayerStart = () => {
    this.setState(
      Object.assign({}, this.getSpentTimeCalculatePointState(new Date())),
    );
  };

  checkVideoInterval = (time) => {
    const { numberOfIntervals } = this.props;
    const { startTime, endTime } = this.state;

    const interval = Math.floor(
      ((time - startTime) / (endTime - startTime)) * numberOfIntervals,
    );
    if (interval < 0 || interval >= numberOfIntervals) {
      return NaN;
    }
    return interval;
  };

  getLearningProgressBasedOnWatchedIntervals = () => {
    const { numberOfIntervals } = this.props;
    const watchedIntervalsProps = this.props.watchedIntervals;
    const watchedIntervalsState = this.state.watchedIntervals;
    const watchedIntervals = watchedIntervalsProps
      .concat(watchedIntervalsState)
      .filter((interval, index, arr) => arr.indexOf(interval) === index);

    return {
      learningProgress: Math.ceil(
        (watchedIntervals.length / numberOfIntervals) * 100,
      ),
      watchedIntervals,
    };
  };

  getSpentTime = () => {
    const { spentTimeCalculatePoint } = this.state;
    return (new Date() - spentTimeCalculatePoint) / 1000;
  };

  getLearningProgressBasedOnSpentTime = () => {
    const { startTime, endTime } = this.state;
    const { spentTime } = this.props;
    const localSpentTime = this.getSpentTime();
    const totalSpentTime = spentTime + localSpentTime;
    return {
      learningProgress: Math.ceil(
        (totalSpentTime / (endTime - startTime)) * 100,
      ),
      spentTime: localSpentTime,
      totalSpentTime,
    };
  };

  getLearningProgress = () => {
    const oldLearningProgress = this.props.learningProgress;
    const learningProgressBasedOnWatchedIntervals = this.getLearningProgressBasedOnWatchedIntervals();
    const learningProgressBasedOnSpentTime = this.getLearningProgressBasedOnSpentTime();
    return {
      learningProgress: Math.max(
        oldLearningProgress,
        learningProgressBasedOnWatchedIntervals.learningProgress,
      ),
      watchedIntervals:
        learningProgressBasedOnWatchedIntervals.watchedIntervals,
      spentTime: learningProgressBasedOnSpentTime.spentTime,
    };
  };

  saveLearningProgress = (progress) => {
    const newLearningProgress = this.getLearningProgress();
    const {
      learnItemIid,
      numberOfIntervals,
      isPreview,
      isReview,
      saveLearningProgress,
    } = this.props;
    if (isPreview || isReview) {
      return;
    }

    saveLearningProgress([
      {
        tco_iid: learnItemIid,
        p: progress || newLearningProgress.learningProgress,
        pd: {
          n: numberOfIntervals,
          i: newLearningProgress.watchedIntervals,
        },
        time_spent: newLearningProgress.spentTime,
      },
    ]);

    this.setState(
      Object.assign({}, this.getSpentTimeCalculatePointState(new Date())),
    );
  };

  handleMediaPlayerProgress = (progress) => {
    const { playedSeconds } = progress;
    const { watchedIntervals, currentInterval } = this.state;
    if (playedSeconds) {
      const interval = this.checkVideoInterval(playedSeconds);

      if ((interval || interval === 0) && interval !== currentInterval) {
        this.setState(
          Object.assign(
            {},
            this.getCurrentIntervalState(interval),
            watchedIntervals.indexOf(interval) === -1 &&
              this.getWatchedIntervalsState(
                watchedIntervals.concat([interval]),
              ),
          ),
        );
      }
    }
  };

  handleMediaPlayerTime = (startTime, endTime) => {
    this.setState(Object.assign({}, this.getTimeState(startTime, endTime)));
  };

  handleMediaPlayerEnded = (progress) => {
    this.saveLearningProgress(progress);
  };

  render() {
    const { type, node, learningProgress } = this.props;

    return (
      <div className={type === 'video' ? 'lecture-video' : 'lecture-audio'}>
        <Display
          controls
          autoPlay
          className={type === 'video' ? 'learn-full-screen' : ''}
          type={type}
          node={node}
          onStart={this.handleMediaPlayerStart}
          onProgress={this.handleMediaPlayerProgress}
          onEnded={(progress) => this.handleMediaPlayerEnded(progress)}
          handleMediaTime={this.handleMediaPlayerTime}
          canSkipQuestion={learningProgress == 100}
          progressInterval={100}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { learnItemIid } = props;
  const trackerProgress = state.trackerProgress[learnItemIid];
  const spentTime = (trackerProgress && trackerProgress.time_spent) || 0;
  const learningProgress = (trackerProgress && trackerProgress.p) || 0;

  // progress details will be an object with the following fields
  // pd: {
  //   n: number of intervals,
  //   i: watched intervals,
  // }
  // if i.length === n then all intervals are watched

  const details = (trackerProgress && trackerProgress.pd) || {};
  const numberOfIntervals =
    Number.parseInt(details.n, 10) || DEFAULT_NUMBER_OF_INTERVAL;
  const watchedIntervals = (Array.isArray(details.i) ? details.i : []).map(
    (interval) => Number.parseInt(interval, 10),
  );

  return {
    spentTime,
    learningProgress,
    numberOfIntervals,
    watchedIntervals,
  };
};

export default connect(mapStateToProps)(MediaLecture);
