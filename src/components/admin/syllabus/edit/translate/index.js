import React, { Component } from 'react';
import VarDump from 'components/common/VarDump';

class Translate extends Component {
  render() {
    return (
      <div>
        <h1>Translate</h1>
        <VarDump data={this.props} />
      </div>
    );
  }
}

export default Translate;
