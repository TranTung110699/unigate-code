import React, { Component } from 'react';
import apiUrls from 'api-endpoints/index';
import sApiUrls from 'components/admin/survey/endpoints';
import Report from 'components/admin/survey/mainstage/dashboard/widget/survey-statistics/views/Report';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';
import { Element } from 'schema-form/elements';
import sagaActions from 'actions/node/saga-creators';

class SurveyReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveyReport: {},
    };
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.onSurveyChanged = this.onSurveyChanged.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  // get select box data
  fetchOptionsData() {
    const { id, dispatch, node } = this.props;
    const fieldName = 'survey_search';

    const params = {
      item_iid: node.iid,
    };
    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, id, params));
  }

  onSurveyChanged = (value) => {
    const { node, dispatch } = this.props;
    const params = {
      survey_iid: value,
      item_iid: node.iid,
    };
    const url = sApiUrls.survey_report_search;
    const keyState = `survey_${value}_by_course_${node.iid}`;

    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          keyState,
          executeOnSuccess: (res) => {
            this.setState({ surveyReport: res });
          },
        },
        params,
      ),
    );
  };

  render() {
    const { surveys } = this.props;
    const { surveyReport } = this.state;
    let chart = <div />;
    if (surveyReport.report) {
      chart = <Report surveyReport={surveyReport} />;
    }

    return (
      <div id="container">
        <div className="row">
          <div className="col-md-10">
            <Element
              schema={{
                type: 'select',
                name: 'survey',
                floatingLabelText: t1('survey'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: surveys,
                onChange: (evt, value) => {
                  this.onSurveyChanged(value);
                },
              }}
            />
          </div>
        </div>

        <div className="chart">{chart}</div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let surveys = [
    {
      value: '',
      primaryText: t1('select'),
    },
  ];

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.survey_search) {
      surveys = surveys.concat(config.survey_search);
    }
  }

  return { surveys };
}

export default reduxForm({ form: 'survey_search_form' })(
  connect(mapStateToProps)(SurveyReport),
);
