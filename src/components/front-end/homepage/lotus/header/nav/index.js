import React from 'react';
import PropTypes from 'prop-types';
import IconProduct from './ic-product.png';
import IconService from './ic-service.png';
import IconCustomer from './ic-customer.png';
import IconProductFocus from './ic-product-focus.png';
import IconServiceFocus from './ic-service-focus.png';
import IconCustomerFocus from './ic-customer-focus.png';
import './stylesheet.scss';

class Nav extends React.Component {
  cssClass = 'lotus-home-page-nav';

  render() {
    const { items } = this.props;
    return (
      <div className={`pull-right ${this.cssClass}`}>
        {items &&
          items.map(
            (item) =>
              item && (
                <div
                  key={item.name}
                  className={`${this.cssClass}__item`}
                  onClick={item.onClick}
                >
                  <div className={`${this.cssClass}__item-name`}>
                    {item.name}
                  </div>
                  <div
                    className={`${this.cssClass}__item-image ${
                      this.cssClass
                    }__item-image--normal`}
                  >
                    <div>
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                  <div
                    className={`${this.cssClass}__item-image ${
                      this.cssClass
                    }__item-image--focus`}
                  >
                    <div>
                      <img src={item.imgFocus} alt={item.name} />
                    </div>
                  </div>
                </div>
              ),
          )}
      </div>
    );
  }
}

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      img: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

Nav.defaultProps = {
  items: [
    {
      name: 'Products',
      img: IconProduct,
      imgFocus: IconProductFocus,
      onClick: () => {},
    },
    {
      name: 'Services',
      img: IconService,
      imgFocus: IconServiceFocus,
      onClick: () => {},
    },
    {
      name: 'Customers',
      img: IconCustomer,
      imgFocus: IconCustomerFocus,
      onClick: () => {},
    },
  ],
};

export default Nav;
