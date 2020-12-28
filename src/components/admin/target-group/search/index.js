/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NewCourseButton from 'components/admin/course/new/ButtonNew';
import SearchForm from './SearchForm';

class TargetGroupSearch extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext button={<NewCourseButton />} />
        <SearchForm {...this.props} />
      </div>
    );
  }
}

export default TargetGroupSearch;
