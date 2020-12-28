import React from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import Form from 'antd/lib/form';
import ConflictPopup from './ConflictPopup';
import Button from 'antd/lib/button';
import 'antd/lib/date-picker/style';
import 'antd/lib/time-picker/style';
import { connect } from 'react-redux';
import Select from 'antd/lib/select';
import Request from 'common/network/http/Request';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PropTypes from 'prop-types';
import { timetableEndpoints } from './configs';
import 'antd/lib/drawer/style';
import Radio from 'antd/lib/radio';
import { getDayNameConfigsByDay } from './utils/DateUtils';
import 'antd/lib/radio/style';
import { mergeArrAndRejectElementSameIid } from './utils';
import { t, t1 } from 'translate';
import timetableAction from 'actions/timetable/TimetableV2';
import lodashGet from 'lodash.get';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class TimeSlotPopupDetail extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { teachers: [], openConflictPopup: false };
  }

  componentDidMount() {
    this.handleSearchTeachers();
  }

  handleSearchTeachers = async (extraParams) => {
    const params = this.getParams(extraParams);
    const result = await Request.get(timetableEndpoints.search_teacher, params);
    if (!result || !result.success) {
      return;
    }
    this.setState({ teachers: result.result || [] });
  };

  getParams = (extraParams) => {
    const { cell, course } = this.props;
    const { timetable, timeslot, date } = cell;
    let params = {
      unixTime: date.getTime() / 1000,
      start_time: timeslot.start_time,
      end_time: timeslot.end_time,
      roomIid: timeslot.roomIid,
      start_date: timetable.start_date,
      end_date: timetable.end_date,
      days_of_week: timetable.days_of_week,
      course_iid: course.iid,
      timetable_iid: timetable.iid,
      syllabus_iid: course.credit_syllabus,
    };

    this.props.form.validateFields((err, values) => {
      if (values && values.apply_scope) {
        params = {
          ...params,
          apply_scope: values.apply_scope,
        };
      }
    });

    if (extraParams) {
      params = {
        ...params,
        ...extraParams,
      };
    }

    return params;
  };

  handleAppliedScopeSelect = (event) => {
    const appliedScope = event.target.value;
    this.handleSearchTeachers({ applied_scope: appliedScope });
  };

  handleTeachersSearchQueryChange = (query) => {
    this.handleSearchTeachers({ q: query });
  };

  getTeacherOptions = () => {
    const { cell, course } = this.props;
    const { timetable } = cell;
    const teachers = mergeArrAndRejectElementSameIid(
      this.state.teachers,
      timetable.teachers,
    );

    return teachers.map((teacher) => (
      <Option key={teacher.iid} value={teacher.iid}>
        {teacher.name} {teacher.code ? ` - #${teacher.code}` : ''}
      </Option>
    ));
  };

  getContractIidsOfTeacher = (teacherIid) => {
    const teachers = lodashGet(this.state, 'teachers');

    const teacherWithContracts = (teachers || []).find(
      (t) => String(lodashGet(t, 'iid')) === String(teacherIid),
    );

    const contracts = lodashGet(teacherWithContracts, 'contracts');

    return (contracts || []).map((c) => lodashGet(c, 'iid'));
  };

  saveTeacherToTheTimetable = async () => {
    let params = this.getParams();
    this.props.form.validateFields((err, values) => {
      params.apply_scope = values.apply_scope;
      if (values && values.teacher_iids) {
        params = {
          ...params,
          teacher_iids: values.teacher_iids,
          teachers_info: (values.teacher_iids || []).reduce(
            (res, tIid) => ({
              ...res,
              [tIid]: {
                iid: tIid,
                contract_iids: this.getContractIidsOfTeacher(tIid),
              },
            }),
            {},
          ),
        };
      }
    });

    const result = await Request.get(
      timetableEndpoints.assignee_teacher,
      params,
    );
    if (!result || !result.success) {
      if (result && result.conflictSessions) {
        this.setState({
          conflictSessions: result.conflictSessions,
          openConflictPopup: true,
        });
      }
      this.props.onSwitchState();
      return;
    }
    const { dispatch, course } = this.props;
    dispatch(
      timetableAction.getTimetables({
        start_date: course.start_date,
        end_date: course.end_date,
        room_iids: course.room_iids,
      }),
    );
    dispatch(timetableAction.getSessions({ course_iid: course.iid }));
  };

  switchStateOfConflictPopup = () => {
    this.setState({ openConflictPopup: !this.state.openConflictPopup });
  };

  render() {
    const { open, onSwitchState, cell, editable } = this.props;
    const { getFieldDecorator } = this.props.form;
    const course = this.props.course || {};
    const { date, timetable } = cell;
    const dayOfTimetable =
      timetable &&
      timetable.days_of_week &&
      timetable.days_of_week.length > 0 &&
      timetable.days_of_week[0];

    return (
      <div>
        <Modal
          title={t1('assignee_teacher_to_the_class')}
          visible={open}
          onCancel={onSwitchState}
          footer={[
            <Button
              key="submit"
              type="primary"
              disabled={!editable}
              onClick={this.saveTeacherToTheTimetable}
            >
              {t1('save')}
            </Button>,
          ]}
        >
          <Form>
            <Row>
              <Col span={24}>
                <b>{t1('apply_scope')}</b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('apply_scope', {
                    rules: [
                      { required: true, message: t1('apply_scope_is_require') },
                    ],
                    initialValue: 'course',
                  })(
                    <RadioGroup
                      disabled={!editable}
                      options={options(dayOfTimetable)}
                      onChange={this.handleAppliedScopeSelect}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <b>{t1('please_choose_teachers')}</b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('teacher_iids', {
                    initialValue: timetable.teacher_iids,
                  })(
                    <Select
                      disabled={!editable}
                      mode="multiple"
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleTeachersSearchQueryChange}
                      style={{ width: '100%' }}
                    >
                      {this.getTeacherOptions()}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
        <ConflictPopup
          onSwitchState={this.switchStateOfConflictPopup}
          open={this.state.openConflictPopup}
          conflictSessions={this.state.conflictSessions}
        />
      </div>
    );
  }
}

TimeSlotPopupDetail.propTypes = {
  open: PropTypes.bool,
  onSwitchState: PropTypes.func,
  selectedDate: PropTypes.objectOf(PropTypes.any),
  start_time: PropTypes.number,
  end_time: PropTypes.number,
};

export default Form.create()(connect()(TimeSlotPopupDetail));

const options = (dayOfWeek) => [
  { label: t1('this_date'), value: 'today' },
  {
    label: `${getDayNameConfigsByDay(dayOfWeek).label} ${t('daily')}`,
    value: 'daily',
  },
  { label: t1('all'), value: 'course' },
];
