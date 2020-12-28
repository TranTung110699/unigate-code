import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../../PageWrapper';
import { SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE } from 'configs/constants';
import schema from './schema';
import Warning from 'components/common/Warning';
import NoResult from './NoResult';
import lGet from 'lodash.get';
import { connect } from 'react-redux';
import { ChildrenItem as Item } from 'components/front-end/dashboard/show-by-tab/enrolment-plans/DisplayList/Item';
import 'components/front-end/dashboard/show-by-tab/enrolment-plans/DisplayList/style.scss';

class InProgress extends React.Component {
  renderResultsComponent = (items) => {
    const { rootPathIid, renderAfterResult } = this.props;

    if (items && items.length) {
      return (
        <div className="my-enrolment-plan-container">
          {items.map((item) => (
            <Item item={item} rootPathIid={rootPathIid} showFullWidth />
          ))}
          {renderAfterResult && typeof renderAfterResult === 'function'
            ? renderAfterResult()
            : null}
        </div>
      );
    }
    return <div />;
  };

  renderLoadingComponent = () => <Loading blackLoadingIcon />;

  renderNoResultComponent = () => <NoResult />;

  paginationProps = () => ({
    itemPerPage: (this.props.itemsPerPage && [this.props.itemsPerPage]) || [12],
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  });

  renderNoResultComponentIfNotShowPublicCourses = () => (
    <div className="col-md-12">
      {' '}
      <Warning>{t1('there_are_no_in_progress_courses_yet')}</Warning>{' '}
    </div>
  );

  render() {
    const { node, notShowPublicCoursesIfNoResult, itemsPerPage } = this.props;

    return (
      <PageWrapper title={t1('in_progress_courses')}>
        <SearchWrapper
          formid={this.props.formid || 'in-progress_courses'}
          alternativeApi={apiUrls.dashboard_configs(
            'coursesInProgress',
            itemsPerPage || 12,
          )}
          hiddenFields={{
            user_iid: node && node.iid,
            seconds_to_start_alert: SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE,
            items_per_page: itemsPerPage || 12,
          }}
          renderResultsComponent={this.renderResultsComponent}
          showSearchButton={false}
          autoSearchWhenStart={true}
          renderLoadingComponent={this.renderLoadingComponent}
          renderNoResultComponent={
            notShowPublicCoursesIfNoResult
              ? this.renderNoResultComponentIfNotShowPublicCourses
              : this.renderNoResultComponent
          }
          paginationProps={this.paginationProps()}
          schema={this.props.noSchema ? undefined : schema}
          autoSearchWhenValuesChange
          hidePagination={this.props.hidePagination}
        />
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { rootPathIid: lGet(state, 'learn.rootPathIid') };
};

export default connect(mapStateToProps)(InProgress);
