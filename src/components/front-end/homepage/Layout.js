import React from 'react';
import { connect } from 'react-redux';
import { layouts } from 'configs/constants';
import Loadable from 'components/common/async-loader/Loadable';
import { getThemeConfig } from 'utils/selectors';

const PixelzHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pixelz-home-page" */ 'components/front-end/homepage/pixelz'),
});
const VietEdHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "vieted-home-page" */ 'components/front-end/homepage/vieted'),
});
const LotusHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "lotus-home-page" */ 'components/front-end/homepage/lotus'),
});
const EtecHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "etec-home-page" */ 'components/front-end/homepage/etec'),
});
const XpeakHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "xpeak-home-page" */ 'components/front-end/homepage'),
});
const UMSHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ums-home-page" */ 'components/front-end/dashboard/Layout'),
});
const EVNHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "evn-home-page" */ 'components/front-end/homepage/evn'),
});
const GJHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "gj-home-page" */ 'components/front-end/homepage/gojapan'),
});

class HomepageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { themeConfig } = this.props;

    let homeComponent = <XpeakHomePage />;
    switch (themeConfig.layout) {
      case layouts.PIXELZ: {
        homeComponent = <PixelzHomePage />;
        break;
      }
      case layouts.XPEAK: {
        homeComponent = <XpeakHomePage />;
        break;
      }
      case layouts.VIETED: {
        homeComponent = <VietEdHomePage />;
        break;
      }
      case layouts.LOTUS: {
        homeComponent = <LotusHomePage />;
        break;
      }
      case layouts.ETEC: {
        homeComponent = <EtecHomePage />;
        break;
      }
      case layouts.UMS: {
        homeComponent = <UMSHomePage />;
        break;
      }
      case layouts.EVN:
      case layouts.MSI:
      case layouts.VT:
      case layouts.BLUE:
      case layouts.HPU2:
      case layouts.SEABANK: {
        homeComponent = <EVNHomePage />;
        break;
      }
      case layouts.GJ: {
        homeComponent = <GJHomePage />;
        break;
      }
      default: {
        break;
      }
    }

    return <div>{homeComponent}</div>;
  }
}

const mapPropsToState = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapPropsToState)(HomepageLayout);
