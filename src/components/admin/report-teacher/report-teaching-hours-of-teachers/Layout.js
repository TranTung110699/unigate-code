import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/admin/report-teacher/common/Card';
import { confSelector } from 'common/selectors';
import { createSelector } from 'reselect';

import { t2 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { menuItems } from '../menu/sub-left-menu-configs';
import searchFormSchema from './schema';
import apiUrls from 'api-endpoints';
import Results from './Results';

const renderResultComponent = (items) => <Results items={items} />;

const ReportTeachingHoursOfTeachers = ({ conf }) => (
  <div>
    <SubLeftMenuContext schema={menuItems({ conf })} />
    <Card title={t2('teaching_hours_of_teachers_search')}>
      <SearchWrapper
        schema={searchFormSchema}
        formid="teaching_hours_of_teachers_search"
        renderResultsComponent={renderResultComponent}
        alternativeApi={apiUrls.get_report_teaching_hours_of_teachers}
      />
    </Card>
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
