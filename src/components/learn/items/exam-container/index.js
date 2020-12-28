import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { t1 } from 'translate';
import { getNodeSelector } from 'components/admin/node/utils';
import apiUrls from 'api-endpoints';
import { initExam } from 'actions/learn/exercise/normal/saga-creators';
import { statuses as examStatus } from 'common/learn';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import Perm from 'common/utils/Perm';
import {
  modes,
  modifyQuestionsInfoOfTakeFromServer,
  statuses,
  types,
} from 'common/learn/exercise';
import screenfull from 'screenfull';
import nodeActions from 'actions/node/creators';
import { getPreloadData } from 'utils/learn/Exam';
import actions from 'actions/creators';
import sagaActions from 'actions/saga-creators';
import { conditionForPreload } from 'common/preload';
import fetchData from 'components/common/fetchData';

import TestResult from './test-result';
import StartExam from './start-exam';
import EscapeFullScreen from './escape-fullscreen';

class ExamContainer extends React.Component {
  componentWillMount() {
    const { dispatch, isGuest } = this.props;
    if (isGuest) {
      dispatch(openLoginDialog());
      return;
    }
    this.onFetchLearnItem(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, itemIid, preloadData } = this.props;
    if (
      get(nextProps, 'learnItem.iid') !== get(this.props, 'learnItem.iid') ||
      this.checkChangeExamOrder(nextProps)
    ) {
      this.onFetchLearnItem(nextProps);
    }

    if (conditionForPreload(preloadData, nextProps.preloadData) && itemIid) {
      dispatch(sagaActions.preloadMediaData(itemIid, nextProps.preloadData));
    }
  }

  checkChangeExamOrder = (nextProps) => {
    const { learnInfo } = this.props;

    if (
      learnInfo &&
      nextProps.learnInfo &&
      nextProps.learnInfo.exam_order &&
      nextProps.learnInfo.exam_order !== learnInfo.exam_order
    ) {
      return true;
    }

    return false;
  };

  onFetchLearnItem = (props) => {
    const {
      learnItem,
      dispatch,
      isPreview,
      isTesting,
      syllabusIid,
      learnInfo,
      courseIid,
    } = props;
    const examOrder =
      learnInfo && learnInfo.exam_order ? learnInfo.exam_order : null;

    dispatch(
      nodeActions.fetchNode({
        iid: learnItem.iid,
        ntype: learnItem.ntype,
        depth: -1,
        courseIid,
        learning: !isPreview,
        syllabus_iid: syllabusIid,
        is_testing: isTesting ? 1 : 0,
        exam_order: examOrder,
        executeOnSuccess: this.onFetchLearnItemSuccess,
      }),
    );
  };

  onFetchLearnItemSuccess = (node) => {
    const { dispatch, preloadData } = this.props;
    if (!preloadData) {
      const mediaFiles = getPreloadData([], node);
      dispatch(
        actions.savePreloadData(node.iid, {
          unLoadingMediaFiles: mediaFiles,
          mediaFiles,
          total: mediaFiles.length,
          loadedFilesTotal: 0,
        }),
      );
    }
  };

  startExamAction = (examOrder = 1) => {
    const { dispatch, isGuest, learnInfo } = this.props;
    if (isGuest) {
      dispatch(openLoginDialog());
      return;
    }

    dispatch(
      initExam(get(this.props, 'node.iid'), {
        ...learnInfo,
        exam_order: examOrder,
      }),
    );
  };

  handleContinueExam = () => {
    const { dispatch, learnInfo, handleFullScreen } = this.props;
    dispatch(
      initExam(
        get(this.props, 'node.iid'),
        { ...learnInfo, status: statuses.STARTED },
        false,
      ),
    );
  };

  render() {
    const { node, learnInfo, examInfo } = this.props;

    if (
      learnInfo &&
      [statuses.DOING].includes(learnInfo.status) &&
      !screenfull.isFullscreen
    ) {
      return (
        <EscapeFullScreen
          node={node}
          learnInfo={learnInfo}
          onContinue={this.handleContinueExam}
        />
      );
    }

    const status = examInfo && examInfo.status;

    if ([examStatus.FINISHED, examStatus.RETAKE].includes(status)) {
      return (
        <TestResult
          node={node}
          status={status}
          examInfo={examInfo}
          learnInfo={learnInfo}
          redoExamAction={this.startExamAction}
        />
      );
    }

    let labelButton = t1('take_exam');
    let prompt;
    if (status === examStatus.DOING) {
      labelButton = t1('continue');
      prompt = t1(
        'you_are_in_the_middle_of_an_exam!_click_the_button_to_continue',
      );
    }

    return (
      <StartExam
        node={node}
        prompt={prompt}
        examInfo={examInfo}
        labelButton={labelButton}
        startExamAction={this.startExamAction}
      />
    );
  }
}

const fetchInCourseExamInfoConfig = (props) => ({
  baseUrl: apiUrls.get_in_course_exam_info,
  params: {
    exam_iid: get(props, 'node.iid'),
    can_do: get(props, 'node.options.can_do'),
    ciid: get(props, 'courseIid'),
  },
  fetchCondition: !get(props, 'isGuest') && get(props, 'node.iid'),
  refetchCondition: (prevProps) =>
    (!get(props, 'isGuest') &&
      get(props, 'node.iid') !== get(prevProps, 'node.iid')) ||
    (get(props, 'node.iid') &&
      get(prevProps, 'isGuest') &&
      !get(props, 'isGuest')),
  formatDataResult: (examInfo = {}, currentProps = {}) => {
    const currentLearnInfo =
      get(currentProps, 'learnInfo') || get(currentProps, 'learnItem') || {};

    const learnInfo = {
      type: types.EXAM,
      exam_order: get(examInfo, 'nextExamOrder') || 1,
      id: currentLearnInfo.id || get(currentProps, 'node.id'),
      iid: currentLearnInfo.iid || get(currentProps, 'node.iid'),
      name: currentLearnInfo.name || get(currentProps, 'node.name'),
      description:
        currentLearnInfo.description || get(currentProps, 'node.description'),
      options: currentLearnInfo.options || get(currentProps, 'node.options'),
      exam_type: currentLearnInfo.exam_type || get(currentProps, 'node.ntype'),
      duration:
        get(currentProps, 'node.options.duration') ||
        get(examInfo, 'duration') ||
        currentLearnInfo.duration ||
        get(currentProps, 'node.duration'),
      mode: get(currentProps, 'isPreview') ? modes.PREVIEW : modes.NORMAL,
    };

    if (examInfo) {
      const take = examInfo.take;
      if (take) {
        if (take.timeRemaining) {
          learnInfo.timeRemaining = take.timeRemaining;
        }
        if (take.answers) {
          learnInfo.answers = take.answers;
        }
        if (take.questionsInfo) {
          learnInfo.questionsInfo = modifyQuestionsInfoOfTakeFromServer(
            take.questionsInfo,
          );
        }
      }
    }
    return { examInfo, learnInfo };
  },
});

const mapStateToProps = (state, props) => {
  const itemIid = state.learn.itemIid;
  const parentIid = state.learn.parentIid;
  const courseIid = state.learn.courseIid;
  const node = getNodeSelector(state)(itemIid, parentIid) || {};
  const isPreview = state.learn.isPreview;

  let { learnItem } = props || {};
  if (!learnItem) {
    learnItem = getNodeSelector(state)(itemIid, parentIid) || {};
  }

  return {
    node,
    isPreview,
    courseIid,
    learnItem,
    itemIid,
    isGuest: Perm.isGuest(),
    preloadData: state.preloadData[itemIid],
  };
};

export default connect(mapStateToProps)(
  fetchData(fetchInCourseExamInfoConfig)(ExamContainer),
);
