import React, { Component } from 'react';
import HelloWorld from './HelloWorld';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(name) {
    const list = this.state.list.slice();
    list.push(name);
    this.setState({ list });
  }

  render() {
    return (
      <div className="form-content">
        Unit tests are found in __tests__ folder, using jest
        <HelloWorld onAdd={this.handleAdd} />
        <List data={this.state.list} />
      </div>
    );
  }
}
