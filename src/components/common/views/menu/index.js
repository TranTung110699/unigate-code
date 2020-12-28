import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import XpeakMenu from 'layouts/xpeak-theme/menu';
import PixelzMenu from 'layouts/pixelz-theme/menu';
import VietedMenu from 'layouts/vieted-theme/menu';
import LotusMenu from 'layouts/lotus-theme/top/menu';

class Menu extends React.Component {
  render() {
    const { themeConfig } = this.props;
    switch (themeConfig.layout) {
      case 'pixelz': {
        return <PixelzMenu {...this.props} />;
      }
      case 'xpeak': {
        return <XpeakMenu {...this.props} />;
      }
      case 'lotus': {
        return <LotusMenu {...this.props} />;
      }
      case 'vieted': {
        return <VietedMenu {...this.props} />;
      }
      default: {
        return null;
      }
    }
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(Menu);
