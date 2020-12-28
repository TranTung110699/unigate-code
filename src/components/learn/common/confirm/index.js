import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import LinearProgress from 'material-ui/LinearProgress';
import { t1, t4 } from 'translate';
// import { Link } from 'react-router-dom';
import './stylesheet.scss';

class ExerciseExamConfirm extends React.Component {
  cssClass = 'learn-exam-confirm';

  render() {
    const {
      acceptMessage,
      cancelMessage,
      onAcceptButtonClick,
      onCancelButtonClick,
      prompt,
      bigPrompt,
      bigPromptClassName,
      iconClassName,
      className,
      preloadData,
    } = this.props;
    const IconDisplay = this.props.iconDisplay || 'exam_doing';

    return (
      <div className={`${this.cssClass} ${className}`}>
        <div className={`${this.cssClass}__icon ${iconClassName}`}>
          {preloadData && preloadData.loadedFilesTotal === preloadData.total ? (
            <Icon icon="check" />
          ) : (
            <Icon icon={IconDisplay} />
          )}
        </div>
        {preloadData && preloadData.loadedFilesTotal === preloadData.total ? (
          <div className={`${this.cssClass}__text text-center`}>
            <div>{t1('all_files_have_been_successfully_downloaded')}</div>
          </div>
        ) : (
          <div className={`${this.cssClass}__text text-center`}>
            {bigPrompt && (
              <h3 className={`${bigPromptClassName} text-center`}>
                {bigPrompt}
              </h3>
            )}
            {prompt}
            {preloadData && (
              <div>
                <div className={`${this.cssClass}__preload-data-detail`}>
                  {`${preloadData.loadedFilesTotal} / ${preloadData.total}`}{' '}
                  {t4('loaded_files')}{' '}
                </div>
                <br />
                <LinearProgress
                  mode="determinate"
                  value={parseInt(
                    (preloadData.loadedFilesTotal / preloadData.total) * 100,
                  )}
                />
              </div>
            )}
          </div>
        )}
        <div className={`${this.cssClass}__buttons`}>
          {onAcceptButtonClick &&
            (!preloadData ||
              (preloadData &&
                preloadData.loadedFilesTotal === preloadData.total)) && (
              <button
                onClick={
                  typeof onAcceptButtonClick === 'function'
                    ? onAcceptButtonClick
                    : null
                }
                className={`${this.cssClass}__button ${
                  this.cssClass
                }__button--primary`}
              >
                {acceptMessage}
              </button>
            )}
          {onCancelButtonClick && (
            <button
              onClick={
                typeof onCancelButtonClick === 'function'
                  ? onCancelButtonClick
                  : null
              }
              className={`${this.cssClass}__button`}
            >
              {cancelMessage}
            </button>
          )}
        </div>
      </div>
    );
  }
}

ExerciseExamConfirm.propTypes = {
  acceptMessage: PropTypes.string,
  cancelMessage: PropTypes.string,
  className: PropTypes.string,
  iconDisplay: PropTypes.string,
  onAcceptButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  preloadData: PropTypes.shape(),
  prompt: PropTypes.string,
};

ExerciseExamConfirm.defaultProps = {
  acceptMessage: '',
  cancelMessage: '',
  className: '',
  iconDisplay: '',
  onAcceptButtonClick: null,
  onCancelButtonClick: null,
  preloadData: null,
  prompt: '',
};

export default ExerciseExamConfirm;
