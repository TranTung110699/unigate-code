import React from 'react';
import { t3 } from 'translate';
import IconCustomers from './Icon-Customers-Info.png';
import IconCourses from './Icon-Courses-Info.png';
import IconLearners from './Icon-Learners-Info.png';
import IconSupport from './Icon-Support-Info.png';
import './stylesheet.scss';

class InFo extends React.Component {
  cssClass = 'lotus-home-page-info';

  render() {
    const items = [
      {
        name: t3('customers'),
        number: '10 +',
        img: IconCustomers,
      },
      {
        name: t3('courses'),
        number: '200 +',
        img: IconCourses,
      },
      {
        name: t3('learners'),
        number: '50,000 +',
        img: IconLearners,
      },
      {
        name: t3('support'),
        number: '24/7',
        img: IconSupport,
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
