import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import { layouts } from 'configs/constants';
import { t3 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import Container from './Container';
import './stylesheet.scss';

class PaymentLayout extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
    window.scrollTo(0, 0);
  }

  render() {
    const { screenSize, themeConfig } = this.props;

    return (
      <div
        className="payment-panel clearfix"
        style={themeConfig.layout === layouts.ETEC ? { marginTop: '10px' } : {}}
      >
        <FlyPanel breakPoint={250}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround
          width={screenSize.width}
          height={250}
          src="/media/images/blog.png"
        >
          <Menu />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>{t3('payment')}</h3>
              </div>
            </div>
          </div>
        </ImageBackGround>
        <Container />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.common.screenSize,
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(PaymentLayout);
