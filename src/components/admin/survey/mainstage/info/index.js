import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateForm from '../../new/Form';

class SurveyInfo extends React.Component {
  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm mode="edit" node={node} formid="edit_survey" />
      </div>
    );
  }
}

SurveyInfo.propTypes = {
  className: PropTypes.string,
};

SurveyInfo.defaultProps = {
  className: '',
};

export default connect()(SurveyInfo);
