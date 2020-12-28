import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import Helmet from 'react-helmet';
import screenfull from 'screenfull';
import VocabsetItem from 'components/learn/items/vocabset';
import ExerciseItem from 'components/learn/items/exercise';
import ScoExamItem from 'components/learn/items/exam/sco';
import ScoScorm from 'components/learn/items/sco-scorm/index';
import ScoStandard from 'components/learn/items/sco-standard';
import ExerciseExamItem from 'components/learn/items/exam/exercise';
import SurveyItem from 'components/learn/items/survey';
import LectureItem from 'components/learn/items/lecture';
import fetchNode from 'actions/node/creators';
import sagaActions from 'actions/saga-creators';
import { getNodeSelector, isNodeDataEnough } from 'components/admin/node/utils';
import { getLearnItemInfoSelector, isExam } from 'common/learn';
import { statuses as exerciseStatuses } from 'common/learn/exercise';
import { ntype } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import RolePlay from 'components/learn/items/exercise/RolePlay';
import { createSelector } from 'reselect';
import { closeNavDrawer, saveItemInfo } from 'actions/learn';
import { t1 } from 'translate';

class LearnItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadAsync: true,
    };
    this.onFetchLearnItemSucccess = this.onFetchLearnItemSucccess.bind(this);
  }

  componentWillMount() {
    const { isTesting } = this.props;
    const loadAsync =
      typeof this.props.loadAsync !== 'undefined'
        ? this.props.loadAsync
        : !isNodeDataEnough(this.props.nodes, this.props.learnItem);
    this.setState({ loadAsync });
    if (loadAsync || isTesting) {
      this.onFetchLearnItem(this.props);
    }
  }

  getStyleToRender = () => {
    if (screenfull.isFullscreen) {
      return {
        width: '100vw',
        height: '100vh',
      };
    }

    return {};
  };

  componentWillReceiveProps(nextProps) {
    const learnItem = this.props.learnItem || {};
    let loadAsync = this.props.loadAsync;
    if (typeof loadAsync !== 'undefined' && !loadAsync) {
      return;
    }
    if (
      nextProps &&
      ((nextProps.learnItem &&
        nextProps.learnItem.iid &&
        nextProps.learnItem.iid !== learnItem.iid) ||
        this.checkChangeExamOrder(nextProps))
    ) {
      loadAsync = !isNodeDataEnough(nextProps.nodes, nextProps.learnItem);
      this.setState({ loadAsync });
      if (loadAsync || this.checkChangeExamOrder(nextProps)) {
        this.onFetchLearnItem(nextProps);
      }
      return;
    }

    if (
      nextProps.numberCommentOfSession !== this.props.numberCommentOfSession
    ) {
      this.onFetchLearnItem(nextProps);
      return;
    }

    if (this.state.loadAsync === 'loading') {
      this.checkLoadAsyncSuccess(nextProps);
    }
  }

  componentDidMount() {
    if (this.shouldFullScreen() && screenfull.enabled && findDOMNode(this)) {
      screenfull.request(findDOMNode(this));
      screenfull.onerror((e) => {
        console.log(e);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { learnItem, navId } = this.props;
    const { loadAsync } = this.state;

    if (
      navId &&
      learnItem &&
      learnItem.iid &&
      !loadAsync &&
      (!prevProps.learnItem ||
        prevProps.learnItem.iid !== learnItem.iid ||
        loadAsync !== prevState.loadAsync)
    ) {
      this.setLastLearnedItem(navId);
    }
  }

  shouldFullScreen = () => {
    const { learnInfo, learnItem, fullScreen } = this.props;
    if (typeof fullScreen !== 'undefined') {
      return fullScreen;
    }
    return (
      isExam(learnItem) &&
      learnInfo &&
      [exerciseStatuses.STARTED, exerciseStatuses.DOING].includes(
        learnInfo.status,
      )
    );
  };

  onFetchLearnItemSucccess = () => {
    this.setState({ loadAsync: 'loading' });
    // TODO can kiem tra lai phan loadAsync nay
    this.checkLoadAsyncSuccess(this.props);
  };

  checkLoadAsyncSuccess = (props) => {
    const loadAsync = !isNodeDataEnough(props.nodes, props.learnItem);
    if (!loadAsync) {
      this.setState({ loadAsync });
    }
  };

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

  onFetchLearnItem(props) {
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
      fetchNode.fetchNode({
        iid: learnItem.iid,
        ntype: learnItem.ntype,
        depth: -1,
        courseIid,
        learning: !isPreview,
        syllabus_iid: syllabusIid,
        is_testing: isTesting ? 1 : 0,
        exam_order: examOrder,
        is_preview: isPreview,
        executeOnSuccess: this.onFetchLearnItemSucccess,
      }),
    );
  }

  setLastLearnedItem = (navId) => {
    const { dispatch, courseIid, isPreview, isReview, learnItem } = this.props;
    if (isPreview || isReview) {
      return;
    }
    const tmp = navId.split('-');
    const currentIid = tmp[tmp.length - 2];
    const currentPid = tmp[tmp.length - 3];

    const progress = [
      {
        tco_iid: courseIid,
        wr: currentPid,
        wl: currentIid,
      },
    ];
    const data = {
      progress,
      ciid: courseIid,
    };
    if ([ntype.SCO, ntype.EXERCISE, ntype.VOCABSET].includes(learnItem.ntype)) {
      dispatch(saveItemInfo(learnItem.iid, { lastLearnTime: Date.now() }));
    }
    dispatch(sagaActions.trackerProgressSave(data));
  };

  render() {
    const {
      learnItem,
      navId,
      courseIid,
      onFinishButtonOnClick,
      dispatch,
    } = this.props;

    const loadAsync = this.state.loadAsync;

    let learnElement;

    let isLoading = false;

    if (learnItem && learnItem.iid && !loadAsync) {
      switch (learnItem.ntype) {
        case ntype.SCO: {
          if (learnItem.tpl_type === 'exam') {
            learnElement = (
              <ScoExamItem
                key={`${navId}-${learnItem.iid}-sco-exam`}
                id={`${navId}-${learnItem.iid}-sco-exam`}
                courseIid={courseIid}
              />
            );
            break;
          }
          if (learnItem.tpl_type === 'scorm') {
            learnElement = (
              <ScoScorm
                key={`${navId}-${learnItem.iid}-sco-exam`}
                id={`${navId}-${learnItem.iid}-sco-exam`}
                courseIid={courseIid}
              />
            );
            break;
          }
          learnElement = (
            <ScoStandard
              key={`${navId}-${learnItem.iid}-sco-exam`}
              id={`${navId}-${learnItem.iid}-sco-exam`}
              courseIid={courseIid}
            />
          );
          break;
        }
        case ntype.VIDEO:
          learnElement = (
            <LectureItem
              key={`${navId}-${learnItem.iid}-video`}
              id={`${navId}-${learnItem.iid}-video`}
              courseIid={courseIid}
            />
          );
          break;
        case ntype.VOCABSET: {
          if (learnItem.type === 'roleplay') {
            learnElement = (
              <RolePlay courseIid={courseIid} vocabsetIid={learnItem.iid} />
            );
          } else {
            learnElement = (
              <VocabsetItem
                key={`${navId}-${learnItem.iid}-vocabset`}
                id={`${navId}-${learnItem.iid}-vocabset`}
                courseIid={courseIid}
                onFinishButtonOnClick={onFinishButtonOnClick}
              />
            );
          }
          break;
        }
        case ntype.EXERCISE:
          if (learnItem.type === 'exam') {
            learnElement = (
              <ExerciseExamItem
                key={`${navId}-${learnItem.iid}-exercise-exam`}
                id={`${navId}-${learnItem.iid}-exercise-exam`}
                courseIid={courseIid}
                exercises={[learnItem.iid]}
              />
            );
            break;
          }
          if (learnItem.speaking_type === 'dictation') {
            learnElement = (
              <VocabsetItem
                key={`${navId}-${learnItem.iid}-dictation`}
                id={`${navId}-${learnItem.iid}-dictation`}
                learnItemIid={learnItem.children && learnItem.children[0]}
                parentIid={learnItem.iid}
                courseIid={courseIid}
                onFinishButtonOnClick={onFinishButtonOnClick}
                skill="dictation"
              />
            );
          } else {
            learnElement = (
              <ExerciseItem
                key={`${navId}-${learnItem.iid}-exercise`}
                id={`${navId}-${learnItem.iid}-exercise`}
                courseIid={courseIid}
                onFinish={onFinishButtonOnClick}
              />
            );
          }
          break;
        case ntype.SURVEY:
          learnElement = (
            <SurveyItem
              key={`${navId}-${learnItem.iid}-survey`}
              id={`${navId}-${learnItem.iid}-survey`}
              onFinish={onFinishButtonOnClick}
            />
          );
          break;
      }
    }

    if (isLoading) {
      dispatch(closeNavDrawer(true));
    }

    const titleHelmet =
      this.props.titleHelmet ||
      (this.props.course && this.props.course.name) ||
      t1('preview');

    const isExam = learnItem.type === 'exam' || learnItem.tpl_type === 'exam';

    return (
      <div
        className={`learn-zone\
           learn-screen\
           ${
             learnItem &&
             learnItem.ntype === ntype.EXERCISE &&
             !['roleplay', 'dictation'].includes(learnItem.speaking_type)
               ? 'learn-screen--normal-exercise'
               : ''
           }\
           ${
             learnItem &&
             learnItem.ntype === ntype.VOCABSET &&
             learnItem.type !== 'roleplay'
               ? 'learn-screen--vocabset'
               : ''
           } gj-bg`}
        // style={this.getStyleToRender()}
      >
        {!isExam ? (
          <Helmet
            key={`helmet-${(learnItem && learnItem.iid) ||
              'helmet-key-in-learn-items'}`}
            title={titleHelmet}
          />
        ) : null}

        {learnElement}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state, props) => props.course,
  (state, props) =>
    props.learnItem ||
    getNodeSelector(state)(state.learn.itemIid, state.learn.parentIid),
  (state) => getLearnItemInfoSelector(state)(state.learn.itemIid),
  (state) => getThemeConfig(state),
  (state) => state.comment.numberCommentOfSession,
  (
    nodes,
    course,
    learnItem,
    learnInfo,
    themeConfig,
    numberCommentOfSession,
  ) => ({
    nodes,
    courseIid: course && course.iid,
    learnItem,
    learnInfo,
    themeConfig,
    numberCommentOfSession,
  }),
);

export default connect(mapStateToProps)(LearnItems);
