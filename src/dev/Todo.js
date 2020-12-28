import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <div className="form-content">
        <h3>Todo</h3>
        <ul>
          <li>Inline Editable</li>
          <li>Modal</li>
          <li>Translations</li>
          <li>Media Manager</li>
          <li>Time Machine</li>
          <li>
            Restructure: Opensource thinking
            <br />
            <a href="https://medium.com/@ericclemmons/dogfooding-your-open-source-projects-9e6dc1e7d1c8">
              https://medium.com/@ericclemmons/dogfooding-your-open-source-projects-9e6dc1e7d1c8
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Todo;
