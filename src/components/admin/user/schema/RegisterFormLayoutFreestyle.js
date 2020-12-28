import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Title from '../../../../schema-form/field-set/Title';

class RegisterFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

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
        <Title title={t1('basic_information')} />
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.name}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.birthday}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.sex}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.mail}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.phone}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.ethnicity}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.province}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.district}
          </div>
          <div className="col-md-8 element-item">
            {groups.id.fieldNames.address}
          </div>
        </div>
        <Title title={t1('login_information')} />
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.lname}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.pass}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.pass_retype}
          </div>
        </div>
        <Title title={t1('work_information')} />
        <div className="row">
          <div className="col-md-8 element-item">
            {groups.id.fieldNames.user_organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.positions}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.academic_rank}
          </div>
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.academic_degree}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 element-item">
            {groups.id.fieldNames.other_degrees}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 element-item">
            {groups.id.fieldNames.check_policy}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">{this.props.submitButton}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(RegisterFormLayoutFreestyle);
