/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { Step, StepContent, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate/index';
import store from 'store/index';
import actions from 'actions/node/creators';
import NodeNew from '../../../node/new/index';
import schema from './schema/CommentSchema';

class ApprovalStepper extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  };

  componentWillMount() {
    const { approvalFlow, node } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    const index = approvalFlowListKey.indexOf(node.status);

    if (index !== -1) {
      this.setState({ stepIndex: index });
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    const { approvalFlow } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= approvalFlowListKey.length,
    });
  };

  approvalOrRejectDialog = (action) => {
    const { stepIndex } = this.state;
    const { approvalFlow, node } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);
    const hiddenFields = {
      iid: node.iid,
      id: node.id,
      ntype: node.ntype,
      status: approvalFlow[approvalFlowListKey[stepIndex]][action],
      action,
    };

    const contentDialog = (
      <NodeNew
        title={t1('approval')}
        submitLabels={t1(action)}
        resetForm={false}
        schema={schema}
        mode="update"
        step="status"
        formid="new_update_status"
        alternativeApi="syllabus/update"
        hiddenFields={hiddenFields}
        requestSuccessful={(data) => {
          const index = approvalFlowListKey.indexOf(data.result.status);
          if (index !== -1) {
            this.setState({ stepIndex: index });
          }

          this.props.dispatch(actions.fetchNode({ ...node, depth: -1 }));
        }}
      />
    );

    const optionsProperties = {
      handleClose: true,
      title: t1(action),
      modal: true,
    };

    store.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;

    const { approvalFlow } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={t1('approve')}
          disableTouchRipple
          disableFocusRipple
          disabled={stepIndex === approvalFlowListKey.length - 1}
          primary
          onClick={() => this.approvalOrRejectDialog('approval')}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            secondary
            label={t1('reject')}
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onClick={() => this.approvalOrRejectDialog('reject')}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;
    const { approvalFlow } = this.props;
    const approvalFlowListKey = approvalFlow && Object.keys(approvalFlow);

    return (
      <div style={{ with: '100%', margin: 'auto', background: 'white' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          {approvalFlowListKey &&
            approvalFlowListKey.map((approvalFlowKey, index) => (
              <Step>
                <StepLabel>{t1(approvalFlowKey)}</StepLabel>
                <StepContent>
                  <p>{t1(approvalFlowKey)}</p>
                  {this.renderStepActions(index)}
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </div>
    );
  }
}

export default ApprovalStepper;
