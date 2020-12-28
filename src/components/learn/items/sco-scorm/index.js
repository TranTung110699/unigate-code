import React from 'react';
import { connect } from 'react-redux';
import ScormPlay from '../../common/ScormPlay';
import { t1 } from 'translate';
import UnderstoodButton from 'components/learn/common/UnderstoodButton';
import { isItemPassedSelector } from 'components/admin/node/utils';
import {
  isScormProcessing,
  isScormProcessingSuccess,
} from 'components/admin/scorm/scorm';
import Warning from 'components/common/Warning';

class ScoScorm extends React.Component {
  cssClass = '';

  render() {
    const {
      sco,
      isPreview,
      isReview,
      learnItemIid,
      passed,
      courseIid,
    } = this.props;

    return (
      <React.Fragment>
        {isScormProcessing(sco) ? (
          <Warning>
            <h1>
              <Warning inline>{t1('scorm_file_is_being_processed')}</Warning>
            </h1>
            <p style={{ margin: 0 }}>
              {t1(
                'depending_on_the_file_size,_this_might_take_several_minutes...',
              )}{' '}
              . {t1('please_come_back_later.')}
            </p>
          </Warning>
        ) : !isScormProcessingSuccess(sco) ? (
          [
            <h3>{t1('there_is_a_problem_with_the_scorm')}</h3>,
            <p style={{ margin: 0 }}>
              {t1('we_will_fix_it_as_soon_as_possible')}
            </p>,
            <p style={{ margin: 0 }}>{t1('please_come_back_later.')}</p>,
          ]
        ) : (
          [
            <ScormPlay
              scormDirectoryUrl={sco.scorm_directory_url}
              width={'100%'}
              height={'calc(100vh - 350px)'} //hotfix scorm height
            />,
            <UnderstoodButton
              courseIid={courseIid}
              isPreview={isPreview}
              isReview={isReview}
              learnItemIid={learnItemIid}
              passed={passed}
            />,
          ]
        )}
      </React.Fragment>
    );
  }
}

ScoScorm.propTypes = {};

ScoScorm.defaultProps = {};

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const nodes = state.tree;
  const sco = nodes[learnItemIid];

  return {
    learnItemIid,
    sco,
    passed: isItemPassedSelector(state)(learnItemIid),
    isPreview: state.learn.isPreview,
    isReview: state.learn.isReview,
  };
};

export default connect(mapStateToProps)(ScoScorm);
