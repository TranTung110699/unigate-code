/**
 * Created by vohung on 06/05/2017.
 */
import React from 'react';
import editCourse from './node-edit-container/course';
import editSyllabus from './node-edit-container/syllabus';
import editUser from './node-edit-container/user';
import editSession from './node-edit-container/session';
import editContest from './node-edit-container/contest';

import GroupEditContainer from 'components/admin/group/edit/EditContainer';

import PathEditContainer from 'components/admin/path/edit/EditContainer';

import PlanEditContainer from 'components/admin/plan/edit/EditContainer';

import SkillEditLayout from 'components/admin/skill/skill/edit/SkillEditContainer';

import ConfLayout from 'components/admin/conf/Layout';

import OrganizationEditContainer from 'components/admin/organization/edit/EditContainer';

import JobPositionEditContainer from 'components/admin/job-position/edit/EditContainer';

import EquivalentPositionEditContainer from 'components/admin/top-equivalent-position/edit/EditContainer';

import GoalEditContainer from 'components/admin/goal/edit/EditContainer';

import MajorEditContainer from 'components/admin/major/edit/EditContainer';

import FeeCollectingPhaseContainer from 'components/admin/financial/mainstage/fee-collecting-phase/edit/EditContainer';

import EventEditContainer from 'components/admin/event/edit/EditContainer';

import EnrolmentPlanEditContainer from 'components/admin/enrolment-plan/edit/EditContainer';

import TrainingPlanEditContainer from 'components/admin/training-plan/edit/EditContainer';

import SurveyEditContainer from 'components/admin/survey/edit/Layout';

import BusEditContainer from 'components/admin/bus/edit/Layout';

import SemesterEditContainer from 'components/admin/semester/edit/Layout';

import SalePackageEditContainer from 'components/admin/sales-package/edit/EditContainer';
import OrderPackageEditContainer from 'components/admin/sales-order/edit/EditContainer';

export default (rootUrl) => [
  editCourse,
  editSyllabus,
  editSession,
  {
    componentId: 'PathEditContainer',
    path: '/admin/path/*',
    component: PathEditContainer,
  },
  {
    componentId: 'ProgramEditContainer',
    path: '/admin/program/*',
    component: PathEditContainer,
  },
  {
    componentId: 'ClassGroupEditContainer',
    path: '/admin/classgroup/*',
    component: PathEditContainer,
  },
  {
    componentId: 'SkillEditContainer',
    path: '/admin/skill/*',
    component: SkillEditLayout,
  },
  {
    componentId: 'RubricEditContainer',
    path: '/admin/rubric/*',
    component: SkillEditLayout,
  },
  {
    componentId: 'GroupEditContainer',
    path: '/admin/group/*',
    component: GroupEditContainer,
  },
  {
    componentId: 'PlanEditContainer',
    path: '/admin/plan/:action',
    component: PlanEditContainer,
    exact: true,
  },
  {
    componentId: 'ConfAdminMenu',
    path: '/:domain/conf/:menu',
    component: ConfLayout,
    exact: true,
  },
  {
    componentId: 'ConfSchool',
    path: '/:domain/conf/:menu/:type',
    component: ConfLayout,
    exact: true,
  },
  editUser,
  {
    componentId: 'FeeCollectingPhaseContainer',
    path: '/admin/fcp/*',
    component: FeeCollectingPhaseContainer,
  },
  {
    componentId: 'OrganizationEditContainer',
    path: '/admin/organization/*',
    component: OrganizationEditContainer,
  },
  {
    componentId: 'JobPositionEditContainer',
    path: '/admin/job-position/:iid/:action?',
    component: JobPositionEditContainer,
  },
  {
    componentId: 'EquivalentPositionEditContainer',
    path: '/admin/top-equivalent-position/:iid/:action',
    component: EquivalentPositionEditContainer,
  },
  {
    componentId: 'MajorEditContainer',
    path: '/admin/major/*',
    component: MajorEditContainer,
  },
  {
    componentId: 'GoalEditContainer',
    path: '/admin/goal/*',
    component: GoalEditContainer,
  },
  editContest,
  {
    componentId: 'EventEditContainer',
    path: '/admin/event/*',
    component: EventEditContainer,
  },
  {
    componentId: 'EnrolmentPlanEditContainer',
    path: '/admin/enrolment-plan/:iid/:action?',
    component: EnrolmentPlanEditContainer,
  },
  {
    componentId: 'TrainingPlanEditContainer',
    path: '/admin/:module(training-plan)/:iid/:action?/:subAction?',
    component: TrainingPlanEditContainer,
  },
  {
    componentId: 'SurveyEditContainer',
    path: '/admin/survey/:iid/:action?',
    component: SurveyEditContainer,
  },
  {
    componentId: 'BusEditContainer',
    path: '/admin/bus/:iid/:action?',
    component: BusEditContainer,
  },
  {
    componentId: 'SemesterEditContainer',
    path: '/admin/semester/:iid/:action?',
    component: SemesterEditContainer,
  },
  {
    componentId: 'SalePackageEditContainer',
    path: '/admin/sales-package/:iid/:action?',
    component: SalePackageEditContainer,
  },
  {
    componentId: 'OrderPackageEditContainer',
    path: '/admin/sales-order/:iid/:action?',
    component: OrderPackageEditContainer,
  },
];
