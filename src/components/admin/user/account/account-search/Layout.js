import React, { Component } from 'react';

import CheckPermission from 'components/common/CheckPermission';
import UserSearchLayout from 'components/admin/user/user-in-school/Layout';

import Results from './../common/Results';
import { menuItems as leftMenuSchema } from '../menu/sub-left-menu-configs';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from './top-menu-schema';
import { t1 } from 'translate';
import schema from './schema/schema-new';

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
        form="account_search_result"
        searchFormId="account_search"
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
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema(this.props.conf)}
          lastBreadcrumbName={t1('account')}
        />
        <SubLeftMenuContext schema={leftMenuSchema(this.props)} />
        <UserSearchLayout
          formid="account_search"
          searchFormId="account_search"
          hiddenFields={{ all_accounts: 1 }}
          renderResultsComponent={this.renderResultComponent}
          searchUserSchema={schema}
          showSearchButton={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conf: lodashGet(state, 'domainInfo.conf'),
  };
};

export default connect(mapStateToProps)(Layout);
