import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';

class SearchFormLayout extends React.PureComponent {
  export = () => {
    const { dispatch, formValues } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        '/report/api/export-credit-transfert',
        formValues || {},
      ),
    );
  };

  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          {groups.id.fieldNames.form_of_training}
          <div className="col-md-4">{groups.id.fieldNames.credit_syllabus}</div>
          <div className="col-md-4">{groups.id.fieldNames.student}</div>
          <div className="col-md-2 m-t-20 text-center">{submitButton}</div>
          <div className="col-md-2 m-t-20 text-center">
            <div className="ui-form-control">
              <RaisedButton
                name="export"
                label={t1('export')}
                primary
                icon={<Icon icon={'export'} />}
                onClick={this.export}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
