/**
 * Created by hungvo on 03/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import TestRuleForm from 'components/admin/contest/test-rule/form';
import IconRuleSetting from 'material-ui/svg-icons/action/settings-applications';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import FlatButton from 'components/common/mui/FlatButton';
import { isExam } from 'common/learn';

class TestRule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ancestors: [],
    };
    this.editSuccess = this.editSuccess.bind(this);
  }

  editSuccess = (value) => {
    const { dispatch } = this.props;
    const node = this.props.node || {};
    node.options = value;
    dispatch(
      sagaActions.updateNodeRequest({
        step: 'options',
        iid: node.iid,
        data: node,
        closeModal: true,
      }),
    );
  };

  getLabel = (node) => (isExam(node) ? t1('exam_rule') : t1('exercise_rule'));

  handleOnClickSettingRule = () => {
    const { dispatch, node } = this.props;
    const editSuccess = this.props.editSuccess || this.editSuccess;
    const contentDialog = (
      <TestRuleForm iid={node.iid} editSuccess={editSuccess} />
    );
    const optionsProperties = {
      handleClose: true,
      title: this.getLabel(node),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { node, ...props } = this.props;
    return (
      <FlatButton
        label={this.getLabel(node)}
        icon={<IconRuleSetting />}
        {...props}
        onClick={() => this.handleOnClickSettingRule()}
      />
    );
  }
}

export default connect()(TestRule);
