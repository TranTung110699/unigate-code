import React from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import Menu from 'layouts/vieted-theme/menu';
import { t1 } from 'translate';
import ScrollableAnchor, {
  configureAnchors,
  goToAnchor,
} from 'react-scrollable-anchor';
import Contact from 'components/front-end/homepage/vieted/contact/index';
import Customers from 'components/front-end/homepage/vieted/customers/index';
import Header from './header';
import Info from './info';
import Products from './products/index';
import ExampleCourses from './courses/index';
import IconProduct from './header/nav/ic-product.png';
import IconProductFocus from './header/nav/ic-product-focus.png';
import IconCustomer from './header/nav/ic-customer.png';
import IconCustomerFocus from './header/nav/ic-customer-focus.png';
import IconService from './header/nav/ic-contact.png';
import IconServiceFocus from './header/nav/ic-contact-focus.png';
import './stylesheet.scss';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  cssClass = 'lotus-home-page';

  render() {
    const width = window.innerWidth;
    const height = width / 1.8;
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
        img: IconService,
        imgFocus: IconServiceFocus,
        onClick: () => {
          goToAnchor('contact');
        },
      },
    ];

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__header`} style={{ height }}>
          <Menu />
          <Header height={height} navItems={headerNavItems} />
        </div>
        <Info />
        <ScrollableAnchor id={'products'}>
          <Products />
        </ScrollableAnchor>
        <ScrollableAnchor id={'example-courses'}>
          <ExampleCourses />
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

const mapStateToProps = (state) => ({
  screenSize: state.common.screenSize,
});

export default connect(mapStateToProps)(Homepage);
