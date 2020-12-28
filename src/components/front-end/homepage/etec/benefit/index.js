/**
 * Created by DVN on 9/19/2017.
 */
import React, { Component } from 'react';
import Benefit from './items/index';
import BenefitOne from './images/ic-1.png';
import BenefitTwo from './images/ic-2.png';
import BenefitThree from './images/ic-3.png';
import BenefitFore from './images/ic-4.png';

const benefits = [
  {
    name: 'Xác định trình độ Tiếng Anh',
    icon: BenefitOne,
  },
  {
    name: 'Nhận biết điểm mạnh, yếu',
    icon: BenefitTwo,
  },
  {
    name: 'Lên kế hoạch ôn thi phù hợp',
    icon: BenefitThree,
  },
  {
    name: 'Đánh giá quá trình ôn thi',
    icon: BenefitFore,
  },
];

class Layout extends Component {
  render() {
    return (
      <div className="row">
        {benefits.map((item, index) => (
          <Benefit
            key={index}
            className="col-lg-3 col-md-6"
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>
    );
  }
}

export default Layout;
