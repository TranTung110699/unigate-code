/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import yearReport from './Results';
import schema from './search-form-schema';
import { t1 } from 'translate';

class Layout extends React.PureComponent {
  renderResultsComponent = (items, props = {}) => {
    return yearReport({ ...(props.objects || {}), items });
  };

  render() {
    let formid = this.props.formid || 'category_group_searchxxxx';

    let hiddenFields = this.props.hiddenFields || {};

    let wrapperClass = '';
    // inside a group
    if (this.props.group) {
      hiddenFields.school__group = [this.props.group.iid];
      wrapperClass = 'display-none';
    }

    hiddenFields.__year_report = 1;
    hiddenFields._sand_step = 'year-report';

    return (
      <div>
        <SearchWrapper
          {...this.props}
          formid={formid}
          alternativeApi={'/user/search'}
          renderResultsComponent={
            this.props.renderResultsComponent || this.renderResultsComponent
          }
          onResultChange={this.props.onResultChange}
          showQueryField={false}
          showSearchButton
          schema={schema}
          hiddenFields={hiddenFields}
          classFormFilter={wrapperClass}
          classWrapper={wrapperClass}
        />
      </div>
    );
  }
}

export default connect()(Layout);
