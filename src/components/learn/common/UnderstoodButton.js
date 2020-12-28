import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import sagaActions from 'actions/saga-creators';
import { connect } from 'react-redux';
import './stylesheet.scss';

class UnderstoodButton extends React.PureComponent {
  saveLearningProgressAsFinish = () => {
    const { learnItemIid, courseIid, dispatch, isPreview } = this.props;
    if (isPreview) {
      return;
    }
    const data = {
      progress: [
        {
          tco_iid: learnItemIid,
          p: 100,
          cp: 100,
          pf: 1,
        },
      ],
      ciid: courseIid,
    };
    dispatch(sagaActions.trackerProgressSave(data));
  };

  render() {
    const { className, passed, isReview } = this.props;
    const componentClassName = `${className || ''} learn-lecture-buttons`;

    return (
      <div className={componentClassName}>
        <button
          onClick={!passed && this.saveLearningProgressAsFinish}
          disabled={passed || isReview}
          className={'learn-lecture-buttons__seen'}
        >
          <Icon icon="check" />
          {t1(
            passed
              ? 'you_have_marked_this_as_understood'
              : isReview
              ? 'you_have_not_marked_this_as_understood'
              : 'i_have_fully_understood_the_content',
          )}
        </button>
      </div>
    );
  }
}

UnderstoodButton.propTypes = {
  className: PropTypes.string,
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPreview: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isReview: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  learnItemIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  passed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

UnderstoodButton.defaultProps = {
  className: '',
  courseIid: '',
  isPreview: false,
  isReview: false,
  learnItemIid: '',
  passed: false,
};

export default connect()(UnderstoodButton);
