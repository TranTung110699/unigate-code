import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import Search from './search';
import apiUrls from 'api-endpoints';
import get from 'lodash.get';

class TeacherReport extends Component {
  render() {
    const { user, showHeader } = this.props;
    const formid = 'teacher_overview_report';
    const hiddenFields = {
      teacher_iid: get(user, 'iid'),
    };

    return (
      <div>
        {showHeader !== false && <h3>{t1('teacher_overview_report')}</h3>}
        <Search
          formid={formid}
          hiddenFields={hiddenFields}
          alternativeApi={apiUrls.teacher_overview_report}
        />
      </div>
    );
  }
}

export default TeacherReport;
