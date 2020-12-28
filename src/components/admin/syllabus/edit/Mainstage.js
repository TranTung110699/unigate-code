/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NodeShape } from 'configs/constants';
import AdvancedSettings from 'components/admin/node/edit/settings/AdvancedSettings';
import NodeNew from 'components/admin/node/new/';
// import Collaborators from 'components/admin/collaborators/index';
import Skills from 'components/admin/node/edit/EditSkill';
import EditAvatar from 'components/admin/node/edit/EditAvatar';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';
import EditChildren from './curriculum';
import SessionManager from 'components/admin/session/search/Layout';
import {
  hasScoreAndPassing,
  hasSequential,
} from 'components/admin/node/configs';
import { isNodeFreeze } from 'components/admin/node/utils';
import { t1 } from 'translate';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import Staff from 'components/admin/syllabus/staff-and-roles/staff/Layout';
// import ApproveHistory from 'components/admin/syllabus/edit/approval-flow/approved-history/Layout';
import SearchPrograms from 'components/admin/path/search/Layout';
import Roles from 'components/admin/syllabus/staff-and-roles/roles/Layout';
import get from 'lodash.get';
import AbstractRoles from 'components/admin/organization/edit/EditContainer';
import ScoreAndPassing from './score-and-passing';
import Papers from './papers';
import Dashboard from './dashboard';
import Courses from './courses';
import Survey from './survey';
import Comments from './comments';
import EditRubric from './rubric';
import Translate from './translate';
import ApprovedFlow from './approval/Layout';
import Loading from '../../../common/loading';
import BasicInformationNavMenu from '../../node/edit/basic-information-nav-menu';
import { SyllabusActions } from 'configs/constants/permission';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import QuestionsOfVideo from 'components/admin/video/questions-of-video';
import PreAddItem from './add-item';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Alert from 'antd/lib/alert';

// import EditChildren from 'components/admin/node/edit/metadata-v2/MetadataContainer';

class SyllabusEditMainstage extends Component {
  divStyle = { zIndex: 1001, top: 80 };

  searchProgramsApplied = () => {
    const hiddenFields = {
      ntype: 'path',
      type: 'program',
      credit_syllabus: get(this.props, 'node.iid'),
    };

    return <SearchPrograms hiddenFields={hiddenFields} />;
  };

  formatNodeToEdit = (node) => {
    const { drm_vid } = node;
    if (!!drm_vid && !!get(drm_vid, 'url')) {
      node.drm_vid = get(drm_vid, 'url');
      return node;
    }

    return node;
  };

  render() {
    const {
      action,
      node,
      syllabus,
      subAction,
      location,
      hasPermission,
      permissions,
      isSIS,
      isFeatureEnabled,
      appliedNewVersion,
      itemAncestors,
    } = this.props;

    const hasPermissionUpdate =
      hasPermission &&
      hasPermission(
        SyllabusActions.SYLLABUS_ACTION_UPDATE,
        syllabus && syllabus.iid,
        permissions,
      );

    // currently only check perms for SIS
    const readOnly = isNodeFreeze(node) || (isSIS && !hasPermissionUpdate);
    const editSequential = hasSequential(node && node.ntype, action || '_');
    const showMenuRight =
      ![
        'dashboard',
        'courses',
        'staff',
        'roles',
        'rubric',
        'programs',
        'survey',
        'approval',
        'comments',
        'sessions',
      ].includes(action) && action;

    // if (!action) {
    //   if (isScormSyllabus(node)) {
    //     return (
    //       <Redirect
    //         to={routes.url('edit_item', {
    //           base: '',
    //           item: node,
    //           mode: 'edit',
    //         })}
    //       />
    //     );
    //   }
    //
    //   return (
    //     <Redirect
    //       to={routes.url('edit_item', {
    //         base: '',
    //         item: node,
    //         mode: 'dashboard',
    //       })}
    //     />
    //   );
    // }

    // // pass syllabus iid along for permission checking at the server side
    // const syllabus =
    //   ancestors &&
    //   ancestors.length &&
    //   ancestors.find((item) => item && item.ntype === 'syllabus');

    const hiddenFields =
      syllabus && syllabus.iid ? { syllabus: syllabus.iid } : null;

    const syllabusIid = syllabus && syllabus.iid;

    // node is the item we're editing
    if (!node || !node.iid) return <Loading />;

    let content = (
      <div>
        {(action === 'dashboard' || !action) && (
          <Dashboard node={node} syllabus={syllabus} {...this.props} />
        )}
        {action === 'edit' && (
          <div>
            <NodeNew
              key={node.iid}
              schema={getLearningItemFormSchema(node.ntype)}
              hiddenFields={hiddenFields}
              readOnly={readOnly}
              // message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
              ntype={node.ntype}
              node={this.formatNodeToEdit(node)}
              mode="edit"
              step={node.type === 'credit' ? 'credit' : ''}
            />
            {node && node.ntype === 'syllabus' ? (
              <div>
                <h1>{t1('edit_syllabus_avatar')}</h1>
                <div
                  className={`whitebox ${
                    isFeatureEnabled(features.NEW_UI_JULY_2019)
                      ? 'border-round'
                      : ''
                  }`}
                >
                  <EditAvatar node={node} readOnly={readOnly} />
                </div>
              </div>
            ) : null}
          </div>
        )}
        {action === 'advanced-settings' && (
          <div>
            <AdvancedSettings node={node} readOnly={readOnly} {...this.props} />
          </div>
        )}

        {action === 'rubric' && (
          <div>
            <EditRubric
              node={node}
              syllabus={syllabus}
              nonPaddingLeft={isFeatureEnabled(features.NEW_UI_JULY_2019)}
            />
          </div>
        )}

        {/*
              {action === 'legacy' && (
                <div className="whitebox">
                  <NodeNew
                    readOnly={readOnly}
                    message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
                    ntype={node.ntype}
                    node={node}
                    mode="edit"
                    step="legacy"
                  />
                </div>
              )}
        {action === 'avatar' && <EditAvatar node={node} readOnly={readOnly} />}
                 */}
        {action === 'programs' && this.searchProgramsApplied()}
        {editSequential && (
          <div>
            <Metadata node={node} syllabusIid={syllabusIid} action={action} />
          </div>
        )}
        {action === 'children' && appliedNewVersion && (
          <EditChildren
            node={node}
            syllabus={syllabus}
            fieldEdit="children"
            readOnly={readOnly}
            action={action}
            itemAncestors={itemAncestors}
          />
        )}
        {action === 'children' && !appliedNewVersion && (
          <Metadata node={node} syllabusIid={syllabusIid} action={action} />
        )}
        {action === 'staff' && (
          <Staff
            node={node}
            action={action}
            hasPermission={hasPermission}
            permissions={permissions}
          />
        )}
        {/*
          {action === 'approved-history' && <ApproveHistory node={node} />}
           */}
        {action === 'approval' && (
          <ApprovedFlow node={node} location={location} />
        )}
        {action === 'roles' && (
          <Roles
            node={node}
            action={action}
            subAction={subAction}
            hasPermission={hasPermission}
            permissions={permissions}
          />
        )}
        {action === 'skills' && (
          <div>
            <Skills node={node} syllabus={syllabus} />
          </div>
        )}
        {action === 'sessions' && <SessionManager node={node} />}
        {action === 'papers' && (
          <Papers
            location={this.props.location}
            dispatch={this.props.dispatch}
            match={this.props.match}
            node={node}
          />
        )}
        {action === 'courses' && (
          <Courses
            location={this.props.location}
            dispatch={this.props.dispatch}
            match={this.props.match}
            node={node}
            hasPermission={hasPermission}
            permissions={permissions}
          />
        )}
        {action === 'translate' && (
          <Translate
            location={this.props.location}
            dispatch={this.props.dispatch}
            match={this.props.match}
            node={node}
          />
        )}
        {action === 'add-item' && (
          <PreAddItem
            node={node}
            readOnly={readOnly}
            syllabus={syllabus}
            fieldEdit="children"
          />
        )}
        {action === 'score-passing' && hasScoreAndPassing(node) && (
          <ScoreAndPassing readOnly={readOnly} node={node} />
        )}
        {action === 'survey' && <Survey node={node} />}
        {action === 'comments' && <Comments syllabus={node} {...this.props} />}
        {action === 'abstract-roles' && (
          <AbstractRoles {...this.props} action={action} />
        )}
        {action === 'questions-of-video' && (
          <QuestionsOfVideo {...this.props} node={node} action={action} />
        )}
      </div>
    );

    // const leftColWidth = action === 'children' ? 'col-md-10' : 'col-md-12';
    const leftColWidth = 'col-md-12';
    const shouldShowBasicInfoNav =
      [
        'edit',
        'skills',
        'avatar',
        // 'children',
        'advanced-settings',
        'questions-of-video',
      ].includes(action) ||
      (['children', 'add-item'].includes(action) && node.ntype == 'exercise');

    if (showMenuRight)
      content = (
        <div className="mainstage">
          <div
            className={
              isFeatureEnabled(features.NEW_UI_JULY_2019)
                ? ''
                : 'container-fluid'
            }
          >
            <div className="row">
              <div className={`${leftColWidth}`}>
                {node.freeze && action !== 'abstract-roles' ? (
                  <Alert
                    message={t1(
                      'this_item_is_currently_frozen_and_cannot_be_edited',
                    )}
                    type="error"
                    showIcon
                    className="sticky-card m-b-10"
                    style={this.divStyle}
                  />
                ) : null}

                {shouldShowBasicInfoNav ? (
                  <BasicInformationNavMenu {...this.props} content={content} />
                ) : (
                  content
                )}
              </div>
              {/*
              {action === 'children' ? (
                <div className="col-md-2">
                  <EditControls {...this.props} />
                </div>
              ) : null}

                 */}
            </div>
          </div>
        </div>
      );

    if (
      (node.ntype == 'syllabus' && action != 'add-item') ||
      action == 'sequential'
    ) {
      return content;
    } else {
      const syllabusLayout = (
        <EditChildren
          columns={[]}
          node={syllabus}
          syllabus={syllabus}
          fieldEdit="children"
          readOnly={readOnly}
          action={action}
          isCompact={true}
          itemAncestors={itemAncestors}
        />
      );

      // return (
      //   <Split
      //     sizes={[25, 75]}
      //     minSize={100}
      //     expandToMin={false}
      //     gutterSize={10}
      //     gutterAlign="center"
      //     snapOffset={30}
      //     dragInterval={1}
      //     direction="horizontal"
      //     cursor="col-resize"
      //       >
      //     <div>
      //       {syllabusLayout}
      //     </div>
      //     <div>
      //       {content}
      //     </div>
      //   </Split>
      // );

      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 sticky-card" style={{ top: '90px' }}>
              {syllabusLayout}
            </div>
            <div className="col-md-8">{content}</div>
          </div>
        </div>
      );
    }
  }
}

SyllabusEditMainstage.propTypes = {
  showEditForm: PropTypes.bool,
  node: PropTypes.shape(NodeShape),
};

function mapStateToProps(state, props) {
  const ntypeAllows = get(
    state,
    'domainInfo.conf.ntypes_applied_edit_metadata_new_version',
    ['exercise', 'syllabus'],
  );
  return {
    appliedNewVersion:
      Array.isArray(ntypeAllows) &&
      ntypeAllows.includes(get(props, 'node.ntype')),
  };
}

export default connect(mapStateToProps)(
  withFeatureFlags()(withSchoolConfigs(SyllabusEditMainstage)),
);
