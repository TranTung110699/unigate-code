import React, { Component } from 'react';

import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilters from './FormFilters';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const available = {
      name: 'available',
      options: constants.communicationMethodsOptions(),
      label: t1('available_search'),
    };
    const hiddenFields = {
      ntype: 'template',
    };
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="template_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton
        >
          <FormFilters available={available} />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
