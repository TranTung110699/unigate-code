/**
 * Created by quandv on 27/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/node/creators';
import UserAvatarList from 'components/common/users-avatar-list';
import Collaborators from 'components/admin/collaborators/index';
import DatePicker from 'schema-form/elements/date-picker';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import InlineEditable from 'components/common/forms/editable/inline';
import { TableRow, TableRowColumn } from 'components/common/mui/Table';
import { getThemeConfigSelector } from 'utils/selector';
import { schoolTypes } from 'configs/constants';
import CourseSearchResultActions from 'components/admin/course/common/CourseSearchResultActions';
import lodashGet from 'lodash.get';

class CourseEditorByCreditPlan extends Component {
  spanStyle = { display: 'inline-block' };
  datePickerStyleWrapper = { display: 'inline-flex', marginLeft: 10 };

  deleteItemParams = {
    remote: 1,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateDataInStore = (field, value) => {
    const { course, dispatch } = this.props;
    course[field] = value;
    dispatch(
      sagaActions.updateNodeRequest({
        step: field,
        iid: course.iid,
        data: { ...course, ntype: 'course' },
      }),
    );
  };

  onEditCollaborators = () => {
    const { dispatch, course } = this.props;
    const contentDialog = <Collaborators node={course} modal />;
    const optionsProperties = {
      handleClose: true,
      modal: true,
    };
    dispatch(
      actions.handleOpenDialog(
        { contentDialog, optionsProperties },
        'course-edit-collaborators',
      ),
    );
  };

  render() {
    const { course, deleteSuccessful, formid } = this.props;
    if (!course || !course.iid) {
      return <div>{t1('data_missing')}</div>;
    }
    return (
      <TableRow>
        <TableRowColumn title={course.name}>
          <InlineEditable
            value={course.name_mobile || course.name}
            propName="name_mobile"
            handleOnChange={({ name_mobile }) =>
              this.updateDataInStore('name_mobile', name_mobile)
            }
            validate={(newValue) => newValue && newValue.length}
          />
        </TableRowColumn>
        <TableRowColumn title={course.code}>
          <InlineEditable
            value={course.code}
            propName="code"
            handleOnChange={({ code }) => this.updateDataInStore('code', code)}
            validate={(code) => code && code.length}
          />
        </TableRowColumn>
        <TableRowColumn>
          <InlineEditable
            type="number"
            value={course.max_student}
            propName="max_student"
            handleOnChange={({ max_student }) =>
              this.updateDataInStore('max_student', max_student)
            }
            validate={(newValue) => newValue > 0}
          />
        </TableRowColumn>
        <TableRowColumn>
          <span style={this.spanStyle}>
            <UserAvatarList users={course.staff} />
          </span>
          <span className="m-r-20" style={this.spanStyle}>
            <IconButton
              title={t1('change_role')}
              iconClassName="mi mi-edit"
              onClick={() => this.onEditCollaborators()}
            />
          </span>
        </TableRowColumn>
        <TableRowColumn>
          <DatePicker
            styleWrapper={this.datePickerStyleWrapper}
            value={course.start_date}
            onChange={(value) => {
              this.updateDataInStore('start_date', value);
            }}
            getStartDate
            maxDate={course.end_date}
          />
        </TableRowColumn>
        <TableRowColumn>
          <DatePicker
            styleWrapper={this.datePickerStyleWrapper}
            value={course.end_date}
            onChange={(value) => {
              this.updateDataInStore('end_date', value);
            }}
            getEndDate
            minDate={course.start_date}
          />
        </TableRowColumn>
        {lodashGet(this.props.themeConfig, 'type') === schoolTypes.SIS && (
          <TableRowColumn width="20%">
            <DateTimePicker
              key={`start_register_time_${course.iid}`}
              floatingLabelText={t1('start_register_time')}
              value={course.start_reg_time}
              onChange={(value) => {
                this.updateDataInStore('start_reg_time', value);
              }}
            />
            <DateTimePicker
              key={`end_register_time_${course.iid}`}
              floatingLabelText={t1('end_register_time')}
              value={course.end_reg_time}
              onChange={(value) => {
                this.updateDataInStore('end_reg_time', value);
              }}
            />
            <DateTimePicker
              key={`withdraw_deadline_${course.iid}`}
              floatingLabelText={t1('withdraw_deadline')}
              value={course.withdraw_deadline}
              onChange={(value) => {
                this.updateDataInStore('withdraw_deadline', value);
              }}
            />
          </TableRowColumn>
        )}
        <TableRowColumn className="text-center">
          <CourseSearchResultActions
            course={course}
            searchFormId={formid}
            deleteSuccessful={deleteSuccessful}
            deleteItemParams={this.deleteItemParams}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

CourseEditorByCreditPlan.propTypes = {
  course: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func,
};
CourseEditorByCreditPlan.defaultProps = {
  course: null,
  dispatch: null,
};
const mapStateToProps = (state, props) => {
  const courseIid = props.courseIid;
  const course = state.tree[courseIid];
  const semester = props.plan && props.plan.semesterObject;
  if (course && semester) {
    course.start_date = course.start_date || semester.start_date;
    course.end_date = course.end_date || semester.end_date;
    course.start_reg_time = course.start_reg_time || semester.start_reg_time;
    course.end_reg_time = course.end_reg_time || semester.end_reg_time;
    course.withdraw_deadline =
      course.withdraw_deadline || semester.withdraw_deadline;
  }
  return {
    course,
    themeConfig: getThemeConfigSelector(state),
  };
};
export default connect(mapStateToProps)(CourseEditorByCreditPlan);
