/**
 * Created by vohung on 11/05/2017.
 */
import React from 'react';
import Radar from 'react-d3-radar';
import { schemeCategory10 } from 'd3-scale-chromatic';
import PropTypes from 'prop-types';
import Legend from './Legend';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, config, onHover } = this.props;
    const { sets } = data;

    return (
      Radar && (
        <div>
          <svg width={config.width} height={config.height}>
            <Radar {...config} onHover={onHover} data={data} />
            <Legend
              posX={config.width - config.legendPadding}
              posY={config.legendPadding}
              data={sets.map((set, index) => ({
                label: set.label,
                color: schemeCategory10[index],
              }))}
            />
          </svg>
        </div>
      )
    );
  }
}

RadarChart.propTypes = {
  config: PropTypes.shape({
    domainMax: PropTypes.number,
    height: PropTypes.number,
    highlighted: PropTypes.string,
    legendPosX: PropTypes.number,
    padding: PropTypes.number,
    width: PropTypes.number,
  }),
  data: PropTypes.shape({
    variables: PropTypes.arrayOf(PropTypes.any),
    sets: PropTypes.arrayOf(PropTypes.any),
  }),
  onHover: PropTypes.func,
};

RadarChart.defaultProps = {
  config: {
    domainMax: 100,
    height: 100,
    highlighted: '',
    legendPadding: 0,
    padding: 0,
    width: 100,
  },
  data: null,
  onHover: () => {},
};

export default RadarChart;
