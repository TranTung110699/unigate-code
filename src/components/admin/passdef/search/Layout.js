import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import routes from 'routes';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilters from './FormFilters';
import NewPassdefButton from '../new/NewPassdefButton';

const formid = 'passdef_search';
const hiddenFields = { ntype: 'passdef' };

class Layout extends Component {
  topMenuButtons = [
    <Link to={routes.url('skill')}>{t1('skills')}</Link>,
    <Link to={routes.url('passdef')}>{t1('skill_passing_definitions')}</Link>,
    <NewPassdefButton />,
  ];

  renderResultComponent = (items) => (
    <Results items={items} searchFormId={formid} />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext buttons={this.topMenuButtons} />
        <SearchWrapper
          formid={formid}
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
