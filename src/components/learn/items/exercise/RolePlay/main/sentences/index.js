import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { smoothScrollTop } from 'common/utils/DOM';
import Sentence from './sentence';

class RolePlaySentences extends React.Component {
  componentDidUpdate = (prevProps) => {
    const { parentScrollBar, sentences } = this.props;

    const parentScrollBarNode = findDOMNode(parentScrollBar);
    const scrollBarNode =
      parentScrollBarNode && parentScrollBarNode.getElementsByTagName('div')[0];

    const oldActiveSentenceIndex = this.getActiveSentenceIndex(
      prevProps.sentences,
    );
    const newActiveSentenceIndex = this.getActiveSentenceIndex(sentences);

    const activeSentenceRef = this[this.getSentenceRef(newActiveSentenceIndex)];
    const activeSentenceNode = findDOMNode(activeSentenceRef);

    if (
      scrollBarNode &&
      oldActiveSentenceIndex !== newActiveSentenceIndex &&
      activeSentenceNode
    ) {
      const sentenceNodeTop = activeSentenceNode.getBoundingClientRect().top;
      const scrollBarContentNode = findDOMNode(this);
      const scrollBarContentTop = scrollBarContentNode.getBoundingClientRect()
        .top;
      smoothScrollTop(scrollBarNode, sentenceNodeTop - scrollBarContentTop);
    }
  };

  cssClass = 'role-play-sentences';

  getSentenceRef = (index) => `sentence${index}`;

  getActiveSentenceIndex = (sentences) =>
    sentences &&
    Array.isArray(sentences) &&
    sentences.findIndex((sentence) => sentence && sentence.active);

  render() {
    const { sentences } = this.props;
    let isLeft = true;
    return (
      <div className={this.cssClass}>
        {sentences &&
          sentences.map((sentence, index) => {
            const prevSentence = sentences[index - 1];
            if (
              (prevSentence && prevSentence.u && prevSentence.u.name) !==
              (sentence.u && sentence.u.name)
            ) {
              isLeft = !isLeft;
            }
            return (
              <div
                key={index}
                className={`${this.cssClass}__sentence`}
                ref={(r) => {
                  this[this.getSentenceRef(index)] = r;
                }}
              >
                <Sentence {...sentence} isLeft={isLeft} />
              </div>
            );
          })}
      </div>
    );
  }
}

RolePlaySentences.propTypes = {
  parentScrollBar: PropTypes.any,
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          word: PropTypes.string,
          isCorrect: PropTypes.bool,
        }),
      ),
      star: PropTypes.number,
      u: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  ),
};

RolePlaySentences.defaultProps = {
  parentScrollBar: null,
  sentences: [],
};

export default RolePlaySentences;
