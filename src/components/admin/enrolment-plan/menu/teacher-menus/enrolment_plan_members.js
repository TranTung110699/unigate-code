import React from 'react';
import routes from 'routes';
import ButtonNew from '../../mainstage/members/new/ButtonNew';
import ButtonAttachSmartGroup from '../../mainstage/members/new/ButtonAttachSmartGroup';
import { getSearchFormId } from '../../mainstage/members/common';
import { createSelector } from 'reselect';
import {
  getSmartGroupAttachedToEnrolmentPlan,
  isSmartGroupEnrolmentPlan,
} from 'components/admin/node/utils';
import { isEnrolmentPlanStopped } from 'components/admin/enrolment-plan/common';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon';
import NewButton from 'components/common/primary-button';
import { Link } from 'react-router-dom';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => {
    if (isEnrolmentPlanStopped(node)) {
      return [];
    }
    if (isSmartGroupEnrolmentPlan(node)) {
      const smartGroupAttachedToEnrolmentPlan = getSmartGroupAttachedToEnrolmentPlan(
        node,
      );
      if (!smartGroupAttachedToEnrolmentPlan) {
        return [
          {
            button: <ButtonAttachSmartGroup enrolmentPlan={node} />,
            id: 'enrolment_plan_attach_smart_group',
            type: 'modal',
            floatRight: true,
            icon: 'plus',
          },
        ];
      }
      return [
        {
          label: t1("the_enrolment_plan's_members_come_from_group_%s", [
            lodashGet(smartGroupAttachedToEnrolmentPlan, 'name'),
          ]),
          href: routes.url('node_edit', {
            iid: lodashGet(smartGroupAttachedToEnrolmentPlan, 'iid'),
            ntype: 'group',
            step: 'members',
          }),
          id: 'enrolment_plan_smart_group',
          type: 'modal',
          floatRight: true,
        },
      ];
    }

    return [
      {
        button: (
          <span>
            <Link
              to={routes.url('node_edit', {
                iid: lodashGet(node, 'iid'),
                ntype: 'enrolment-plan',
                step: 'import-members',
              })}
            >
              <NewButton
                icon={<Icon icon="upload" />}
                label={t1('import_members_from_excel')}
              />
            </Link>
          </span>
        ),
      },
      {
        button: (
          <span className="m-l-10">
            <ButtonNew
              enrolmentPlan={node}
              searchFormId={getSearchFormId(node)}
            />
          </span>
        ),
        id: 'new_enrolment_plan',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default menu;
