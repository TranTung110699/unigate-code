import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import questionsBankApiUrls from 'components/admin/question-bank/endpoints';
import searchSchemaAdvance from './search-schema-advance';
import { t1 } from 'translate';
import withFeatureFlags from 'feature-flag/withFeatureFlags';

class Layout extends Component {
  renderResultComponent = (items, props) => {
    return <Results items={items} {...props} />;
  };

  render() {
    const { isFeatureEnabled } = this.props;
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('question-bank')}
          description={t1('question_bank_description')}
        />
        <SearchWrapper
          ntype="question_bank"
          formid="question_bank_search"
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={questionsBankApiUrls.search}
          schema={searchSchemaAdvance}
          showSearchButton={false}
        />
      </div>
    );
  }
}

export default withFeatureFlags()(Layout);
