/* eslint-disable no-undef,react/prop-types,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Step, StepContent, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate/index';
import actions from 'actions/node/creators';
import {
  approvalStatus,
  REVIEW_SYLLABUS_ABSTRACT_CODE,
} from 'configs/constants/index';
import apiUrls from 'api-endpoints/index';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { change } from 'redux-form';
import get from 'lodash.get';
import Request from 'common/network/http/Request';
import { SyllabusActions } from 'configs/constants/permission';
import NodeNew from 'components/admin/node/new/index';
import schema from './schema/CommentSchema';
import inviteReviewSchema from './schema/InviteReviewSchema';

class ApprovalStepper1 extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  };

  componentWillMount() {
    const { approvalFlow, node } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    const index = approvalFlowListKey.indexOf(node.status);

    if (index !== -1) {
      this.setState({
        stepIndex: index + 1,
        finished: index > approvalFlowListKey.length + 1,
      });
    }
  }

  inviteReview = (inviteApprover = false) => {
    const { node } = this.props;
    const hiddenFields = {
      resourceIids: [node.iid],
      ntype: node.ntype,
      abstractCode: REVIEW_SYLLABUS_ABSTRACT_CODE,
      user_organizations: node.organizations || [],
    };

    let title = 'invite_reviewer';
    hiddenFields.status = 'review';
    hiddenFields.actions = [];

    if (inviteApprover) {
      title = 'invite_approver';
      hiddenFields.status = 'approve';
      hiddenFields.actions = [SyllabusActions.SYLLABUS_ACTION_APPROVAL];
    }

    const formid = title;
    const contentDialog = (
      <NodeNew
        title={t1(title)}
        submitLabels={t1(title)}
        resetForm={false}
        schema={inviteReviewSchema}
        mode="update"
        step="status"
        formid={formid}
        alternativeApi={aApiUrls.set_abac_role_for_user_from_abstract_code}
        hiddenFields={hiddenFields}
        requestSuccessful={(data) => {
          if (data.success) {
            this.props.dispatch(change(formid, 'users', []));
          }
          const message = data.success
            ? t1('invite_successfully')
            : t1('invite_failed');

          this.props.dispatch(
            actions.snackbar(data.success, data.message || message),
          );

          this.refresh(node);
        }}
      />
    );

    const optionsProperties = {
      handleClose: true,
      title: t1(title),
      modal: true,
    };

    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  pushToParentOrganization = () => {
    const { node, parentDepartmentIids, dispatch } = this.props;
    const params = {
      id: node.id,
      organizations: [...node.organizations, ...parentDepartmentIids],
      _sand_step: 'update_organizations',
    };

    Request.post(apiUrls.syllabus_update, params).then((res) => {
      if (res.success) {
        this.refresh(node);

        dispatch(
          actions.snackbar(
            true,
            t1('push_this_syllabus_to_parent_organization_successful'),
          ),
        );
      } else {
        dispatch(
          actions.snackbar(
            true,
            t1('push_this_syllabus_to_parent_organization_failed'),
          ),
        );
      }
    });
  };

  approvalOrRejectDialog = (action) => {
    const { stepIndex } = this.state;
    const { approvalFlow, node } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);
    const hiddenFields = {
      id: node.id,
      ntype: node.ntype,
      status: approvalFlow[approvalFlowListKey[stepIndex - 1]][action],
      action,
    };

    const contentDialog = (
      <NodeNew
        title={t1(action)}
        submitLabels={t1(action)}
        resetForm={false}
        schema={schema}
        mode="update"
        step="status"
        formid="new_update_status"
        alternativeApi={apiUrls.syllabus_update}
        hiddenFields={hiddenFields}
        requestSuccessful={(data) => {
          const index = approvalFlowListKey.indexOf(data.result.status);
          if (index !== -1) {
            this.setState({
              stepIndex: index + 1,
              finished: index > approvalFlowListKey.length + 1,
            });
          }
          const message = data.success
            ? t1('invite_to_review_successfully')
            : t1('invite_to_review_failed');

          this.props.dispatch(
            actions.snackbar(data.success, data.message || message),
          );

          this.refresh(node);
        }}
      />
    );

    const optionsProperties = {
      handleClose: true,

      title: t1(action),
      modal: true,
    };

    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  refresh(node) {
    this.props.dispatch(actions.fetchNode({ ...node, depth: -1 }));
  }

  hasPermission = (action, resourceIid) => {
    const { permissions } = this.props;

    return get(permissions, `${resourceIid}.${action}`);
  };

  renderStepActions() {
    const { node, parentDepartmentIids, orgIids } = this.props;

    let pushed = true;
    // Check pushed parent company
    if (parentDepartmentIids.length > 0) {
      parentDepartmentIids.forEach((parentDepartmentIid) => {
        if (node.organizations.indexOf(parentDepartmentIid) === -1) {
          pushed = false;
        }
      });
    }

    let enableActionsWithSyllabus = true;
    if (pushed) {
      orgIids.forEach((orgIid) => {
        if (
          node.organizations_pushed &&
          node.organizations_pushed.indexOf(orgIid) === -1
        ) {
          enableActionsWithSyllabus = false;
        }
      });
    }

    switch (node.status) {
      case approvalStatus.QUEUED:
        return (
          <div style={{ margin: '12px 0' }}>
            <RaisedButton
              label={t1('approval_done_editing')}
              disableTouchRipple
              disableFocusRipple
              disabled={
                !enableActionsWithSyllabus &&
                !this.hasPermission(
                  SyllabusActions.SYLLABUS_ACTION_APPROVAL_DONE_EDITING,
                  node.iid,
                )
              }
              primary
              onClick={() => this.approvalOrRejectDialog('approval')}
              style={{ marginRight: 12 }}
            />
          </div>
        );
      case approvalStatus.DONE_EDITING:
        return (
          <div>
            <div className="row" style={{ padding: '12px' }}>
              <RaisedButton
                label={t1('approve')}
                disableTouchRipple
                disableFocusRipple
                disabled={
                  !enableActionsWithSyllabus ||
                  !this.hasPermission(
                    SyllabusActions.SYLLABUS_ACTION_APPROVAL,
                    node.iid,
                  )
                }
                primary
                onClick={() => this.approvalOrRejectDialog('approval')}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                secondary
                label={t1('reject')}
                disableTouchRipple
                disableFocusRipple
                disabled={
                  !enableActionsWithSyllabus ||
                  !this.hasPermission(
                    SyllabusActions.SYLLABUS_ACTION_APPROVAL_QUEUED,
                    node.iid,
                  )
                }
                variant="outlined"
                color="secondary"
                onClick={() => this.approvalOrRejectDialog('reject')}
                style={{ border: '1px solid #E89191', lineHeight: '20px' }}
              />
            </div>
            <div className="row" style={{ padding: '10px' }}>
              <RaisedButton
                label={t1('invite_reviewer')}
                disableTouchRipple
                disableFocusRipple
                disabled={
                  !enableActionsWithSyllabus ||
                  !this.hasPermission(
                    SyllabusActions.SYLLABUS_ACTION_INVITE_REVIEW,
                    node.iid,
                  )
                }
                primary
                onClick={() => this.inviteReview()}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={t1('invite_approver')}
                disableTouchRipple
                disableFocusRipple
                disabled={
                  !enableActionsWithSyllabus ||
                  !this.hasPermission(
                    SyllabusActions.SYLLABUS_ACTION_INVITE_REVIEW,
                    node.iid,
                  )
                }
                primary
                onClick={() => this.inviteReview(true)}
                style={{ marginRight: 12 }}
              />
            </div>
            <div className="row" style={{ padding: '10px' }}>
              {parentDepartmentIids && parentDepartmentIids.length > 0 && (
                <RaisedButton
                  label={t1('push_to_parent_organizations')}
                  disableTouchRipple
                  disableFocusRipple
                  disabled={
                    pushed ||
                    !this.hasPermission(
                      SyllabusActions.SYLLABUS_ACTION_PUSH_TO_PARENT_ORGANIZATIONS,
                      node.iid,
                    )
                  }
                  primary
                  onClick={() => this.pushToParentOrganization()}
                  style={{ marginRight: 12 }}
                />
              )}
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }

  render() {
    const { stepIndex } = this.state;
    const { approvalFlow, node } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    return (
      <div style={{ with: '100%', margin: 'auto', background: 'white' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          {approvalFlowListKey &&
            approvalFlowListKey.map((approvalFlowKey) => (
              <Step key={approvalFlowKey}>
                <StepLabel>{t1(`${approvalFlowKey}_status`)}</StepLabel>
                <StepContent>{this.renderStepActions()}</StepContent>
              </Step>
            ))}
        </Stepper>
        {node.status === approvalStatus.APPROVED && (
          <div style={{ paddingLeft: '20px' }}>
            <FlatButton
              secondary
              label={t1('reject')}
              disableTouchRipple
              disableFocusRipple
              disabled={
                !this.hasPermission(
                  SyllabusActions.SYLLABUS_ACTION_APPROVAL_DONE_EDITING,
                  node.iid,
                )
              }
              variant="outlined"
              color="secondary"
              onClick={() => this.approvalOrRejectDialog('reject')}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ApprovalStepper1;
