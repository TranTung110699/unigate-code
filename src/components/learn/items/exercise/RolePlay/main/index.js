import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import Audios from 'components/common/media-player/audios';
import Control from './control';
import Sentences from './sentences';
import Confirm from './confirm';
import SelectingRole from './selecting-role';
import Speaking from './speaking';
import SentenceResult from './sentence-result';
import Popup from './popup';
import Finish from './finish';
import './stylesheet.scss';

const RolePlayMainMode = {
  LISTEN: 'listen',
  ROLE_PLAY: 'role_play',
};

class RolePlayMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null,
      popup: null,
      playingSentence: null,
      results: [],
      isSentencePlaying: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { playingSentence } = this.state;
    const { rolePlayData } = this.props;
    if (playingSentence !== prevState.playingSentence) {
      if (rolePlayData && rolePlayData.length > playingSentence) {
        this.onSentenceChange();
      } else {
        const mode = this.getMode();
        if (mode === RolePlayMainMode.LISTEN) {
          this.handleControlSpeakingButtonClick();
        } else {
          this.handleFinishRolePlay();
        }
      }
    }
  }

  cssClass = 'role-play-main';

  getAudioPlayerId = () => {
    const { id } = this.props;
    return id;
  };

  handleFinishRolePlay = () => {
    const { onRolePlayingFinish } = this.props;
    const score = this.getScore();
    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <Finish score={score} onReviewButtonClick={this.handlePopupClose} />
          ),
        }),
      ),
    );
    if (onRolePlayingFinish) {
      onRolePlayingFinish(score);
    }
  };

  getScore = () => {
    const results = this.state.results && Object.values(this.state.results);
    if (!results.length) return 0;
    const totalScore = results.reduce(
      (sum, result) => (result ? sum + result.percent : sum + 0),
      0,
    );
    const numberOfResult = results.length;
    return Math.ceil(totalScore / numberOfResult);
  };

  getRoles = () => {
    const { rolePlayData } = this.props;
    return (
      rolePlayData &&
      rolePlayData.length &&
      rolePlayData
        .map((data) => data.u)
        .filter(
          (u, index, arr) =>
            arr.findIndex((item) => item.name === u.name) === index,
        )
    );
  };

  rolePlayDataToSentences = (rolePlayData, results) => {
    const { playingSentence } = this.state;

    return (
      rolePlayData &&
      Array.isArray(rolePlayData) &&
      rolePlayData.map((data, index) => {
        let content = null;
        let star = 0;
        if (results && results[index]) {
          const result = results[index];
          content =
            result.voiceResult &&
            result.voiceResult.length &&
            result.voiceResult.map((vr) =>
              Object.assign({}, vr, { word: vr.name }),
            );
          star = result.percent;
        } else {
          content = [
            {
              word: data.vocab.name,
            },
          ];
        }
        return {
          active: playingSentence === index,
          content,
          star,
          u: data.u,
        };
      })
    );
  };

  handleRoleSelected = (role) => {
    const { playingSentence } = this.state;
    this.setState(
      Object.assign(
        {},
        this.getPopupState(false),
        this.getModeState(RolePlayMainMode.ROLE_PLAY, { role }),
        this.getPlayingSentenceState(0),
        this.getClearResultsState(),
      ),
      () => {
        // trigger sentence change even if start speaking at sentence 0
        if (playingSentence === 0) {
          this.onSentenceChange();
        }
      },
    );
  };

  getMode = () => {
    const { role } = this.state;
    if (role) {
      return RolePlayMainMode.ROLE_PLAY;
    }
    return RolePlayMainMode.LISTEN;
  };

  getModeState = (mode, params) => {
    switch (mode) {
      case RolePlayMainMode.LISTEN: {
        return {
          role: null,
        };
      }
      case RolePlayMainMode.ROLE_PLAY: {
        const { role } = params;
        return {
          role,
        };
      }
      default: {
        return {};
      }
    }
  };

  getPopupState = (isOpen, params) => {
    if (isOpen) {
      return {
        popup: params,
      };
    }
    return {
      popup: null,
    };
  };

  getResultsState = (resultAtIndex, index) => {
    const { results } = this.state;
    return {
      results: Object.assign({}, results, {
        [index]: resultAtIndex,
      }),
    };
  };

  getClearResultsState = () => ({
    results: null,
  });

  getPlayingSentenceState = (index) => ({
    playingSentence: index,
  });

  getIsSentencePlayingState = (isSentencePlaying) => ({
    isSentencePlaying,
  });

  setIsSentencePlaying = (isSentencePlaying) => {
    this.setState(
      Object.assign({}, this.getIsSentencePlayingState(isSentencePlaying)),
    );
  };

  handlePopupCanceled = () => {
    this.setState(Object.assign({}, this.getPopupState(false)), () =>
      this.setIsSentencePlaying(true),
    );
  };

  handleListenAccepted = () => {
    this.setState(
      Object.assign(
        {},
        this.getPlayingSentenceState(0),
        this.getPopupState(false),
        this.getModeState(RolePlayMainMode.LISTEN),
        this.getClearResultsState(),
      ),
      () => this.setIsSentencePlaying(true),
    );
  };

  handleControlListeningButtonClick = () => {
    const { playingSentence } = this.state;
    const message =
      playingSentence === null
        ? `${t1('do_you_want_to_start_listening_to_the_conversation')}?`
        : `${t1('do_you_want_to_listen_to_the_conversation_again')}?`;

    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <Confirm
              message={message}
              onCancelButtonClick={this.handlePopupCanceled}
              onAcceptButtonClick={this.handleListenAccepted}
            />
          ),
          onClose: this.handlePopupCanceled,
        }),
      ),
      () => this.setIsSentencePlaying(false),
    );
  };

  handleSpeakingAccepted = () => {
    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <SelectingRole
              roles={this.getRoles()}
              onRoleSelected={this.handleRoleSelected}
            />
          ),
          onClose: this.handlePopupCanceled,
        }),
      ),
    );
  };

  handleControlSpeakingButtonClick = () => {
    let message = '';
    if (this.getMode() === RolePlayMainMode.ROLE_PLAY) {
      message = `${t1('do_you_want_to_start_again')}?`;
    } else {
      message = `${t1('do_you_want_to_start_role_playing')}?`;
    }

    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <Confirm
              message={message}
              onCancelButtonClick={this.handlePopupCanceled}
              onAcceptButtonClick={this.handleSpeakingAccepted}
            />
          ),
          onClose: this.handlePopupCanceled,
        }),
      ),
      () => this.setIsSentencePlaying(false),
    );
  };

  getAudioUrlFromRolePlayDatum = (rolePlayDatum) =>
    (rolePlayDatum && rolePlayDatum.vocab && rolePlayDatum.vocab.player) || '';

  getVocabTextFromRolePlayDatum = (rolePlayDatum) =>
    (rolePlayDatum && rolePlayDatum.vocab && rolePlayDatum.vocab.name) || '';

  rolePlayDataToAudioUrls = (rolePlayData) =>
    (rolePlayData &&
      Array.isArray(rolePlayData) &&
      rolePlayData.map(this.getAudioUrlFromRolePlayDatum)) ||
    [];

  rolePlayDataToVocabTexts = (rolePlayData) =>
    (rolePlayData &&
      Array.isArray(rolePlayData) &&
      rolePlayData.map(this.getVocabTextFromRolePlayDatum)) ||
    [];

  isSpeakingSentence = (index) => {
    const { role } = this.state;
    const { rolePlayData } = this.props;
    const datum = rolePlayData && rolePlayData.length && rolePlayData[index];
    return role && role.name && datum && datum.u && role.name === datum.u.name;
  };

  handleSentenceResultClose = (result, speakingIndex) => {
    this.setState(
      Object.assign(
        {},
        this.getPlayingSentenceState(speakingIndex + 1),
        this.getPopupState(false),
        this.getResultsState(result, speakingIndex),
      ),
    );
  };

  handleSpeakingResult = (result, speakingIndex) => {
    const onClose = () => this.handleSentenceResultClose(result, speakingIndex);

    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <SentenceResult
              content={
                result &&
                result.voiceResult &&
                result.voiceResult.map((r) =>
                  Object.assign({}, r, { word: r.name }),
                )
              }
              result={result && result.percent}
              onNextButtonClick={onClose}
            />
          ),
          onClose,
        }),
      ),
    );
  };

  getResultWhenSkip = (index) => {
    const { rolePlayData } = this.props;
    const datum = rolePlayData[index];
    return {
      percent: 0,
      voiceResult: [
        {
          name: datum.vocab.name,
          isCorrect: false,
        },
      ],
    };
  };

  handleSpeakingSkip = () => {
    const { playingSentence } = this.state;
    this.setState(
      Object.assign(
        {},
        this.getPlayingSentenceState(playingSentence + 1),
        this.getResultsState(
          this.getResultWhenSkip(playingSentence),
          playingSentence,
        ),
        this.getPopupState(false),
      ),
    );
  };

  handleCancelSpeakingConfirm = () => {
    this.setState(
      Object.assign(
        {},
        this.getModeState(),
        this.getPopupState(false),
        this.getPlayingSentenceState(null),
        this.getClearResultsState(),
      ),
    );
  };

  handleSpeakingPopupClose = (stateToReverseToIfConfirmCanceled) => {
    const revertToState = () => {
      this.setState(stateToReverseToIfConfirmCanceled);
    };

    this.setState(
      Object.assign(
        {},
        this.getPopupState(true, {
          content: (
            <Confirm
              message={`${t1('do_you_want_to_stop_role_playing')}?`}
              isCancelButtonPrimary
              isOKButtonPrimary={false}
              onCancelButtonClick={revertToState}
              onAcceptButtonClick={this.handleCancelSpeakingConfirm}
            />
          ),
          onClose: revertToState,
        }),
      ),
    );
  };

  onSentenceChange = () => {
    const { role, playingSentence } = this.state;
    const { rolePlayData } = this.props;
    const datum =
      rolePlayData && rolePlayData.length && rolePlayData[playingSentence];
    if (role && role.name) {
      if (datum && datum.u && role.name === datum.u.name) {
        const openPopupForSpeakingState = Object.assign(
          {},
          this.getPopupState(true, {
            content: (
              <Speaking
                vocab={datum.vocab}
                onResult={(result) =>
                  this.handleSpeakingResult(result, playingSentence)
                }
                onSkipButtonClick={this.handleSpeakingSkip}
              />
            ),
            onClose: () =>
              this.handleSpeakingPopupClose(openPopupForSpeakingState),
          }),
        );
        this.setState(openPopupForSpeakingState);
      } else {
        this.setIsSentencePlaying(true);
      }
    }
  };

  handleAudioEnded = (audioIndex) => {
    this.setState(
      Object.assign({}, this.getPlayingSentenceState(audioIndex + 1)),
    );
  };

  handlePopupClose = () => {
    const { popup } = this.state;
    this.setState(Object.assign({}, this.getPopupState(false)));
    if (popup.onClose) {
      popup.onClose();
    }
  };

  isRolePlayDataValid = (rolePlayData) =>
    rolePlayData &&
    Array.isArray(rolePlayData) &&
    rolePlayData.length > 0 &&
    rolePlayData.every((datum) => {
      const audioUrl = this.getAudioUrlFromRolePlayDatum(datum);
      const text = this.getVocabTextFromRolePlayDatum(datum);
      return audioUrl && text;
    });

  render() {
    const { rolePlayData } = this.props;
    const { popup, isSentencePlaying, playingSentence, results } = this.state;

    if (!this.isRolePlayDataValid(rolePlayData)) {
      return (
        <div className={this.cssClass}>
          <div className={`${this.cssClass}__message`}>
            {t1('sorry_there_are_not_enough_data_to_display_this_question')}
          </div>
        </div>
      );
    }

    const audioUrls = this.rolePlayDataToAudioUrls(rolePlayData);
    const playingAudio = !this.isSpeakingSentence(playingSentence)
      ? playingSentence
      : null;

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__audios`}>
          <Audios
            isPlaying={isSentencePlaying}
            playerId={this.getAudioPlayerId()}
            playingAudio={playingAudio}
            urls={audioUrls}
            onAudioEnded={this.handleAudioEnded}
          />
        </div>
        <div className={`${this.cssClass}__display`}>
          <Scrollbars
            ref={(scrollBar) => {
              this.scrollBar = scrollBar;
            }}
          >
            <div className={`${this.cssClass}__display-content`}>
              <Sentences
                sentences={this.rolePlayDataToSentences(rolePlayData, results)}
                parentScrollBar={this.scrollBar}
              />
            </div>
          </Scrollbars>
        </div>
        <div className={`${this.cssClass}__control`}>
          <Control
            onListeningButtonClick={this.handleControlListeningButtonClick}
            onSpeakingButtonClick={this.handleControlSpeakingButtonClick}
          />
        </div>
        {popup && popup.content && (
          <div className={`${this.cssClass}__popup`}>
            <Popup onClose={this.handlePopupClose}>{popup.content}</Popup>
          </div>
        )}
      </div>
    );
  }
}

RolePlayMain.propTypes = {
  id: PropTypes.string,
  onRolePlayingFinish: PropTypes.func,
  rolePlayData: PropTypes.arrayOf(
    PropTypes.shape({
      u: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      vocab: PropTypes.shape(),
    }),
  ),
};

RolePlayMain.defaultProps = {
  id: null,
  onRolePlayingFinish: () => {},
  rolePlayData: [],
};

export default connect()(RolePlayMain);
