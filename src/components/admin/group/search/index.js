import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import groupApiUrls from 'components/admin/group/endpoints';
import GroupResults from 'components/admin/group/search/GroupSearchResults';
import K12GroupResults from 'components/admin/group/search/K12GroupResults';
import { categoryRelationTypes } from 'configs/constants';
import schema from './search-schema-form-advance';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Result from './results';

class SearchIndex extends React.PureComponent {
  renderResultsComponent = (items, props) => {
    const type = this.props.type || null;
    const isK12 = this.props.isK12 || null;

    if (isK12) return <K12GroupResults items={items} {...props} type={type} />;
    else if (
      props.isFeatureEnabled(features.NEW_UI_JULY_2019) &&
      props.showList
    )
      return <Result items={items} {...props} />;
    else return <GroupResults items={items} {...props} type={type} />;
  };

  render() {
    const { type, isFeatureEnabled, ...props } = this.props;
    let formid = this.props.formid || 'category_group_search';
    const isSocialFunctionGroups = !Object.values(
      categoryRelationTypes,
    ).includes(type);

    let hiddenFields = this.props.hiddenFields || {};
    hiddenFields = { ...hiddenFields, isSocialFunctionGroups };

    const alternativeApi = groupApiUrls.my_supervised_groups;

    return (
      <SearchWrapper
        {...props}
        formid={formid}
        alternativeApi={alternativeApi}
        renderResultsComponent={
          this.props.renderResultsComponent || this.renderResultsComponent
        }
        onResultChange={this.props.onResultChange}
        showQueryField={false}
        showSearchButton={false}
        schema={schema}
        hiddenFields={hiddenFields}
        autoSearchWhenStart={true}
      />
    );
  }
}

export default withSchoolConfigs(withFeatureFlags()(SearchIndex));
