import React from 'react';
import { t1 } from 'translate';
import EditAcademicRankInfo from 'components/admin/user/new/Layout';
import ManageContractsLayout from 'components/admin/user/teacher-search/edit/contract/search/Layout';
import TeachingExperiencesLayout from 'components/admin/user/teacher-search/edit/teaching-experience/search/Layout';

const teachingInformation = ({ user }) => (
  <div>
    <EditAcademicRankInfo
      teacher={user}
      formid={'edit_academic_rank_info'}
      mode={'edit'}
      step={'academic_rank_info'}
    />

    <h3>
      <b>{t1('teaching_experience')}</b>
    </h3>
    <TeachingExperiencesLayout teacher={user} />

    <h3>
      <b>{t1('teaching_contracts')}</b>
    </h3>
    <ManageContractsLayout teacher={user} />
  </div>
);

export default teachingInformation;
