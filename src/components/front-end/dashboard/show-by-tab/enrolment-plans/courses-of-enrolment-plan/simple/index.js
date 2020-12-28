import React from 'react';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';

import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from 'components/front-end/dashboard/show-by-tab/PageWrapper';
import Warning from 'components/common/Warning';
import Results from './DisplayGrid';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import EpScore from './Score';

const renderLoadingComponent = () => <Loading blackLoadingIcon />;

const renderNoResultComponent = () => (
  <div className="col-md-12">
    {' '}
    {!window.isETEP ? (
      <Warning>{t1('there_are_no_enrolment_plans_yet')}</Warning>
    ) : (
      <Result
        status="warning"
        subTitle={
          <Warning>
            Bạn chưa được tham gia vào chương trình tập huấn theo lịch của đơn
            vị tổ chức đào tạo.
            <br />
            Vui lòng đợi email để nhận thông báo tiếp theo!
          </Warning>
        }
        extra={
          <Link to="/dashboard">
            <Button type="primary" key="home">
              Trang học tập
            </Button>
          </Link>
        }
      />
    )}
  </div>
);

const CoursesOfEnrolmentPlan = ({
  enrolmentPlan,
  renderResultsComponent = null,
  itemsPerPage = 12,
  user_iid = null,
  searchOnly = false,
}) => {
  const renderResultsComponentDefault = React.useCallback((items, props) => {
    const total = lodashGet(props, 'total');
    const enrolmentPlanIid = lodashGet(props, 'formValues.enrolment_plan_iid');

    return (
      <div>
        {lodashGet(props, 'enrolmentPlan.rubric_iid') &&
          total &&
          total > 0 &&
          enrolmentPlanIid && (
            <EpScore enrolmentPlan={lodashGet(props, 'enrolmentPlan')} />
          )}

        <Results items={items} />
      </div>
    );
    //
    // return (<div className="container-fluid">
    //   <div className="row">
    //     {
    //       rubricIid && total && total > 0 && enrolmentPlanIid && (
    //         <div className="col-md-4">
    //           <RubricScore itemIid={enrolmentPlanIid} itemNtype="enrolment-plan" />
    //         </div>
    //       )
    //     }
    //     <div className={`col-md-${width}`}>
    //       <Results items={items} />
    //     </div>
    //   </div>
    // </div>);
  }, []);

  const paginationProps = React.useMemo(
    () => ({
      itemPerPage: [itemsPerPage],
      showExtraControl: false,
      position: 'center',
      theme: 'light',
    }),
    [itemsPerPage],
  );

  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');
  const enrolmentPlanName = lodashGet(enrolmentPlan, 'name');

  const hiddenField = React.useMemo(
    () => ({
      user_iid,
      items_per_page: itemsPerPage,
      enrolment_plan_iid: enrolmentPlanIid,
    }),
    [enrolmentPlanIid, user_iid, itemsPerPage],
  );

  if (!enrolmentPlan) {
    return null;
  }

  const searchForm = (
    <SearchWrapper
      formid={`my_enrolment_plans_${enrolmentPlanIid || '__'}`}
      alternativeApi={apiUrls.get_student_courses_in_enrolment_plan}
      hiddenFields={hiddenField}
      renderResultsComponent={
        renderResultsComponent || renderResultsComponentDefault
      }
      showSearchButton={false}
      autoSearchWhenStart={true}
      renderLoadingComponent={renderLoadingComponent}
      renderNoResultComponent={renderNoResultComponent}
      hidePagination={itemsPerPage === -1}
      paginationProps={paginationProps}
      enrolmentPlan={enrolmentPlan}
      autoSearchWhenValuesChange
    />
  );
  return searchOnly ? (
    searchForm
  ) : (
    <PageWrapper title={enrolmentPlanName}>{searchForm}</PageWrapper>
  );
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
