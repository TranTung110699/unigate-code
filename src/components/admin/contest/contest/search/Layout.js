import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import contestApiUrls from 'components/admin/contest/endpoints';

import Results from './contest-results';
import schema from './schema-form';
import schemaAdvance from './schema-form-advance';
import topMenuSchema from '../menu/MainstageTopMenu';

import withSchoolConfig from 'common/hoc/withSchoolConfigs';
import { t1 } from 'translate';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class ContestSearchLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { isSIS, isFeatureEnabled } = this.props;

    let hiddenFields = { ntype: 'contest' };
    if (!isSIS) {
      hiddenFields = { ...hiddenFields, isSIS };
    }

    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('contest')}
          description={t1('contest_description')}
        />
        <SearchWrapper
          formid="contest_search"
          schema={
            isFeatureEnabled(features.NEW_UI_JULY_2019) ? schemaAdvance : schema
          }
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
          alternativeApi={contestApiUrls.get_contests}
        />
      </div>
    );
  }
}

export default withSchoolConfig(withFeatureFlags()(ContestSearchLayout));
