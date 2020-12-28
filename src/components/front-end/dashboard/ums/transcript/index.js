import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import MajorsOfUser from 'components/admin/user_major/major-tabs-of-user';
import Transcript from './Transcript';

const Transcripts = (props) => (
  <MajorsOfUser
    uiid={props.uiid}
    labelEmptyTabs={t1('have_not_attended_program')}
    renderContentOfTab={(userMajor, userIid) => ({
      label: `${lodashGet(userMajor, 'majorObject.name')} (${t1(
        lodashGet(userMajor, 'training_mode'),
      )}|${t1(lodashGet(userMajor, 'training_level'))})`,
      content: <Transcript formOfTraining={userMajor} userIid={userIid} />,
    })}
  />
);

export default Transcripts;
