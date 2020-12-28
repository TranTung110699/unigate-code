import React from 'react';

class PrevArrowButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        data-role="none"
        className="slick-arrow slick-prev"
        {...this.props}
      />
    );
  }
}

export default PrevArrowButton;
