import React from 'react';
import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import { createSelector } from 'reselect';

import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import searchFormSchema from './schema';
import apiUrls from 'api-endpoints';
import Results from './Results';

const renderResultComponent = (items) => <Results items={items} />;

const ReportTeachingHoursOfTeachers = ({ conf }) => (
  <div>
    <SearchWrapper
      schema={searchFormSchema}
      formid="teaching_hours_of_teachers_search"
      renderResultsComponent={renderResultComponent}
      alternativeApi={apiUrls.get_report_learning_material_creation}
      autoSearchWhenStart={false}
    />
  </div>
);

const getPropsFromRedux = connect(
  createSelector(
    confSelector,
    (conf) => ({
      conf,
    }),
  ),
);

export default getPropsFromRedux(ReportTeachingHoursOfTeachers);
