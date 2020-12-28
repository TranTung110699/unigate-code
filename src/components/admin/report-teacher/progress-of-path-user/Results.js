import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import LineChart from 'components/common/d3/LineChart';

const style = {
  backgroundColor: '#FFFFFF',
};

class Results extends Component {
  render() {
    const { items, searchValues } = this.props;
    return (
      <div style={style}>
        <LineChart
          data={
            items &&
            items.map(({ user: { name }, histories }) => ({
              dataSet: histories.map((history) => ({
                x: history.data.ts * 1000,
                y: history.data.p,
              })),
              label: name,
            }))
          }
          config={{
            margin: {
              top: 100,
              bottom: 100,
              left: 100,
              right: 100,
            },
            width: 960,
            height: 600,
            yDomain: [0, 100],
            xDomain: searchValues && [
              searchValues.from * 1000,
              searchValues.to * 1000,
            ],
            yAxisLabel: t1('score'),
          }}
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
