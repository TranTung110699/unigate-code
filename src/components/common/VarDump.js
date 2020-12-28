import React, { Component } from 'react';
import FlatButton from 'components/common/mui/FlatButton';

const style = {
  backgroundColor: '#1f4662',
  color: '#fff',
  fontSize: '12px',
};

const headerStyle = {
  backgroundColor: '#193549',
  padding: '5px 10px',
  fontFamily: 'monospace',
  color: '#ffc600',
};

const preStyle = {
  display: 'block',
  padding: '10px 30px',
  margin: '0',
  overflow: 'scroll',
};

export default class VarDump extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    const defaultState = typeof props.show === 'undefined' ? true : props.show;
    this.state = {
      show: defaultState,
    };
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div style={style}>
        <FlatButton style={headerStyle} onClick={this.toggle}>
          <strong>Var Dump</strong>
        </FlatButton>
        {this.state.show ? (
          <pre style={preStyle}>{JSON.stringify(this.props.data, null, 2)}</pre>
        ) : (
          false
        )}
      </div>
    );
  }
}
