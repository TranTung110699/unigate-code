import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import NodeNew from 'components/admin/node/new';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import topMenuSchema from '../menu/MainstageTopMenu';
import Results from './Results';
import schema from './form-filter/schema';
import requestTypeSchema from '../schema/request-type-schema-form';
import { t1 } from 'translate';

const formid = 'request_type_search';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} formid={formid} dispatch={props.dispatch} />
  );

  render() {
    const { action, orgTypeOptions, history } = this.props;
    return action === 'new' ? (
      <NodeNew
        ntype="request-type"
        orgTypeOptions={orgTypeOptions}
        schema={requestTypeSchema}
        formid="new-request-type"
        requestSuccessful={() => {
          history.push('/admin/req-type');
        }}
      />
    ) : (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema(null, this.props)}
          lastBreadcrumbName={t1('request_type_manage')}
          description={t1('request_type_manage_description')}
        />
        <SearchWrapper
          schema={schema}
          alternativeApi={apiUrls.request_type_search}
          formid={formid}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          autoSearchWhenHiddenFieldsChange
        />
      </div>
    );
  }
}

const getOrgTypeOptions = (orgTyles) => {
  if (!orgTyles) {
    return [];
  }

  return orgTyles
    .map((item) => {
      if (!get(item, 'is_phongban')) {
        return null;
      }
      return {
        label: item.name,
        primaryText: item.name,
        value: item.type,
      };
    })
    .filter(Boolean);
};

const mapStateToProps = createSelector(
  (state, props) => get(props, 'match.params.action'),
  (state) => get(state, 'domainInfo.school.org_types'),
  (action, orgTypes) => ({
    action,
    orgTypeOptions: getOrgTypeOptions(orgTypes),
  }),
);

export default connect(mapStateToProps)(withRouter(Layout));
