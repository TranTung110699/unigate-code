import React, { Component } from 'react';
import apiUrls from 'api-endpoints/index';
import sApiUrls from 'components/admin/survey/endpoints';
import lodashGet from 'lodash.get';
import Tabs from 'antd/lib/tabs';
import ReportAsTable from './views/ReportAsTable';
import ReportAsChart from './views/ReportAsChart';
import DetailByMember from './views/DetailByMember';
import ChartDailyReport from './views/ChartDailyReport';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './searchSchema';
import { t2 } from 'translate';

class WidgetStatistics extends Component {
  searchForm = (props) => {
    const { node, item, enrolmentPlan } = this.props;

    const hiddenFields = {
      ntype: 'survey',
      survey_iid: lodashGet(node, 'iid'),
      item_iid: lodashGet(item, 'iid'),
      item_ntype: lodashGet(item, 'ntype'),
    };

    if (enrolmentPlan && enrolmentPlan.iid) {
      hiddenFields.enrolment_plan_iid = [enrolmentPlan.iid];
    }

    return (
      <SearchWrapperV2
        {...props}
        showResult
        schema={schema}
        hiddenFields={hiddenFields}
        autoSearchWhenStart
      />
    );
  };

  render() {
    const { node, item } = this.props;

    return (
      <Tabs defaultActiveKey="overview">
        <Tabs.TabPane tab={t2('overview')} key="overview">
          {this.searchForm({
            formid: `surveyReport-${lodashGet(node, 'iid')}`,
            alternativeApi: sApiUrls.survey_report_search,
            renderResultsComponent: (items) => {
              return (
                <ReportAsTable
                  items={lodashGet(items, 'report')}
                  surveyIid={lodashGet(items, 'survey_iid')}
                />
              );
            },
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab={t2('overview_by_chart')} key="overview_by_chart">
          {this.searchForm({
            formid: `surveyReport-${lodashGet(node, 'iid')}`,
            alternativeApi: sApiUrls.survey_report_search,
            renderResultsComponent: (items, { valuesToSubmit }) => {
              return (
                <ReportAsChart
                  questions={lodashGet(items, 'report')}
                  surveyIid={lodashGet(items, 'survey_iid')}
                  paramsToFilter={valuesToSubmit}
                  trainingPlan={
                    lodashGet(item, 'ntype') === 'training_plan' ? item : null
                  }
                />
              );
            },
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab={t2('members_answers')} key="members_answers">
          {this.searchForm({
            formid: `search-members-have-taken-in-${lodashGet(node, 'iid')}`,
            alternativeApi: sApiUrls.search_members_have_taken,
            renderResultsComponent: (items, { valuesToSubmit }) => {
              return <DetailByMember items={items} survey={node} />;
            },
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab={t2('daily_report')} key="daily_report">
          {this.searchForm({
            formid: `daily-report-${lodashGet(node, 'iid')}`,
            alternativeApi: sApiUrls.count_number_of_survey,
            renderResultsComponent: (items) => {
              return (
                <ChartDailyReport items={items} lineKeys={['submit_survey']} />
              );
            },
          })}
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default WidgetStatistics;
