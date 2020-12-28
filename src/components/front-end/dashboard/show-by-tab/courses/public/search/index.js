import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import { courseModes } from 'configs/constants';
import schema from './schema';

import Results from 'components/front-end/dashboard/show-by-tab/courses/DisplayGrid';
import Warning from 'components/common/Warning';

const renderLoadingComponent = () => <Loading blackLoadingIcon />;

const renderNoResultComponent = () => (
  <div className="col-md-12">
    {' '}
    <Warning>{t1('there_are_no_public_courses_yet')}</Warning>{' '}
  </div>
);

const paginationProps = {
  itemPerPage: [12],
  showExtraControl: false,
  position: 'center',
  theme: 'light',
};

const Public = ({
  node,
  viewUserIid,
  display,
  tagsIn,
  excludeCreditSyllabusesInEnrolmentPlans,
}) => {
  const renderResultsComponent = React.useCallback(
    (items) => (
      <Results
        items={items}
        mode={courseModes.MODE_PUBLIC}
        hasAction={false}
        node={node}
        viewUserIid={viewUserIid}
        display={display}
      />
    ),
    [node, viewUserIid, display],
  );

  const hiddenFields = {
    user_iid: node && node.iid,
    _sand_expand: ['academic_categories'],
    tags_in: tagsIn,
    exclude_credit_syllabuses_in_enrolment_plans: excludeCreditSyllabusesInEnrolmentPlans,
  };

  return (
    <SearchWrapper
      formid={'public_courses'}
      alternativeApi={apiUrls.dashboard_configs('publicCourses')}
      hiddenFields={hiddenFields}
      autoSearchWhenStart={true}
      renderResultsComponent={renderResultsComponent}
      showSearchButton={false}
      renderLoadingComponent={renderLoadingComponent}
      paginationProps={paginationProps}
      renderNoResultComponent={renderNoResultComponent}
      schema={schema}
    />
  );
};

export default Public;
