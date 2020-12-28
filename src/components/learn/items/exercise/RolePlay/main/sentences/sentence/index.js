import React from 'react';
import PropTypes from 'prop-types';
import Character from '../../../common/character';
import Content from './content';
import './stylesheet.scss';

class RolePlaySentence extends React.Component {
  cssClass = 'role-play-sentence';

  render() {
    const { content, u, star, active, isLeft } = this.props;
    let classBox;
    if (isLeft) {
      if (active) {
        classBox = 'chat-box-left-active';
      } else {
        classBox = 'chat-box-left';
      }
    } else if (active) {
      classBox = 'chat-box-right-active';
    } else {
      classBox = 'chat-box-right';
    }
    return (
      <div
        className={`${this.cssClass} \
          ${isLeft ? `${this.cssClass}--left` : `${this.cssClass}--right`}`}
      >
        <div className={`${this.cssClass}__character`}>
          <Character item={u} />
        </div>
        <div className={`${this.cssClass}__content`}>
          <div className={classBox}>
            <Content isLeft={isLeft} active={active} content={content} />
          </div>
        </div>
      </div>
    );
  }
}

RolePlaySentence.propTypes = {
  active: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      isCorrect: PropTypes.bool,
    }),
  ),
  isLeft: PropTypes.bool,
  star: PropTypes.number,
  u: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export const rolePlaySentencePropTypes = RolePlaySentence.propTypes;

RolePlaySentence.defaultProps = {
  active: false,
  content: [
    {
      word: '',
      isCorrect: true,
    },
  ],
  isLeft: false,
  star: 0,
  u: {
    name: '',
    avatar: '',
  },
};

export default RolePlaySentence;
