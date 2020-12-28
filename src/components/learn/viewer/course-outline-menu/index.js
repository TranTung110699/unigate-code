import PropTypes from 'prop-types';
import React from 'react';
import { isSmallScreen } from 'common';
import NavViewer from '../../nav/drawNav';
import Layout from 'antd/lib/layout/index';
import { t1, t3 } from 'translate';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import './style.scss';
import Tooltip from 'antd/lib/tooltip';
import Drawer from 'antd/lib/drawer';
import Tab from 'antd/lib/tabs';
import CommentSection from '../comment';
import styled from 'styled-components';
import RubricScore from '../user-rubric-score';
import withUserInfo from 'common/hoc/withUserInfo';
import { ListAttachmentsToDownload } from '../../../common/attachment/DownloadAttachments';
import lodashGet from 'lodash.get';
import queryString from 'query-string';
import { checkLearnerCanDownloadAttachments } from '../../../../common/conf';
import CourseProgress from 'components/front-end/course/progress';
import { closeNavDrawer } from '../../../../actions/learn';

const { TabPane } = Tab;
const { Sider } = Layout;

const Tabs = styled(Tab)`
  height: ${(props) => {
    const height = props.bottom - props.progressHeight;
    return height && height > 0 ? `${height}px` : 'calc(100% - 45px)';
  }};
  .ant-tabs-bar.ant-tabs-top-bar {
    margin-bottom: 0;
  }
  .ant-tabs-tab {
    margin: 0 !important;
    padding: 12px !important;
  }
  .ant-tabs-content {
    height: ${(props) => {
      const height = props.bottom - props.progressHeight - 25;
      return height && height > 0 ? `${height}px` : '100%';
    }};
  }
  .scroll-content {
    height: ${(props) => {
      const height = props.bottom - props.progressHeight - 145;
      return height && height > 0 ? `${height}px` : '100%';
    }};
    overflow: auto;
  }
  .ant-tabs-nav-container {
    &,
    .ant-tabs-nav-wrap {
      &,
      .ant-tabs-nav {
        width: 100%;
        .ant-tabs-tab {
          width: ${100 / 3}%;
          text-align: center;
        }
      }
    }
  }
`;

class CourseOutlineMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: 'nav',
    };
  }

  componentDidMount() {
    const { userInfo, dispatch, course, learnMode } = this.props;
    if (
      lodashGet(course, 'allowedPermission', true) ||
      learnMode === 'p-learn'
    ) {
      dispatch(closeNavDrawer(true));
    }
  }

  onClose = () => {
    this.props.dispatch(closeNavDrawer(false));
  };

  render() {
    const {
      sessionPrefix,
      learnMode,
      navRootNodeIid,
      course,
      learnItem,
      isPreview,
      showNavDrawer,
      userInfo,
    } = this.props;

    if (!lodashGet(course, 'allowedPermission') && learnMode !== 'p-learn') {
      return null;
    }

    let progress = this.props.progress || {};
    progress = progress.cp || 0;

    let downloads = [];

    const attachments = lodashGet(learnItem, 'attachments');
    const downloadMaterials = lodashGet(learnItem, 'download_materials');

    if (Array.isArray(attachments) && attachments.length)
      downloads = downloads.concat(attachments);
    if (Array.isArray(downloadMaterials) && downloadMaterials.length)
      downloads = downloads.concat(downloadMaterials);

    const hasDownload =
      downloads.length > 0 && this.props.canLearnerDownloadAttachments;

    const showNavbar = this.props.showNavDrawer;
    let showHideButtonStyle = showNavbar
      ? {}
      : !isSmallScreen
      ? {
          position: 'fixed',
        }
      : {};
    const showHideButton = (
      <div
        className={`nav-menu ${showNavbar ? 'active' : ''}`}
        onClick={() => {
          this.props.dispatch(closeNavDrawer(!showNavbar));
        }}
        style={showHideButtonStyle}
      >
        {isSmallScreen ? (
          <Icon
            icon="menu"
            antIcon
            onClick={() => {
              this.props.dispatch(closeNavDrawer(!showNavbar));
            }}
            style={{ fontSize: '120%' }}
          />
        ) : (
          <Tooltip title={t1(`${showNavbar ? 'close' : 'open'}_navbar`)}>
            <Icon
              icon="menu"
              antIcon
              onClick={() => {
                this.props.dispatch(closeNavDrawer(!showNavbar));
              }}
              style={{ fontSize: '120%' }}
            />
          </Tooltip>
        )}
      </div>
    );

    const isInIframe = window.location !== window.parent.location;

    const { navActive } = this.state;

    const progressContainer = !isInIframe ? (
      <CourseProgress
        progress={progress}
        mode="learn"
        showHideButton={showHideButton}
        notShowProgress={!showNavbar}
      />
    ) : null;

    const TabContent = (
      <Tabs
        defaultActiveKey="nav"
        bottom={
          this.instance ? this.instance.getBoundingClientRect().bottom : 0
        }
        progressHeight={
          this.progress ? this.progress.getBoundingClientRect().height : 50
        }
        className="course-outline-nav"
        onChange={(key) => {
          this.setState({
            navActive: key,
          });
        }}
      >
        <TabPane tab={t1('introduction')} key="intro">
          <div
            className="p-10"
            dangerouslySetInnerHTML={{
              __html:
                lodashGet(learnItem, 'content', '') ||
                lodashGet(course, 'content', ''),
            }}
          />
        </TabPane>
        <TabPane tab={t1('course_outline')} key="nav">
          <NavViewer
            navId={this.props.navId}
            navItems={this.props.navItems}
            navRootNodeIid={navRootNodeIid}
            sessionPrefix={sessionPrefix}
            learnMode={learnMode}
            mode={this.props.mode}
            height={
              this.instance
                ? this.instance.getBoundingClientRect().bottom -
                  this.instance.getBoundingClientRect().top -
                  130
                : 0
            }
          />
        </TabPane>
        {!window.isGoJapan && !!lodashGet(course, 'rubric_iid') && (
          <TabPane tab={t1('course_score')} key="score">
            {navActive === 'score' && (
              <RubricScore
                itemIid={course.iid}
                itemNtype="course"
                className="scroll-content"
              />
            )}
          </TabPane>
        )}
        <TabPane tab={t1('q_&_a')} key="qa">
          {navActive === 'qa' && (
            <CommentSection
              course={course}
              isPreview={isPreview}
              learnItem={learnItem}
              syllabus={this.props.syllabus}
              syllabusIid={this.props.syllabus.iid}
              className="scroll-content"
            />
          )}
        </TabPane>
        {hasDownload && (
          <Tabs.TabPane
            tab={
              <React.Fragment>
                {t1(isSmallScreen ? 'documents' : 'item_materials')}
              </React.Fragment>
            }
            key="download"
          >
            <div className="p-r-10 p-l-10">
              <ListAttachmentsToDownload attachments={downloads} />
            </div>
          </Tabs.TabPane>
        )}
      </Tabs>
    );

    if (showNavbar && !isSmallScreen)
      return (
        <Sider className={isSmallScreen ? 'small-nav' : 'big-nav'}>
          <div className="ui-learn-nav">
            <div
              style={{
                overflow: 'hidden',
                height: 'calc(100% - 60px)',
                position: 'fixed',
                left: 0,
                // maxHeight: '90%',
                // paddingBottom: 35,
                boxShadow: '2px 0px 5px 0px rgba(148,148,148,0.5)',
              }}
              className="learn-nav-container"
              ref={(nav) => (this.instance = nav)}
            >
              {progressContainer}
              {TabContent}
            </div>
          </div>
        </Sider>
      );
    if (!showNavbar && isSmallScreen) return <div>{progressContainer}</div>;

    if (showNavbar && isSmallScreen) {
      return (
        <Drawer
          title={this.props.courseName}
          placement="left"
          closable={false}
          visible={showNavbar}
          bodyStyle={{ padding: 0 }}
          onClose={this.onClose}
          getContainer={document.getElementById('learn-screen-container')}
          width="80vw"
        >
          <div
            className="ui-learn-nav"
            style={{
              height: '100%',
            }}
          >
            <div
              style={{
                height: '100%',
                position: 'absolute',
                width: '99%',
                // paddingBottom: 35,
              }}
            >
              {progressContainer}
              {TabContent}
            </div>
          </div>
        </Drawer>
      );
    }

    return (
      <div className="m-5 m-t-15" style={{ position: 'absolute' }}>
        {showHideButton}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const queryParams = queryString.parse(window.location.search);

  return {
    canLearnerDownloadAttachments: checkLearnerCanDownloadAttachments(
      lodashGet(state, 'domainInfo.conf'),
    ),
    progress: state.trackerProgress[state.learn.courseIid],
    showNavDrawer: state.learn.showNavDrawer,
  };
};
export default connect(mapStateToProps)(withUserInfo(CourseOutlineMenu));

CourseOutlineMenu.propTypes = {
  canLearnerDownloadAttachments: PropTypes.bool,
  course: PropTypes.object,
  courseName: PropTypes.string,
  dispatch: PropTypes.func,
  isPreview: PropTypes.bool,
  learnItem: PropTypes.any,
  learnMode: PropTypes.any,
  mode: PropTypes.any,
  navId: PropTypes.any,
  navItems: PropTypes.any,
  navRootNodeIid: PropTypes.string,
  progress: PropTypes.number,
  sessionPrefix: PropTypes.any,
  showNavDrawer: PropTypes.bool,
  syllabus: PropTypes.object,
  userInfo: PropTypes.object,
};

CourseOutlineMenu.defaultProps = {
  userInfo: {},
};
