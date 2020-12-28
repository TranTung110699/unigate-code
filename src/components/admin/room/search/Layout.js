import React, { Component } from 'react';
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
    const { node } = this.props;
    const hiddenFields = {
      ntype: 'room',
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="room_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
