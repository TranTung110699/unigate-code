import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RegisteredCourse from './registered-course';

class Results extends Component {
  render() {
    const { items } = this.props;
    let { teacherMode } = this.props;
    teacherMode = teacherMode || false;

    return (
      <div className="current-courses-wrapper">
        {items &&
          items.length > 0 &&
          items.map((item) => {
            let roomName = item.rooms && item.rooms[0].name;
            roomName = roomName || '';
            return (
              <Card>
                <CardHeader
                  title={`${item.name} - ${roomName}`}
                  subtitle={`${item.number_of_credits} ${t1('credits')}`}
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <RegisteredCourse
                    course_iid={item.iid}
                    teacherMode={teacherMode}
                  />
                </CardText>
              </Card>
            );
          })}
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
