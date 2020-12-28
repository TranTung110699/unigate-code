import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import BDTXReport from './bdtx';
import TCNNReport from 'components/temis/assessment/organization-report/Report';
import Dashboard from './Dashboard';
import { renderRoutes } from 'react-router-config';
import OrganizationLearningReport from './organization-learning-report';
import OrganizationCanBoCotCanReport from './organization-can-bo-cot-can-report';

const routes = () => [
  {
    path: '/admin/temis',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/admin/temis/tcnn-report',
    component: TCNNReport,
    exact: true,
  },
  {
    path: '/admin/temis/bdtx/:id',
    component: BDTXReport,
    exact: true,
  },
  {
    path: '/admin/temis/organization-learning-report',
    component: OrganizationLearningReport,
    exact: true,
  },
  {
    path: '/admin/temis/organization-can-bo-cot-can-report',
    component: OrganizationCanBoCotCanReport,
    exact: true,
  },
];

class AdminTemis extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName="TEMIS - Teacher Education Management Information System"
          schema={[]}
        />
        {renderRoutes(routes())}
      </div>
    );
  }
}

export default AdminTemis;
