import React, { Component } from 'react';

export default class List extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: ''
  //   };
  //   this.handleAdd = this.handleAdd.bind(this);
  // }

  render() {
    return (
      <div>
        <ul>
          {this.props.data &&
            this.props.data.map((item, i) => (
              <li key={`${item}-${i}`}>{item}</li>
            ))}
        </ul>
      </div>
    );
  }
}
