/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly, isSIS, isEnterprise } = this.props;
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
          <div className="col-md-2">{groups.id.fieldNames.name}</div>
          <div className="col-md-2" style={{ paddingTop: '33px' }}>
            {groups.id.fieldNames.public}
          </div>
          <div className="col-md-4" style={{ paddingTop: '12px' }}>
            {groups.id.fieldNames.status}
            <div className="clearfix" />
          </div>
          {groups.id.fieldNames.learning_type && (
            <div className="col-md-4" style={{ paddingTop: '12px' }}>
              {groups.id.fieldNames.learning_type}
            </div>
          )}
        </div>

        {groups.id.fieldNames.sub_type && (
          <div className="row">
            <div className="col-md-12">{groups.id.fieldNames.sub_type}</div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            {!isSIS && groups.id.fieldNames.academic_categories}
          </div>
          <div className="col-md-6">
            {!isSIS && groups.id.fieldNames.organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 valign-wrapper" style={middleLine}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default withSchoolConfigs(SearchFormDetailFreestyle);
