import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import { menuItems } from '../menu/sub-left-menu-configs';
import schema from './schema-form';
import Results from './Results';
import './stylesheet.scss';

class Layout extends Component {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    return (
      <div className="enterprise-dashboard-layout">
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('enterprise_dashboard_reports')}>
          <SearchWrapper
            formid="enterprise_dashboard_reports"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={apiUrls.enterprise_dashboard_reports}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(Layout);
