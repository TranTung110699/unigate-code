import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { formValueSelector } from 'redux-form';

import Results from './Results';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items) => (
    <Results items={items} learningType={this.props.learningType} />
  );

  render() {
    const { orgIids, reportType } = this.props;

    const isReportByOrganization = reportType === 'report-by-organization';
    const title = isReportByOrganization
      ? t2('report_by_organization')
      : t2('report_by_operating_capacity');
    const url = isReportByOrganization
      ? apiUrls.get_report_by_organization
      : apiUrls.get_report_by_operating_capacity;

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={title}>
          <SearchWrapper
            key={reportType}
            formid={reportType}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={url}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  conf: get(state, 'domainInfo.conf'),
  learningType: formValueSelector(get(props, 'match.params.report_type'))(
    state,
    'learning_type',
  ),
  reportType: get(props, 'match.params.report_type'),
});

export default connect(mapStateToProps)(Layout);
