/**
 * Created by vohung on 13/06/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Links from 'routes/links';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
// import get from 'lodash.get';
import {
  getTcosPriceRequest,
  handleInviteCourseRequest,
} from 'actions/learn/saga-creators';
import sagaActions from 'actions/saga-creators';
import {
  displayConfigurationCourse,
  setCurrentLearningElement,
} from 'actions/learn';
import CourseOverview from 'components/front-end/course/overview';
import { createSelector } from 'reselect';

import { getNode } from 'components/admin/node/utils';
import { isScormSyllabus } from 'components/admin/scorm/scorm';
import {
  getItemLearnInfo,
  getLearnItemAccessibilityInfo,
  isExam,
  learnInfoSelector,
} from 'common/learn';
import { getCurrentQuestionIdInExerciseInLearningScreen } from 'common/learn/exercise';
import { inviteStatus, learningItemTypeViewers } from 'configs/constants';
import Confirm from 'components/learn/common/confirm';
import LearningNotAllowed from 'components/learn/errors/not-allowed';
import ScormSyllabus from '../scorm-syllabus';
import BlackBoard from './blackboard';
import SubBoard from './sub-board';
import './stylesheet.scss';
import { scrollToLearnContainer } from '../common/Util';
import Icon from 'components/common/Icon';
import { isSmallScreen } from 'common';
import Layout from 'antd/lib/layout';
import CourseOutlineMenu from './course-outline-menu';
import PrevNextButtons from '../nav/PrevNextButtons';
import DisplayHtml from 'components/common/html';
import videoTypes from 'components/admin/video/schema/videoTypes';
import screenfull from 'screenfull';
import { breadCrumb } from 'common/utils/string';
import { steps } from '../../../common/learn/exercise';

const { Content, Sider, Header } = Layout;

class CourseViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      learning: true,
      dialogContent: null,
      finishedCourse: false,
      // selectedCommentMode: 'item',
      collapseNavContent: true,
      isFullscreen: false,
    };
    this.handlePrevItemAction = this.handlePrevItemAction.bind(this);
    this.handleNextItemAction = this.handleNextItemAction.bind(this);
    this.getTcosPriceOfItems = this.getTcosPriceOfItems.bind(this);
    this.getProgressTracking = this.getProgressTracking.bind(this);
  }

  componentWillMount() {
    const {
      dispatch,
      syllabusIid,
      itemIid,
      parentIid,
      navId,
      courseIid,
      isPreview,
      isReview,
      typeViewer,
    } = this.props;
    this.getProgressTracking();
    dispatch(
      setCurrentLearningElement({
        itemIid,
        parentIid,
        navId,
        courseIid,
        isPreview,
        isReview,
        typeViewer,
        tcosPrice: null,
      }),
    );
    this.renderDialogAcceptCourse(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { tcosPrice, trackingLine, typeViewer, courseCanCost } = this.props;

    if (
      courseCanCost &&
      !tcosPrice &&
      nextProps &&
      nextProps.trackingLine &&
      nextProps.trackingLine.length &&
      nextProps.trackingLine !== trackingLine
    ) {
      this.getTcosPriceOfItems(nextProps.trackingLine);
      return;
    }
    if (
      nextProps &&
      nextProps.typeViewer &&
      nextProps.typeViewer !== typeViewer
    ) {
      this.renderDialogAcceptCourse(nextProps);
    }
  }

  rejectCourse = () => {
    const { dispatch, course } = this.props;
    const params = { item: course.iid, act: 'reject' };
    dispatch(handleInviteCourseRequest(params));
  };

  acceptCourse = () => {
    const { dispatch, course, getCourseInfo } = this.props;
    const params = { item: course.iid, act: 'accept' };
    dispatch(
      handleInviteCourseRequest(params, () => {
        this.closeDialog();
        if (getCourseInfo) {
          getCourseInfo();
        }
      }),
    );
  };

  closeDialog = () => {
    this.setState({
      dialogContent: null,
    });
  };

  getTcosPriceOfItems = (trackingLine) => {
    const { dispatch, courseIid, isPreview } = this.props;
    if (!courseIid || isPreview) {
      return;
    }
    const params = {
      ciid: courseIid,
      tcos: trackingLine || this.props.trackingLine,
    };
    dispatch(getTcosPriceRequest(params));
  };

  getProgressTracking = () => {
    const {
      syllabusIid,
      courseIid,
      isPreview,
      dispatch,
      viewUserIid,
    } = this.props;
    if (!syllabusIid || isPreview) {
      return;
    }
    const data = {
      tcos: [syllabusIid, courseIid],
      ciid: courseIid,
      children: 1,
      depth: 2,
    };

    if (viewUserIid) {
      data.userIid = viewUserIid;
    }

    dispatch(sagaActions.trackerProgressGet(data));
  };

  handleNextItemAction() {
    const { dispatch, positionOfCurrentItem } = this.props;
    if (positionOfCurrentItem === 'last') {
      dispatch(displayConfigurationCourse(true));
      return;
    }
    const newNavId = this.getNeighborItem(this.props);
    this.setNewCurrentLeaningItem(newNavId);
  }

  handlePrevItemAction() {
    const { dispatch } = this.props;
    if (this.props.displayConfigurationCourse) {
      dispatch(displayConfigurationCourse(false));
      return;
    }
    const newNavId = this.getNeighborItem(this.props, true);
    this.setNewCurrentLeaningItem(newNavId);
  }

  setNewCurrentLeaningItem = (newNavId) => {
    if (!newNavId || !newNavId.length) {
      return;
    }

    const { dispatch } = this.props;
    dispatch(displayConfigurationCourse(false));
    dispatch(setCurrentLearningElement({ navId: newNavId }));
    scrollToLearnContainer(this.props.widthScreenSize);
  };

  getNeighborItem = (props, prev = false) => {
    const navId = props.navId;
    const trackingLine = props.trackingLine;
    const currentItems = navId.split('-');
    const currentIndex = parseInt(currentItems[currentItems.length - 1], 10);
    const currentIid = currentItems[currentItems.length - 2];
    const currentPid = currentItems[currentItems.length - 3] || trackingLine[0];
    const newNavId = prev
      ? this.getNavIdPrevLessonToLearn(
          props,
          currentIid,
          currentIndex,
          currentPid,
        )
      : this.getNavIdNextLessonToLearn(
          props,
          currentIid,
          currentIndex,
          currentPid,
        );
    return newNavId || navId;
  };

  getNavIdNextLessonToLearn = (
    props,
    currentIid,
    currentIndex,
    currentPid = null,
  ) => {
    const trackingLine = props.trackingLine;
    const nodes = props.nodes;
    const nextIndex = currentIndex + 1;
    const nextIid = trackingLine[nextIndex];
    const nextItem = nodes[nextIid];
    if (!nextItem) {
      return null;
    }
    if (nextItem.ntype === 'sco') {
      if (['exam', 'scorm'].includes(nextItem.tpl_type)) {
        return `${nextItem.pid}-${nextIid}-${nextIndex}`;
      }
      return this.getNavIdNextLessonToLearn(
        props,
        currentIid,
        nextIndex,
        nextIid,
      );
    }
    const parent = nodes[currentPid] || {};
    let pid = currentPid;
    if (parent.children && parent.children.indexOf(nextIid) === -1) {
      pid = this.getParentIid(nextIndex, nextItem, trackingLine, nodes);
    }
    return `${pid}-${nextIid}-${nextIndex}`;
  };

  getNavIdPrevLessonToLearn = (
    props,
    currentIid,
    currentIndex,
    currentPid = null,
  ) => {
    if (currentIndex <= 0) return null;

    const trackingLine = props.trackingLine;
    const nodes = props.nodes;
    let prevIndex = currentIndex - 1;
    let prevIid = trackingLine[prevIndex];
    let prevItem = nodes[prevIid];
    if (prevIndex < 1 || !prevItem || prevItem.ntype === 'syllabus') {
      return null;
    }
    let parent = nodes[currentPid] || {};
    const newPid = this.getParentIid(prevIndex, prevItem, trackingLine, nodes);
    if (prevItem.ntype !== 'sco') {
      if (parent.children && parent.children.indexOf(prevIid) !== -1) {
        return `${currentPid}-${prevIid}-${prevIndex}`;
      }
      return `${newPid}-${prevIid}-${prevIndex}`;
    } else if (['exam', 'scorm'].includes(prevItem.tpl_type)) {
      return `${prevItem.pid}-${prevIid}-${prevIndex}`;
    }
    parent = nodes[newPid] || { children: [] };
    const indexOfParent = parent.children.indexOf(prevIid);
    if (indexOfParent < 1 || parent.ntype === 'syllabus') {
      return this.getNavIdPrevLessonToLearn(
        props,
        currentIid,
        currentIndex - 1,
      );
    }

    prevIid = parent.children[indexOfParent - 1];
    prevItem = nodes[prevIid];
    if (prevItem && (!prevItem.children || prevItem.children.length)) {
      this.getNavIdPrevLessonToLearn(props, prevIid, prevIndex, newPid);
    }

    if (Array.isArray(prevItem.children))
      prevIndex -= prevItem.children.length + 1;
    else prevIndex -= 1;

    return this.getNavIdNextLessonToLearn(props, prevIid, prevIndex, newPid);
  };

  getParentIid = (index, node, trackingLine, nodes) => {
    for (let i = 0; i < trackingLine.length; i += 1) {
      const item = nodes[trackingLine[i]] || {};

      if (
        (item.ntype === 'syllabus' || item.ntype === 'sco') &&
        Array.isArray(item.children)
      ) {
        const indexChild = item.children.findIndex(
          (childIid) => String(childIid) === String(node.iid),
        );
        if (i + indexChild + 1 === index) {
          return item.iid;
        }
      }
    }

    return trackingLine[0];
  };

  renderDialogAcceptCourse = (props) => {
    const { course, typeViewer } = props;
    if (!course || typeof course.sinviteStatus === 'undefined') {
      return;
    }
    if (course.sinviteStatus === inviteStatus.INVITED) {
      const dialogContent = (
        <Confirm
          prompt={t1('you_are_invited_to_learn_the_course')}
          acceptMessage={t1('accept')}
          cancelMessage={
            typeViewer === learningItemTypeViewers.LEARN
              ? t1('reject')
              : t1('cancel')
          }
          iconDisplay="invite"
          onCancelButtonClick={() => {
            if (typeViewer === learningItemTypeViewers.LEARN) {
              this.rejectCourse();
            }
            this.closeDialog();
          }}
          onAcceptButtonClick={() => {
            this.acceptCourse();
          }}
        />
      );
      this.setState({
        dialogContent,
      });
    }
  };

  handleFullscreen = () => {
    screenfull.toggle(document.getElementById('learn-screen-container'));
    screenfull.on('change', () => {
      this.setState({
        isFullscreen: screenfull.isFullscreen,
      });
    });
  };

  render() {
    const {
      typeViewer,
      sessionPrefix,
      learnMode,
      course,
      newUrl,
      isPreview,
      learnItem,
      syllabus,
      permError,
      navRootNodeIid,
      learnInfo,
    } = this.props;

    if (newUrl) {
      return <Redirect to={newUrl} />;
    }

    const shouldItemDisplayFullscreen =
      lodashGet(learnItem, 'options.fullscreen_layout') ||
      lodashGet(learnInfo, 'step') === steps.RESULT;

    const blackBoardWidth =
      shouldItemDisplayFullscreen || learnItem.tpl_type === 'scorm'
        ? 'col-md-12'
        : 'col-md-8';
    const subBoardWidth = shouldItemDisplayFullscreen ? null : 'col-md-4';
    return (
      <div>
        {typeViewer === learningItemTypeViewers.LEARN ||
        typeViewer === learningItemTypeViewers.SESSION_OFFLINE ? (
          <div>
            {!isPreview && permError ? (
              <LearningNotAllowed permError={permError} course={course} />
            ) : (
              <div>
                <div className="screen-viewer">
                  <div className="clearfix row ">
                    {isScormSyllabus(syllabus) ? (
                      <ScormSyllabus course={course} syllabus={syllabus} />
                    ) : (
                      <Layout>
                        {isSmallScreen ? null : (
                          <CourseOutlineMenu
                            navId={this.props.navId}
                            navItems={this.props.navItems}
                            navRootNodeIid={navRootNodeIid}
                            sessionPrefix={sessionPrefix}
                            learnMode={learnMode}
                            mode={this.props.mode}
                            onPrev={this.handlePrevItemAction}
                            onNext={this.handleNextItemAction}
                            positionOfCurrentItem={
                              this.props.positionOfCurrentItem
                            }
                            displayConfigurationCourse={
                              this.props.displayConfigurationCourse
                            }
                            courseName={lodashGet(course, 'name')}
                            course={course}
                            learnItem={learnItem}
                            isPreview={isPreview}
                            syllabus={syllabus}
                          />
                        )}

                        <Content
                          className="gj-bg"
                          // className={isSmallScreen ? 'p-t-10' : ''}
                          id={'learn-screen-container'}
                        >
                          {!lodashGet(learnItem, 'options.hide_controls') ? (
                            <Header className="learn-screen-content-header d-flex justify-content-between align-items-center">
                              <span className="learn-name">
                                {breadCrumb(learnItem.name, 150)}
                              </span>
                              {isSmallScreen ? null : (
                                <div className="d-flex align-items-center extra-control">
                                  <PrevNextButtons
                                    onPrev={this.handlePrevItemAction}
                                    onNext={this.handleNextItemAction}
                                    positionOfCurrentItem={
                                      this.props.positionOfCurrentItem
                                    }
                                    displayConfigurationCourse={
                                      this.props.displayConfigurationCourse
                                    }
                                  />
                                  <span
                                    className="m-l-30 fullscreen-icon"
                                    onClick={this.handleFullscreen}
                                  >
                                    <Icon
                                      icon={
                                        this.state.isFullscreen
                                          ? 'fullscreen-exit'
                                          : 'fullscreen'
                                      }
                                      antIcon
                                    />
                                  </span>
                                </div>
                              )}
                            </Header>
                          ) : null}
                          <div
                            className={`${
                              isSmallScreen
                                ? 'p-10'
                                : 'container-fluid p-l-30 p-r-30'
                            } p-t-10 gj-bg`}
                          >
                            {[
                              <div className="row">
                                {learnItem.ntype === 'video' ? (
                                  <React.Fragment>
                                    <div className="col-md-12 learn-video-full-screen">
                                      {!!window.isDHSP1 &&
                                        learnItem.type ===
                                          videoTypes.TYPE_VIDEO && (
                                          <DisplayHtml
                                            content={learnItem.content}
                                          />
                                        )}

                                      <BlackBoard
                                        {...this.props}
                                        getTcosPriceOfItems={
                                          this.getTcosPriceOfItems
                                        }
                                      />
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <div className={blackBoardWidth}>
                                      <BlackBoard
                                        {...this.props}
                                        getTcosPriceOfItems={
                                          this.getTcosPriceOfItems
                                        }
                                        onFinishButtonOnClick={
                                          this.handleNextItemAction
                                        }
                                      />
                                    </div>
                                    {!!subBoardWidth && (
                                      <div className={subBoardWidth}>
                                        <SubBoard learnItem={learnItem} />
                                      </div>
                                    )}
                                  </React.Fragment>
                                )}
                              </div>,

                              // isSmallScreen && (
                              //   <PrevNextButtons
                              //     onPrev={this.handlePrevItemAction}
                              //     onNext={this.handleNextItemAction}
                              //     positionOfCurrentItem={
                              //       this.props.positionOfCurrentItem
                              //     }
                              //     displayConfigurationCourse={
                              //       this.props.displayConfigurationCourse
                              //     }
                              //     isPDF={learnItem.type === 'pdf'}
                              //   />
                              // ),
                            ]}
                          </div>

                          {this.state.dialogContent && (
                            <div className="learn-confirm-dialog">
                              {this.state.dialogContent}
                            </div>
                          )}
                        </Content>
                      </Layout>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CourseOverview {...this.props} />
        )}
      </div>
    );
  }
}

const getNewNavIdFromItemIid = (nodes, trackingLine) => (
  itemIid,
  parentIid,
) => {
  const item = getNode(itemIid, null, nodes);
  if (!item || !Array.isArray(trackingLine)) {
    return '';
  }

  if (parentIid) {
    const parent = getNode(parentIid, null, nodes);
    if (!parent) {
      return '';
    }
    const parentIndex = trackingLine.findIndex(
      (iid) => String(iid) === String(parentIid),
    );
    if (parentIndex === -1) {
      return '';
    }
    const itemIndex = trackingLine.findIndex(
      (iid, index) => String(iid) === String(itemIid) && index > parentIndex,
    );
    if (itemIndex === -1) {
      return '';
    }
    return `${parentIid}-${itemIid}-${itemIndex}`;
  }

  if (item.pid) {
    const index = trackingLine.findIndex(
      (iid) => String(iid) === String(itemIid),
    );
    if (index !== -1) {
      return `${item.pid}-${itemIid}-${index}`;
    }
  }

  return '';
};

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state) => state.learn.tcosPrice,
  (state) => state.learn.trackingLine,
  (state, props) => state.learn.navId || props.navId,
  (state) => state.learn.surveyLink,
  (state) => lodashGet(state, 'domainInfo.conf.course_can_cost'),
  (state) => lodashGet(state, 'common.screenSize'),
  (state) => state.learn.syllabusIid,
  (state, props) => props.isPreview || (state.learn && state.learn.isPreview),
  (state) => state.trackerProgress,
  learnInfoSelector,
  (state) => state.learn && state.learn.positionOfCurrentItem,
  (state) => state.learn && state.learn.displayConfigurationCourse,
  (state) => lodashGet(state, 'common.screenSize.width'),
  (state) => state.learn && state.learn.navItems,
  (state, props) => props.course,
  (state, props) => props.rootPathIid,
  (state, props) => props.learnItem,
  (state, props) => props.navRootNodeIid,
  (
    nodes,
    tcosPrice,
    trackingLine,
    navId,
    surveyLink,
    courseCanCost,
    screenSize,
    syllabusIid,
    isPreview,
    trackerProgress,
    info,
    positionOfCurrentItem,
    displayConfigurationCourse,
    widthScreenSize,
    navItems,
    course,
    rootPathIid,
    learnItem,
    navRootNodeIid,
  ) => {
    let itemIid = null;
    let parentIid = null;
    let newNavId = null;
    if (navId) {
      const items = navId.split('-');
      switch (items.length) {
        case 1: {
          itemIid = items[0];
          newNavId = getNewNavIdFromItemIid(nodes, trackingLine)(itemIid);
          break;
        }
        case 2: {
          itemIid = items[items.length - 1];
          parentIid = items[items.length - 2];
          newNavId = getNewNavIdFromItemIid(nodes, trackingLine)(
            itemIid,
            parentIid,
          );
          break;
        }
        default: {
          itemIid = items[items.length - 2];
          parentIid = items[items.length - 3];
          break;
        }
      }
    }

    const learnItemAccessibilityInfo = getLearnItemAccessibilityInfo(
      nodes,
      syllabusIid,
      trackingLine,
      isPreview,
      trackerProgress,
    )(navId);

    if (!learnItem) {
      learnItem = getNode(itemIid, parentIid, nodes) || {};
    }

    const isTesting = isExam(learnItem);

    const learnInfo = getItemLearnInfo(info, itemIid);

    let newUrl = '';
    if (newNavId) {
      if (course) {
        newUrl = Links.LearnCourseByPath(course, newNavId, {
          pathIid: rootPathIid,
          isPreview,
          navRootNodeIid,
        });
      }
    }

    // for almost every case doingItem == learnItem
    // except for exercise, where doingItem is question and learnItem is exercise
    let doingItemIid =
      learnItem && learnItem.ntype === 'exercise'
        ? getCurrentQuestionIdInExerciseInLearningScreen()
        : lodashGet(learnItem, 'iid');

    const doingItem =
      doingItemIid == lodashGet(learnItem, 'iid')
        ? learnItem
        : getNode(doingItemIid, null, nodes);

    return {
      learnItemAccessibilityInfo,
      isTesting,
      itemIid,
      learnInfo,
      learnItem,
      doingItem,
      navId,
      newUrl,
      nodes,
      parentIid,
      tcosPrice,
      trackingLine,
      courseCanCost,
      screenSize,
      surveyLink:
        Links.LearnCourseByPath(course, navId, {
          pathIid: rootPathIid,
          isPreview,
        }) === surveyLink
          ? null
          : surveyLink,
      positionOfCurrentItem,
      displayConfigurationCourse,
      widthScreenSize,
      navItems,
    };
  },
);

export default connect(mapStateToProps)(CourseViewer);
