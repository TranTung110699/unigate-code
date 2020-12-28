import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
} from 'material-ui/Stepper';
import { connect } from 'react-redux';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import routes from 'routes';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import fetchData from 'components/common/fetchData';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import {
  getOrderOfStatusesInEnrolmentPlanWorkflow,
  isEnrolmentPlanInStatusThatCanBeApproved,
  isEnrolmentPlanInStatusThatCanBeUnApproved,
  isEnrolmentPlanInStatusThatCanTurnIntoReadyToExecute,
  isEnrolmentPlanStopped,
} from 'components/admin/enrolment-plan/common';
import { pushToSet, remove } from 'common/utils/Array';
import Icon from 'components/common/Icon';
import ReadyToExecuteButton from 'components/admin/enrolment-plan/common/ready-to-execute/Button';
import StopButton from 'components/admin/enrolment-plan/common/stop/Button';
import ExtendDeadline from 'components/admin/enrolment-plan/common/extend-deadline/Button';
import ApproveOrRejectButton from 'components/admin/enrolment-plan/common/approve-or-reject/Button';
import StopIcon from 'material-ui/svg-icons/navigation/close';
import { getNodeSelector } from 'components/admin/node/utils';
import { createSelector } from 'reselect';
import isEqual from 'lodash.isequal';

const getStepInWorkflowThatEnrolmentPlanHasToPassToHaveStatus = (status) => {
  const orderOfStatusesInEnrolmentPlanWorkflow = getOrderOfStatusesInEnrolmentPlanWorkflow();
  return (orderOfStatusesInEnrolmentPlanWorkflow || []).indexOf(status);
};

const isStepInEnrolmentPlanWorkflowPassed = (step, enrolmentPlan) =>
  step <=
  getStepInWorkflowThatEnrolmentPlanHasToPassToHaveStatus(
    lodashGet(enrolmentPlan, 'status'),
  );

const getCurrentStepInEnrolmentPlanWorkflow = (enrolmentPlan) =>
  getStepInWorkflowThatEnrolmentPlanHasToPassToHaveStatus(
    lodashGet(enrolmentPlan, 'status'),
  ) + 1;

const isStepInEnrolmentPlanWorkflowAccessible = (step, enrolmentPlan) =>
  isStepInEnrolmentPlanWorkflowPassed(step, enrolmentPlan) ||
  getCurrentStepInEnrolmentPlanWorkflow(enrolmentPlan) === step;

class EpWorkflow extends React.PureComponent {
  state = {
    activeSteps: [],
  };

  handleStepButtonClick = (index) => {
    this.setState((state) => {
      const activeSteps = state.activeSteps;
      if (activeSteps.includes(index)) {
        return { activeSteps: remove(state.activeSteps, index) };
      }
      return { activeSteps: pushToSet(state.activeSteps, index) };
    });
  };

  render() {
    const { className, node, statistics } = this.props;
    const componentClassName = `${className || ''}`;
    let statusesToShow = getOrderOfStatusesInEnrolmentPlanWorkflow();
    if (!isEnrolmentPlanStopped(node)) {
      statusesToShow = remove(statusesToShow, enrolmentPlanStatuses.STOPPED);
    }

    const members = lodashGet(node, 'number_of_members') || 0;
    const nrOfCredits = lodashGet(statistics, 'number_of_credits') || 0;

    return (
      <div className="p-20">
        <Stepper orientation="vertical">
          {statusesToShow.map((status, step) => {
            const mapFromStatusToStepContent = {
              [enrolmentPlanStatuses.CREATED]: {
                title: t1('enrolment_plan_created'),
              },
              [enrolmentPlanStatuses.APPROVED]: {
                title: t1('setup_learners_and_learning_materials'),
                content: (
                  <React.Fragment>
                    <p className="m-t-20">
                      <Link
                        to={routes.url('node_edit', {
                          ntype: 'enrolment_plan',
                          iid: lodashGet(node, 'iid'),
                          stepNodes: [
                            {
                              ntype: 'program',
                              iid: lodashGet(node, 'program_iid'),
                            },
                          ],
                        })}
                      >
                        1) {t1('credit_syllabuses')}:{' '}
                        {nrOfCredits > 0 ? (
                          nrOfCredits
                        ) : (
                          <span style={{ color: 'red' }}>
                            {t1('no_materials')}
                          </span>
                        )}{' '}
                        <Icon icon="edit" title={t1('click_to_setup')} />
                      </Link>
                    </p>
                    <p>
                      <Link
                        to={routes.url('node_edit', {
                          ntype: 'enrolment_plan',
                          iid: lodashGet(node, 'iid'),
                          step: 'members',
                        })}
                      >
                        2) {t1('members')}:{' '}
                        {members > 0 ? (
                          members
                        ) : (
                          <span style={{ color: 'red' }}>
                            {t1('no_members')}
                          </span>
                        )}{' '}
                        <Icon icon="edit" title={t1('click_to_setup')} />
                      </Link>
                    </p>
                    {(isEnrolmentPlanInStatusThatCanBeApproved(node) ||
                      isEnrolmentPlanInStatusThatCanBeUnApproved(node)) && (
                      <ApproveOrRejectButton node={node} />
                    )}
                  </React.Fragment>
                ),
              },
              [enrolmentPlanStatuses.READY_TO_EXECUTE]: {
                title: t1('execute_enrolment_plan'),
                content: isEnrolmentPlanInStatusThatCanTurnIntoReadyToExecute(
                  node,
                ) && (
                  <div>
                    <div>{t1('your_enrolment_plan_is_ready_to_execute')}</div>
                    <div>
                      {t1(
                        'when_you_click_the_button_below_the_enrolment_plan_will_be_active_and_learners_can_start_learning',
                      )}
                      .
                    </div>

                    <br />
                    <ReadyToExecuteButton node={node} />
                  </div>
                ),
              },
              [enrolmentPlanStatuses.EXECUTED]: {
                title: `${t1('executed_and_running')}`,
                active: [
                  enrolmentPlanStatuses.EXECUTED,
                  enrolmentPlanStatuses.READY_TO_EXECUTE,
                ].includes(lodashGet(node, 'status')),
                content: (() => {
                  switch (lodashGet(node, 'status')) {
                    case enrolmentPlanStatuses.EXECUTED:
                      return (
                        <div>
                          <br />
                          <ExtendDeadline node={node} />
                          <br />
                          <StopButton node={node} />
                        </div>
                      );
                    case enrolmentPlanStatuses.READY_TO_EXECUTE:
                      return `${t1('enrolment_plan_in_execute_queue')}. ${
                        lodashGet(node, 'training_plan_iid')
                          ? t1(
                              'it_will_be_executed_when_all_enrolment_plans_of_training_plan_is_ready',
                            )
                          : t1('it_will_be_executed_shortly')
                      }.`;
                    default:
                      return null;
                  }
                })(),
              },
              [enrolmentPlanStatuses.STOPPED]: {
                title: t1('stopped'),
                icon: <StopIcon />,
                color: 'rgb(244, 67, 54)',
              },
            };

            const {
              title,
              content,
              icon,
              color: statusColor,
              active: statusActive,
            } = mapFromStatusToStepContent[status];

            const active =
              this.state.activeSteps.includes(step) ||
              getCurrentStepInEnrolmentPlanWorkflow(node) === step ||
              statusActive;

            const disabled = !isStepInEnrolmentPlanWorkflowAccessible(
              step,
              node,
            );

            const completed = isStepInEnrolmentPlanWorkflowPassed(step, node);

            const color = disabled ? 'grey' : statusColor || 'black';

            return (
              <Step
                style={{ textAlign: 'left', color, fontSize: 15 }}
                active={active}
                completed={completed}
                disabled={disabled}
              >
                {content ||
                getCurrentStepInEnrolmentPlanWorkflow(node) !== step ? (
                  <StepButton
                    style={{
                      textAlign: 'left',
                      ...(statusColor ? { color: statusColor } : {}),
                    }}
                    onClick={() => this.handleStepButtonClick(step)}
                    {...(icon ? { icon } : {})}
                  >
                    <span style={{ color }}>{title}</span>
                  </StepButton>
                ) : (
                  <StepLabel
                    style={{
                      textAlign: 'left',
                      ...(statusColor ? { color: statusColor } : {}),
                    }}
                    {...(icon ? { icon } : {})}
                  >
                    <span style={{ color }}>{title}</span>
                  </StepLabel>
                )}
                <StepContent>{content}</StepContent>
              </Step>
            );
          })}
          }
        </Stepper>
      </div>
    );
  }
}

EpWorkflow.propTypes = {
  className: PropTypes.string,
};

EpWorkflow.defaultProps = {
  className: '',
};

const mapStateToProps = createSelector(
  getNodeSelector,
  (state, props) => props.node,
  (getNode, node) => ({
    program: getNode(lodashGet(node, 'program_iid')),
  }),
);

const fetchDataConfig = (props) => ({
  fetchCondition: lodashGet(props, 'node.iid'),
  refetchCondition: (prevProps) =>
    !isEqual(lodashGet(props, 'node'), lodashGet(prevProps, 'node')) ||
    !isEqual(lodashGet(props, 'program'), lodashGet(prevProps, 'program')),
  baseUrl: epApiUrls.get_enrolment_plan_statistics,
  params: {
    enrolment_plan_iid: lodashGet(props, 'node.iid'),
  },
  keyState: `enrolment_plan_statistics_${lodashGet(props, 'node.iid')}`,
  propKey: 'statistics',
});

export default connect(mapStateToProps)(fetchData(fetchDataConfig)(EpWorkflow));
