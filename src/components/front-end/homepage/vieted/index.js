import React from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import Menu from 'layouts/vieted-theme/menu';
import { t1 } from 'translate';
import ScrollableAnchor, {
  configureAnchors,
  goToAnchor,
} from 'react-scrollable-anchor';
import Header from './header';
import Info from './info';
import Products from './products';
import Customers from './customers';
import Contact from './contact';
import IconProduct from './resources/ic-product.png';
import IconContact from './resources/ic-contact.png';
import IconCustomer from './resources/ic-customer.png';
import IconProductFocus from './resources/ic-product-focus.png';
import IconContactFocus from './resources/ic-contact-focus.png';
import IconCustomerFocus from './resources/ic-customer-focus.png';
import './stylesheet.scss';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  cssClass = 'vieted-home-page';

  render() {
    configureAnchors({ offset: -20 });

    const headerNavItems = [
      {
        name: t1('products'),
        img: IconProduct,
        imgFocus: IconProductFocus,
        onClick: () => {
          goToAnchor('products');
        },
      },
      {
        name: t1('customers'),
        img: IconCustomer,
        imgFocus: IconCustomerFocus,
        onClick: () => {
          goToAnchor('customers');
        },
      },
      {
        name: t1('contact'),
        img: IconContact,
        imgFocus: IconContactFocus,
        onClick: () => {
          goToAnchor('contact');
        },
      },
    ];

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__header`}>
          <Menu />
          <Header navItems={headerNavItems} />
        </div>
        <ScrollableAnchor id={'info'}>
          <Info />
        </ScrollableAnchor>
        <ScrollableAnchor id={'products'}>
          <Products />
        </ScrollableAnchor>
        <ScrollableAnchor id={'customers'}>
          <Customers />
        </ScrollableAnchor>
        <ScrollableAnchor id={'contact'}>
          <Contact />
        </ScrollableAnchor>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  userInfo: state.user.info,
  screenSize: state.common.screenSize,
});

export default connect(mapPropsToState)(Homepage);
