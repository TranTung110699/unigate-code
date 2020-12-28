import React from 'react';
import { questionTemplateTypes } from 'components/admin/question/schema/question-template-types';
import { types } from 'components/admin/question/schema/question-types';

import Introduction from 'components/common/forms/questions/introduction';
import Api from 'components/common/forms/questions/api';
import Inline from 'components/common/forms/questions/inline';
import Reorder from 'components/common/forms/questions/reorder';
import MatchingPair from 'components/common/forms/questions/matching-pair-new';
import OpenEnded from 'components/common/forms/questions/open-ended';
import McAnswerAvatar from 'components/common/forms/questions/mc/answer-avatar';
import McAnswerText from 'components/common/forms/questions/mc/answer-text';
import McOpenEndedAnswerText from 'components/common/forms/questions/mc-open-ended/answer-text';
import NumberAnswer from 'components/common/forms/questions/number';
import Speaking from 'components/common/forms/questions/speaking';
import Writing from 'components/common/forms/questions/writing';
import { isOnlyOnMobileQuestion } from './common';
import OnlyOnMobileQuestion from './only-on-mobile';

class QuestionBody extends React.Component {
  render() {
    const question = this.props.question || {};

    if (isOnlyOnMobileQuestion(question)) {
      return <OnlyOnMobileQuestion />;
    }

    switch (question.type) {
      case types.TYPE_MC: {
        switch (question.tpl_type) {
          case questionTemplateTypes.MC_ANSWER_AVATAR: {
            return <McAnswerAvatar {...this.props} />;
          }
          case questionTemplateTypes.MC_ANSWER_AVATAR_TEXT: {
            return (
              <McAnswerAvatar
                {...Object.assign({}, this.props, { withText: true })}
              />
            );
          }
          case questionTemplateTypes.MC_ANSWER_TEXT: {
            return <McAnswerText {...this.props} />;
          }
          case questionTemplateTypes.MC_ANSWERS_TEXT_AUDIO: {
            return (
              <McAnswerText
                {...Object.assign({}, this.props, { withAudio: true })}
              />
            );
          }
          case questionTemplateTypes.MMC_ANSWER_AVATAR: {
            return (
              <McAnswerAvatar
                {...Object.assign({}, this.props, { multiple: true })}
              />
            );
          }
          case questionTemplateTypes.MMC_ANSWER_AVATAR_TEXT: {
            return (
              <McAnswerAvatar
                {...Object.assign({}, this.props, {
                  withText: true,
                  multiple: true,
                })}
              />
            );
          }
          case questionTemplateTypes.MMC_ANSWER_TEXT: {
            return (
              <McAnswerText
                {...Object.assign({}, this.props, { multiple: true })}
              />
            );
          }
          case questionTemplateTypes.MMC_ANSWERS_TEXT_AUDIO: {
            return (
              <McAnswerText
                {...Object.assign({}, this.props, {
                  withAudio: true,
                  multiple: true,
                })}
              />
            );
          }
          default:
            return <div>Question type {question.tpl_type} not defined</div>;
        }
      }
      case types.TYPE_MC_OPEN_ENDED: {
        switch (question.tpl_type) {
          case questionTemplateTypes.MMC_ANSWER_TEXT: {
            return (
              <McOpenEndedAnswerText
                {...Object.assign({}, this.props, { multiple: true })}
              />
            );
          }
          default:
            return <div>Question type {question.tpl_type} not defined</div>;
        }
      }
      case types.TYPE_INLINE: {
        return <Inline {...this.props} />;
      }
      case types.TYPE_REORDER: {
        return <Reorder {...this.props} />;
      }
      case types.TYPE_MATCHING_PAIRS: {
        return <MatchingPair {...this.props} />;
      }
      case types.TYPE_OPEN_ENDED: {
        return <OpenEnded {...this.props} />;
      }
      case types.TYPE_INTRODUCTION: {
        return <Introduction {...this.props} />;
      }
      case types.TYPE_API: {
        return <Api {...this.props} />;
      }
      case types.TYPE_NUMBER: {
        return <NumberAnswer {...this.props} />;
      }
      case types.TYPE_SPEAKING: {
        return <Speaking {...this.props} />;
      }
      case types.TYPE_WRITING: {
        return <Writing {...this.props} />;
      }

      default:
        return <div>Question {question.type} not defined</div>;
    }
  }
}

export default QuestionBody;
