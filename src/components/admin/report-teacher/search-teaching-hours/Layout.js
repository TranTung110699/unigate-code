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
      ntype: 'teaching_hours',
    };

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('teaching_hours_search')}>
          <SearchWrapper
            formid="teaching_hours_search"
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
          >
            <FormFilters id="teaching_hours_search" />
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
