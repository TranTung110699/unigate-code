import React from 'react';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Loading from 'components/common/loading';
import PageWrapper from '../../PageWrapper';
import { courseModes } from 'configs/constants';

import Results from '../DisplayGrid';
import Warning from 'components/common/Warning';

class CompulsoryCourses extends React.Component {
  renderResultsComponent = (items) => (
    <Results
      items={items}
      mode={courseModes.MODE_COMPULSORY}
      showDescription={false}
      {...this.props}
    />
  );

  renderLoadingComponent = () => <Loading blackLoadingIcon />;

  renderNoResultComponent = () => (
    <div className="col-md-12">
      {' '}
      <Warning>{t1('there_are_no_compulsory_courses_yet')}</Warning>{' '}
    </div>
  );

  paginationProps = {
    itemPerPage: [12],
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  };

  render() {
    const { node } = this.props;

    return (
      <PageWrapper title={t1('compulsory_courses')}>
        <SearchWrapper
          formid={'compulsory_courses'}
          alternativeApi={apiUrls.dashboard_configs('compulsoryCourses')}
          hiddenFields={{ user_iid: node && node.iid }}
          renderResultsComponent={this.renderResultsComponent}
          autoSearchWhenStart={true}
          showSearchButton={false}
          renderLoadingComponent={this.renderLoadingComponent}
          paginationProps={this.paginationProps}
          renderNoResultComponent={this.renderNoResultComponent}
        />
      </PageWrapper>
    );
  }
}

export default CompulsoryCourses;
