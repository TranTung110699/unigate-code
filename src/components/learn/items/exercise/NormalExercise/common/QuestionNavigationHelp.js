import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import PopoverForHelp from 'components/common/guided/PopoverForHelp';

const colors = [
  {
    status: 'ordered',
    help: t1('you_have_ordered_this_package._check_it_in_your_client_editor'),
  },
  {
    status: 'done',
    help: t1('you_have_answered_it'),
  },
  {
    status: 'correct',
    help: t1(
      'your_answer_was_correct,_or_it_is_the_current_question_you_are_viewing',
    ),
  },
  {
    status: 'incorrect',
    help: t1('your_answer_was_incorrect'),
  },
];

class QuestionNavigationHelp extends React.Component {
  render() {
    const { cssClass } = this.props;
    const guide = {
      title: t1('meaning_of_the_colors'),
      content: (
        <div>
          {colors.map((c, i) => (
            <div>
              <span
                className={`${cssClass}__question ${cssClass}__question--${
                  c.status
                } ${cssClass}__help`}
              >
                {i + 1}
              </span>{' '}
              - {c.help}
            </div>
          ))}
        </div>
      ),
    };

    return <PopoverForHelp guide={guide} />;
  }
}

QuestionNavigationHelp.propTypes = {
  // the sass prefix passed from the question nav control so we can make the buttons
  // look the same in the help dialog/popover
  cssClass: PropTypes.string,
};

QuestionNavigationHelp.defaultProps = {
  cssClass: '',
};

export default QuestionNavigationHelp;
