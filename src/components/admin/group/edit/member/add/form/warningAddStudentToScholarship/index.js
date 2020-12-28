import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';

class WarningAddStudentToScholarship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { semesterIids } = this.props;
    if (!isEqual(semesterIids, nextProps.semesterIids)) {
      this.getData(nextProps);
    }
  }

  getData = (props) => {
    const { group, userIids, dispatch, semesterIids } = props;

    const url =
      '/api/v1/site/get-duplicated-users-added-to-categories-by-semesters';
    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          executeOnSuccess: (res) => {
            this.setState({ data: res || [] });
          },
        },
        {
          user_iids: userIids,
          semester_iids: semesterIids,
          ico: group && group.ico,
          category_iid: group && group.iid,
          major: group && group.major,
          training_level: group && group.training_level,
          training_mode: group && group.training_mode,
        },
      ),
    );
  };

  render() {
    const { data } = this.state;
    if (!data || !data.length) {
      return null;
    }

    return (
      <div>
        <h3>{t1('list_of_scholarship_students')}</h3>
        <ol>
          {data.map((user, idx) => (
            <li key={`d_${idx}-${user && user.iid}`}>
              {' '}
              {`#${user.code} ${user.name} --> ${t1('duplicated')}: ${
                user.duplicated_semesters
              }`}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default connect()(WarningAddStudentToScholarship);
