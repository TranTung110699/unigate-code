/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import schema from '../schema/form';

class NewSyllabusForm extends Component {
  render() {
    const {
      mode,
      step,
      node,
      hiddenFields,
      contest,
      examRound,
      dialogKey,
    } = this.props;
    const title = this.props.title || t2('new_syllabus');
    const formid = this.props.formid || 'new_syllabus';

    if (contest && contest.code) {
      hiddenFields.contest_code = contest.code;
    }

    if (examRound && examRound.code) {
      hiddenFields.exam_round = examRound.code;
      hiddenFields.examRound = examRound.code;
    }

    const hf = Object.assign({ max_depth: 2 }, hiddenFields);

    return (
      <NodeNew
        {...this.props}
        hiddenFields={hf}
        title={title}
        ntype={'syllabus'}
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        dialogKey={dialogKey}
        closeModal={!!dialogKey}
        formid={formid}
      />
    );
  }
}

const mapStateToProps = (state) => {
  let contest = {};
  let examRound = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const contestItem = itemAncestors[0] || {};
  const nodes = state.tree;
  if (contestItem.ntype === 'contest') {
    if (contestItem && contestItem.iid && nodes[contestItem.iid]) {
      contest = nodes[contestItem.iid];
    }
  }

  const examRoundItem = itemAncestors[1] || {};
  if (examRoundItem.ntype === 'exam-round') {
    if (examRoundItem && examRoundItem.iid && nodes[examRoundItem.iid]) {
      examRound = nodes[examRoundItem.iid];
    }
  }

  return {
    contest,
    examRound,
  };
};

export default connect(mapStateToProps)(NewSyllabusForm);
