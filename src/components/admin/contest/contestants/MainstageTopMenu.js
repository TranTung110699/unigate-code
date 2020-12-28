import React from 'react';
import routes from 'routes';
import { t1 } from 'translate';
import { inviteContestantUrl } from '../routes';
// import ConfirmFinishTask from 'components/admin/contest/dashboard/ConfirmFinishTask';

const contestantTopMenuSchema = (contest) => {
  return [
    {
      id: 'enrol_new_contestants',
      href: inviteContestantUrl(contest),
      label: t1('enrol_new_contestants'),
      primary: true,
    },
    {
      id: 'report_charts',
      href: routes.url('node_edit', {
        ...contest,
        step: 'import-contestants',
      }),
      primary: true,
      label: t1('import_contestants'),
    },
    // {
    //   component: (
    //     <ConfirmFinishTask
    //       ntype="contest"
    //       className="m-l-10"
    //       itemIid={contest.iid}
    //       field="task_list.contestants_list"
    //       confirmed_status={
    //         contest && contest.task_list && contest.task_list.contestants_list
    //       }
    //       title={
    //         contest && contest.task_list && contest.task_list.contestants_list
    //           ? t1('confirmed_finish_manage_contestants_list')
    //           : t1('confirm_finish_manage_contestants_list')
    //       }
    //       textConfirm={t1(
    //         'are_you_sure_you_want_to_mark_done_manage_contestants_list?',
    //       )}
    //     />
    //   ),
    //   // href: getUrl('exam-round'),
    //   id: 'new_exam_round',
    //   label: t1('new_exam_round'),
    // },
  ];
};

export default contestantTopMenuSchema;
