import React from 'react';

class NextArrowButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        data-role="none"
        className="slick-arrow slick-next"
        {...this.props}
      />
    );
  }
}

export default NextArrowButton;
