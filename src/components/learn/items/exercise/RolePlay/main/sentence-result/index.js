import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import './stylesheet.scss';

class RolePlaySentenceResult extends React.Component {
  raisedButtonStyle = { color: 'white' };
  cssClass = 'role-play-sentence-result';

  render() {
    const { result, content, onNextButtonClick } = this.props;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__title`}>
          <div className={`${this.cssClass}__title-message`}>
            {`${t1('your_speaking_is_correct')} `}
          </div>
          <div className={`${this.cssClass}__title-result`}>
            {`${result || 0}%`}
          </div>
        </div>
        <div className={`${this.cssClass}__details`}>
          {content &&
            content.map(({ word, isCorrect }, index) => (
              <div
                key={index}
                className={`${this.cssClass}__word \
                ${isCorrect === true ? `${this.cssClass}__word--correct` : ''} \
                ${
                  isCorrect === false ? `${this.cssClass}__word--incorrect` : ''
                }`}
              >
                {word}
              </div>
            ))}
        </div>
        <div className={`${this.cssClass}__buttons`}>
          <RaisedButton
            className={`${this.cssClass}__button`}
            onClick={onNextButtonClick}
            fullWidth
            style={this.raisedButtonStyle}
          >
            {t1('next')}
          </RaisedButton>
        </div>
      </div>
    );
  }
}

RolePlaySentenceResult.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      isCorrect: PropTypes.bool,
    }),
  ),
  onNextButtonClick: PropTypes.func,
  result: PropTypes.number,
};

RolePlaySentenceResult.defaultProps = {
  content: [],
  onNextButtonClick: () => {},
  result: NaN,
};

export default RolePlaySentenceResult;
