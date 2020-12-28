import React, { Component } from 'react';
import fetchNode from 'actions/node/creators';
import { DefinedUrlParams, getUrl } from 'routes/links/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lGet from 'lodash.get';
import LayoutHelper from 'layouts/LayoutHelper';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import sessionApiUrls from 'components/admin/session/endpoints';
import Loading from 'components/common/loading';
import {
  courseLearningTypes,
  learningItemTypeViewers,
} from 'configs/constants';
import Links from 'routes/links';
import Perm from 'common/utils/Perm';
import { setCurrentLearningElement } from 'actions/learn';
import { locationTypes } from 'components/admin/session/common/constants';
import { isCourseEnded } from 'components/admin/node/utils';
import Chat from './chat';
import CourseViewer from './viewer/';
import CourseTitle from './viewer/course-title/';
import './stylesheet_v2.scss';
import Layout from 'antd/lib/layout';
import { isSmallScreen } from 'common';
import { getThemeConfig } from '../../utils/selectors';
import { layouts } from '../../configs/constants';
import { stickyHeaderHeight } from 'layouts/learning/actions';
import ReactMeasure from 'react-measure';
import withUserInfo from 'common/hoc/withUserInfo';

const { Header, Content } = Layout;

const stateKeyCountDown = (node) => `countdown-${node && node.iid}`;

class LearnIndex extends Component {
  divStyle = { minHeight: '1000px' };
  style = {
    maxWidth: '1300px',
    padding: '0 20px',
    margin: '0 auto',
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogContent: null,
      learning: true,
    };
    this.getCourseInfo = this.getCourseInfo.bind(this);
    this.getSessionInfo = this.getSessionInfo.bind(this);
  }

  componentWillMount() {
    this.navIdOnChanged();
    this.getSessionInfo(this.props);
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
    // if (this.shouldShowChat()) {
    //   this.getChatInfo();
    // }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      rootPathIid,
      isPreview,
      isReview,
      navId,
      typeViewer,
      learnMode,
      isGuest,
      sessionIid,
      course,
      navRootNodeIid,
    } = this.props;

    if (isGuest && nextProps && !nextProps.isGuest) {
      this.getCourseInfo();
    }

    if (
      nextProps &&
      nextProps.sessionIid &&
      nextProps.sessionIid &&
      nextProps.sessionIid !== sessionIid
    ) {
      this.getSessionInfo(nextProps);
    }

    if (
      nextProps &&
      nextProps.typeViewer &&
      nextProps.typeViewer !== typeViewer
    ) {
      this.navIdOnChanged();
    }

    if (
      (typeViewer === learningItemTypeViewers.LEARN ||
        typeViewer === learningItemTypeViewers.SESSION_OFFLINE) &&
      nextProps &&
      nextProps.history &&
      nextProps.history.push &&
      nextProps.navId &&
      nextProps.navId !== navId &&
      nextProps &&
      nextProps.navId &&
      nextProps.match &&
      nextProps.match.params &&
      nextProps.match.params[DefinedUrlParams.LEARN_ELEMENT_PATH] &&
      nextProps.match.params[DefinedUrlParams.LEARN_ELEMENT_PATH] !==
        nextProps.navId
    ) {
      const url = Links.LearnCourseByPath(course, nextProps.navId, {
        pathIid: rootPathIid,
        isPreview,
        learnMode,
        navRootNodeIid,
      });
      nextProps.history.push(url);
      return;
    }
    if (
      nextProps &&
      nextProps.navId &&
      nextProps.match &&
      nextProps.match.params &&
      nextProps.match.params[DefinedUrlParams.LEARN_ELEMENT_PATH] &&
      nextProps.match.params[DefinedUrlParams.LEARN_ELEMENT_PATH] !==
        nextProps.navId
    ) {
      dispatch(
        setCurrentLearningElement({
          navId: nextProps.match.params[DefinedUrlParams.LEARN_ELEMENT_PATH],
        }),
      );
    }
  }

  navIdOnChanged() {
    const {
      dispatch,
      rootPathIid,
      courseIid,
      syllabusIid,
      isPreview,
      typeViewer,
      learnMode,
      sessionIid,
      shouldFetchSyllabus,
    } = this.props;
    let navId = null;

    if (
      [
        learningItemTypeViewers.LEARN,
        learningItemTypeViewers.SESSION_OFFLINE,
        learningItemTypeViewers.PREVIEW_LEARN,
      ].indexOf(typeViewer) !== -1
    ) {
      const match = this.props.match;
      if (
        match &&
        match.params &&
        match.params[DefinedUrlParams.LEARN_ELEMENT_PATH]
      ) {
        navId = match.params[DefinedUrlParams.LEARN_ELEMENT_PATH];
      }
    }

    if (shouldFetchSyllabus) {
      dispatch(
        fetchNode.fetchNode({
          iid: syllabusIid,
          ntype: 'syllabus',
          depth: -1, //TODO
          learning: !isPreview,
          courseIid,
          is_preview: isPreview,
          session_iid: sessionIid,
        }),
      );
    }

    dispatch(
      setCurrentLearningElement({
        navId,
        courseIid,
        typeViewer,
        learnMode,
        syllabusIid,
        rootPathIid,
        trackingLine: [],
      }),
    );

    if (syllabusIid !== courseIid) {
      this.getCourseInfo();
    }
  }

  getCourseInfo = () => {
    const {
      dispatch,
      courseIid,
      isPreview,
      supportedLearningMethods,
    } = this.props;
    const courseConfig = {
      url: apiUrls.get_course_api,
      keyState: courseIid,
    };

    const courseParams = {
      ciid: courseIid,
    };
    if (isPreview) {
      courseParams.editing_syllabus = 1;
    }

    if (
      supportedLearningMethods &&
      (supportedLearningMethods.includes(locationTypes().ILT_PHYSICAL) ||
        supportedLearningMethods.includes(locationTypes().ILT_BBB))
    ) {
      courseParams.is_timetable = true;
    }

    dispatch(nodeSagaActions.getDataRequest(courseConfig, courseParams));
  };

  getSessionInfo = (props) => {
    const { dispatch, sessionIid, course } = props;

    // don't load session if course is entirely online
    if (
      !course ||
      (course && course.learning_type === courseLearningTypes.ONLINE)
    ) {
      return;
    }

    const sessionConfig = {
      url: sessionApiUrls.get_session_api,
      keyState: sessionIid,
    };

    const sessionParams = {
      session_iid: sessionIid,
    };

    dispatch(nodeSagaActions.getDataRequest(sessionConfig, sessionParams));
  };

  /**
   * Check permission to access learning item
   *
   * @param course
   * @returns {*}
   */
  learningPermissionError = (course = {}) => {
    const dialogContent = this.state.dialogContent;
    const { deadline } = this.props;
    if (
      !dialogContent &&
      (!course ||
        (typeof course.allowedPermission !== 'undefined' &&
          !course.allowedPermission))
    ) {
      return { code: course && course.allowedPermissionErrorCode };
    }

    return false;
  };

  handleStickyHeaderResize = (contentRect) => {
    const { dispatch } = this.props;
    const bounds = lGet(contentRect, 'bounds');
    const height = lGet(bounds, 'height');
    dispatch(stickyHeaderHeight(height));
  };

  render() {
    const {
      course,
      session,
      syllabus,
      isPreview,
      isReview,
      typeViewer,
      deadline,
      learnMode,
      navRootNodeIid,
      themeConfig,
    } = this.props;

    // TODO: getCurrentLearningItem + Perm
    if (
      !syllabus ||
      !syllabus.iid ||
      (typeViewer === learningItemTypeViewers.LEARN &&
        !isPreview &&
        (!course || !course.iid))
    ) {
      return (
        <div style={this.divStyle}>
          <Loading blackLoadingIcon />
        </div>
      );
    }

    const permError = this.learningPermissionError(course);
    const totalResolveComments = lGet(this.props, 'syllabus.resolve_count', 0);
    const editSyllabusLink =
      syllabus && getUrl('edit_item', { mode: 'edit', item: syllabus });

    const isHeaderSticky = !isSmallScreen;

    return (
      <Layout
        className="course-outline-panel white-background"
        style={themeConfig.layout === layouts.GJ ? { minHeight: '80vh' } : {}}
      >
        {typeViewer === learningItemTypeViewers.LEARN && (
          <Header
            className="course-name-wrapper"
            style={{
              position: isHeaderSticky ? 'sticky' : '',
              zIndex: 100,
              width: '100%',
              top: 0,
            }}
          >
            {/*NOTE: because we use the following div to measure header size the header component cannot have any padding */}
            <ReactMeasure
              bounds
              onResize={
                isHeaderSticky ? this.handleStickyHeaderResize : undefined
              }
            >
              {({ measureRef }) => (
                <div className="p-10" ref={measureRef}>
                  <CourseTitle
                    course={course}
                    session={session}
                    deadline={deadline}
                    totalResolveComments={totalResolveComments}
                    learnMode={learnMode}
                    editSyllabusLink={editSyllabusLink}
                    isPreview={isPreview}
                    isReview={isReview}
                    showCloseButton
                    syllabus={syllabus}
                  />
                </div>
              )}
            </ReactMeasure>
          </Header>
        )}
        <Content
          id="learn-container"
          className={`${
            typeViewer !== learningItemTypeViewers.OVERVIEW
              ? 'ui-learn-panel p-0'
              : ''
          } gj-bg`}
        >
          {syllabus && syllabus.iid && (
            <CourseViewer
              {...this.props}
              navRootNodeIid={navRootNodeIid}
              getCourseInfo={this.getCourseInfo}
              permError={permError}
            />
          )}
          <Chat
            isPreview={this.props.isPreview}
            isReview={this.props.isReview}
          />
        </Content>
      </Layout>
    );
  }
}

const emptySession = {};

const mapStateToProps = (state, props) => {
  const { match } = props;

  let rootPathIid = null;
  if (match && match.params && match.params[DefinedUrlParams.PATH_IID]) {
    rootPathIid = match.params[DefinedUrlParams.PATH_IID];
  }

  let syllabusIid = null;
  if (match && match.params && match.params[DefinedUrlParams.SYLLABUS_IID]) {
    syllabusIid = match.params[DefinedUrlParams.SYLLABUS_IID];
  }

  let courseIid = null;
  if (match && match.params && match.params[DefinedUrlParams.COURSE_IID]) {
    courseIid = match.params[DefinedUrlParams.COURSE_IID];
  }

  let course = state.dataApiResults[courseIid];

  let typeViewer = learningItemTypeViewers.OVERVIEW;
  if (
    match &&
    match.params &&
    match.params[DefinedUrlParams.COURSE_VIEW_TYPE]
  ) {
    typeViewer = match.params[DefinedUrlParams.COURSE_VIEW_TYPE];
  }

  let isPreview, isReview;
  let sessionIid = null;
  let sessionPrefix = '';

  // Biến learnMode này được dùng trong function Links.overViewCourse để tạo link review một khóa học
  const learnMode = typeViewer;
  if (typeViewer === learningItemTypeViewers.PREVIEW_OVERVIEW) {
    typeViewer = learningItemTypeViewers.OVERVIEW;
    [isPreview, isReview] = [true, false];
  } else if (typeViewer === learningItemTypeViewers.REVIEW_OVERVIEW) {
    typeViewer = learningItemTypeViewers.OVERVIEW;
    [isPreview, isReview] = [false, true];
  } else if (typeViewer === learningItemTypeViewers.PREVIEW_LEARN) {
    typeViewer = learningItemTypeViewers.LEARN;
    [isPreview, isReview] = [true, false];
  } else if (typeViewer === learningItemTypeViewers.REVIEW_LEARN) {
    typeViewer = learningItemTypeViewers.LEARN;
    [isPreview, isReview] = [false, true];
  } else if (typeViewer.indexOf('session') !== -1) {
    sessionPrefix = typeViewer;
    sessionIid = typeViewer.replace(/session-/g, '');
    typeViewer = learningItemTypeViewers.SESSION_OFFLINE;
    [isPreview, isReview] = [true, false];
  } else {
    [isPreview, isReview] = [false, isCourseEnded(course)];
  }

  if (isPreview && !Perm.hasPerm('staff')) {
    // non-staff users cannot preview course
    isPreview = false;
  }

  if (isPreview && syllabusIid && !courseIid) {
    courseIid = syllabusIid;
  }

  let navId = state.learn.navId;
  if (
    !navId &&
    match &&
    match.params &&
    match.params[DefinedUrlParams.LEARN_ELEMENT_PATH]
  ) {
    navId = match.params[DefinedUrlParams.LEARN_ELEMENT_PATH];
  }

  const viewUserIid =
    match && match.params && match.params[DefinedUrlParams.USER_IID];

  const nodes = state.tree;
  const syllabus = nodes && nodes[syllabusIid];
  const shouldFetchSyllabus = !syllabus;

  course = courseIid !== syllabusIid ? course : syllabus;

  const session = sessionIid ? state.dataApiResults[sessionIid] : emptySession;

  let deadline = null;
  if (!isPreview && course && course.countDownDeadline) {
    deadline = state.timer[stateKeyCountDown(course)] || {};
  }

  const navRootNodeIid =
    match && match.params && match.params[DefinedUrlParams.NAV_ROOT_NODE_IID];

  return {
    shouldFetchSyllabus,
    navId,
    course,
    session,
    courseIid,
    syllabus,
    syllabusIid,
    rootPathIid,
    typeViewer,
    sessionPrefix,
    sessionIid,
    isPreview,
    isReview,
    learnMode,
    screenSize: state.common.screenSize,
    isGuest: Perm.isGuest(),
    deadline,
    viewUserIid: viewUserIid,
    supportedLearningMethods: lGet(
      state,
      'domainInfo.school.supported_learning_methods',
    ),
    navRootNodeIid,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(withRouter(withUserInfo(LearnIndex)));
