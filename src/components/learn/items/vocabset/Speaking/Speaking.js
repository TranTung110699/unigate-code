import React from 'react';
import { connect } from 'react-redux';
import Speaker from 'components/common/media-player/speaker/Speaker';
import Recorder from 'components/common/media-player/recorder/Recorder';
import {
  calculateRecognitionResult,
  getAudioPlayerId,
  getRecognitionPlayerId,
  webRecognitionIsSupported,
} from 'components/common/media-player/common';
import Utils from 'common/vocabset/Utils';
import PropTypes from 'prop-types';
import RecognitionNotSupported from 'components/common/recognition-not-suported/NotSuported';

import './stylesheet.scss';

class Speaking extends React.Component {
  divStyle = { display: 'inline-block' };
  divStyle1 = { marginLeft: '55px' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  transformVocabToFakeVocabset = (vocab) =>
    vocab &&
    vocab.name &&
    vocab.name
      .split(' ')
      .filter((x) => x)
      .map((word) => ({
        ...vocab,
        name: word,
      }));

  onResult = (result) => {
    const { vocab, onResult } = this.props;
    const language = Utils.getLanguageFromComponent(this);
    const calcuResult = calculateRecognitionResult(
      this.transformVocabToFakeVocabset(vocab),
      result,
      language,
    );
    this.setState({ recognition: result, score: calcuResult.percent }, () => {
      if (onResult) {
        onResult(calcuResult);
      }
    });
  };

  render() {
    const {
      vocab,
      iid,
      vid,
      question,
      autoCheckRecognitionOnMount,
      shouldShowResult,
    } = this.props;
    const text = vocab ? vocab.name : '';
    const language = Utils.getLanguageFromComponent(this);
    const phonetics = Utils.getPhoneticsByLanguage(vocab, language);
    const audioFile = Utils.getAudioByLanguage(vocab, language, text);

    if (!webRecognitionIsSupported()) {
      return (
        <div className="d-recognition-speaker d-result-recognition">
          <div className="ui-content-panel">
            <RecognitionNotSupported />
          </div>
        </div>
      );
    }

    return (
      <div className="d-recognition-speaker d-result-recognition">
        <div className="ui-content-panel">
          {question && question.help_text && question.help_text}
          {text && (
            <div>
              <div style={this.divStyle}>
                <Speaker
                  playerId={getAudioPlayerId(vid)}
                  iid={vid}
                  className="m-t-5 xpeak-speaker"
                  iconClass="mi-24"
                  url={audioFile}
                  text={text}
                />
                <div style={this.divStyle1}>
                  <div className="ui-text m-t-10">{text}</div>
                  {phonetics && (
                    <div className="ui-spelling">/{phonetics}/</div>
                  )}
                </div>
              </div>
              <div>
                <Recorder
                  autoCheckRecognitionOnMount={autoCheckRecognitionOnMount}
                  playerId={getRecognitionPlayerId(iid)}
                  onResult={this.onResult}
                  iid={iid}
                />
                {shouldShowResult && (
                  <div className="result">{this.state.recognition}</div>
                )}
                {shouldShowResult && (
                  <div className="score">
                    {this.state.recognition && (
                      <span>{`Your score: ${this.state.score}%`}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Speaking.propsTypes = {
  autoCheckRecognitionOnMount: PropTypes.bool,
  onResult: PropTypes.func,
  shouldShowResult: PropTypes.bool,
};

Speaking.defaultProps = {
  autoCheckRecognitionOnMount: false,
  onResult: () => {},
  shouldShowResult: true,
};

const mapStateToProps = (state, props) => {
  const vocab = props.vocab ? props.vocab : state.tree[props.vid];
  const question = state.tree[props.iid];

  return {
    vocab,
    question,
  };
};
export default connect(mapStateToProps)(Speaking);
