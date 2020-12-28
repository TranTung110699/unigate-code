import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Survey from 'components/learn/items/survey';
import lodashGet from 'lodash.get';

class SurveyPreview extends React.Component {
  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <Survey
          surveyIid={lodashGet(node, 'iid')}
          isPreview
          previewContentOnly
          displayMaxHeight={Infinity}
        />
      </div>
    );
  }
}

SurveyPreview.propTypes = {
  className: PropTypes.string,
};

SurveyPreview.defaultProps = {
  className: '',
};

export default connect()(SurveyPreview);
