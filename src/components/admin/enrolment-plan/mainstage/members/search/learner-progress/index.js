import React from 'react';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import Results from './Results';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';

const renderLoadingComponent = () => <Loading blackLoadingIcon />;

const CoursesOfEnrolmentPlan = ({ enrolmentPlan, user_iid = null }) => {
  const renderResultsComponentDefault = React.useCallback((items) => {
    return <Results items={items} />;
  }, []);

  const paginationProps = React.useMemo(
    () => ({
      showExtraControl: false,
      position: 'center',
      theme: 'light',
    }),
    [],
  );

  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');

  const hiddenField = React.useMemo(
    () => ({
      user_iid,
      enrolment_plan_iid: enrolmentPlanIid,
    }),
    [enrolmentPlanIid, user_iid],
  );

  if (!enrolmentPlan) {
    return null;
  }

  const searchForm = (
    <SearchWrapper
      formid={`my_enrolment_plans_${enrolmentPlanIid || '__'}`}
      alternativeApi={epApiUrls.get_student_courses_progress_in_enrolment_plan}
      hiddenFields={hiddenField}
      renderResultsComponent={renderResultsComponentDefault}
      showSearchButton={false}
      autoSearchWhenStart={true}
      renderLoadingComponent={renderLoadingComponent}
      hidePagination
      paginationProps={paginationProps}
      autoSearchWhenValuesChange
    />
  );
  return searchForm;
};

const fetchEnrolmentPlanInfo = fetchData(({ enrolmentPlanIid }) => ({
  baseUrl: epApiUrls.get_enrolment_plan_info,
  fetchCondition: !!enrolmentPlanIid,
  params: {
    iid: enrolmentPlanIid,
  },
  propKey: enrolmentPlanIid ? 'enrolmentPlan' : null,
  shouldRenderLoading: true,
  renderLoadingComponent,
}));

export default fetchEnrolmentPlanInfo(CoursesOfEnrolmentPlan);
