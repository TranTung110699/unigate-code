import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './results';
import topMenuSchema from '../menu/MainstageTopMenu';
import searchSchemaAdvance from './search-schema-advance';
import searchSchema from './search-schema';
import { t1 } from 'translate';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { isFeatureEnabled } = this.props;
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('exam_template')}
          description={t1('exam_template_description')}
        />
        <SearchWrapper
          ntype="exam_template"
          formid="exam_template_search"
          renderResultsComponent={this.renderResultComponent}
          alternativeApi="/exam-template/index/search"
          schema={
            isFeatureEnabled(features.NEW_UI_JULY_2019)
              ? searchSchemaAdvance
              : searchSchema
          }
          showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
        />
      </div>
    );
  }
}

export default withFeatureFlags()(Layout);
