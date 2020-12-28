import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Button from 'components/common/primary-button';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  exportAbnormalAccounts() {
    const { formid, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_abnormal_accounts,
        form[formid].values,
      ),
    );
  }

  render() {
    const { groups, message, readOnly } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.code}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.code_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.name_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.mail}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.mail_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.top_equivalent_position}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.top_equivalent_position_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.equivalent_position}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.equivalent_position_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.job_position}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.job_position_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.organization}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.organization_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.phongban}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.phongban_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.include_sub_organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b-15 p-t-15">
            <Button
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'search'} />}
              label={t1('search')}
              primary
            />
            <Button
              name="export"
              id="export"
              label={t1('export')}
              className="m-l-10"
              primary
              icon={<Icon icon={'export'} />}
              onClick={() => {
                this.exportAbnormalAccounts();
              }}
            />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(SearchFormDetailFreestyle);
