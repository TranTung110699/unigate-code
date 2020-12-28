import React from 'react';

import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import lodashGet from 'lodash.get';
import RubricScore from 'components/learn/viewer/user-rubric-score';
import Icon from 'antd/lib/icon';
import { isSmallScreen } from 'common';

const EpScore = ({ enrolmentPlan }) => {
  const dialogWidth = isSmallScreen ? '90%' : '60%';
  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <div
          onClick={showFull}
          style={{ cursor: 'pointer' }}
          className="m-l-20 m-b-20"
        >
          <Icon type="edit" /> {t1('your_enrolment_plan_score')}
        </div>
      )}
      renderFull={() => (
        <RubricScore itemIid={enrolmentPlanIid} itemNtype="enrolment-plan" />
      )}
      dialogOptionsProperties={{
        handleClose: true,
        autoScrollBodyContent: true,
        width: dialogWidth,
      }}
    />
  );
};

export default EpScore;
