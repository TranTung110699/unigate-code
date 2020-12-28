import React, { Component } from 'react';
import { t1 } from 'translate';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'month', date: new Date() };
  }

  render() {
    const { schedule } = this.props;
    const { learning_items, course, room } = schedule;
    return (
      <div>
        <div>
          {t1('sylabus')}: {course && course.name}
        </div>
        <div>
          {t1('room')}: {room && room.name}{' '}
        </div>
        {learning_items && (
          <div>
            {t1('learning_items')}
            <ul>
              {learning_items.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Layout;
