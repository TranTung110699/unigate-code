import React, { Component } from 'react';
import AntdCard from 'antd/lib/card';
import './stylesheet.scss';

class Card extends Component {
  render() {
    return (
      <AntdCard
        className={`${
          this.props.className ? this.props.className : ''
        } admin-report-card`}
        {...this.props}
      />
    );
  }
}

export default Card;
