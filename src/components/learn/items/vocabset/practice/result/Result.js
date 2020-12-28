import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import HtmlContent from 'components/common/html';

import Speaker from 'components/common/media-player/speaker/Speaker';
import Utils from 'common/vocabset/Utils';
import VideoPlayer from 'components/common/media-player/video';
import {
  calculateRecognitionResult,
  getAudioPlayerId,
  getCorrectSpeakingByName,
  getMediaPlayerId,
  getRecognitionPlayerId,
} from 'components/common/media-player/common';
import { addSpeedRecognitionResult } from 'components/common/media-player/actions';
import { getPhoneticDiffRequest } from 'actions/learn/saga-creators';
import { cleanPhoneticDiff } from 'actions/learn';
import { t1, t2 } from 'translate';
import PhoneticDiff from './PhoneticDiff';

import './stylesheet.scss';

const ProgressValue = (props) => (
  <div className="progress-score">
    {props.value} {props.sign}
  </div>
);

const ProgressSpace = (props) => {
  const space = 100 / props.totalSpace;
  const percentProgress = [];
  for (let i = 1; i <= props.totalSpace; i += 1) {
    const percent = space * i;
    percentProgress.push(percent);
  }
  const percentProgressObject = percentProgress.map((percent) => (
    <ProgressValue key={percent.toString()} value={percent} sign="%" />
  ));

  return <div className="score-panel">{percentProgressObject}</div>;
};

class Result extends React.Component {
  divStyle = { marginLeft: '18px', marginTop: '12px' };

  constructor(props) {
    super(props);
    this.state = {
      totalSpace: 10,
      open: false,
      videoPlayerId: null,
    };
    this.processingData = this.processingData.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
    this.closeVideoPopup = this.closeVideoPopup.bind(this);
  }

  componentDidMount() {
    this.processingData();
  }

  processingData() {
    const { vocabset, result, vocabs } = this.props;
    const lang = Utils.getLanguageFromComponent(this);
    const vocabsetName = vocabset.name || '';
    let data = calculateRecognitionResult(vocabs, result, lang);
    data = {
      ...data,
      vocabsetNames: getCorrectSpeakingByName(vocabsetName, result),
    };
    this.setState({ ...data });
    this.getPhoneticDiff(data.voiceResult, result);
  }

  getPhoneticDiff = (voiceResult, result) => {
    const { dispatch, vid } = this.props;
    const wrongWords = result.split(' ');
    voiceResult.forEach((item, index) => {
      const word = item.name;
      const wrongWord = wrongWords[index];
      if (!item.isCorrect) {
        dispatch(getPhoneticDiffRequest(vid, index, word, wrongWord));
      }
    });
  };

  testData(text, arrayText) {
    for (let i = 0; i < arrayText.length; i += 1) {
      if (arrayText[i].toUpperCase() === text.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  handleOpen(videoId) {
    if (!videoId) {
      this.setState({ open: false });
      return;
    }
    const { vid } = this.props;
    this.setState({
      open: true,
      videoId,
      videoPlayerId: getMediaPlayerId(vid),
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleTryAgain() {
    const { dispatch, vid } = this.props;
    dispatch(addSpeedRecognitionResult(getRecognitionPlayerId(vid), false));
    dispatch(cleanPhoneticDiff(vid));
  }

  closeVideoPopup() {
    this.setState({ videoId: false });
  }

  handlePhoneticDiffSelect(phoneticDiffIndex) {
    this.setState({
      videoId: false,
      selectedPhoneticDiff: phoneticDiffIndex,
    });
  }

  render() {
    const {
      vocabset,
      result,
      vid,
      phonetics,
      audioFile,
      phoneticDiff,
    } = this.props;
    const {
      voiceResult,
      percent,
      videoId,
      vocabsetNames,
      selectedPhoneticDiff,
      videoPlayerId,
    } = this.state;
    const text = vocabset ? vocabset.name : '';
    let position = this.state.percent - this.state.totalSpace;
    if (position < 0) {
      position = 0;
    }
    const styleScore = { left: `${position}%` };
    const styleBg = { width: `${percent + 1}%` };

    return (
      <div>
        {vocabset && (
          <div className="video-name">
            <HtmlContent content={vocabset.content} />
          </div>
        )}

        {result && (
          <div className="d-recognition-speaker d-result-recognition">
            <div className="ui-content-panel">
              <div>
                <div className="ui-content-center">
                  <Speaker
                    playerId={getAudioPlayerId(`${vid}-result`)}
                    className="m-t-5 ui-speaker"
                    url={audioFile}
                    text={text}
                  />
                  <div className="ui-text-content" style={this.divStyle}>
                    {/* <div className="ui-text">{text} </div>*/}
                    <div className="ui-text">
                      {vocabsetNames &&
                        vocabsetNames.map((row, index) => (
                          <span
                            key={index}
                            className={!row.isCorrect ? 'text-color-red' : ''}
                          >
                            {`${row.name} `}
                          </span>
                        ))}
                    </div>
                    <div className="ui-spelling">
                      {phonetics && <span>/{phonetics}/</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ui-content-center">
                  <div className="progress-panel">
                    <div className="progress-bg" style={styleBg} />
                    <ProgressSpace totalSpace={10} />
                    <div
                      className="score"
                      style={styleScore}
                    >{`${percent}%`}</div>
                  </div>
                </div>
              </div>
              <div className="result-table_panel">
                <div className="ui-content-center">
                  <div className="d-table table-panel">
                    {videoId && (
                      <div className="ui-guild-video-popup">
                        <div
                          className="close-popup"
                          onClick={this.closeVideoPopup}
                          alt="Close"
                        >
                          <i className="mi mi-close" aria-hidden="true" />
                        </div>

                        <VideoPlayer
                          key={videoPlayerId}
                          width="100%"
                          height="100%"
                          playerId={videoPlayerId}
                          controls
                          youTubeId={`${videoId}`}
                          autoPlay
                        />
                      </div>
                    )}
                    <div className="d-row table-row ui-word-head">
                      <div className="ui-word d-cell">{t1('word')}</div>
                      <div className="ui-correct d-cell">
                        {t2('true/false')}
                      </div>
                      <div className="ui-phonetic d-cell">
                        {t1('pronunciation_practice')}
                      </div>
                      <div className="ui-guild d-cell">{t1('guide')}</div>
                    </div>

                    {voiceResult &&
                      voiceResult.map((row, index) => (
                        <div key={index} className="d-row table-row">
                          <div
                            className={
                              !row.isCorrect
                                ? 'text-color-red ui-word d-cell'
                                : 'd-cell ui-word'
                            }
                          >
                            <div
                              className={
                                !row.isCorrect ? 'text-color-red ' : ''
                              }
                            >
                              {row.name}
                            </div>
                            <div
                              className={
                                !row.isCorrect
                                  ? 'text-color-red text-color-blue'
                                  : 'text-color-blue'
                              }
                            >
                              {row.phonetics && <span>/{row.phonetics}/</span>}
                            </div>
                          </div>
                          <div className="ui-guild d-cell">
                            {row.isCorrect ? (
                              <i
                                className="mi mi-check corect-color icon-size"
                                aria-hidden="true"
                              />
                            ) : (
                              <i
                                className="mi mi-clear text-color-red icon-size"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="ui-guild d-cell">
                            {phoneticDiff && phoneticDiff[index] && (
                              <PhoneticDiff
                                anotherVideoPlaying={
                                  !!videoId || selectedPhoneticDiff !== index
                                }
                                phoneticDiff={phoneticDiff[index]}
                                onItemChildSelected={() =>
                                  this.handlePhoneticDiffSelect(index)
                                }
                              />
                            )}
                          </div>
                          {row.video && (
                            <div
                              className="ui-guild  d-cell"
                              onClick={() => {
                                this.handleOpen(row.video);
                              }}
                            >
                              <i
                                className="ui-cursor-pointer mi mi-play-circle-outline text-color-blue"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          {!row.video && (
                            <div className="ui-guild  d-cell">
                              <span>
                                <Speaker
                                  playerId={getAudioPlayerId(
                                    `${vid}-${index}-result`,
                                  )}
                                  className="simple-speaker"
                                  text={row.name}
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="ui-try-again-panel">
                    <FlatButton
                      className="ui-button"
                      label={t1('try_again')}
                      primary
                      keyboardFocused
                      onTouchTap={this.handleTryAgain}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const phoneticDiff = state.recognition.phoneticDiff[props.vid];

  return {
    phoneticDiff,
  };
};

Result.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Result);
