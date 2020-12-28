import React, { Component } from 'react';
import VarDump from 'components/common/VarDump';

class Results extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="table-result">
        {items && items.map((item) => <VarDump key={item.id} data={item} />)}
      </div>
    );
  }
}

export default Results;
