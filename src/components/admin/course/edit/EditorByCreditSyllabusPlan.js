/* eslint-disable no-undef,react/sort-comp,react/prop-types,jsx-a11y/anchor-is-valid */
/**
 * Created by hungvo on 23/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import Divider from 'material-ui/Divider';
import { schemaNewCourseByCreditSyllabus } from '../schema/form';
import SearchAndEditCourses from './SearchAndEditCourses';

class EditorByCreditSyllabusPlan extends Component {
  raisedButtonStyle = { marginTop: 10 };

  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      courses: [],
    };
  }

  componentWillMount() {
    const { csPlan } = this.props;
    if (csPlan && csPlan.courses && csPlan.courses.length) {
      this.setState({
        courses: csPlan.courses,
      });
    }
  }

  updateListCourseInStore = (courses) => {
    const { updateListCourse } = this.props;
    if (updateListCourse) {
      updateListCourse(courses);
    }
    this.setState({
      creating: false,
      courses,
    });
  };

  renderElementNewCourse = () => {
    const { csPlan, faculty } = this.props;
    const hiddenFields = {
      cs_plan: csPlan && csPlan.iid,
      ico: csPlan && csPlan.ico,
      major: csPlan && csPlan.major,
      semester: csPlan && csPlan.semester,
      training_mode: csPlan && csPlan.training_mode,
      training_level: csPlan && csPlan.training_level,
      credit_syllabus: csPlan.credit_syllabus,
      start_date: csPlan.start_date,
      end_date: csPlan.end_date,
      current_courses_count: this.state.courses.length,
      organizations: [faculty],
    };

    return (
      <NodeNew
        resetForm={false}
        ntype="course"
        schema={schemaNewCourseByCreditSyllabus}
        alternativeApi="/course/create-courses-by-credit-syllabus"
        mode="new"
        step="credit_syllabus"
        formid="new_credit_plan"
        hiddenFields={hiddenFields}
        closeModal={false}
        requestSuccessful={(ret) => {
          let courses = this.state.courses;
          if (ret.success && ret.result) {
            courses = courses.concat(ret.result);
          }
          this.updateListCourseInStore(courses);
        }}
      />
    );
  };

  render() {
    const { csPlan } = this.props;
    if (!csPlan) {
      return <div>{t1('data_missing')}</div>;
    }
    if (
      !this.state.courses ||
      !this.state.courses.length ||
      this.state.creating
    ) {
      return this.renderElementNewCourse();
    }
    return (
      <div>
        <SearchAndEditCourses
          formid="course_search"
          searchResultKey={`course_search-by-${csPlan && csPlan.iid}`}
          hiddenFields={{
            iids: this.state.courses,
            cs_plan: csPlan && csPlan.iid,
            ico: csPlan && csPlan.ico,
            major: csPlan && csPlan.major,
            semester: csPlan && csPlan.semester,
            training_mode: csPlan && csPlan.training_mode,
            training_level: csPlan && csPlan.training_level,
            credit_syllabus: csPlan.credit_syllabus,
          }}
          onDeleteCourseSuccessful={(iid) => {
            const courses = this.state.courses.filter(
              (courseIid) => courseIid !== iid,
            );
            this.updateListCourseInStore(courses);
          }}
        />
        <Divider />
        <RaisedButton
          style={this.raisedButtonStyle}
          label={t1('add_new_classes')}
          onClick={() =>
            this.setState({
              creating: true,
            })
          }
        />
      </div>
    );
  }
}

EditorByCreditSyllabusPlan.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};
EditorByCreditSyllabusPlan.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

const mapStateToProps = (state, props) => {
  const { csPlanIid } = props;
  const csPlan = props.csPlan || state.tree[csPlanIid];
  return {
    csPlan,
  };
};
export default connect(mapStateToProps)(EditorByCreditSyllabusPlan);
