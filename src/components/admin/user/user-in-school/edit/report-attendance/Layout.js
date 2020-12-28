import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import get from 'lodash.get';

import Results from './Results';
import schema from './schema-form';

const formid = 'report-attendance';

class Layout extends Component {
  renderResultComponent = (items) => (
    <Results items={items} userIid={get(this.props, 'user.iid')} />
  );

  render() {
    const { user } = this.props;
    const hiddenFields = {
      user_iid: user && user.iid,
    };

    return (
      <SearchWrapper
        formid={formid}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton
        schema={schema}
        alternativeApi={apiUrls.report_attendance_by_user}
        hiddenFields={hiddenFields}
      />
    );
  }
}

export default Layout;
