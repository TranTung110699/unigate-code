import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import DisplayHtml from 'components/common/html';
import { t } from 'translate';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

import SubmitButton from '../submit-button';
import Form from './form';
import fetchData from './fetchData';
import './stylesheet.scss';

const form = 'etec-exam-shift-customized';

class ExamShiftCustomized extends React.Component {
  cssClass = 'etec-exam-shift-customized';

  customizeTest = (course, formValues) => {
    const { dispatch } = this.props;
    const url = apiUrls.customize_test;

    const params = {
      course_iid: course.iid,
      paper_parts: formValues.result,
    };

    dispatch(sagaActions.customizeTestRequest(url, params));
  };

  render() {
    const { className, course, syllabus, formValues } = this.props;
    if (!course || !syllabus) {
      return null;
    }

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <DisplayHtml
          className={`${this.cssClass}__description`}
          content={syllabus.content}
        />
        <div className={`${this.cssClass}__instruction`}>
          {`${t('create_your_customized_test')}: ${t(
            'select_the_parts_your_want_to_add',
          )}`}
        </div>
        <Form form={form} className={`${this.cssClass}__build`} />
        <div className={`${this.cssClass}__action`}>
          <SubmitButton
            disabled={
              !formValues ||
              !Array.isArray(formValues.result) ||
              formValues.result.length === 0
            }
            className={`${this.cssClass}__start-action`}
            onClick={() => this.customizeTest(course, formValues)}
          >
            {`${t('start_your_test')}`}
          </SubmitButton>
        </div>
      </div>
    );
  }
}

ExamShiftCustomized.propTypes = {
  className: PropTypes.string,
  course: PropTypes.shape(),
  formValues: PropTypes.shape(),
  syllabus: PropTypes.shape(),
};

ExamShiftCustomized.defaultProps = {
  className: '',
  course: null,
  formValues: null,
  syllabus: null,
};

const mapStateToProps = (state) => ({
  formValues: getFormValues(form)(state),
});

export default connect(mapStateToProps)(fetchData(ExamShiftCustomized));
