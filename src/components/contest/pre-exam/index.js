/**
 * Created by hungvo on 08/08/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import { t1, t3 } from 'translate';
import Helmet from 'react-helmet';
import Perm from 'common/utils/Perm';
import contestApiUrls from 'components/admin/contest/endpoints';
import Overlay from 'components/common/overlay';

import Loading from 'components/common/loading';
import LayoutHelper from 'layouts/LayoutHelper';
import { DefinedUrlParams } from 'routes/links/common';
import {
  modes,
  modifyQuestionsInfoOfTakeFromServer,
  types,
} from 'common/learn/exercise';
import StartedExamTesting from 'components/learn/items';
import fetchNode from 'actions/node/creators';
import nodeSagaActions from 'actions/node/saga-creators';
import { setCurrentLearningElement } from 'actions/learn';
import {
  getLearnItemInfoSelector,
  isExamShift,
  statuses as examStatus,
} from 'common/learn';
import {
  finishExercise,
  initExam,
} from 'actions/learn/exercise/normal/saga-creators';
import {
  getTcosPriceRequest,
  saveViolationRequest,
} from 'actions/learn/saga-creators';
import Confirm from 'components/learn/common/confirm';
import sagaActions from 'actions/saga-creators';
import { getPreloadData } from 'utils/learn/Exam';
import {
  getOptionsPropertiesLogin,
  layouts,
  loadingStatuses,
} from 'configs/constants';
import { activeLoginTab, openLoginDialog } from 'actions/auth/auth-dialog';
import { getLoadingStatus, getThemeConfig } from 'utils/selectors';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import AntdButton from 'antd/lib/button';

import ExamInfo from './ExamInfo';
import lodashGet from 'lodash.get';
import { checkPreloadDataModeIsEnabled } from 'common/conf';
import {
  examDoing,
  examFinish,
  examInit,
  examRetake,
  startedExam,
  shouldNotGoFullscreen,
} from './utils';
import { examResult } from '../routes';
import ReloadButton from 'components/common/reload/Button';

import '../../learn/stylesheet.scss';

export const EXAM_SHIFT_STATE_PREFIX = 'exam-shift';
export const PAPER_STATE_PREFIX = 'paper';

export const getItemIidFromPaper = (node) => lodashGet(node, 'iid');

export const getKeyState = (courseIid, contestCode) => {
  if (contestCode) return `${EXAM_SHIFT_STATE_PREFIX}-${contestCode}`;

  return `${EXAM_SHIFT_STATE_PREFIX}-${courseIid}`;
};

export const getPaperLoadingStatusKey = (courseIid) => {
  return `${PAPER_STATE_PREFIX}-${courseIid}`;
};

export const stateKeyCountDown = (node) => `exam-countdown-${node && node.iid}`;

class PreExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contest_invalid_message: '',
      dialogContent: null,
      closedLoadingPopup: false,
      openedLoadingPopup: false,
      differenceTs: 0, // difference time of server side and client side
      isFirstTime: false, // isFirstTime = true when user click to "take exam" button
    };
  }

  componentWillMount() {
    LayoutHelper.useLayout('embedded', this);
    const { dispatch, isGuest } = this.props;
    if (isGuest) {
      dispatch(activeLoginTab());
      dispatch(openLoginDialog(getOptionsPropertiesLogin(), '/'));
    } else {
      this.getCourseInfo(this.props);
    }
  }

  componentDidMount() {
    window.addEventListener('blur', this.handleLostFocus);

    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
      window.addEventListener('beforeunload', function(event) {
        event.returnValue = t1('you_are_in_the_middle_of_an_exam');
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('blur', this.handleLostFocus);
  }

  componentWillUpdate(nextProps, nextState) {
    const { course, learnInfo } = nextProps;
    if (examFinish(course, learnInfo) && screenfull.isFullscreen) {
      screenfull.exit();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      course,
      examShiftTimer,
      preloadData,
      itemIid,
      learnInfo,
      dispatch,
      paperId,
      isPreview,
      isGuest,
      courseCanCost,
      checkPreloadDataMode,
    } = this.props;

    if (
      courseCanCost &&
      nextProps &&
      nextProps.course &&
      nextProps.paperId &&
      !isPreview &&
      (nextProps.course !== course || nextProps.paperId !== paperId)
    ) {
      this.checkLockedByPaperId(nextProps);
    }

    if (
      (isGuest && nextProps && !nextProps.isGuest) ||
      (nextProps &&
        nextProps.learnInfo &&
        nextProps.learnInfo.status &&
        (!learnInfo ||
          !learnInfo.status ||
          nextProps.learnInfo.status !== learnInfo.status))
    ) {
      this.getCourseInfo(nextProps);
    }

    if (!course && nextProps.course) {
      if (examDoing(nextProps.course)) {
        this.onFetchPaperExamTest(
          nextProps,
          getPaperLoadingStatusKey(lodashGet(nextProps, 'course.iid')),
          this.onFetchPaperExamTestSuccess,
        );
      }

      if (examInit(nextProps.course)) {
        this.setCountDownFromStartTime(nextProps);
      }
    }

    if (checkPreloadDataMode) {
      if (
        nextProps.preloadData &&
        nextProps.preloadData !== preloadData &&
        (!examShiftTimer || !examShiftTimer.timeLeft)
      ) {
        this.showPreloadDataExam(nextProps);
      }

      if (lodashGet(nextProps, 'preloadData.errorFilesTotal') > 0) {
        this.showPreloadDataExamFailed();
      }
    }

    if (
      nextProps &&
      nextProps.learnInfo &&
      nextProps.learnInfo.is_over_time &&
      (!learnInfo || !learnInfo.is_over_time)
    ) {
      // console.log('...............is_over_time.........................');
      this.showExamTimeIsOverTimeDialog();
    }

    if (
      nextProps &&
      nextProps.learnInfo &&
      nextProps.learnInfo.already_taken_exam &&
      (!learnInfo || !learnInfo.already_taken_exam)
    ) {
      this.showAlreadyTakenExamDialog();
    }

    if (
      nextProps &&
      nextProps.learnInfo &&
      nextProps.learnInfo.already_submitted_exam &&
      (!learnInfo || !learnInfo.already_submitted_exam)
    ) {
      this.showAlreadySubmitExamDialog();
    }
  }

  /***********************************Events***************************************************************/
  handleFinishExam = () => {
    const { itemIid, dispatch } = this.props;
    dispatch(finishExercise(itemIid));
    const timeout = setTimeout(() => {
      this.closeDialog();
    }, 10000);

    this.openDialog(
      <Confirm
        prompt={t3(
          'you_have_violated_the_regulations_of_the_contest,_the_system_will_automatically_close_in_10_seconds',
        )}
        cancelMessage={t3('close')}
        onCancelButtonClick={() => {
          this.closeDialog();
          if (timeout) {
            clearTimeout(timeout);
          }
        }}
        iconClassName="text-danger"
        IconDisplay="na"
      />,
    );
  };

  handleSaveViolation = () => {
    const { dispatch, course, itemIid, learnInfo } = this.props;
    if (!course) {
      return;
    }

    dispatch(
      saveViolationRequest(
        {
          contest_code: course.contest_code,
          itemIid,
          exam_order: learnInfo.exam_order,
          course_iid: course.iid,
        },
        {
          onRequestSuccessful: (data) => {
            const violationLimit =
              lodashGet(course, 'exam_round_info.violation_limit') ||
              data.default_violation_limit;
            if (data && data.nr_of_violations >= violationLimit) {
              this.handleFinishExam();
            }
          },
        },
      ),
    );
  };

  handleLostFocus = () => {
    return null; //for development
    if (screenfull && screenfull.isFullscreen) {
      screenfull.exit();
    }
  };

  /***********************************Events end***************************************************************/

  checkLockedByPaperId = (props) => {
    const newProps = props || this.props;
    const { dispatch, course, paperId, courseCanCost } = newProps;
    if (!course || !courseCanCost) {
      return;
    }

    const params = {
      ciid: course && course.iid,
      paper_id: paperId,
    };
    dispatch(getTcosPriceRequest(params));
  };

  setUpPreloadPaperAndMedia = (course) => {
    const preloadDataTimeAmount =
      (lodashGet(course, 'exam_round_info.preload_data_time_amount') || 0) * 60;

    const secondsTillCourseStartTime =
      lodashGet(course, 'start_date') - lodashGet(course, 'server_ts');

    const secondsTillStartPreloadableTime =
      secondsTillCourseStartTime - preloadDataTimeAmount;

    const secondsTillPreload =
      secondsTillStartPreloadableTime < 0
        ? Math.random() * secondsTillCourseStartTime
        : secondsTillStartPreloadableTime +
          Math.random() * preloadDataTimeAmount;

    setTimeout(() => {
      if (!this.hack_FetchPaperSuccessNode) {
        this.onFetchPaperExamTest();
      }
    }, secondsTillPreload * 1000 || 0);
  };

  executeOnSuccess = (course) => {
    this.setUpPreloadPaperAndMedia(course);

    this.setState({
      differenceTs: course.server_ts - Math.floor(Date.now() / 1000),
    });
  };

  executeOnFailure = (course) => {
    this.setState({
      contest_invalid_message: course && course.message,
    });
  };

  getCourseInfo = (props) => {
    const { dispatch, courseIid, examMode, examByPaper, contestCode } = props;
    if (!courseIid && !contestCode) {
      return;
    }

    const courseConfig = {
      url: contestApiUrls.get_exam_api,
      keyState: getKeyState(courseIid, contestCode),
      executeOnSuccess: this.executeOnSuccess,
      executeOnFailure: this.executeOnFailure,
    };

    const courseParams = {
      // ciid: courseIid,
      exam_mode: examMode,
      // paperId: examByPaper,
      contest_code: contestCode,
    };

    dispatch(nodeSagaActions.getDataRequest(courseConfig, courseParams));
  };

  checkAccessPermission = (props) => {
    const { course, themeConfig } = props;

    if (course) {
      if (!isExamShift(course) && themeConfig.layout !== layouts.ETEC) {
        window.location.assign('/');
        return false;
      } else if (!course.allowedPermission) {
        this.blockPermission();
        return false;
      }
      return true;
    }
    return false;
  };

  startExamAction = () => {
    this.setState({
      isFirstTime: true,
    });

    this.setFullScreen();

    this.onFetchPaperExamTest(
      this.props,
      getPaperLoadingStatusKey(lodashGet(this.props, 'course.iid')),
      this.onFetchPaperExamTestSuccess,
    );
  };

  handleOnChangeFullScreen = () => {
    const { learnInfo } = this.props;
    if (
      startedExam(learnInfo) &&
      screenfull.enabled &&
      !screenfull.isFullscreen
    ) {
      this.escapeFullScreen();
    }
  };

  setCountDownFromStartTime = (props) => {
    const { dispatch, course } = props;
    if (!course || !course.start_date) {
      return;
    }
    const timeStart = course.start_date;
    const timeNow = parseInt(Date.now() / 1000, 10) + this.state.differenceTs;
    if (timeStart > timeNow) {
      dispatch(
        sagaActions.timeCountDown(
          timeStart - timeNow,
          stateKeyCountDown(course),
        ),
      );
    }
  };

  onFetchPaperExamTest(props, loadingStatusKey, executeOnSuccess) {
    if (this.hack_FetchPaperSuccessNode) {
      if (typeof executeOnSuccess === 'function') {
        executeOnSuccess(this.hack_FetchPaperSuccessNode);
      }
      return;
    }

    props = props || this.props;
    const { course, dispatch, paperId, examMode, checkPreloadDataMode } = props;

    const latestExamOrder = parseInt(
      lodashGet(props, 'course.latestExamOrder'),
    );
    const nextExamOrder = parseInt(lodashGet(props, 'course.nextExamOrder'));
    const status = lodashGet(props, 'course.examStatus');

    dispatch(
      fetchNode.fetchNode({
        apiUrl: contestApiUrls.load_paper,
        is_testing: 1,
        learning: true,
        courseIid: course.iid,
        syllabus_iid: course.syllabus,
        exam_order:
          status !== examStatus.DOING && nextExamOrder > latestExamOrder
            ? nextExamOrder
            : latestExamOrder,
        transformResult: (node) =>
          node && {
            ...node,
            options: {
              ...(lodashGet(node, 'options') || {}),
              ...(lodashGet(course, 'exam_round_info.options') || {}),
            },
            duration: course.duration,
          },
        executeOnSuccess: (node) => {
          //this is a quick hack to identify if paper is loaded
          // please fix this
          this.hack_FetchPaperSuccessNode = node;

          if (checkPreloadDataMode) {
            const mediaFiles = getPreloadData([], node);
            dispatch(
              sagaActions.preloadAllMediaData(getItemIidFromPaper(node), {
                unLoadingMediaFiles: mediaFiles,
                mediaFiles,
                total: mediaFiles.length,
                loadedFilesTotal: 0,
                errorFilesTotal: 0,
              }),
            );
          }

          if (typeof executeOnSuccess === 'function') {
            executeOnSuccess(node);
          }
        },
        paper_id: paperId,
        exam_mode: examMode,
        loadingStatusKey: loadingStatusKey,
      }),
    );
  }

  onFetchPaperExamTestSuccess = (node) => {
    const { course } = this.props;

    if (examDoing(course)) {
      this.dialogContinueExam();
    }

    this.setExamInfo(node);
  };

  redirectToResultScreen = (node) => {
    const { itemIid, learnInfo, course, contestCode } = this.props;
    const url = examResult(
      contestCode,
      course.iid,
      itemIid,
      parseInt(learnInfo.exam_order) - 1,
    );
    // console.log({props: this.props});
    this.props.history.push(url);
  };

  setExamInfo = (node) => {
    const {
      dispatch,
      isPreview,
      course,
      examMode,
      examByPaper,
      courseIid,
    } = this.props;
    if (!node) {
      return;
    }

    let mode = null;
    if (examMode === modes.TRIAL) {
      mode = modes.TRIAL;
    } else {
      mode = isPreview ? modes.PREVIEW : modes.NORMAL;
    }

    const examOrder = course.nextExamOrder || 1;
    const learnInfo = {
      type: types.EXAM,
      id: node.id,
      iid: node.iid,
      name: node.name,
      description: node.description,
      options: node.options,
      exam_type: node.ntype,
      exam_order: examOrder,
      duration: node.duration,
      mode,
    };
    const take = course.take;
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
    if (examByPaper) {
      learnInfo.paperId = examByPaper;
    }

    const isFirstTime = this.state.isFirstTime || false;

    dispatch(
      initExam(node.iid, learnInfo, isFirstTime, () => {
        this.redirectToResultScreen(node);
      }),
    );

    // Reset isFirstTime to false
    this.setState({
      isFirstTime: false,
    });

    dispatch(
      setCurrentLearningElement({
        itemIid: getItemIidFromPaper(node),
        courseIid,
      }),
    );
  };

  openDialog = (content) => {
    this.setState({
      dialogContent: content,
    });
  };

  closeDialog = () => {
    this.setState({
      dialogContent: null,
    });
  };

  showPreloadDataExam = (nextProps) => {
    const { preloadData, learnInfo } = nextProps;

    if (
      preloadData &&
      (preloadData.loadedFilesTotal < preloadData.total ||
        (this.state.openedLoadingPopup && !this.state.closedLoadingPopup)) &&
      startedExam(learnInfo)
    ) {
      this.setState({
        openedLoadingPopup: true,
      });

      this.openDialog(
        <Confirm
          prompt={`${t3('loading')} ...`}
          acceptMessage={t3('continue')}
          preloadData={preloadData}
          onAcceptButtonClick={() => {
            this.closeDialog();
            this.setFullScreen();
            this.setState({
              closedLoadingPopup: true,
            });
          }}
        />,
      );
    } else {
      this.closeDialog();
      // this.setFullScreen();
    }
  };

  dialogContinueExam = () => {
    this.openDialog(
      <Confirm
        prompt={t3(
          'you_are_in_the_middle_of_an_exam!_click_the_button_below_to_continue',
        )}
        acceptMessage={t3('continue')}
        onAcceptButtonClick={() => {
          this.closeDialog();
          this.setFullScreen();
        }}
      />,
    );
  };

  blockPermission = () => {
    // TODO: Save
    this.openDialog(
      <Confirm
        className="exam-violate"
        prompt={t3('you_are_not_allowed_to_take_this_test')}
        acceptMessage={t3('ok')}
        onAcceptButtonClick={() => {
          window.location.assign('/');
        }}
        iconDisplay="exam_violate"
      />,
    );
  };

  showPreloadDataExamFailed = () => {
    this.openDialog(
      <Confirm
        className="preload-data-failed"
        prompt={t3('preload_data_exam_is_failed')}
        acceptMessage={t3('retry')}
        onAcceptButtonClick={() => {
          window.location.reload();
        }}
        iconDisplay="alert"
      />,
    );
  };

  showExamTimeIsOverTimeDialog = () => {
    const timeout = setTimeout(() => {
      this.closeDialog();
    }, 10000);

    this.openDialog(
      <Confirm
        prompt={t3(
          'exam_time_is_over,_the_system_will_automatically_close_in_10_seconds',
        )}
        cancelMessage={t3('close')}
        onCancelButtonClick={() => {
          this.closeDialog();
          if (timeout) {
            clearTimeout(timeout);
          }
        }}
      />,
    );
  };

  showAlreadyTakenExamDialog = () => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 10000);

    this.openDialog(
      <Confirm
        prompt={t3(
          'you_already_taken_exam_on_another_device,_please_click_F5_to_get_latest_exam_result_and_then_keep_doing_exam,_the_system_will_automatically_F5_in_10_seconds',
        )}
        cancelMessage={t3('close')}
        onCancelButtonClick={() => {
          window.location.reload();
          if (timeout) {
            clearTimeout(timeout);
          }
        }}
      />,
    );
  };

  showAlreadySubmitExamDialog = () => {
    // window.location = '/dashboard/taken-contests';
    // const timeout = setTimeout(() => {
    //   window.location.reload();
    // }, 10000);
    //
    // this.openDialog(
    //   <Confirm
    //     prompt={t3(
    //       'you_already_submitted_exam_on_another_device,_your_result_saved_on_system,_the_system_will_automatically_F5_in_10_seconds',
    //     )}
    //     cancelMessage={t3('close')}
    //     onCancelButtonClick={() => {
    //       window.location.reload();
    //       if (timeout) {
    //         clearTimeout(timeout);
    //       }
    //     }}
    //   />,
    // );
  };

  setFullScreen = () => {
    if (shouldNotGoFullscreen(this.props.course)) {
      return;
    }

    if (screenfull.enabled && !screenfull.isFullscreen && findDOMNode(this)) {
      const element = document.getElementById('exercise-container');

      if (element) {
        screenfull.request(element);
      } else screenfull.request(findDOMNode(this));
      screenfull.on('change', this.handleOnChangeFullScreen);
      screenfull.onerror(() => {
        const { learnInfo } = this.props;
        if (learnInfo && startedExam(learnInfo)) {
          this.escapeFullScreen();
        }
      });
    }
  };

  escapeFullScreen = () => {
    this.handleSaveViolation();

    // hacking for easier debugging. TODO: remove this maybe
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return;
    }

    this.openDialog(
      <Confirm
        className="exam-violate"
        prompt={t3('you_have_violated_the_regulations_of_the_contest')}
        acceptMessage={t3('continue')}
        onAcceptButtonClick={() => {
          this.setFullScreen();
          this.closeDialog();
        }}
        cancelMessage={t3('back_to_homepage')}
        onCancelButtonClick={() => {
          window.location.assign('/');
        }}
        iconDisplay="exam_violate"
      />,
    );
  };

  renderContentDisplay = (props, loadingText) => {
    if (!this.checkAccessPermission(props)) {
      return <Loading className="exam-shift-wrapper__loading" />;
    }

    const {
      course,
      courseIid,
      learnInfo,
      learnItem,
      preloadData,
      checkPreloadDataMode,
    } = props;

    if (
      startedExam(learnInfo) &&
      (!preloadData ||
        !checkPreloadDataMode ||
        (preloadData && preloadData.loadedFilesTotal === preloadData.total))
    ) {
      return (
        <StartedExamTesting
          course={course}
          courseIid={courseIid}
          learnItemIid={this.state.learnItemIid}
          loadAsync={false}
          fullScreen={false}
          learnItem={learnItem}
        />
      );
    }

    // hack để khi full screen sẽ không bao giờ render ra màn hình exam-info
    // thay vào đó sẽ in ra màn hình loading
    // vì hiện tại đang có 1 bug là
    // khi user click vào nút start exam:
    //  - màn hình sẽ được full screen
    //  - sau đó màn hình loading sẽ hiện ra
    //  - sau đó màn hình exam info sẽ hiện ra
    //  - rồi màn hình loading lại tiếp tục hiện ra
    //  - sau đó màn hình làm bài mới hiện lên
    if (screenfull && screenfull.isFullscreen) {
      return loadingText;
    }

    let mode = examStatus.INIT;
    if (examFinish(course, learnInfo)) {
      mode = examStatus.FINISHED;
    } else if (examRetake(course, learnInfo)) {
      mode = examStatus.RETAKE;
    } else if (examDoing(course, learnInfo)) {
      mode = examStatus.DOING;
    } else if (startedExam(learnInfo)) {
      mode = examStatus.STARTED;
    }

    return (
      <ExamInfo
        {...this.props}
        differenceTs={this.state.differenceTs}
        startExamAction={this.startExamAction}
        mode={mode}
        payExecuteOnSuccess={this.checkLockedByPaperId}
      />
    );
  };

  render() {
    const {
      course,
      screenSize,
      titleHelmet,
      contestCode,
      courseLoadingStatus,
      paperLoadingStatus,
    } = this.props;

    return (
      <Overlay
        overlayContent={
          this.state.dialogContent && (
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.state.dialogContent}
            </div>
          )
        }
      >
        <div
          className="theme-exam exam-shift-wrapper"
          style={{ minHeight: screenSize.height }}
        >
          {titleHelmet && <Helmet title={titleHelmet} />}
          {(() => {
            const loadingText = (
              <div className="contest-invalid-wrapper">
                <h3>{t1('loading')} ...</h3>
              </div>
            );

            const errorAndReloadText = (
              <div className="contest-invalid-wrapper">
                <h3>{t1('failed_to_load_exam_data')}</h3>
                <ReloadButton
                  renderButton={({ onClick }) => (
                    <AntdButton
                      icon="reload"
                      type="primary"
                      size="large"
                      onClick={onClick}
                    >
                      {t1('click_here_to_reload')}
                    </AntdButton>
                  )}
                />
              </div>
            );

            if (courseLoadingStatus !== loadingStatuses.FINISHED) {
              return loadingText;
            }

            if (!course) {
              {
                /*
              if (!contestCode) {
                return <SelectContest />;
              }
              if (this.state.contest_invalid_message) {
                return (
                  <div className="contest-invalid-wrapper">
                    <h3>{this.state.contest_invalid_message}</h3>
                  </div>
                );
              }

                 */
              }
              return errorAndReloadText;
            }

            if (paperLoadingStatus === loadingStatuses.LOADING) {
              return loadingText;
            }

            if (
              paperLoadingStatus === loadingStatuses.FINISHED &&
              !this.hack_FetchPaperSuccessNode
            ) {
              return errorAndReloadText;
            }

            return this.renderContentDisplay(this.props, loadingText);
          })()}
        </div>
      </Overlay>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;

  const contestCode =
    match && match.params && match.params[DefinedUrlParams.CONTEST_CODE];
  let courseIid = null;
  if (match && match.params && match.params[DefinedUrlParams.COURSE_IID]) {
    courseIid = match.params[DefinedUrlParams.COURSE_IID];
  }

  let examMode = null;
  if (match && match.params && match.params[DefinedUrlParams.EXAM_MODE]) {
    examMode = match.params[DefinedUrlParams.EXAM_MODE];
  }
  const courseLoadingKeyState = getKeyState(courseIid, contestCode);

  const course = getDataApiResultSelector(state)(courseLoadingKeyState);
  const courseLoadingStatus = getLoadingStatus(state)(courseLoadingKeyState);

  if (course && !courseIid) {
    courseIid = course.iid;
  }

  const screenSize = state.common.screenSize;

  const itemIid = state.learn.itemIid;
  const learnItem = state.tree[itemIid];
  const learnInfo = getLearnItemInfoSelector(state)(itemIid);
  let examShiftTimer = {};
  if (course) {
    examShiftTimer = state.timer[stateKeyCountDown(course)] || {};
  }

  const preloadData = state.preloadData[itemIid];
  const titleHelmet = course && course.name;

  // TODO: get isPreview by S
  const isPreview = 0;

  let paperId = null;
  let examByPaper = null;
  if (match && match.params && match.params[DefinedUrlParams.PAPER_ID]) {
    paperId = match.params[DefinedUrlParams.PAPER_ID];
    examByPaper = paperId;
  } else {
    paperId = state.learn && state.learn.paperId;
  }
  if (course) {
    course.locked =
      isPreview ||
      (state.learn &&
        state.learn.tcosPrice &&
        state.learn.tcosPrice[paperId]) ||
      null;
  }
  const courseCanCost = lodashGet(state, 'domainInfo.conf.course_can_cost');
  const checkPreloadDataMode = checkPreloadDataModeIsEnabled(state.domainInfo);

  const paperLoadingStatusKey = getPaperLoadingStatusKey(courseIid);
  const paperLoadingStatus = getLoadingStatus(state)(paperLoadingStatusKey);

  return {
    examShiftTimer,
    course,
    courseLoadingStatus,
    paperLoadingStatus,
    paperId,
    itemIid,
    examMode,
    learnInfo,
    courseIid,
    isPreview,
    screenSize,
    learnItem,
    titleHelmet,
    preloadData,
    examByPaper,
    courseCanCost,
    checkPreloadDataMode,
    isGuest: Perm.isGuest(),
    themeConfig: getThemeConfig(state),
    contestCode:
      match && match.params && match.params[DefinedUrlParams.CONTEST_CODE],
  };
};

export default connect(mapStateToProps)(withRouter(PreExam));
