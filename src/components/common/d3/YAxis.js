import React from 'react';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import PropTypes from 'prop-types';

class YAxis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderAxis = this.renderAxis.bind(this);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const { scale } = this.props;
    const axis = axisLeft(scale).ticks(null, 's');
    select(this.yAxis).call(axis);
  }

  render() {
    const { scale, label } = this.props;
    return (
      <g
        className="axis"
        ref={(node) => {
          this.yAxis = node;
        }}
      >
        <text
          x={2}
          y={scale(scale.ticks().pop()) + 0.5}
          dy="0.32em"
          fill="#000"
          fontWeight="bold"
          textAnchor="start"
        >
          {label}
        </text>
      </g>
    );
  }
}

YAxis.propTypes = {
  label: PropTypes.string,
  scale: PropTypes.func,
};

YAxis.defaultProps = {
  label: '',
  scale: () => {},
};

export default YAxis;
