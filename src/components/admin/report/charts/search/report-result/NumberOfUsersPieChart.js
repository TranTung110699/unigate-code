import React from 'react';
import { connect } from 'react-redux';
import PieChart from 'components/common/d3/PieChart';

class NumberOfUsersResults extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div className="whitebox">
        <PieChart
          data={{
            dataSet: items,
          }}
        />
      </div>
    );
  }
}

export default connect()(NumberOfUsersResults);
