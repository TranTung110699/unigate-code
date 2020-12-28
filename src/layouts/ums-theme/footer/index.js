import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import DefaultFooter from './default-footer';

class Footer extends React.Component {
  render() {
    const { themeConfig } = this.props;
    return <DefaultFooter />;
    /*  if (themeConfig.school === schoolsOfTheme.WU) {
      return (
        <WuFooter />
      );
    }
    return (
      <ApcFooter />
    ); */
  }
}

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(Footer);
