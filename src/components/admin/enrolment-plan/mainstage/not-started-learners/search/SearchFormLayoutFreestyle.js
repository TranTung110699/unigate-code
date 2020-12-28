import React from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import Icon from 'components/common/Icon';

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
        apiUrls.export_enrolment_plan_not_started_learners,
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
      <div>
        <div className="row">
          <RaisedButton
            name="export"
            id="export"
            label={t1('export')}
            className="m-l-10"
            primary
            icon={<Icon icon={'export'} />}
            onClick={this.export}
          />
        </div>
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
