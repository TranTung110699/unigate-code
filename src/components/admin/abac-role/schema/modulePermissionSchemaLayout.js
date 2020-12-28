/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { schoolTypes } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';

class ModulePermissionSchemaLayout extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, readOnly } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div>
        {groups.default.fieldNames && groups.default.fieldNames.accessible}
        {groups.default.fieldNames && groups.default.fieldNames.allowed_actions}
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

export default connect(mapStateToProps)(ModulePermissionSchemaLayout);
