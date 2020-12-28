import React from 'react';
import { connect } from 'react-redux';

import ForgotToPronounce from './forgot-to-pronounce';
import Solutions from './solutions';
import FrequentlyAskedQuestions from './frequently-asked-questions';
import Symptoms from './symptoms';
import Habits from './habits';
import Environments from './environments';
import Practices from './practices';
import SpeakingEnglishFast from './speaking-english-fast';
import './stylesheet.scss';
import './mobile.scss';

class PhilosophyMainContent extends React.Component {
  render() {
    const { mode } = this.props;
    if (mode === 'forgot-to-pronounce-the-last-consonant') {
      return (
        <div>
          <ForgotToPronounce />
        </div>
      );
    } else if (mode === 'solutions') {
      return (
        <div>
          <Solutions />
        </div>
      );
    } else if (mode === 'frequently-asked-questions') {
      return (
        <div>
          <FrequentlyAskedQuestions />
        </div>
      );
    } else if (mode === 'symptoms') {
      return (
        <div>
          <Symptoms />
        </div>
      );
    } else if (mode === 'habits') {
      return (
        <div>
          <Habits />
        </div>
      );
    } else if (mode === 'environments') {
      return (
        <div>
          <Environments />
        </div>
      );
    } else if (mode === 'practices') {
      return (
        <div>
          <Practices />
        </div>
      );
    } else if (mode === 'speaking-english-fasts') {
      return (
        <div>
          <SpeakingEnglishFast />
        </div>
      );
    }
    return (
      <div>
        <Symptoms />
      </div>
    );
  }
}

const mapStateToProps = () => {
  const location = window.location.pathname;
  const tmp = location.split('/').splice(2, 2);
  const mode = tmp[0];
  return {
    mode,
  };
};

export default connect(mapStateToProps)(PhilosophyMainContent);
