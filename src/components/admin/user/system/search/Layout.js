import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import FormFilters from 'components/admin/user/system/search/FormFilters';
import UserResults from 'components/admin/user/system/search/Results';

class UserLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const { formid, ntype } = props;
    return <UserResults items={items} formid={formid} ntype={ntype} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'user',
    };
    return (
      <SearchWrapper
        formid="user_search"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton={false}
      >
        <FormFilters id="user_search" />
      </SearchWrapper>
    );
  }
}

export default UserLayout;
