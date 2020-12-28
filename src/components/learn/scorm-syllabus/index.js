import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import UnderstoodButton from 'components/learn/common/UnderstoodButton';
import { isItemPassedSelector } from 'components/admin/node/utils';
import {
  isScormProcessing,
  isScormProcessingSuccess,
} from 'components/admin/scorm/scorm';
import ScormPlayer from 'components/learn/common/ScormPlay';

import Warning from 'components/common/Warning';
import rateTheCourse from './dialog-rate-the-course';

class ScormSyllabus extends React.PureComponent {
  render() {
    const {
      className,
      syllabus,
      course,
      isPreview,
      isReview,
      passed,
    } = this.props;
    const componentClassName = `${className || ''} col-xs-12`;

    return (
      <div className={componentClassName}>
        {isScormProcessing(syllabus) ? (
          <Warning>
            <h1>{t1('scorm_file_is_being_processed')}</h1>
            <p style={{ margin: 0 }}>
              {t1(
                'depending_on_the_file_size,_this_might_take_several_minutes...',
              )}{' '}
              . {t1('please_come_back_later.')}
            </p>
          </Warning>
        ) : !isScormProcessingSuccess(syllabus) ? (
          [
            <h3>{t1('there_is_a_problem_with_the_scorm')}</h3>,
            <p style={{ margin: 0 }}>
              {t1('we_will_fix_it_as_soon_as_possible')}
            </p>,
            <p style={{ margin: 0 }}>{t1('please_come_back_later.')}</p>,
          ]
        ) : (
          [
            <ScormPlayer
              scormDirectoryUrl={syllabus && syllabus.scorm_directory_url}
            />,
            <UnderstoodButton
              courseIid={course && course.iid}
              isPreview={isPreview}
              isReview={isReview}
              learnItemIid={course && course.syllabus}
              passed={passed}
            />,
            rateTheCourse({ syllabus, course }),
          ]
        )}
      </div>
    );
  }
}

ScormSyllabus.propTypes = {
  className: PropTypes.string,
};

ScormSyllabus.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const { course } = props;

  return {
    passed: isItemPassedSelector(state)(course && course.syllabus),
    isPreview: state.learn.isPreview,
    isReview: state.learn.isReview,
  };
};

export default connect(mapStateToProps)(ScormSyllabus);
