import React from 'react';
import { t3 } from 'translate';
import LearnerIcon from './icons8-Graduation-Cap.png';
import ProductIcon from './icons8-Product-Filled.png';
import CustomerIcon from './icons8-User-Filled.png';
import SupportIcon from './icons8-Service-Filled.png';
import './stylesheet.scss';

class InFo extends React.Component {
  cssClass = 'vieted-home-page-info';

  render() {
    const items = [
      {
        name: t3('products'),
        number: '5 +',
        img: ProductIcon,
      },
      {
        name: t3('customers'),
        number: '20 +',
        img: CustomerIcon,
      },
      {
        name: t3('learners'),
        number: '100,000 +',
        img: LearnerIcon,
      },
      {
        name: t3('support'),
        number: '24/7',
        img: SupportIcon,
      },
    ];

    return (
      <div className={this.cssClass}>
        <div className="container">
          <div className={`${this.cssClass}__items`}>
            {items &&
              items.map((item) => (
                <div key={item.name} className={`${this.cssClass}__item`}>
                  <div className={`${this.cssClass}__item-image`}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={`${this.cssClass}__item-number`}>
                    {item.number}
                  </div>
                  <div className={`${this.cssClass}__item-name`}>
                    {item.name}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

InFo.propTypes = {};

InFo.defaultProps = {};

export default InFo;
