import React from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { change } from 'redux-form';
import { t1, t3 } from 'translate';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import Avatar from 'components/common/avatar/index';
import fetchData from 'components/common/fetchData';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { renderLearnerInformation } from 'components/admin/invite/utils';
import ResetProgress from '../mainstage/ResetProgress';

const dialogOptionsProperties = (learner) => ({
  handleClose: true,

  title: renderLearnerInformation({
    learner,
    size: 40,
    className: 'title-reset-progress',
    typeLearner: t3(learner.type === 'user' ? 'user' : 'group'),
  }),
  width: '80%',
});

const getFormValuesFromProps = (props) => {
  const { formValues, xpath } = props;
  const currentLearner = (formValues && get(formValues, xpath)) || {};
  const learningItems = (formValues && formValues.learning_items) || [];
  const learners = (formValues && formValues.learners) || [];
  const resetProgress = formValues && formValues.reset_progress;
  return {
    currentLearner,
    learningItems,
    learners,
    resetProgress,
  };
};

class LayoutFreestyle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeRender: 0,
    };
  }

  renderPreview = ({ showFull, disabled = false }) => (
    <RaisedButton
      label={t1('resolve_manually')}
      disabled={disabled}
      onClick={showFull}
    />
  );

  resetProgressByResolveManually = ({
    closeDialog,
    learner,
    learningItems,
    resolveProgresses,
  }) => (
    <ResetProgress
      closeDialog={closeDialog}
      learner={learner}
      learningItems={learningItems}
      resolveProgresses={resolveProgresses}
      resolveResetProgressLearningItem={this.resolveResetProgressLearningItem}
    />
  );

  resolveResetProgressLearningItem = (resolveProgresses) => {
    const { dispatch, formid, formValues, xpath } = this.props;

    let learners = (formValues && formValues.learners) || [];
    const currentValue = (formValues && get(formValues, xpath)) || {};

    learners = learners.forEach((map) => {
      if (map.iid === currentValue.iid) {
        map.resolve_progress = resolveProgresses;
      }
      return map;
    });

    this.setState({ timeRender: Date.now() });
    dispatch(change(formid, 'learners', learners));
  };

  render() {
    const {
      countProgressesLearningItemsProgressesOfLearner,
      groups,
      readOnly,
    } = this.props;

    const {
      currentLearner,
      learningItems,
      resetProgress,
    } = getFormValuesFromProps(this.props);
    const fieldNames = groups && groups.default && groups.default.fieldNames;

    if (!fieldNames || !currentLearner) {
      return null;
    }

    return (
      <div className="box-form-learner">
        <div className="col-md-4">
          <Icon icon={currentLearner.type === 'user' ? 'user' : 'group'} />
          &nbsp;{t1(currentLearner.type)}
        </div>
        <div className="col-md-4">
          <Avatar user={currentLearner} size={30} />
          &nbsp;
          {currentLearner.name}
          {typeof currentLearner.current_members !== 'undefined' && (
            <span className="text-muted">
              {' '}
              ({t1("%s_member's", [currentLearner.current_members])})
            </span>
          )}
        </div>
        <div className="col-md-4">
          {countProgressesLearningItemsProgressesOfLearner > 0 &&
            (currentLearner.type === 'user'
              ? t1('has_progresses_in_this_course|_learning_path')
              : t1('%s_user(s)_are learning_this_items,_partially', [
                  currentLearner.current_members || 0,
                ]))}
          {countProgressesLearningItemsProgressesOfLearner > 0 &&
            learningItems.length > 0 && (
              <div className="action-box">
                <span className="button-box">
                  <DetailOnDialog
                    renderPreview={({ showFull }) =>
                      this.renderPreview({
                        showFull,
                        disabled:
                          readOnly ||
                          resetProgress ||
                          currentLearner.reset_progress,
                      })
                    }
                    timeRender={
                      (this.state.timeRender || 0) +
                      (resetProgress || currentLearner.reset_progress)
                    }
                    renderFull={({ closeDialog }) =>
                      this.resetProgressByResolveManually({
                        closeDialog,
                        learner: currentLearner,
                        learningItems,
                        resolveProgresses: currentLearner.resolve_progress,
                      })
                    }
                    dialogKey="reset-progress"
                    dialogOptionsProperties={dialogOptionsProperties(
                      currentLearner,
                    )}
                  />
                </span>
                <span className="button-box wapper-reset-progress">
                  {fieldNames.reset_progress}
                </span>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default fetchData((props) => {
  const { currentLearner, learningItems } = getFormValuesFromProps(props);
  return {
    baseUrl: apiUrls.get_progress_with_learning_items_of_learner,
    fetchCondition: (() => {
      const currentValues = getFormValuesFromProps(props);
      return (
        currentValues.currentLearner.iid &&
        currentValues.learningItems &&
        currentValues.learningItems.length
      );
    })(),
    refetchCondition: (prevProps) => {
      const values = getFormValuesFromProps(props);
      const prevValues = getFormValuesFromProps(prevProps);

      if (!values.learningItems.length) {
        return false;
      }

      if (!values.currentLearner.iid) {
        return false;
      }

      if (
        !isEqual(values.learningItems, prevValues.learningItems) ||
        !isEqual(values.currentLearner, prevValues.currentLearner)
      ) {
        return true;
      }
      return false;
    },
    params: {
      learner_iid: currentLearner && currentLearner.iid,
      learner_type: currentLearner && currentLearner.type,
      learning_items: learningItems,
      get_detail: 0,
    },
    propKey: 'countProgressesLearningItemsProgressesOfLearner',
  };
})(LayoutFreestyle);
