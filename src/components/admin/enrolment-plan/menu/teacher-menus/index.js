import React from 'react';
import ButtonNew from '../../new/ButtonNew';
import ButtonNewForTaphuanSmartEnrolmentPlan from '../../new/new-for-taphuan-smart-enrolment-plan/ButtonNew';
import { getSearchFormId } from '../../common';
import { t1 } from 'translate';

const menu = () => [
  {
    button: <ButtonNew searchFormId={getSearchFormId()} />,
    id: 'new_enrolment_plan',
  },
  ...(window.isETEP
    ? [
        // {
        //   button: (
        //     <span className="m-l-10">
        //       <ButtonNewFromTemplate searchFormId={getSearchFormId()} />
        //     </span>
        //   ),
        //   id: 'new_enrolment_plan_from_template',
        // },
        {
          button: (
            <span className="m-l-10">
              <ButtonNewForTaphuanSmartEnrolmentPlan
                label={t1('create_new_smart_enrolment_plan')}
              />
            </span>
          ),
          id: 'new_taphuan_smart_enrolment_plan',
        },
      ]
    : []),
];

export default menu;
