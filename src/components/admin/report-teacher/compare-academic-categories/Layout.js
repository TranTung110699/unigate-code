import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/admin/report-teacher/common/Card';
import get from 'lodash.get';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import { userOrgIids } from 'common/selectors';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import schema from './schema-form';
import Results from './Results';
import { menuItems } from '../menu/sub-left-menu-configs';
import './stylesheet.scss';

class Layout extends Component {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    const { orgIids } = this.props;

    if (!orgIids) {
      return <Loading />;
    }

    const hiddenFields = {
      orgIids,
    };

    return (
      <div className="compare-academic-categories-layout">
        <SubLeftMenuContext schema={menuItems(this.props)} />

        <Card title={t2('learning_reports_by_academic_categories')}>
          <SearchWrapper
            formid="academic_categories_learning_reports"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={apiUrls.organizations_learning_reports}
            hiddenFields={hiddenFields}
            hidePagination
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
  orgIids: userOrgIids(state),
});

export default connect(mapStateToProps)(Layout);
