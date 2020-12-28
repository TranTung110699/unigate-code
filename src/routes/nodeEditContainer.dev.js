/**
 * Created by vohung on 06/05/2017.
 */
import React from 'react';

import CourseEditContainer from 'components/admin/course/edit/EditContainer';

import GroupEditContainer from 'components/admin/group/edit';

import EditUserContainer from 'components/admin/user/user-in-school/edit';
import PathEditContainer from 'components/admin/path/edit/EditContainer';
import PlanEditContainer from 'components/admin/plan/edit/EditContainer';

import SkillEditLayout from 'components/admin/skill/skill/edit/SkillEditContainer';
import SyllabusEditContainer from 'components/admin/syllabus/edit/EditContainer';
import ConfLayout from 'components/admin/conf/Layout';
import AcademicCategoryEditContainer from 'components/admin/academic-category/edit/EditContainer';
import OrganizationEditContainer from 'components/admin/organization/edit/EditContainer';
import JobPositionEditContainer from 'components/admin/job-position/edit/EditContainer';
import EquivalentPositionEditContainer from 'components/admin/top-equivalent-position/edit/EditContainer';
import GoalEditContainer from 'components/admin/goal/edit/EditContainer';
import MajorEditContainer from 'components/admin/major/edit/EditContainer';
import FeeCollectingPhaseContainer from 'components/admin/financial/mainstage/fee-collecting-phase/edit/EditContainer';
import ContestEditContainer from 'components/admin/contest/edit/EditContainer';
import EventEditContainer from 'components/admin/event/edit/EditContainer';
import EnrolmentPlanEditContainer from 'components/admin/enrolment-plan/edit/EditContainer';
import TrainingPlanEditContainer from 'components/admin/training-plan/edit/EditContainer';
import SurveyEditContainer from 'components/admin/survey/edit/Layout';

export default (rootUrl) => [
  {
    componentId: 'CourseEditContainer',
    path: '/admin/course/*',
    component: CourseEditContainer,
  },
  {
    componentId: 'SyllabusEditContainer',
    path: [
      '/admin/syllabus/*',
      '/admin/sco/*',
      '/admin/video/*',
      '/admin/question/*',
      '/admin/exercise/*',
    ],
    component: SyllabusEditContainer,
  },
  {
    componentId: 'CreditEditContainer',
    path: '/admin/credit/*',
    component: SyllabusEditContainer,
  },
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
  {
    componentId: 'EditUserContainer',
    path: '/admin/:type(user|teacher|student|parent)/:iid:slash(|/*)',
    component: EditUserContainer,
  },
  {
    componentId: 'FeeCollectingPhaseContainer',
    path: '/admin/fcp/*',
    component: FeeCollectingPhaseContainer,
  },
  {
    componentId: 'AcademicCategoryEditContainer',
    path: '/admin/academic-category/*',
    component: AcademicCategoryEditContainer,
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
  {
    componentId: 'ContestEditContainer',
    path: '/admin/contest/*',
    component: ContestEditContainer,
  },
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
    path: '/admin/training-plan/:iid/:action?/:subAction?',
    component: TrainingPlanEditContainer,
  },
  {
    componentId: 'SurveyEditContainer',
    path: '/admin/survey/:iid/:action?',
    component: SurveyEditContainer,
  },
];
