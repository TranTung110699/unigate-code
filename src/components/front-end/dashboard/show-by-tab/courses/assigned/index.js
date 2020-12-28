import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../../PageWrapper';
import { courseModes } from 'configs/constants';

import Results from '../DisplayGrid';

class Assigned extends React.Component {
  renderResultsComponent = (items) => (
    <Results
      items={items}
      mode={courseModes.MODE_ASSIGNED}
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
      <PageWrapper title={t1('waiting_courses')}>
        <SearchWrapper
          formid={'assigned_courses'}
          alternativeApi={apiUrls.dashboard_configs('assignedCourses')}
          hiddenFields={{ user_iid: node && node.iid }}
          renderResultsComponent={this.renderResultsComponent}
          autoSearchWhenStart={true}
          showSearchButton={false}
          renderLoadingComponent={this.renderLoadingComponent}
          paginationProps={this.paginationProps}
          noResultText={t1('there_are_no_assigned_courses_yet')}
        />
      </PageWrapper>
    );
  }
}

export default Assigned;
