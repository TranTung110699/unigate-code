import React from 'react';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../PageWrapper';
import Warning from 'components/common/Warning';
import Results from './DisplayGrid';
import lodashGet from 'lodash.get';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { connect } from 'react-redux';
import { layouts } from 'configs/constants';
import DisplayList from './DisplayList/index';
import UserInfoOnTop from './user-info-on-top';
import Perm from 'common/utils/Perm';
import Button from '../../../common/button';

const renderLoadingComponent = () => <Loading blackLoadingIcon />;

const renderNoResultComponent = () => (
  <div className="col-md-12">
    <Warning>{t1('there_are_no_enrolment_plans_yet')}</Warning>{' '}
  </div>
);

const EnrolmentPlans = (props) => {
  const {
    itemsPerPage,
    formid,
    hidePagination,
    renderAfterResult,
    user,
    viewOnly,
  } = props;
  const renderResultsComponent = React.useCallback(
    (items) => {
      return (
        <Results
          items={items}
          renderAfter={renderAfterResult}
          viewOnly={viewOnly}
        />
      );
    },
    [renderAfterResult, viewOnly],
  );

  const renderResultsGJ = React.useCallback(
    (items) => {
      return (
        <DisplayList
          items={items}
          renderAfter={renderAfterResult}
          viewOnly={viewOnly}
        />
      );
    },
    [renderAfterResult, viewOnly],
  );

  const paginationProps = React.useMemo(
    () => ({
      itemPerPage: (itemsPerPage && [itemsPerPage]) || [12],
      showExtraControl: false,
      position: 'center',
      theme: 'light',
    }),
    [itemsPerPage],
  );

  if (props.layout === layouts.GJ && !props.compact) {
    return (
      <>
        {Perm.isGuest() ? (
          <div className="text-center">
            <Link to={'/user/login'}>
              <Button type="primary" icon="user">
                {t1('login')}
              </Button>
            </Link>
          </div>
        ) : (
          <UserInfoOnTop user={user} />
        )}
        <SearchWrapper
          formid={formid || 'my_enrolment_plans'}
          alternativeApi={apiUrls.get_student_enrolment_plans_by_iid}
          hiddenFields={{
            user_iid: lodashGet(user, 'iid'),
            only_get_allowed_to_learn_courses: 1,
          }}
          renderResultsComponent={renderResultsGJ}
          showSearchButton={false}
          autoSearchWhenStart={true}
          // renderLoadingComponent={renderLoadingComponent}
          renderNoResultComponent={renderNoResultComponent}
          paginationProps={paginationProps}
          autoSearchWhenValuesChange
          hidePagination={hidePagination}
          showResult
        />
      </>
    );
  }

  return (
    <PageWrapper title={t1('my_enrolment_plans')}>
      <SearchWrapper
        formid={formid || 'my_enrolment_plans'}
        alternativeApi={apiUrls.get_student_enrolment_plans}
        hiddenFields={{
          items_per_page: itemsPerPage || 12,
          user_iid: lodashGet(user, 'iid'),
        }}
        renderResultsComponent={renderResultsComponent}
        showSearchButton={false}
        autoSearchWhenStart={true}
        renderLoadingComponent={renderLoadingComponent}
        renderNoResultComponent={renderNoResultComponent}
        paginationProps={paginationProps}
        autoSearchWhenValuesChange
        hidePagination={hidePagination}
      />
    </PageWrapper>
  );
};

export default connect()(withSchoolConfigs(EnrolmentPlans));
