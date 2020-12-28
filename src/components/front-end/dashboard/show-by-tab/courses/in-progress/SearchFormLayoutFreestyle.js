/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { schoolTypes } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import styled from 'styled-components';

const Filter = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

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

    const middleLine = { paddingTop: '45px' };

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <Filter>{groups.id.fieldNames.filter_type}</Filter>
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
