import React from 'react';
import { t1 } from 'translate';
import PageWrapper from '../../PageWrapper';
import Search from './search';
import MyEnrolmentPlan from '../../enrolment-plans';

const Public = ({ node, viewUserIid, display }) => {
  if (window.isGoJapan) {
    return <MyEnrolmentPlan />;
  }
  return (
    <PageWrapper title={t1('public_courses')}>
      <Search node={node} viewUserIid={viewUserIid} display={display} />
    </PageWrapper>
  );
};

export default Public;
