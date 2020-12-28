import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../../PageWrapper';
import { courseModes } from 'configs/constants';

import Results from '../DisplayGrid';

class Rejected extends React.Component {
  renderResultsComponent = (items) => (
    <Results
      items={items}
      mode={courseModes.MODE_REJECTED}
      showDescription={false}
      {...this.props}
    />
  );

  renderLoadingComponent = () => <Loading blackLoadingIcon />;

  paginationProps = {
    itemPerPage: [12],
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  };

  render() {
    const { node } = this.props;

    return (
      <PageWrapper title={t1('rejected_courses')}>
        <SearchWrapper
          formid={'rejected_courses'}
          alternativeApi={apiUrls.dashboard_configs('rejectedCourses')}
          hiddenFields={{ user_iid: node && node.iid }}
          renderResultsComponent={this.renderResultsComponent}
          autoSearchWhenStart={true}
          showSearchButton={false}
          renderLoadingComponent={this.renderLoadingComponent}
          paginationProps={this.paginationProps}
          noResultText={t1('there_are_no_rejected_courses_yet')}
        />
      </PageWrapper>
    );
  }
}

export default Rejected;
