import React from 'react';
import PropTypes from 'prop-types';

class Legend extends React.Component {
  render() {
    const { posX, posY, data } = this.props;
    return (
      <g fontFamily="sans-serif" fontSize={10} textAnchor="end">
        {data.map((gData, index) => (
          <g key={gData.label} transform={`translate(0,${posY + index * 20})`}>
            <rect x={posX - 19} width={19} height={19} fill={gData.color} />
            <text x={posX - 24} y="9.5" dy="0.32em">
              {gData.label}
            </text>
          </g>
        ))}
      </g>
    );
  }
}

Legend.propTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
};

Legend.defaultProps = {
  posX: 0,
  posY: 0,
  data: [],
};
export default Legend;
