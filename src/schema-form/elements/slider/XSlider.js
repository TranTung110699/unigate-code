/**
 * Created by vohung on 12/05/2017.
 */
import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import './Slider.scss';

class XSlider extends Component {
  render() {
    const { label, style, inline } = this.props;
    const optionSlider = {
      ...this.props,
      style: {
        display: 'inline-block',
      },
    };
    const classLabel = inline ? 'slider-inline-element' : 'slider-element';
    return (
      <div className="slider">
        <div className={`${classLabel}`}>
          <span className="slider-label"> {label}: </span>
          <Slider className="slider-content" {...this.props} />
        </div>
        <span className="clear" />
      </div>
    );
  }
}

export default XSlider;
