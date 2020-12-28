import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import ReportOfQuestionEndedMarkingByRubric from './ReportOfQuestionOpenEndedMarkingByRubric';

const ReportNode = ({ node, nodeEditer }) => {
  const rubricMarkingIid = get(node, 'rubric_marking.0.iid');
  const ntype = get(node, 'ntype');

  if (!rubricMarkingIid || ntype !== 'question') {
    return <div>{t1('coming_soon')}</div>;
  }

  return (
    <ReportOfQuestionEndedMarkingByRubric
      question={node}
      nodeEditer={nodeEditer}
    />
  );
};

export default ReportNode;
