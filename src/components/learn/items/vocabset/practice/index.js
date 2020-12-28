import React from 'react';
import { connect } from 'react-redux';
import HtmlContent from 'components/common/html';
import { getRecognitionPlayerId } from 'components/common/media-player/common';
import Utils from 'common/vocabset/Utils';

import Speaking from './../Speaking/Speaking';
import Result from './result/Result';

export class VocabsetDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { result, vid, vocabset, vocabs } = this.props;

    const text = vocabset ? vocabset.name : '';
    const language = Utils.getLanguageFromComponent(this);
    const phonetics = Utils.getPhoneticsByLanguage(vocabset, language);
    const audioFile = Utils.getAudioByLanguage(vocabset, language, text);

    return (
      <div>
        {vocabset && (
          <div className="video-name">
            <HtmlContent content={vocabset.content} />
          </div>
        )}

        {!result ? (
          <Speaking vid={vid} iid={vid} vocab={vocabset} />
        ) : (
          <Result
            vid={vid}
            iid={vid}
            vocabset={vocabset}
            phonetics={phonetics}
            audioFile={audioFile}
            vocabs={vocabs}
            result={result}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let result;
  if (
    state.mediaPlayer &&
    state.mediaPlayer.playersData &&
    state.mediaPlayer.playersData[getRecognitionPlayerId(props.vid)]
  ) {
    result = state.mediaPlayer.playersData[getRecognitionPlayerId(props.vid)];
  }

  const nodes = state.tree;

  let vocabset;
  if (props.vid) {
    vocabset = nodes[props.vid];
  }

  const vocabs = [];
  if (vocabset && vocabset.children) {
    const vocabListIds = vocabset.children;
    for (let i = 0; i < vocabListIds.length; i += 1) {
      const vocab = nodes[vocabListIds[i]];
      if (vocab && vocab.name === vocabset.name) {
        vocabset = vocab;
      } else if (vocab && vocab.name !== vocabset.name) {
        vocabs.push(vocab);
      }
    }
  }

  return {
    result,
    vocabset,
    vocabs,
  };
};

export default connect(mapStateToProps)(VocabsetDisplay);
