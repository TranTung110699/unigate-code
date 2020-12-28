import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import './stylesheet.scss';
import TeacherImage from './images/teacher.png';
import { t1 } from 'translate';

class ListTeachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchStaff();
  }

  fetchStaff() {
    const { dispatch } = this.props;
    const url = apiUrls.search_teacher_by_visible;
    dispatch(sagaActions.getDataRequest({ url, keyState: 'staff' }, {}));
  }

  render() {
    const { teacherList } = this.props;
    return (
      <div className="container teacher-list-wrapper">
        <div className="row">
          <h3>{t1('teacher_list')}</h3>
          {teacherList &&
            teacherList.map((item) => (
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="teacher-content">
                  <a href="javascript:void(0)">
                    {item.avatar ? (
                      <img src={item.avatar} alt="" />
                    ) : (
                      <img src={TeacherImage} alt="" />
                    )}
                    <div className="teacher-description">
                      <h5>{item.name}</h5>
                      <p>{item.position}</p>
                    </div>
                    <div className="overlay">
                      <p className="description">{item.description}</p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const teacherList = state.dataApiResults.staff || [];

  return {
    teacherList,
  };
};

export default connect(mapStateToProps)(ListTeachers);
