import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../../PageWrapper';
import { courseModes } from 'configs/constants';

import Results from '../DisplayGrid';
import Warning from 'components/common/Warning';

class FailedCourses extends React.Component {
  renderResultsComponent = (items) => (
    <Results
      items={items}
      mode={courseModes.MODE_FAILED}
      showDescription={false}
      renderAfter={this.props.renderAfterResult}
      {...this.props}
    />
  );

  renderLoadingComponent = () => <Loading blackLoadingIcon />;

  renderNoResultComponent = () => (
    <div className="col-md-12">
      {' '}
      <Warning>{t1('there_are_no_failed_courses_yet')}</Warning>{' '}
    </div>
  );

  paginationProps = () => ({
    itemPerPage: (this.props.itemsPerPage && [this.props.itemsPerPage]) || [12],
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  });

  render() {
    const { node, itemsPerPage } = this.props;

    return (
      <PageWrapper title={t1('failed_courses')}>
        <SearchWrapper
          formid={this.props.formid || 'failed_courses'}
          alternativeApi={apiUrls.dashboard_configs(
            'failedCourses',
            itemsPerPage || 12,
          )}
          hiddenFields={{
            user_iid: node && node.iid,
            items_per_page: itemsPerPage || 12,
          }}
          renderResultsComponent={this.renderResultsComponent}
          autoSearchWhenStart={true}
          showSearchButton={false}
          renderLoadingComponent={this.renderLoadingComponent}
          paginationProps={this.paginationProps()}
          renderNoResultComponent={this.renderNoResultComponent}
          hidePagination={this.props.hidePagination}
        />
      </PageWrapper>
    );
  }
}

export default FailedCourses;
