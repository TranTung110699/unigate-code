import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import examRoundSchema from 'components/admin/contest/exam-round/schema/form';
import { checkIfEnableExamTemplate } from 'common/conf';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      contest,
      enableExamTemplate,
      submitButton,
      requestSuccessful,
    } = this.props;
    let hiddenFields = this.props.hiddenFields || {};
    const title = this.props.title || t1('new_exam_round');
    const formid = this.props.formid || 'new_exam_round';

    hiddenFields.enable_exam_template = checkIfEnableExamTemplate(
      enableExamTemplate,
    );
    hiddenFields.contest_code = contest && contest.code;
    hiddenFields.contest_iid = contest && contest.iid;

    return (
      <div>
        <NodeNew
          title={title}
          ntype="exam_round"
          schema={examRoundSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          submitButton={submitButton}
          requestSuccessful={requestSuccessful}
          hiddenFields={hiddenFields}
          searchFormId="exam_round_search"
          alternativeApi={this.props.alternativeApi || null}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let contest = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const contestItem = itemAncestors[0];
  const nodes = state.tree;

  if (contestItem && contestItem.iid && nodes[contestItem.iid]) {
    contest = nodes[contestItem.iid];
  }

  return {
    contest,
    enableExamTemplate:
      state.domainInfo.conf && state.domainInfo.conf.enable_exam_template,
  };
}

export default connect(mapStateToProps)(Form);
