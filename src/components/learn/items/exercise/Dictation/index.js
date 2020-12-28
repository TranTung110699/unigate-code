import React from 'react';
import XpeakAppStore from 'components/front-end/homepage/body/xpeak-appstore';
import './stylesheet.scss';

class Dictation extends React.Component {
  render() {
    return (
      <div className="dictation-container">
        <p className="title-dictation">
          BÀI TẬP LUYỆN ÂM NÀY CHỈ HOẠT ĐỘNG TRÊN MOBILE APP.
        </p>
        <XpeakAppStore title="TẢI ỨNG DỤNG ĐỂ XPEAK PHÂN TÍCH GIỌNG NÓI & CHỈ RÕ CHO BẠN ĐANG NÓI ĐÚNG & SAI ÂM NÀO." />
      </div>
    );
  }
}

export default Dictation;
