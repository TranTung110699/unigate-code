import React, { Component } from 'react';
import QuestionImport from 'components/admin/question/import/Layout.js';
import { UsedFor } from 'configs/constants';

class QuestionBankBankImport extends Component {
  render() {
    const { node, categoryMappingWithTheSkills } = this.props;
    const importParams = {
      question_bank: node.iid,
      used_for: [UsedFor.EXAM],
      organizations: node.organizations,
      positions: node.positions,
    };

    return (
      <div>
        <QuestionImport
          formid={`bank-${node.iid}`}
          importParams={importParams}
          categoryMappingWithTheSkills={categoryMappingWithTheSkills}
        />
      </div>
    );
  }
}

export default QuestionBankBankImport;
