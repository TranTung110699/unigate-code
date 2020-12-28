import React, { Component } from 'react';
import { connect } from 'react-redux';
// import VarDump from 'components/common/VarDump';
// import ChatForm from './ChatForm';

class Btc extends Component {
  render() {
    return <div className="form-content">btc</div>;
  }
}

export default connect()(Btc);
