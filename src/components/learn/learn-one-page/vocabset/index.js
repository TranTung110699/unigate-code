import { connect } from 'react-redux';
import { getRecognitionPlayerId } from 'components/common/media-player/common';
import { VocabsetDisplay } from 'components/learn/items/vocabset/practice';
import { getNodeSelector } from 'components/admin/node/utils';

const populateStateToProps = (state, props) => {
  let result;
  if (
    state.mediaPlayer &&
    state.mediaPlayer.playersData &&
    state.mediaPlayer.playersData[getRecognitionPlayerId(props.vid)]
  ) {
    result = state.mediaPlayer.playersData[getRecognitionPlayerId(props.vid)];
  }

  const { vocabsetIid } = props;
  const fullVocabSet = getNodeSelector(state)(vocabsetIid, null, -1) || {};

  if (
    fullVocabSet &&
    fullVocabSet.children &&
    fullVocabSet.children.length > 0
  ) {
    const length = fullVocabSet.children.length;
    if (fullVocabSet.children[length - 1]) {
      fullVocabSet.audio = fullVocabSet.children[length - 1].audio;
      fullVocabSet.children.splice(length - 1, 1);
    }
  }

  return {
    result,
    vocabset: fullVocabSet,
    vocabs: fullVocabSet.children,
  };
};

export default connect(populateStateToProps)(VocabsetDisplay);
