import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

class RolePlaySentenceContent extends React.Component {
  cssClass = 'role-play-sentence-content';

  render() {
    const { content, active, isLeft } = this.props;
    return (
      <div
        className={`${this.cssClass} \
          ${active ? `${this.cssClass}--active` : ''} \
          ${isLeft ? `${this.cssClass}--left` : `${this.cssClass}--right`}`}
      >
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
    );
  }
}

RolePlaySentenceContent.propTypes = {
  active: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      isCorrect: PropTypes.bool,
    }),
  ),
  isLeft: PropTypes.bool,
};

RolePlaySentenceContent.defaultProps = {
  active: false,
  content: [],
  isLeft: false,
};

export default RolePlaySentenceContent;
