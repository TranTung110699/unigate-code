import React from 'react';
import { Link } from 'react-router-dom';
import {
  displayConfigurationCourse,
  setCurrentLearningElement,
} from 'actions/learn';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import { isLocked } from 'components/learn/common/payment';
import {
  layouts,
  learningItemTypeViewers,
  scorePeriods,
} from 'configs/constants';
import { isExam } from 'common/learn';
import { isScormSco } from 'components/admin/scorm/scorm';
import { isSurvey } from 'components/admin/node/utils';
import sagaActions from 'actions/saga-creators';
import actions from 'actions/node/creators';
import { getThemeConfig } from 'utils/selectors';
import { createSelector } from 'reselect';
import CommentView from 'components/common/comment/comment-number';
import get from 'lodash.get';
import { scrollToLearnContainer } from 'components/learn/common/Util';
import './stylesheet.scss';
import { checkLearnerCanDownloadAttachments } from 'common/conf';
import { confSelector } from 'common/selectors';
import { breadCrumb } from 'common/utils/string';
import { getNodeIcon } from '../../utils';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/05/2017
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { navIdSelected, navId, node, isHeader } = nextProps;
    if (
      navIdSelected &&
      this.props.navIdSelected != navIdSelected &&
      navIdSelected &&
      navIdSelected === navId
      // && (!isHeader || isExam(node) || isScormSco(node) || isSurvey(node))
    ) {
      this.learn();
    }
  }

  surveyFinished = (learnItem) => {
    const { dispatch, info } = this.props;
    const survey = (Object.values(info) || []).find(
      (elem) => String(get(elem, 'iid')) == String(get(learnItem, 'iid')),
    );

    if (!survey) {
      return true;
    }

    const { step } = survey;
    if (['not_started', 'finished'].includes(step)) {
      return true;
    }

    dispatch(
      actions.snackbar(
        true,
        t1('you_need_to_complete_the_survey_before_can_be_work'),
      ),
    );

    return false;
  };

  learn = () => {
    const {
      node,
      dispatch,
      navId,
      typeViewer,
      currentNavId,
      itemIid,
      courseIid,
      info,
      learnItem,
    } = this.props;

    if (!node) {
      return;
    }

    dispatch(displayConfigurationCourse(false));
    if (
      typeViewer === learningItemTypeViewers.OVERVIEW ||
      currentNavId === navId
    ) {
      return;
    }

    if (isSurvey(learnItem) && !this.surveyFinished(learnItem)) {
      return;
    }

    if (info && info[itemIid] && info[itemIid].lastLearnTime) {
      const progress = [
        {
          tco_iid: itemIid,
          time_spent: parseInt(
            (Date.now() - info[itemIid].lastLearnTime) / 1000,
          ),
        },
      ];
      const data = {
        progress,
        ciid: courseIid,
      };
      dispatch(sagaActions.trackerProgressSave(data));
    }

    dispatch(
      setCurrentLearningElement({
        navId,
      }),
    );

    scrollToLearnContainer(this.props.widthScreenSize);
  };

  displayDuration(duration) {
    const formattedDuration = duration.split(':');
    const length = formattedDuration.length;
    const hour =
      formattedDuration[length - 3] && formattedDuration[length - 3] >= 10
        ? formattedDuration[length - 3]
        : formattedDuration[length - 3] % 10;
    const minute =
      formattedDuration[length - 2] && formattedDuration[length - 2] >= 10
        ? formattedDuration[length - 2]
        : formattedDuration[length - 2] % 10;
    const second =
      formattedDuration[length - 1] && formattedDuration[length - 1] >= 10
        ? formattedDuration[length - 1]
        : formattedDuration[length - 1] % 10;
    return hour
      ? `${hour}h ${minute}m ${second}s`
      : minute
      ? `${minute}m ${second}s`
      : `${second}s`;
  }

  getElementStatus() {
    const { locked, progress, node, themeConfig } = this.props;

    if (!locked && (typeof progress.cp === 'undefined' || isExam(node))) {
      return null;
    }

    const finishedTitle = t1('you_have_completed_this_item');
    const percentCompletedTitle = t1('you_have_completed_%s %%', progress.p);

    let progressToUse;

    if (node.ntype == 'exercise') {
      progressToUse = progress.cp || 0;
    } else {
      if (progress.cp != 'undefined' && progress.time_spent)
        progressToUse = progress.cp;
      else progressToUse = progress.p;
    }
    // if (get(node, 'ntype') === ntype.EXERCISE && typeof progress.p !== 'undefined') {
    //   progressToUse = progress.p;
    // }

    let [progressIcon, classStatusModifier, title] = ['check', 'finish', '%'];
    if (locked) {
      classStatusModifier = 'lock';
      progressIcon = <Icon icon="lock" />;
      title = t1('item_is_locked');
    } else if (
      (progress && progress.pf) ||
      progressToUse === scorePeriods.FINISH
    ) {
      classStatusModifier = 'finish';
      progressIcon = <Icon icon="check" antIcon />;
      title = finishedTitle;
    } else {
      return null;
    }

    return (
      <div className="learn-nav-item__icon learn-nav-item__type pull-left">
        <div
          className={`learn-nav-item__icon \
                learn-nav-item__status \
                learn-nav-item__status--${classStatusModifier} \
                pull-left`}
          title={title}
        >
          {progressIcon}
        </div>
      </div>
    );
  }

  getItemQuestionCount = () => {
    const { locked, progress, node, themeConfig } = this.props;
    if (node.ntype !== 'exercise') {
      return;
    }

    let numberOfCorrect = 0;
    const totalOfQuestions = get(node, 'metadata', []).length;
    const pointOfCorrect = get(progress, 'p');

    if (pointOfCorrect) {
      numberOfCorrect = Math.round((pointOfCorrect * totalOfQuestions) / 100);
    }

    return (
      <div className="question-number">
        <span>
          {numberOfCorrect}/{totalOfQuestions}
        </span>
      </div>
    );
  };

  render() {
    const {
      node,
      typeViewer,
      themeConfig,
      isPreview,
      canLearnerDownloadAttachments,
      expanded,
      breadcrumb,
      className,
      surveyUrl,
      treeDepth,
    } = this.props;
    let nodeType = getNodeIcon(node);

    const theLink = this.props.link || '?';

    if (breadcrumb) {
      return (
        <Link to={theLink} className={className}>
          <span className="m-r-5">
            <Icon icon={nodeType} />
          </span>
          {/*<span>{breadCrumb(get(node, 'name'), 20)}</span>*/}
          <span>{get(node, 'name')}</span>
        </Link>
      );
    }

    if (this.props.isHeader) {
      if (theLink === surveyUrl) {
        return null;
      }

      if (isExam(node) || isSurvey(node)) {
        return (
          <Link to={theLink}>
            {node && (
              <div className={'learn-nav-item clearfix'}>
                <div className="learn-nav-item__main-info">
                  <div className="learn-nav-item__icon learn-nav-item__type pull-left">
                    <Icon icon={isSurvey(node) ? 'survey' : 'exam'} />
                  </div>
                </div>
              </div>
            )}
          </Link>
        );
      }

      if (isExam(node) || isScormSco(node)) {
        return (
          <Link to={theLink}>
            <div
              className={`learn-nav-item ${
                isExam(node) ? 'learn-nav-item--exam' : ''
              } clearfix`}
            >
              <div className="learn-nav-item__main-info">
                <div className="learn-nav-item__title pull-left">
                  {isExam(node) ? (
                    <Icon icon="exam" />
                  ) : isSurvey(node) ? (
                    <Icon icon="survey" />
                  ) : isScormSco(node) ? (
                    <Icon icon="sco-scorm" />
                  ) : null}{' '}
                  {breadCrumb(get(node, 'name'), 80)}
                </div>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <Link to={theLink} className="w-100">
          <div
            className={`${
              themeConfig.layout === layouts.PIXELZ
                ? 'text-uppercase pixelz-overview-course-header'
                : ''
            }`}
          >
            {treeDepth !== 1 ? (
              <div className="learn-nav-item__icon learn-nav-item__type pull-left m-r-10">
                {this.getElementStatus()}
              </div>
            ) : null}
            <div
              className="learn-nav-item__title"
              style={{
                display: 'inline',
                ...(treeDepth === 1
                  ? { marginLeft: `${typeViewer === 'overview' ? 2 : 4}%` }
                  : {}),
              }}
            >
              {breadCrumb(get(node, 'name'), 80)}
            </div>
          </div>
        </Link>
      );
    }

    return (
      <Link to={theLink} className="w-100">
        {node && (
          <div
            className={`learn-nav-item ${
              isExam(node) ? 'learn-nav-item--exam' : ''
            } ${typeViewer === 'overview' ? 'overview' : 'clearfix'}`}
          >
            <div className="learn-nav-item__main-info">
              {this.getElementStatus()}
              <div
                className="learn-nav-item__title pull-left d-flex align-items-center"
                title={get(node, 'name')}
              >
                <Icon icon={nodeType} className="m-r-5 icon-type m-l-5" />
                <span className="title">
                  {breadCrumb(get(node, 'name'), 80)}{' '}
                </span>
              </div>
              {isPreview ? (
                <CommentView
                  resolveCount={get(node, 'resolve_count')}
                  resolvedCount={get(node, 'resolved_count')}
                />
              ) : (
                this.getItemQuestionCount()
              )}
            </div>
          </div>
        )}
      </Link>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state, props) => props.nodeIid,
  (state) => state.learn.tcosPrice,
  (state) => state.learn.isPreview,
  (state) => state.learn.navId,
  (state, props) => props.typeViewer || state.learn.typeViewer,
  (state) => state.learn.itemIid,
  (state) => state.learn.courseIid,
  (state) => state.learn.info,
  (state, props) => state.trackerProgress[props.nodeIid],
  (state) => getThemeConfig(state),
  (state) => get(state, 'common.screenSize.width'),
  confSelector,
  (
    nodes,
    nodeIid,
    tcosPrice,
    isPreview,
    currentNavId,
    typeViewer,
    itemIid,
    courseIid,
    info,
    progress,
    themeConfig,
    widthScreenSize,
    conf,
  ) => ({
    node: nodes[nodeIid],
    learnItem: nodes[itemIid],
    locked: isLocked(isPreview, tcosPrice && tcosPrice[nodeIid]),
    currentNavId,
    typeViewer,
    itemIid,
    courseIid,
    info,
    progress: progress || {},
    themeConfig,
    widthScreenSize,
    canLearnerDownloadAttachments: checkLearnerCanDownloadAttachments(conf),
  }),
);

export default connect(mapStateToProps)(index);
