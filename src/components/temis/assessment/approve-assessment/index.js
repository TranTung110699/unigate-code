import React from 'react';
import SearchApproveAssessment from './search';
import Widget from 'components/common/Widget';
import { t1 } from 'translate';

const ApproveAssessment = () => {
  return (
    <Widget title={t1('approve_assessment')}>
      <SearchApproveAssessment />
    </Widget>
  );
};

export default ApproveAssessment;
