import React, { Component } from 'react';

class Doc extends Component {
  render() {
    return (
      <div className="form-content">
        <h3>Good reads</h3>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://marmelab.com/blog/2015/12/17/react-directory-structure.html"
            >
              react/redux app structure
            </a>
            . (Related :{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://bradfrost.com/blog/post/atomic-web-design/"
            >
              Atomic design
            </a>
            )
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/vasanthk/react-bits"
            >
              react-bits: React patterns, techniques, tips and tricks
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Doc;
