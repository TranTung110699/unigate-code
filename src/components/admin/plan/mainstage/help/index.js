import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'components/common/mui/RaisedButton';

class Help extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            A major has to be attached to a program first
            <Link to="/admin/plan/major-program">
              <RaisedButton primary label="Do it now" />
            </Link>
          </li>
          <li>
            <Link to="/admin/major">
              <RaisedButton primary label="Manage majors" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Help;
