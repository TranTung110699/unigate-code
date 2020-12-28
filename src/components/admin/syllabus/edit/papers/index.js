import React, { Component } from 'react';
import VarDump from 'components/common/VarDump';

class Papers extends Component {
  render() {
    return (
      <div>
        <h1>Papers</h1>
        <VarDump data={this.props} />
      </div>
    );
  }
}

export default Papers;
