import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/admin/report-teacher/common/Card';
import get from 'lodash.get';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import schema from './schema-form';
import Results from './Results';
import { menuItems } from '../menu/sub-left-menu-configs';
import './stylesheet.scss';

class Layout extends Component {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    return (
      <div className="compare-organizations-layout">
        <SubLeftMenuContext schema={menuItems(this.props)} />

        <Card title={t2('learning_reports_by_organizations')}>
          <SearchWrapper
            formid="organizations_learning_reports"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={apiUrls.organizations_learning_reports}
            hidePagination
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
