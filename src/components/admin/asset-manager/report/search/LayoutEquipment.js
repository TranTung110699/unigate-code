import React, { Component } from 'react';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchForm from './SearchForm';
import { menuItems as leftMenuSchema } from '../../menu/sub-left-menu-configs';

class ReportEquipmentLayout extends Component {
  render() {
    const formid = 'report_equipment_search';
    return (
      <div>
        <SubLeftMenuContext schema={leftMenuSchema()} />
        <SearchForm {...this.props} formid={formid} />
      </div>
    );
  }
}

export default ReportEquipmentLayout;
