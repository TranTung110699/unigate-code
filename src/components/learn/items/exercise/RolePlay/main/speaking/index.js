import React from 'react';
import PropTypes from 'prop-types';
import Speaking from 'components/learn/items/vocabset/Speaking/Speaking';
import { t1 } from 'translate';
import './stylesheet.scss';

class RolePlaySpeaking extends React.Component {
  constructor(props) {
    super(props);
    this.vid = Math.floor(Math.random() * 1000000000);
  }

  cssClass = 'role-play-speaking';

  handleResult = (result) => {
    const { onResult } = this.props;
    if (onResult) {
      onResult(result);
    }
  };

  render() {
    const { vocab, onSkipButtonClick } = this.props;
    return (
      <div className={this.cssClass}>
        <Speaking
          onResult={this.handleResult}
          autoCheckRecognitionOnMount
          vocab={vocab}
          vid={this.vid}
          iid={this.vid}
        />
        <div className={`${this.cssClass}__buttons`}>
          <button
            className={`${this.cssClass}__button ${
              this.cssClass
            }__button--right`}
            onClick={onSkipButtonClick}
          >
            {t1('skip')}
          </button>
        </div>
      </div>
    );
  }
}

RolePlaySpeaking.propTypes = {
  onResult: PropTypes.func,
  onSkipButtonClick: PropTypes.func,
  vocab: PropTypes.shape(),
};

RolePlaySpeaking.defaultProps = {
  onResult: () => {},
  onSkipButtonClick: () => {},
  vocab: null,
};

export default RolePlaySpeaking;
