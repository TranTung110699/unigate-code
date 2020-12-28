import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import CheckPermission from 'components/common/CheckPermission';
import UserSearchLayout from 'components/admin/user/user-in-school/Layout';

import Results from './Results';
import topMenuSchema from '../menu/parent/MainstageTopMenu';
import { t1 } from 'translate';

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
        searchFormId="parent_search"
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
      is_parent: 1,
    };

    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('parents')}
          description={t1('parents_description')}
        />
        <UserSearchLayout
          formid="parent_search"
          isSearchParent
          hiddenFields={hiddenFields}
          searchFormId="parent_search"
          renderResultsComponent={this.renderResultComponent}
        />
      </div>
    );
  }
}

export default Layout;
