import React, { Component } from 'react';
import SurveyReport from 'components/admin/survey/mainstage/dashboard/widget/survey-statistics/views/Report';
import apiUrls from 'api-endpoints/index';
import sApiUrls from 'components/admin/survey/endpoints';
import fetchData from 'components/common/fetchData';

class GroupSurveyChart extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.surveyIid != this.props.surveyIid) {
    }
  }

  render() {
    const { surveyReport } = this.props;
    return (
      <div>
        <SurveyReport surveyReport={surveyReport} />;
      </div>
    );
  }
}

const fetchDataConfig = (props) => ({
  // baseUrl: apiUrls.survey_report_search,
  baseUrl: sApiUrls.survey_report_search,

  refetchCondition: (prevProps) => props.surveyIid !== prevProps.surveyIid,
  params: {
    ntype: 'survey',
    survey_iid: props.surveyIid,
    item_iid: props.groupIid || 1,
    grade: props.grade || 0,
  },
  propKey: 'surveyReport',
  keyState: `survey_report_dashboard_form_${props.surveyIid}`,
});

export default fetchData(fetchDataConfig)(GroupSurveyChart);
