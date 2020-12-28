import React from 'react';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate/index';
import { Link } from 'react-router-dom';
import './styles.scss';
import Deadline from 'components/front-end/common/Deadline';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon';
import { getDashboardUrl } from 'routes/links/common';
import Warning from '../../../common/Warning';
import SuccessAlert from '../../../common/SuccessAlert';
import { withRouter } from 'react-router';
import { overViewCourse } from 'routes/links';
import { isSmallScreen } from 'common';
import { breadCrumb } from 'common/utils/string';
import FlatButton from 'components/common/mui/FlatButton';
import SurveyButton from '../survey-button';
import { getNode, isSurvey } from 'components/admin/node/utils';
import { isExam } from 'common/learn';
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';
import { layouts } from 'configs/constants';
import AntIcon from 'antd/lib/icon';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import CourseOutlineMenu from '../course-outline-menu';
import NavViewer from '../../nav/drawNav';
import { shareFbUrl, stripHTML } from '../../../../common/utils/string';

const closeButtonStyle = { cursor: 'pointer' };
const deadlineStyles = {
  fontSize: isSmallScreen ? 12 : 14,
};

class CourseTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousUrl: '',
    };
  }

  componentDidMount() {
    this.setState({ previousUrl: document.referrer });
  }

  exitLearnScreen = () => {
    if (this.props.isPreview) {
      this.props.history.push('/'); // (this.state.previousUrl);
    } else if (this.props.themeConfig.layout === layouts.GJ) {
      this.props.history.push(getDashboardUrl('courses'));
    } else
      this.props.history.push(
        overViewCourse(this.props.course, this.props.isPreview),
      ); // (this.state.previousUrl);
  };

  shareFb = () => {
    const { course, facebookAppId } = this.props;
    window.open(
      shareFbUrl({
        url: window.location.href,
        quote: stripHTML(lodashGet(course, 'content', '')) || course.name,
        appId: facebookAppId,
      }),
      '_blank',
      `height=${window.screen.height},width=${window.screen.width}`,
    );
  };

  render() {
    const {
      course,
      session,
      deadline,
      totalResolveComments,
      learnMode,
      editSyllabusLink,
      isPreview,
      isReview,
      p,
      showCloseButton, // not passed if we're overviewing a course
      syllabus,
      syllabusIid,
    } = this.props;

    let title = (session && session.name) || (course && course.name) || '';

    if (isSmallScreen && showCloseButton) {
      title = breadCrumb(title, 20);
    }

    const countDown =
      lodashGet(course, 'countDownDeadline') &&
      lodashGet(deadline, 'countDown');

    let showRateButton = false;

    if (syllabus && !showRateButton) {
      for (let data of syllabus.metadata) {
        if (isSurvey(data) || isExam(data)) {
          showRateButton = true;
        }
      }
    }

    const isInIframe = window.location !== window.parent.location;

    return (
      <div className="course-title-wrapper">
        <div className="course-title-info">
          <div className="d-flex justify-content-between align-items-center">
            {false && showCloseButton && !isSmallScreen && (
              <span
                className={`${isSmallScreen ? 'p-r-10' : 'p-l-20 p-r-30'}`}
                style={closeButtonStyle}
                onClick={this.exitLearnScreen}
                title={t1('click_to_exit_learn_screen')}
              >
                {!isInIframe && (
                  <AntIcon
                    type={isSmallScreen ? 'arrow-left' : 'close-circle'}
                    className="close"
                    style={{ fontSize: isSmallScreen ? 18 : 32 }}
                  />
                )}
              </span>
            )}
            {isSmallScreen ? (
              <>
                <CourseOutlineMenu
                  navId={this.props.navId}
                  navItems={this.props.navItems}
                  navRootNodeIid={this.props.navRootNodeIid}
                  sessionPrefix={this.props.sessionPrefix}
                  learnMode={learnMode}
                  mode={this.props.mode}
                  positionOfCurrentItem={this.props.positionOfCurrentItem}
                  displayConfigurationCourse={
                    this.props.displayConfigurationCourse
                  }
                  courseName={lodashGet(course, 'name')}
                  course={course}
                  learnItem={this.props.learnItem}
                  isPreview={isPreview}
                  syllabus={syllabus}
                />
                <div style={{ display: 'none', visibility: 'hidden' }}>
                  <NavViewer
                    navId={this.props.navId}
                    navItems={this.props.navItems}
                    navRootNodeIid={this.props.navRootNodeIid}
                    sessionPrefix={this.props.sessionPrefix}
                    learnMode={learnMode}
                    mode={this.props.mode}
                  />
                </div>
              </>
            ) : null}

            <div style={{ flexGrow: 1 }}>
              {isSmallScreen ? (
                <React.Fragment>
                  <h3 className="m-b-0">{title}</h3>
                  {!isInIframe && (
                    <span
                      style={deadlineStyles}
                      className="enrolment-plan-name m-b-0"
                    >
                      <Deadline
                        endDate={lodashGet(course, 'end_date')}
                        countDown={countDown}
                        timeLeft={countDown}
                        showLongVersion={learnMode === 'overview'}
                        className="m-r-3"
                      />
                    </span>
                  )}
                </React.Fragment>
              ) : (
                <h1 className="course-name">
                  {title}{' '}
                  {!isInIframe && (
                    <React.Fragment>
                      {learnMode === 'overview' ? <br /> : ' '}
                      <span
                        style={deadlineStyles}
                        className="enrolment-plan-name"
                      >
                        <Deadline
                          endDate={lodashGet(course, 'end_date')}
                          countDown={countDown}
                          timeLeft={countDown}
                          showLongVersion
                        />
                      </span>
                    </React.Fragment>
                  )}
                </h1>
              )}
              {!isPreview &&
                (!isSmallScreen || learnMode === 'overview') &&
                !isInIframe && (
                  <React.Fragment>
                    {course &&
                      course.enrolment_plan &&
                      course.enrolment_plan.name && (
                        <Link
                          className="enrolment-plan-name"
                          to={getDashboardUrl('my-enrolment-plans', {
                            iid: course.enrolment_plan.iid,
                          })}
                        >
                          {t1('belongs_to_enrolment_plan')}:{' '}
                          <b>"{course.enrolment_plan.name}"</b>
                        </Link>
                      )}
                  </React.Fragment>
                )}
            </div>

            {showCloseButton && false && (
              <div className="pull-right d-flex justify-content-between align-items-center course-extra-content">
                {showRateButton ||
                this.props.themeConfig.layout === layouts.GJ ? (
                  <SurveyButton
                    course={course}
                    surveyLink={this.props.surveyLink}
                    compact={isSmallScreen}
                    showIfNull={this.props.themeConfig.layout === layouts.GJ}
                  />
                ) : null}

                <span style={{ fontSize: '150%' }}>
                  <MoreVert />
                </span>
              </div>
            )}
            <button
              className={`${
                isSmallScreen ? 'm-r-10' : 'm-r-20'
              } secondary-button`}
              type="primary"
              onClick={this.shareFb}
              title={t1('share_to_facebook')}
            >
              {t1('share')}
            </button>
            {showCloseButton && !isInIframe && (
              <AntIcon
                type="close-circle"
                className="close"
                style={{ fontSize: 20 }}
                onClick={this.exitLearnScreen}
                title={t1('click_to_exit_learn_screen')}
              />
            )}
          </div>
        </div>
        {session && session.name && <h5>{course && course.name}</h5>}

        {isReview && (
          <div>
            <Icon icon="warning" style={{ paddingRight: 10 }} />
            {t1('you_are_in_review_mode')}.{' '}
            {t1(
              'you_can_still_review_the_course_but_progress_will_not_get_updated',
            )}
            . {t1('you_finished_with_score_%s', [`${p || 0}/100`])}
          </div>
        )}

        {isPreview && learnMode === 'p-learn' && (
          <div className="m-t-5">
            <b>{t1('you_are_previewing_a_syllabus')}</b>:
            <span>
              <Link to={editSyllabusLink}>
                <FlatButton
                  label={t3('back_to_editing_syllabus')}
                  icon={<Icon icon="edit" />}
                  flatButton
                />
              </Link>
            </span>
            {totalResolveComments > 0 ? (
              <Warning inline>
                {`${totalResolveComments} ${t3('comments_unresolved')}`}
              </Warning>
            ) : (
              <SuccessAlert inline>
                {t3('no_outstanding_comments_to_be_resolved')}
              </SuccessAlert>
            )}
            {/*<SwitchControls items={controls(this.props.course, true)} />*/}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state, props) =>
    lodashGet(state, `trackerProgress[${lodashGet(props, 'course.iid')}].p`),
  (state) => lodashGet(state, 'learn.surveyLink'),
  (state) => lodashGet(state, 'learn.learnMode'),
  (state) => state.learn.syllabusIid,
  (state, props) => state.learn.navId || props.navId,
  (state, props) => props.learnItem,
  (state) => getThemeConfig(state),
  (state) => state.learn && state.learn.navItems,
  (state, props) => props.navRootNodeIid,
  (state) => state.learn && state.learn.positionOfCurrentItem,
  (state) => state.learn && state.learn.displayConfigurationCourse,
  (state) => state.domainInfo.conf,
  (
    nodes,
    p,
    surveyLink,
    learnMode,
    syllabusIid,
    navId,
    learnItem,
    themeConfig,
    navItems,
    navRootNodeIid,
    positionOfCurrentItem,
    displayConfigurationCourse,
    conf,
  ) => {
    let itemIid = null;
    let parentIid = null;
    if (navId) {
      const items = navId.split('-');
      switch (items.length) {
        case 1: {
          itemIid = items[0];
          break;
        }
        case 2: {
          itemIid = items[items.length - 1];
          parentIid = items[items.length - 2];
          break;
        }
        default: {
          itemIid = items[items.length - 2];
          parentIid = items[items.length - 3];
          break;
        }
      }
    }

    if (!learnItem) {
      learnItem = getNode(itemIid, parentIid, nodes) || {};
    }

    const appName = (themeConfig && themeConfig.layout) || 'gj';

    const facebookAppIdConfig = conf && conf['sso:facebook:app_id'];
    const facebookConfigByAppName =
      conf && conf['sso:facebook:config_by_app_name'];

    let facebookAppId =
      (facebookConfigByAppName &&
        facebookConfigByAppName[appName] &&
        facebookConfigByAppName[appName].app_id) ||
      facebookAppIdConfig;
    if (facebookAppId === 'none') {
      facebookAppId = null;
    }

    return {
      p,
      surveyLink,
      learnMode,
      syllabusIid,
      learnItem,
      themeConfig,
      navId,
      navItems,
      navRootNodeIid,
      positionOfCurrentItem,
      displayConfigurationCourse,
      facebookAppId,
    };
  },
);

export default connect(mapStateToProps)(withRouter(CourseTitle));
