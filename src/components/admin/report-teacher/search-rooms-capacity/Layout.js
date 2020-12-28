import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
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
    const hiddenFields = {
      ntype: 'rooms_capacity',
    };
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('rooms_capacity_search')}>
          <SearchWrapper
            formid="rooms_capacity_search"
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
          >
            <FormFilters id="rooms_capacity_search" />
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
