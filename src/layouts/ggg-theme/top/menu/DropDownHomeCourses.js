import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { t1 } from 'translate';

class DropDownHomeCourses extends React.Component {
  handleClickOutside() {
    const { resetDropdownHomeCourses } = this.props;

    if (resetDropdownHomeCourses) {
      resetDropdownHomeCourses();
    }
  }

  render() {
    const { searchedCourses } = this.props;

    return (
      <div className="home-courses-list">
        {searchedCourses &&
          searchedCourses.length > 0 &&
          searchedCourses.map((course) => (
            <div className="item" key={course.id}>
              <Link to={Links.overviewCourseByPath('', course)}>
                {course.name}
              </Link>
            </div>
          ))}
        {(!searchedCourses || searchedCourses.length === 0) && (
          <div className="item">{t1('there_are_no_courses_yet')}</div>
        )}
      </div>
    );
  }
}

export default enhanceWithClickOutside(DropDownHomeCourses);
