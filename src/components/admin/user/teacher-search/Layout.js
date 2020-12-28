import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import CheckPermission from 'components/common/CheckPermission';
import UserSearchLayout from 'components/admin/user/user-in-school/Layout';

import Results from './Results';
import { t1 } from 'translate';
import topMenuSchema from '../account/account-search/top-menu-schema';
import SubLeftMenuContext from '../../../../common/context/menu/SubMenuLeft';
import { menuItems as leftMenuSchema } from '../account/menu/sub-left-menu-configs';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const renderResults = (showEditAccountButton) => (
      <Results
        items={items}
        {...props}
        searchFormId="staff_search"
        showEditAccountButton={showEditAccountButton}
      />
    );

    return (
      <CheckPermission
        renderOnFailure={() => renderResults(false)}
        renderOnSuccess={() => renderResults(true)}
        actions={['root']}
      />
    );
  }

  render() {
    const hiddenFields = {
      is_staff: true,
    };

    return (
      <div>
        <SubTopMenuContext
          /*schema={topMenuSchema()}*/
          lastBreadcrumbName={t1('teacher')}
        />
        <UserSearchLayout
          formid="staff_search"
          isSearchStaff
          hiddenFields={hiddenFields}
          searchFormId="staff_search"
          renderResultsComponent={this.renderResultComponent}
        />
      </div>
    );
  }
}

export default Layout;
