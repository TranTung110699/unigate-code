import React, { Component } from 'react';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import lodashGet from 'lodash.get';
import sApiUrls from 'components/admin/survey/endpoints';
import ReportAsTable from '../../../survey/mainstage/dashboard/widget/survey-statistics/views/ReportAsTable';

class WidgetStatistics extends Component {
  render() {
    const { node } = this.props;

    return (
      <SearchWrapperV2
        {...this.props}
        showResult
        schema={schema}
        hiddenFields={{
          ntype: 'survey',
        }}
        formid={`surveyReport-${lodashGet(node, 'iid')}`}
        alternativeApi={sApiUrls.survey_report_search}
        renderResultsComponent={(items) => {
          return (
            <ReportAsTable
              items={lodashGet(items, 'report')}
              surveyIid={lodashGet(items, 'survey_iid')}
            />
          );
        }}
      />
    );
  }
}

export default WidgetStatistics;
