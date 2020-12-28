import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Detail from '../common/results/Detail';
import Overview from '../common/results/Overview';
import FormFilters from '../common/FormFilters';
import { modes } from '../common/constants';
import { menuItems } from '../../menu/sub-left-menu-configs';

class Layout extends Component {
  formFiltersBlackList = ['major'];

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
        <Card title={t2('scores_by_faculty_search')}>
          <SearchWrapper
            formid="scores_by_faculty_search"
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
            alternativeApi={apiUrls.scores_by_course_search}
          >
            <FormFilters
              blackList={this.formFiltersBlackList}
              id="scores_by_faculty_search"
            />
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
