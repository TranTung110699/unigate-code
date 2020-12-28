import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Speaker from 'components/common/media-player/speaker/Speaker';
import { getAudioPlayerId } from 'components/common/media-player/common';
import Utils from 'common/vocabset/Utils';

import './stylesheet.scss';

class Flashcard extends React.Component {
  render() {
    let { vocab, iid } = this.props;
    vocab = vocab || {};
    const text = vocab ? vocab.name : '';
    const language = Utils.getLanguageFromComponent(this);
    const phonetics = Utils.getPhoneticsByLanguage(vocab, language);

    const imgStyle = {
      maxWidth: '300px',
    };

    return (
      <div className="flashcard-wrapper">
        <div className="col-md-1">
          {vocab.player && (
            <Speaker
              playerId={getAudioPlayerId(iid)}
              iid={iid}
              className="m-t-5"
              iconClass="mi-24"
              url={vocab.player}
              text={text}
            />
          )}
        </div>
        <div className="col-md-11">
          <div className="ui-text m-t-10">{vocab.name}</div>
          {phonetics && <div className="ui-spelling">/{phonetics}/</div>}
        </div>
        {vocab.avatar && (
          <div className="col-md-12 text-center">
            <img
              src={`${window.APP_STATIC_CDN}${vocab.avatar}`}
              style={imgStyle}
              alt={vocab.name}
            />
          </div>
        )}
        <div className="col-md-12 text-center">
          {vocab.vname && <h4>{vocab.vname}</h4>}
          {vocab.examples && <h4>{t1('examples')}</h4>}
          {vocab.examples &&
            vocab.examples.map((item, index) => (
              <p>
                {item.name} : {item.vname}
              </p>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const vocab = state.tree[props.iid];
  return {
    vocab,
  };
};

export default connect(mapStateToProps)(Flashcard);
