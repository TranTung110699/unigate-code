/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { allCreditSyllabusesAreOnlineOnly } from 'common/conf';

class SyllabusSearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const {
      groups,
      message,
      readOnly,
      allCreditSyllabusesAreOnlineOnlyConfig,
    } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    const middleLine = { paddingTop: '45px' };

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}

        <div className="row">
          <div className="col-md-4">{groups.id.fieldNames.name}</div>
          <div className="col-md-6" style={{ paddingTop: '12px' }}>
            {groups.id.fieldNames.status}
            <div className="clearfix" />
          </div>
        </div>

        <div className="row">
          {groups.id.fieldNames.sub_type && (
            <div className="col-md-4">{groups.id.fieldNames.sub_type}</div>
          )}
          {groups.id.fieldNames.online_only &&
            !allCreditSyllabusesAreOnlineOnlyConfig && (
              <div className="col-md-4">
                {groups.id.fieldNames.online_only}
                <div className="clearfix" />
              </div>
            )}
        </div>

        <div className="row">
          <div className="col-md-6">
            {groups.id.fieldNames.organizations}
            {groups.id.fieldNames.include_sub_organizations}
            {groups.id.fieldNames.shareable}
          </div>
          <div className="col-md-4">
            {groups.id.fieldNames.academic_categories}
          </div>
          <div className="clearfix" />
        </div>

        {groups.sb && groups.sb.fieldNames && (
          <div className="row">
            <div className="col-md-4">{groups.sb.fieldNames.level}</div>
            <div className="col-md-4">
              {groups.sb.fieldNames.job_position_codes}
            </div>
            <div className="col-md-4">{groups.sb.fieldNames.tags}</div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12 valign-wrapper" style={middleLine}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCreditSyllabusesAreOnlineOnlyConfig: allCreditSyllabusesAreOnlineOnly(
      state.domainInfo,
    ),
  };
};

export default connect(mapStateToProps)(SyllabusSearchFormDetailFreestyle);
