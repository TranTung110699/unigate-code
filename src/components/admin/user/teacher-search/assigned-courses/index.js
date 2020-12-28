import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import ButtonNew from 'components/admin/course/new/ButtonNew';

import AssignedCoursesBySemester from './AssignedCoursesBySemester';

class Layout extends Component {
  componentWillMount() {
    this.fetchCurrentSemesters();
  }

  fetchCurrentSemesters = () => {
    const { dispatch, keyState } = this.props;

    const url = apiUrls.get_current_semesters;
    dispatch(sagaActions.getDataRequest({ url, keyState }, {}));
  };

  render() {
    const { currentSemesters, hideTitle } = this.props;
    return (
      <div>
        <SubTopMenuContext button={<ButtonNew />} />
        {!hideTitle && <h1>{t1('assigned_courses')}</h1>}
        {currentSemesters &&
          currentSemesters.map((currentSemester) => (
            <AssignedCoursesBySemester currentSemester={currentSemester} />
          ))}
        {(!currentSemesters || currentSemesters.length === 0) && (
          <div>{t1('you_have_no_assigned_courses')}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const keyState = 'current_semesters';

  return {
    keyState,
    currentSemesters: state.dataApiResults[keyState],
  };
};

export default connect(mapStateToProps)(Layout);
