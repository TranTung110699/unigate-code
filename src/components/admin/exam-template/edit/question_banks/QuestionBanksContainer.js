import React from 'react';
import get from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import ExamTemplateForm from '../../new/Form';
import examTemplateApiUrls from '../../endpoints';
import schema from '../../schema/form';
import Icon from 'components/common/Icon';
import Widget from 'components/common/Widget';
import SearchQuestion from 'components/admin/question-bank/edit/bank/search/SearchLayout';
import { t1 } from 'translate';
import Tag from 'antd/lib/tag';

const elementUpdateQuestionBanks = (node) => {
  return (
    <ExamTemplateForm
      alternativeApi={examTemplateApiUrls.update_exam_template}
      schema={schema}
      step="question_banks"
      mode="edit"
      hiddenFields={{
        iid: node.iid,
      }}
      node={node}
    />
  );
};

const QuestionBanksContainer = ({
  node = {},
  categoryMappingWithTheSkills,
}) => {
  const questionBanksDetail = get(node, 'question_banks_detail');
  if (!Array.isArray(questionBanksDetail) || !questionBanksDetail.length) {
    return elementUpdateQuestionBanks(node);
  }

  return (
    <div>
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <Widget title={t1('question_banks')} compact>
            {questionBanksDetail.map((qb) => (
              <Tag color="cyan">{`${qb.name} (#${qb.code})`}</Tag>
            ))}
            <Icon icon="edit" className="action" onClick={showFull} />
          </Widget>
        )}
        renderFull={({ closeDialog }) => elementUpdateQuestionBanks(node)}
      />
      <SearchQuestion
        resultReadOnly
        hiddenFields={{
          question_bank: questionBanksDetail.map(({ iid }) => iid),
        }}
        categoryMappingWithTheSkills={categoryMappingWithTheSkills}
      />
    </div>
  );
};

export default QuestionBanksContainer;
