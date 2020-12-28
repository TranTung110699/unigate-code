import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { loadingStatuses } from 'configs/constants';
import fetchData from 'components/common/fetchData';
import schema from '../schema/search-form';
import Results from './SearchResult';

class SearchInvite extends React.Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { canUserInviteInAllOrganizations, loadingStatus } = this.props;

    if (loadingStatus !== loadingStatuses.FINISHED) {
      return null;
    }

    let hiddenFields = this.props.hiddenFields || {};
    hiddenFields = {
      ...hiddenFields,
      requireOrganization: !canUserInviteInAllOrganizations,
    };

    return (
      <SearchWrapper
        autoSearchWhenStart
        alternativeApi="/invite/api/search-enrolment-session"
        formid="enrolment_session_search"
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        hiddenFields={hiddenFields}
      />
    );
  }
}

const fetchDataConfig = {
  baseUrl: apiUrls.can_user_invite_in_all_organizations,
  keyState: 'can_user_invite_in_all_organizations',
  propKey: 'canUserInviteInAllOrganizations',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
};

export default fetchData(fetchDataConfig)(SearchInvite);
