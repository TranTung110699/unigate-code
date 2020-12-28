import React from 'react';
import ButtonNew from 'components/admin/course/new/ButtonNew';

const offlineExam = () => [
  {
    component: (
      <ButtonNew
        formid="new_offline_exam"
        searchFormId="offline_exam_search"
        step="offline_exam"
        mode="new"
      />
    ),
    id: 'new_offline_exam',
    type: 'modal',
    floatRight: true,
  },
];

export default offlineExam;
