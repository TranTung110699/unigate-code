import React, { Component } from 'react';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <ul>
          {this.props.data && this.props.data.map((item) => <li>{item}</li>)}
        </ul>

        <form>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <button onClick={this.handleAdd}>Add</button>
        </form>
      </div>
    );
  }
}
