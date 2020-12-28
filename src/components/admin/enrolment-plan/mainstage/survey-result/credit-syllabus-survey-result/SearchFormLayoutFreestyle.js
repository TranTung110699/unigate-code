import React from 'react';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import ButtonNew from './new/ButtonNew';

class SearchFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  style = { background: 'white' };

  export = () => {
    const { dispatch, formValues } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_enrolment_plan_credits_overall_progress,
        formValues,
      ),
    );
  };

  render() {
    const { groups, message, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div style={this.style} className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.survey_iid}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.batch_insert_id}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {submitButton}
            <div className="m-l-10 ui-form-control">
              <ButtonNew node={this.props.node} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
