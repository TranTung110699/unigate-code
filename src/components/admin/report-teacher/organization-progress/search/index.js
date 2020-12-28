import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import { userOrgIids } from 'common/selectors';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema';

const renderResultsComponent = (items, props, objects) => (
  <Results items={items} objects={objects} />
);

const Layout = ({ className, orgIids, enrolmentPlanIids, noSearchForm }) => {
  if (!orgIids) {
    return <Loading />;
  }

  let hiddenFields = {
    orgIids,
  };

  if (enrolmentPlanIids) {
    hiddenFields = {
      ...hiddenFields,
      enrolment_plan_iids: enrolmentPlanIids,
    };
  }

  return (
    <SearchWrapper
      className={className}
      formid="organization_progress"
      renderResultsComponent={renderResultsComponent}
      showSearchButton={!noSearchForm}
      schema={noSearchForm ? undefined : schema}
      alternativeApi={apiUrls.get_organization_progress}
      hiddenFields={hiddenFields}
    />
  );
};

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
  orgIids: userOrgIids(state),
});

export default connect(mapStateToProps)(Layout);
