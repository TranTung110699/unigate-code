/* eslint-disable object-shorthand,react/prop-types */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import routes from 'routes';
import { withRouter } from 'react-router-dom';
import { courseLearningTypes } from 'configs/constants';
import get from 'lodash.get';
import courseSchema from '../schema/form';
import { CourseActions } from 'configs/constants/permission';

class Form extends Component {
  constructor(props) {
    super(props);
    this.requestSuccessful = this.requestSuccessful.bind(this);
    this.state = {
      showAllowedLateDuration: true,
    };
  }

  requestSuccessful(post) {
    const { history, mode, step, location } = this.props;
    if (['offline_exam', 'exam_shift'].includes(step) && mode === 'new') {
      const url = location && location.pathname.replace('/new', '');
      history.push(url);
      return;
    }

    if (mode === 'new') {
      const url = routes.url('node_edit', {
        ...post.result,
        ntype: 'course',
        step: 'dashboard',
      });
      history.push(url);
    }
  }

  hasPermissionUpdate = () => {
    const { step, node, hasPermission, permissions, mode, isSIS } = this.props;
    if (mode === 'edit') {
      if (!isSIS) {
        // TODO hotfix chỉ check quyen cho UMS
        return true;
      }

      return (
        hasPermission &&
        hasPermission(
          CourseActions.COURSE_ACTION_UPDATE,
          node && node.iid,
          permissions,
        )
      );
    }
    return true;
  };

  render() {
    const {
      searchFormId,
      formid,
      mode,
      step,
      node,
      maxNumberOfExamResit,
      contestIid,
      allowFeedback,
      allowComment,
      requestSuccessful,
      dialogKey,
    } = this.props;

    let { hiddenFields } = this.props;

    let alternativeApi = mode === 'edit' ? '/course/update' : '/course/new';

    hiddenFields = hiddenFields || {};

    if (contestIid) {
      if (mode === 'new') hiddenFields.contest_iid = contestIid;
      alternativeApi =
        mode === 'edit' ? '/exam-shift/api/update' : '/exam-shift/api/new';
    }

    hiddenFields = Object.assign(
      {
        maxNumberOfExamResit: maxNumberOfExamResit,
      },
      hiddenFields,
    );

    if (step === 'offline_exam') {
      hiddenFields = {
        ...hiddenFields,
        learning_type: courseLearningTypes.ILT,
      };
    }

    const hasPermissionUpdate = this.hasPermissionUpdate();

    return (
      <NodeNew
        ntype="course"
        schema={courseSchema}
        formid={formid}
        mode={mode}
        step={step}
        node={node}
        dialogKey={dialogKey}
        closeModal={!!dialogKey}
        hiddenFields={hiddenFields}
        searchFormId={searchFormId || 'course_search'}
        requestSuccessful={requestSuccessful || this.requestSuccessful}
        allowFeedback={allowFeedback}
        allowComment={allowComment}
        readOnly={!hasPermissionUpdate}
        alternativeApi={alternativeApi}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const conf = confSelector(state);
  const maxNumberOfExamResit = conf.max_number_of_exam_resits;

  return {
    maxNumberOfExamResit: maxNumberOfExamResit || 1,
    allowFeedback: get(state, 'domainInfo.conf.feedback_for_the_course'),
    allowComment: get(state, 'domainInfo.conf.allow_comment_for_course'),
  };
};

export default withRouter(connect(mapStateToProps)(Form));
