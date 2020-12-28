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

    let isSocialFunctionGroups = false;
    if (groups.id.fieldNames.type) {
      isSocialFunctionGroups = true;
    }

    const middleLine = { paddingTop: '20px' };

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className={isSocialFunctionGroups ? 'col-md-6' : 'col-md-8'}>
            <div className="col-md-6">{groups.id.fieldNames.text}</div>
            <div className="col-md-6">
              {!isSIS && groups.id.fieldNames.organizations}
            </div>
          </div>
          {isSocialFunctionGroups && (
            <div className="col-md-4">
              {groups.id.fieldNames.type}
              <div className="clearfix" />
            </div>
          )}
          <div
            className={isSocialFunctionGroups ? 'col-md-2' : 'col-md-4'}
            style={middleLine}
          >
            {submitButton}
            <div className="clearfix" />
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
