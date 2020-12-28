import React from 'react';
import PropTypes from 'prop-types';
import SubRubric from 'components/common/rubric/SubRubric';
import PMDRubric from 'components/common/rubric/Pmd';
import get from 'lodash.get';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import { connect } from 'react-redux';
import sagaActions from 'actions/saga-creators';
import actions from 'actions/node/creators';
import apiUrls from 'api-endpoints';
import { createSelector } from 'reselect';
import { ntype as allNtype } from 'configs/constants';
import { parseScoreToString } from 'common/utils/Score';
import './stylesheet.scss';
import fetchData from '../fetchData';
import nodeSagaActions from '../../../actions/node/saga-creators';

const progressKeyState = (rubric, user) =>
  `progress-rubric-${get(rubric, 'iid')}-${get(user, 'iid')}`;

class MarkingRuric extends React.PureComponent {
  static propTypes = {
    scoreScale: PropTypes.shape(),
    user: PropTypes.shape(),
    rubric: PropTypes.shape(),
  };

  static defaultProps = {
    scoreScale: null,
    user: null,
    rubric: null,
  };

  getProgressTracking = () => {
    const { dispatch, user, progress } = this.props;
    // if (progress && Object.keys(progress) > 0) {
    //   return;
    // }

    const data = {
      children: 1,
      tcos: [get(this.props, 'rubric.iid')],
      depth: 5,
      userIid: user && user.iid,
    };

    dispatch(
      nodeSagaActions.getDataRequest(
        {
          url: apiUrls.tracker_progress_get(false),
          keyState: progressKeyState(this.props.rubric, user),
          post: true,
        },
        data,
      ),
    );
  };

  componentDidMount() {
    if (!this.props.fullData) {
      this.getProgressTracking();
    }
  }

  changeRubricProgress = (progressValue, notCloseModal) => {
    const {
      dispatch,
      user,
      rubric,
      handleSaveProgressSuccessfully,
    } = this.props;
    const propgress = Object.keys(progressValue).map((key) => {
      const score = progressValue[key];
      return {
        tco_iid: key,
        ss: score.score_scale,
        po: score.p_original,
        sc: score.comment,
      };
    });
    const data = {
      progress: propgress,
      userIid: user.iid,
      _sand_real_time: 1,
    };

    const ntype = get(this.props, 'node.ntype');
    const iid = get(this.props, 'node.iid');
    if (ntype === allNtype.COURSE) {
      data.course_iid = iid;
    } else if (ntype === allNtype.SYLLABUS) {
      data.credit_syllabus_iid = iid;
    }

    dispatch(
      sagaActions.trackerProgressSave(data, null, (response) => {
        this.getProgressTracking();
        handleSaveProgressSuccessfully(this.props);
        if (!notCloseModal) {
          dispatch(actions.handleOpenDialog({ openDialog: false }));
        }
      }),
    );
  };

  contentMarking = (onMarking = null) => {
    const {
      rubric,
      user,
      scoreScale,
      progress,
      anythingValue,
      showDialog,
    } = this.props;
    const MarkingComponent = scoreScale === 'pmd' ? PMDRubric : SubRubric;

    return (
      <MarkingComponent
        anythingValue={anythingValue}
        user={user}
        onDialog={showDialog}
        rubric={rubric}
        scoreScale={scoreScale}
        onMarking={onMarking || this.props.onMarking}
        progress={progress}
      />
    );
  };

  showDialogMarking = () => {
    const { dispatch, onChange } = this.props;

    const contentDialog = this.contentMarking(
      onChange
        ? (props, closeDialog) => {
            this.changeRubricProgress(props, closeDialog);
          }
        : this.changeRubricProgress,
    );

    const optionsProperties = {
      handleClose: true,

      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  renderScoreScaleNotSubport = () => <div>{t1('score_scale_not_support')}</div>;

  renderMarking1LevelOnly = (
    scoreScale,
    rubric,
    p,
    className,
    anythingValue = false,
  ) => {
    return (
      <Marking
        label={
          <span className={className}>
            {p}
            <Icon icon="edit" />
          </span>
        }
        editingValue={p}
        anythingValue={anythingValue}
        scalePartIdAsValue
        scoreScale={scoreScale}
        onChange={(progressValue) => {
          this.changeRubricProgress({
            [rubric.iid]: {
              p_original: progressValue,
              score_scale: scoreScale,
            },
          });
        }}
      />
    );
  };

  render() {
    const {
      rubric,
      showDialog,
      anythingValue,
      scoreScale,
      progress,
      className,
      rubricParentSubType,
    } = this.props;
    const p = parseScoreToString(
      get(progress, `[${rubric.iid}].p_original`),
      scoreScale,
    );

    if (scoreScale === 'pmd') {
      if (get(rubric, 'children.length', 0) === 3) {
        return showDialog ? (
          <a
            className={`rubric-marking ${className}`}
            onClick={this.showDialogMarking}
          >
            {p}
            <Icon icon="edit" />
          </a>
        ) : (
          this.contentMarking()
        );
      }
      return this.renderScoreScaleNotSubport();
    }

    if (
      rubricParentSubType === 'academic_score' ||
      get(rubric, 'children.length', 0) === 0
    ) {
      return this.renderMarking1LevelOnly(
        scoreScale,
        rubric,
        p,
        className,
        anythingValue,
      );
    }

    return (
      <a
        className={`rubric-marking ${className}`}
        onClick={this.showDialogMarking}
      >
        {p}
        <Icon icon="edit" />
      </a>
    );
  }
}

const keyState = (props) => `rubric-course-offline-${get(props, 'rubric.iid')}`;

const mapStateToProps = (state, props) =>
  createSelector(
    (state, props) => get(props, keyState(props)) || get(props, 'rubric'),
    (state, props) =>
      state.dataApiResults[progressKeyState(props.rubric, props.user)],
    (state, props) => props.scoreScale,
    (state, props) => props.progress,
    (rubric, progressResult, scoreScale, progress) => {
      let newProgress = null;
      if (progressResult) {
        newProgress = {};
        Object.keys(progressResult).forEach((key) => {
          const p = progressResult[key];
          newProgress[key] = {
            p_original: p.po,
            comment: p.sc,
            score_scale: scoreScale,
          };
        });
      }
      return {
        rubric,
        progress: newProgress || progress,
      };
    },
  );

MarkingRuric.propsTypes = {
  showDialog: PropTypes.boolean,
};

MarkingRuric.defaultProps = {
  showDialog: true,
};

export default fetchData((props) => ({
  baseUrl: apiUrls.fetch_node,
  params: {
    ntype: 'skill',
    iid: get(props, 'rubric.iid'),
    type: 'rubric',
    depth: 5,
  },
  propKey: keyState(props),
  fetchCondition:
    !get(props, 'fullData') && get(props, 'rubric.children.length', 0) <= 0,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(connect(mapStateToProps)(MarkingRuric));
