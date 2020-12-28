import React, { Component } from 'react';

import CheckPermission from 'components/common/CheckPermission';
import UserSearchLayout from 'components/admin/user/user-in-school/Layout';

import Results from './../common/Results';
import { menuItems as leftMenuSchema } from '../menu/sub-left-menu-configs';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import schema from './schema/schema-form';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from '../account-search/top-menu-schema';

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
        searchFormId="abnormal_account_search"
        form="abnormal_account_search_result"
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
          formid="abnormal_account_search"
          searchFormId="abnormal_account_search"
          alternativeApi={'user/api/search-abnormal-accounts'}
          schema={'user/api/search-abnormal-accounts'}
          searchUserSchema={schema()}
          renderResultsComponent={this.renderResultComponent}
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
