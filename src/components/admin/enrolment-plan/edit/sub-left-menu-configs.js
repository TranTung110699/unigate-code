import React from 'react';
import lodashGet from 'lodash.get';

import { t, t1 } from 'translate';
import routes from 'routes';
import { checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf } from 'common/conf';
import {
  isEnrolmentPlanExecuted,
  isEnrolmentPlanSharedFromAncestorOrganizations,
  isEnrolmentPlanStopped,
} from 'components/admin/enrolment-plan/common';
import { enrolmentPlanStatusToText } from 'configs/constants/enrolmentPlan';

const getToolTip = (disabled, title) => {
  const activeNoticeMessage = t(
    'you_will_see_this_menu_item_active_once_enrolment_plan_is_executed',
  );
  return disabled ? `${title} (${activeNoticeMessage})` : title;
};

export const menuItems = (node, conf) => {
  const learningNotYetHappened =
    !isEnrolmentPlanExecuted(node) && !isEnrolmentPlanStopped(node);

  const isSharedFromAncestorOrganizations = isEnrolmentPlanSharedFromAncestorOrganizations(
    node,
  );

  const enabledMenus = lodashGet(conf, 'list_of_enrolment_plan_menus');

  let allMenus = [
    {
      id: 'dashboard',
      url: routes.url('node_edit', {
        ntype: 'enrolment_plan',
        iid: lodashGet(node, 'iid'),
        step: 'dashboard',
      }),
      // title: t1('dashboard'),
      title: `${t1('dashboard')} (${enrolmentPlanStatusToText(
        lodashGet(node, 'status'),
      )})`,
      icon: {
        position: 'left',
        type: 'dashboard',
      },
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      id: 'information',
      url: routes.url('node_edit', {
        ntype: 'enrolment_plan',
        iid: lodashGet(node, 'iid'),
        step: 'info',
      }),
      title: t1('information'),
      icon: {
        position: 'left',
        type: 'info-circle',
      },
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      id: 'learning_materials',
      url: routes.url('node_edit', {
        ntype: 'enrolment_plan',
        iid: lodashGet(node, 'iid'),
        stepNodes: [
          {
            ntype: 'program',
            iid: lodashGet(node, 'program_iid'),
          },
        ],
      }),
      title: t1('enrolment_plan_learning_materials'),
      icon: {
        position: 'left',
        type: 'book',
      },
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      id: 'members',
      url: routes.url('node_edit', {
        ntype: 'enrolment_plan',
        iid: lodashGet(node, 'iid'),
        step: 'members',
      }),
      title: `${t1('enrolment_plan_members')} (${lodashGet(
        node,
        'number_of_members',
      )})`,
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      id: 'courses',
      url: routes.url('node_edit', {
        ntype: 'enrolment_plan',
        iid: lodashGet(node, 'iid'),
        step: 'courses',
      }),
      title: `${t1('enrolment_plan_courses')} (${lodashGet(
        node,
        'number_of_courses',
      )})`,
      icon: {
        position: 'left',
        type: 'fund',
      },
      hidden:
        checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(conf) ||
        isSharedFromAncestorOrganizations,
    },
    // {
    //   url: routes.url('node_edit', {
    //     ntype: 'enrolment_plan',
    //     iid: lodashGet(node, 'iid'),
    //     step: 'approval-flow',
    //   }),
    //   title: `${t1('approval_flow')} (${enrolmentPlanStatusToText(
    //     node.status,
    //   )})`,
    //   icon: {
    //     position: 'left',
    //     type: 'rise',
    //   },
    // },
    {
      id: 'import-survey-takes',
      url: routes.url(
        'node_edit',
        Object.assign({
          ntype: 'enrolment_plan',
          iid: lodashGet(node, 'iid'),
          step: 'import-survey-takes',
        }),
      ),
      title: t1('import_survey_takes'),
      tooltip: getToolTip(learningNotYetHappened, t1('import_survey_takes')),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
      disabled: learningNotYetHappened,
    },
    {
      id: 'reports',
      url: routes.url(
        'node_edit',
        Object.assign({
          ntype: 'enrolment_plan',
          iid: lodashGet(node, 'iid'),
          step: 'reports',
        }),
      ),
      title: t1('ep_learning_reports'),
      tooltip: getToolTip(learningNotYetHappened, t1('ep_learning_reports')),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
      disabled: learningNotYetHappened,
      // subMenu: [
      //   {
      //     url: routes.url('node_edit', {
      //       ntype: 'enrolment_plan',
      //       iid: lodashGet(node, 'iid'),
      //       step: 'courses',
      //     }),
      //     title: `${t1('enrolment_plan_courses')} (${node.number_of_courses})`,
      //     icon: {
      //       position: 'left',
      //       type: 'fund',
      //     },
      //     hidden: checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(conf),
      //   },
      //
      // ]
    },
  ];

  if (Array.isArray(enabledMenus)) {
    allMenus = allMenus.map((m) => {
      if (!enabledMenus.includes(lodashGet(m, 'id'))) {
        return {
          ...m,
          hidden: true,
        };
      }
      return m;
    });
  }

  return allMenus;
};
