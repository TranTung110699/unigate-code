import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { constants } from 'configs/constants';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilters from './FormFilters';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const statuses = {
      name: 'StatusReportOptions',
      options: constants.StatusReportOptions(),
      label: t1('status'),
    };

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('user_learn_search')}>
          <SearchWrapper
            formid="user_learn_search"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
          >
            <FormFilters id="user_learn_search" statuses={statuses} />
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
