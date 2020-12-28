import React from 'react';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import PropTypes from 'prop-types';

class XAxis extends React.Component {
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
    const { scale, handleOnclick } = this.props;
    const axis = axisBottom(scale);
    select(this.xAxis)
      .call(axis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)')
      .on('click', (d, i) => {
        handleOnclick(d, i);
      });
  }

  render() {
    const { posY } = this.props;
    return (
      <g
        className="axis"
        ref={(node) => {
          this.xAxis = node;
        }}
        transform={`translate(0,${posY})`}
      />
    );
  }
}

XAxis.propTypes = {
  handleOnclick: PropTypes.func,
  posY: PropTypes.number,
  scale: PropTypes.func,
};

XAxis.defaultProps = {
  posY: 0,
  scale: () => {},
  handleOnclick: () => {},
};

export default XAxis;
