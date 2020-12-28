import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Detail from './results/Detail';
import Overview from './results/Overview';
import { modes } from './common/constants';
import FormFilters from './FormFilters';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items, props, objects, searchValues) => {
    switch (searchValues.mode) {
      case modes.DETAIL:
        return <Detail items={items} {...props} />;
      default:
        return <Overview items={items} {...props} />;
    }
  };

  render() {
    const hiddenFields = {};

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('scores_by_major_search')}>
          <SearchWrapper
            formid="scores_by_semester_credit_search"
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
            alternativeApi={apiUrls.scores_by_semester_credit_search}
          >
            <FormFilters id="scores_by_semester_credit_search" />
          </SearchWrapper>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(Layout);
