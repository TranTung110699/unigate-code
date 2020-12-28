import React, { Component } from 'react';
import UserSearchLayout from 'components/admin/user/user-in-school/Layout';

import Results from './Result';
import { menuItems as leftMenuSchema } from '../menu/sub-left-menu-configs';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import schema from './schema/schema-form';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from '../account-search/top-menu-schema';
import { t1 } from 'translate';

class Layout extends Component {
  renderResultComponent = (items) => (
    <Results
      items={items}
      resendRequiredLogin={this.props.resendRequiredLogin}
    />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema(this.props.conf)}
          lastBreadcrumbName={t1('account')}
        />
        <SubLeftMenuContext schema={leftMenuSchema(this.props)} />
        <UserSearchLayout
          formid="non-logged_in"
          alternativeApi={'/user/api/search'}
          hiddenFields={{ non_login: 1 }}
          searchUserSchema={schema(this.props.resendRequiredLogin)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    resendRequiredLogin: (params) => {
      dispatch(
        sagaActions.submitFormRequest(null, {
          extraParams: params,
          url: '/user/api/resend-required-login',
        }),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
