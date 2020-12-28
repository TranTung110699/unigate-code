import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import UserResults from './SearchResults';
import searchSchema from './search-schema';

const AssessInOrganization = ({
  user = {},
  peerssAsignedToAssessment = [],
  userRoot = {},
  assignPeersToAssess,
}) => {
  return (
    <SearchWrapper
      resetForm
      hiddenFields={{
        _sand_step: 'students',
        nin_iid: [user && user.iid, userRoot && userRoot.iid].concat(
          peerssAsignedToAssessment.map(({ iid }) => iid),
        ),
        _sand_expand: ['user_organizations', 'positions', 'phongbans'],
      }}
      step="students"
      formid="search-users-to-assign"
      renderResultsComponent={(items) => (
        <UserResults items={items} assignPeersToAssess={assignPeersToAssess} />
      )}
      schema={searchSchema}
      showResult={true}
      alternativeApi="/user/api/search"
      autoSearchWhenStart
      paginationProps={{
        theme: 'light',
      }}
    />
  );
};

export default AssessInOrganization;
