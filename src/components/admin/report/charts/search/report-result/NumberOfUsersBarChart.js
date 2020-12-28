import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import GroupBarChart from 'components/common/d3/GroupBarChart';

class NumberOfUsersResults extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className="whitebox">
        <GroupBarChart
          data={{
            dataSet: items.map((item) => ({
              number_of_users: item.value,
              label: item.label,
            })),
            keyLabels: {
              number_of_users: t1('number_of_users'),
            },
            keys: ['number_of_users'],
          }}
        />
      </div>
    );
  }
}

export default connect()(NumberOfUsersResults);
