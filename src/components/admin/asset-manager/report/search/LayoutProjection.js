import React, { Component } from 'react';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchForm from './SearchForm';
import topMenuSchema from '../menu/MainstageTopMenu';
import { menuItems as leftMenuSchema } from '../../menu/sub-left-menu-configs';
import Search from 'components/admin/training-plan/mainstage/dashboard/widget/stationery-report/search';

class ReportFutureProjectionLayout extends Component {
  render() {
    const formid = 'report_future_projection_search';
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SubLeftMenuContext schema={leftMenuSchema()} />
        {/*<SearchForm {...this.props} formid={formid} />*/}
        <Search formid={formid} />
      </div>
    );
  }
}

export default ReportFutureProjectionLayout;
