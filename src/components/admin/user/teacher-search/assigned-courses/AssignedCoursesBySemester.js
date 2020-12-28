import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from 'components/front-end/dashboard/ums/current-courses/Results';
import { t1 } from 'translate';

import './AssignedCoursesBySemester.scss';

class AssignedCoursesBySemester extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} teacherMode={true} />
  );

  render() {
    const { currentSemester } = this.props;

    const hiddenFields = {
      semester_iid: currentSemester.iid,
    };

    return (
      <div>
        {currentSemester && (
          <div className="assigned-courses-by-semester-wrapper">
            <h3>{currentSemester.name}</h3>
            <SearchWrapper
              formid="get_assigned_courses"
              hiddenFields={hiddenFields}
              renderNoResultComponent={() => (
                <h3>{t1('you_have_no_assigned_courses_yet')}</h3>
              )}
              renderResultsComponent={this.renderResultComponent}
              autoSearchWhenStart
              hidePagination
            />
          </div>
        )}
      </div>
    );
  }
}

export default AssignedCoursesBySemester;
