import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';
import FormFilters from './FormFilters';
import NewSkillRelationButton from '../new/NewSkillRelationButton';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const formid = 'skill_relation_search';

    const hiddenFields = {
      ntype: 'skill',
      _sand_step: 'skill_relation',
    };

    return (
      <div>
        <SubTopMenuContext button={<NewSkillRelationButton />} />
        <SearchWrapper
          formid={formid}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
        >
          <FormFilters formid={formid} />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
