import React, { Component } from 'react';
import { render } from 'react-dom';
import { reduxForm } from 'redux-form';
import { inputId, parseInlineQuestionRawText } from 'common/learn/Question';
import DisplayHtml from 'components/common/html';
import VarDump from 'components/common/VarDump';
import { t1 } from 'translate';
import InlineInput from './InlineInput';
import { types } from './schema/question-types';

// import PropTypes from 'prop-types';

class QuestionPreview extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userAnswers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.props;

    if (node && node.content && node.type === types.TYPE_INLINE) {
      const { correctAnswers } = parseInlineQuestionRawText(node.content);
      this.setState({ correctAnswers });
      if (correctAnswers) {
        correctAnswers.forEach((e, i) => {
          // inject element to DOM
          render(
            <InlineInput
              handleChange={this.handleChange}
              e={e}
              i={i}
              node={node}
            />,
            document.getElementById(inputId(i, node)),
          );
        });
      }
    }
  }

  // when user types...
  handleChange(value, index) {
    console.log('handleChange', value, index);

    // const { userAnswers } = this.state;

    // const newUserAnswer = userAnswers.map((val, idx) => {
    //   return (idx === index) ? value : val;
    // });

    // this.setState({ userAnswers: newUserAnswer });
  }

  render() {
    const { node } = this.props;

    let parsed = {};
    if (node && node.content) {
      parsed = parseInlineQuestionRawText(node.content);
    }

    return (
      <div>
        <h1>{t1('raw_question')}</h1>
        <DisplayHtml content={parsed.rawQuestion} />

        <div>
          <hr />
        </div>

        {node && <DisplayHtml content={node.content} />}

        {node && node.type === types.TYPE_INLINE && <VarDump data={parsed} />}

        {node && node.yt_vid && (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${node.yt_vid}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: 'preview',
})(QuestionPreview);
