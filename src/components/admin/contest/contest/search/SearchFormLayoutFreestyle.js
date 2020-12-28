/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { schoolTypes } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly, isSIS } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-8 align-top">
            <div className="row">
              <div className="col-md-6 align-top">
                {groups.id.fieldNames.name}
              </div>
              <div className="col-md-6 align-top">
                {groups.id.fieldNames.code}
              </div>
            </div>
            {!isSIS && (
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12 align-top">
                    {groups.id.fieldNames.organizations}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 align-top">
                    {groups.id.fieldNames.include_sub_organizations}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 align-top">
                    {
                      groups.id.fieldNames
                        .include_items_from_ancestor_organizations
                    }
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="col-md-4">
            {groups.id.fieldNames.status}
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const themeConfig = getThemeConfig(state);

  return {
    isSIS: themeConfig && themeConfig.type === schoolTypes.SIS,
  };
};

export default connect(mapStateToProps)(SearchFormDetailFreestyle);
