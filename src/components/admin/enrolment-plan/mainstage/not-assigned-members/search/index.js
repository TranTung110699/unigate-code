import React from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';

const Search = ({ formid, node }) => {
  const renderResultComponent = (items) => {
    return <Results items={items} searchFormId={formid} />;
  };

  return (
    <SearchWrapper
      formid={formid}
      showSearchButton={false}
      alternativeApi={epApiUrls.enrolment_plan_not_assigned_members}
      hiddenFields={{
        enrolment_plan_iid: node && node.iid,
        _sand_expand: ['user_organizations'],
      }}
      renderResultsComponent={renderResultComponent}
      noResultText={t1('no_data')}
      noNeedBackground
    />
  );
};

export default connect()(Search);
