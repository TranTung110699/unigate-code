/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NewButton from 'components/admin/course/new/ButtonNew';

import SearchForm from './SearchForm';
import { t1 } from 'translate';

class Layout extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          button={<NewButton />}
          lastBreadcrumbName={t1('course')}
          description={t1(
            'course_is_used_to_manage_a_number_of_student_learning_a_specific_credit._courses_are_mostly_created_automatically_from__enrolment_plans.',
          )}
        />
        <SearchForm {...this.props} showExport sendSmS />
      </div>
    );
  }
}

export default Layout;
