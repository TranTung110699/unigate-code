/**
 * Component specifically for DHSP1: liệt kê các course trong 1 EP nhưng group theo tag
 */
import React from 'react';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';

import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PageWrapper from 'components/front-end/dashboard/show-by-tab/PageWrapper';
import lodashGet from 'lodash.get';
import Results from './DisplayGrid';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import PublicCoursesSearch from 'components/front-end/dashboard/show-by-tab/courses/public/search';
import TagColors from '../../../../../../learn/viewer/TagColors';

const tagGroups = window.TAG_GROUPS;
const getTagColor = (tag) => lodashGet(window.TAG_COLORS, [tag, 'color']);

const renderLoadingComponent = () => <Loading blackLoadingIcon />;

const renderNoResultComponent = () => (
  <div className="col-md-12">
    {' '}
    <Warning>{t1('there_are_no_enrolment_plans_yet')}</Warning>{' '}
  </div>
);

const renderResultsComponent = (items) => {
  return <Results items={items} />;
};

const CoursesInTagGroup = ({ enrolmentPlan, tagsInGroup }) => {
  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');
  const searchFormId = `my_enrolment_plans_${enrolmentPlanIid}_${tagsInGroup}`;

  const hiddenFields = React.useMemo(
    () => ({
      items_per_page: -1,
      enrolment_plan_iid: enrolmentPlanIid,
      tags_in: tagsInGroup,
    }),
    [enrolmentPlanIid, tagsInGroup],
  );

  return (
    <SearchWrapper
      formid={searchFormId}
      alternativeApi={apiUrls.get_student_courses_in_enrolment_plan}
      hiddenFields={hiddenFields}
      renderResultsComponent={renderResultsComponent}
      showSearchButton={false}
      autoSearchWhenStart={true}
      renderLoadingComponent={renderLoadingComponent}
      renderNoResultComponent={renderNoResultComponent}
      autoSearchWhenValuesChange
    />
  );
};

const CoursesOfEnrolmentPlanGroupByTag = ({ enrolmentPlan }) => {
  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');
  const enrolmentPlanName = lodashGet(enrolmentPlan, 'name');

  if (!enrolmentPlan) {
    return null;
  }

  return (
    <div>
      <PageWrapper title={enrolmentPlanName}>
        <div className="p-l-20 p-b-10">
          <TagColors />
        </div>

        {(tagGroups || []).map((tg, tgIndex) => {
          const tagsInGroup = lodashGet(tg, 'tags');
          if (!Array.isArray(tagsInGroup) || tagsInGroup.length === 0) {
            return null;
          }

          const headerColor = getTagColor(tagsInGroup[0]);
          const label = lodashGet(tg, 'label');
          const hasPublicCourses = lodashGet(tg, 'hasPublicCourses');

          return (
            <React.Fragment key={tgIndex}>
              <div className="col-md-12 p-0" style={{ overflow: 'auto' }}>
                <h2 className="m-t-30 p-l-15" style={{ color: headerColor }}>
                  {label}
                </h2>
                <CoursesInTagGroup
                  enrolmentPlan={enrolmentPlan}
                  tagsInGroup={tagsInGroup}
                />
              </div>
              {hasPublicCourses && (
                <div className="col-md-12 p-0" style={{ overflow: 'auto' }}>
                  <h2
                    className="m-t-30 p-l-15"
                    style={{ fontSize: 18, color: headerColor }}
                  >
                    {t1('other_public_courses')}
                  </h2>
                  <PublicCoursesSearch
                    tagsIn={tagsInGroup}
                    excludeCreditSyllabusesInEnrolmentPlans={[enrolmentPlanIid]}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </PageWrapper>
    </div>
  );
};

const fetchEnrolmentPlanInfo = fetchData(({ enrolmentPlanIid }) => ({
  baseUrl: epApiUrls.get_enrolment_plan_info,
  fetchCondition: enrolmentPlanIid,
  params: {
    iid: enrolmentPlanIid,
  },
  propKey: 'enrolmentPlan',
  shouldRenderLoading: true,
  renderLoadingComponent,
}));

export default fetchEnrolmentPlanInfo(CoursesOfEnrolmentPlanGroupByTag);
