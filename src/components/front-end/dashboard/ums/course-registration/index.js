import React from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import MajorsOfUser from 'components/admin/user_major/major-tabs-of-user';
import SubjectAllowToRegister from './subjectAllowToRegisterByFormOfTraining';
import './stylesheet.scss';

const courseRegistration = () => (
  <MajorsOfUser
    labelEmptyTabs={t1('have_not_attended_program')}
    renderContentOfTab={(userMajor, userIid) => ({
      label: `${lodashGet(userMajor, 'majorObject.name')} (${t1(
        lodashGet(userMajor, 'training_mode'),
      )}|${t1(lodashGet(userMajor, 'training_level'))})`,
      content: (
        <SubjectAllowToRegister formOfTraining={userMajor} userIid={userIid} />
      ),
    })}
  />
);

export default courseRegistration;
