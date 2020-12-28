import React from 'react';
import ButtonNew from 'components/admin/course/new/ButtonNew';

const examShift = (contestIid, examRound) => [
  {
    component: (
      <ButtonNew
        formid="new_exam_shift"
        searchFormId="exam_shift_search"
        step="exam_shift"
        mode="new"
        primary
        contestIid={contestIid}
      />
    ),
    id: 'new_exam_shift',
    type: 'modal',
    floatRight: true,
  },
];

export default examShift;
