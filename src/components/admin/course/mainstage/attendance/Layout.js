import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { DefinedUrlParams } from 'routes/links/common';
import { t1 } from 'translate';
import Loading from 'components/common/loading';
import get from 'lodash.get';
import Permission from 'components/common/permission/Permission';
import Results from './Results';
import FormFilters from './FormFilters';
import { CourseActions } from 'configs/constants/permission';
import { abacRoleTypes } from 'configs/constants';
import schemaNumberStudent from 'components/admin/course/schema/number-student/schema-form';
import NodeNew from 'components/admin/node/new';
import Widget from 'components/common/Widget';

class Layout extends Component {
  componentWillMount() {
    this.fetchNode();
  }

  getParamsForCheckPermission = (props) => {
    const { node } = props;
    return {
      actions: CourseActions,
      resourceIids: node && [node.iid],
      type: abacRoleTypes.COURSE,
    };
  };
  fetchNode = () => {
    const { node, courseIid, session, sessionIid, dispatch } = this.props;
    if (!node && courseIid) {
      dispatch(
        actions.fetchNode({ iid: courseIid, ntype: 'course', depth: 1 }),
      );
    }
    if (!session && sessionIid) {
      dispatch(
        actions.fetchNode({ iid: sessionIid, ntype: 'session', depth: 1 }),
      );
    }
  };

  handleShowDialogNumberStudent = () => {
    const { dispatch, session } = this.props;

    const contentDialog = (
      <div>
        <div>
          {t1(
            'used_by_inspector_to_just_enter_the_number_of_students_in_class_he_can_count',
          )}
          {t1(
            'this_is_to_verify_against_the_attendance_markings_of_the_teacher',
          )}
        </div>
        <NodeNew
          mode="mode"
          step="attended_number_student"
          ntype="session"
          schema={schemaNumberStudent}
          params={session}
        />
      </div>
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('enter_number_student'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  renderResultComponent(items, props) {
    const { node, sessionIid, hasPermission, permissions } = props;
    return (
      <Results
        items={items}
        node={node}
        sessionIid={sessionIid}
        hasPermission={hasPermission}
        permissions={permissions}
      />
    );
  }

  render() {
    const {
      node,
      session,
      sessionIid,
      hasPermission,
      permissions,
    } = this.props;
    if (!node || !session) {
      return <Loading blackLoadingIcon />;
    }

    const hiddenFields = {
      course_iid: node.iid,
      get_feedback: 1,
      session_iid: sessionIid,
    };

    const hasPermUpdateNumberStudent = hasPermission(
      CourseActions.COURSE_ACTION_UPDATE_STUDENT_ATTENDANCE_NUMBER,
      node && node.iid,
      permissions,
    );

    return (
      <div>
        <div id="teacher-search-form">
          <h1>{t1('session_attendance')}</h1>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <Widget title={t1('class_session_info')}>
                  <div>
                    <p>
                      {t1('session_class')}: {node && node.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      {t1('session')}: {session && session.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      {t1('room')}: {get(session, 'room.name')}
                    </p>
                  </div>
                </Widget>
              </div>
              <div className="col-md-9">
                <SearchWrapper
                  formid="session_search_user"
                  showResult
                  hiddenFields={hiddenFields}
                  {...this.props}
                  renderResultsComponent={this.renderResultComponent}
                  showQueryField={false}
                >
                  <FormFilters
                    {...this.props}
                    handleShowDialogNumberStudent={
                      this.handleShowDialogNumberStudent
                    }
                    hasPermUpdateNumberStudent={hasPermUpdateNumberStudent}
                  />
                </SearchWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let sessionIid = props.sessionIid || props.session_iid || null;
  let courseIid = props.ciid;
  const { match } = props;

  if (!sessionIid) {
    sessionIid =
      match && match.params && match.params[DefinedUrlParams.SESION_IID];
  }

  if (!courseIid) {
    courseIid =
      match && match.params && match.params[DefinedUrlParams.COURSE_IID];
  }
  return {
    courseIid,
    sessionIid,
    session: state.tree[sessionIid],
    node: props.node || state.tree[courseIid],
  };
}

const refreshPermission = (props, nextProps) => {
  return !get(props, 'node.iid') && get(nextProps, 'node.iid');
};
export default connect(mapStateToProps)(Permission(Layout, refreshPermission));
