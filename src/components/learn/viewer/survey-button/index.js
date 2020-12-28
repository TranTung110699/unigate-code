import React from 'react';
import { t1 } from 'translate';
import Button from 'antd/lib/button';
import { scrollToLearnContainer } from '../../common/Util';
import { Link } from 'react-router-dom';

class SurveyButton extends React.Component {
  handleOnClickBtnStartSurvey = () => {
    scrollToLearnContainer(this.props.widthScreenSize);
  };

  render() {
    const { surveyLink, compact } = this.props;
    if (surveyLink) {
      return (
        <Link to={surveyLink}>
          <Button
            title={t1('rate_this_course')}
            icon="star"
            onClick={this.handleOnClickBtnStartSurvey}
          >
            {t1(compact ? 'rate' : 'rate_course')}
          </Button>
        </Link>
      );
    }
    if (this.props.showIfNull) {
      return (
        <Button
          title={t1('rate_this_course')}
          icon="star"
          onClick={this.handleOnClickBtnStartSurvey}
        >
          {t1(compact ? 'rate' : 'rate_course')}
        </Button>
      );
    }
    return null;
  }
}

export default SurveyButton;
