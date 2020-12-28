import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import configs from 'configs/configuration';
import { connect } from 'react-redux';
import { courseCompletedModes, courseModes } from 'configs/constants';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import Deadline from 'components/front-end/common/Deadline';
import BlockItem from 'components/front-end/common/block-item';
import { getDashboardUrl } from 'routes/links/common';
import withUserInfo from 'common/hoc/withUserInfo';
import CourseItemInGridFooter from './Footer';
import { getOverviewCourseLink } from '../utils';
import './stylesheet.scss';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null,
    };
  }

  hasAction = () =>
    this.props.display === 'view-only'
      ? false
      : typeof this.props.hasAction === 'undefined'
      ? true
      : this.props.hasAction;

  disableLink = () => this.props.display === 'view-only';

  render() {
    let { item, progress, rootPathIid, mode, viewUserIid } = this.props;
    mode = this.state.mode ? this.state.mode : mode;
    const showDescription =
      typeof this.props.showDescription === 'undefined'
        ? true
        : this.props.showDescription;

    progress = progress || {};
    progress = progress.cp || 0;
    if (!progress) {
      progress = item.cp || 0;
    }
    const configItem =
      configs.getLearningPathConfigById(
        parseInt(rootPathIid),
        configs.learningPaths,
      ) || {};

    const overviewLink = getOverviewCourseLink(item, viewUserIid, rootPathIid);
    const disableLink = this.disableLink();
    const avatar = item.avatar;
    const shortDescription = item.content_mobile;
    const description = item.content;
    const duration = item.duration;
    const title = item.name;
    const shortTitle = item.name_mobile;
    const bgColor = item.bg_color;
    const { subTitle, subTitleLinkUrl } = (() => {
      let subTitle;
      let subTitleLinkUrl;

      if (mode === courseModes.MODE_PUBLIC) {
        subTitle = (lodashGet(item, '__expand.academic_categories') || [])
          .map((cate) => lodashGet(cate, 'name'))
          .join(', ');
      } else {
        subTitle = lodashGet(item, 'enrolment_plan.name');
        subTitleLinkUrl = getDashboardUrl('my-enrolment-plans', {
          iid: lodashGet(item, 'enrolment_plan.iid'),
        });
      }

      return { subTitle, subTitleLinkUrl };
    })();
    const rejected = mode === courseModes.MODE_REJECTED;
    const isPublic = !lodashGet(item, 'private');
    const showProgress =
      mode === courseModes.MODE_IN_PROGRESS ||
      mode === courseModes.MODE_PUBLIC ||
      mode === courseModes.MODE_COMPULSORY;
    const showDeadline =
      !this.hasAction() || courseCompletedModes.includes(mode);
    const showAction = this.hasAction() || courseCompletedModes.includes(mode);
    const deadline = (
      <Deadline
        endDate={lodashGet(item, 'end_date')}
        changeStyleWhenUrgent={false}
      />
    );
    const footer = (
      <CourseItemInGridFooter mode={mode} item={item} progress={progress} />
    );
    const displayIcon = configItem.displayIcon;

    //**============= THIS ==========================
    const tags = lodashGet(item, 'credit_syllabus_object.tags');
    const tagsInfo = (tags || []).map((tag) =>
      lodashGet(window.TAG_COLORS, tag),
    );
    //**============= THIS ==========================

    return (
      <BlockItem
        shortDescription={shortDescription}
        title={title}
        shortTitle={shortTitle}
        displayIcon={displayIcon}
        subTitle={subTitle}
        subTitleLinkUrl={subTitleLinkUrl}
        progress={progress}
        description={description}
        avatar={avatar}
        bgColor={bgColor}
        overviewLink={overviewLink}
        disableLink={disableLink}
        action={footer}
        showAction={showAction}
        deadline={deadline}
        showDeadline={showDeadline}
        showProgress={showProgress}
        showDescription={showDescription}
        isPublic={isPublic}
        rejected={rejected}
        duration={duration}
        tagsInfo={tagsInfo}
        item={item}
      />
    );
  }
}

Course.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

Course.defaultProps = {
  item: {},
};

const mapStateToProps = (state, props) => {
  const item = props.item;
  return {
    progress: state.trackerProgress[item.iid],
  };
};

export default connect(mapStateToProps)(withRouter(withUserInfo(Course)));
