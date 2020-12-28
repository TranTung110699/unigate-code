import React from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import 'antd/lib/date-picker/style';
import 'antd/lib/time-picker/style';
import notification from 'antd/lib/notification';
import 'antd/lib/notification/style';
import Select from 'antd/lib/select';
import { connect } from 'react-redux';
import Request from 'common/network/http/Request';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PropTypes from 'prop-types';
import { timetableEndpoints } from './configs';
import 'antd/lib/drawer/style';
import { t1 } from 'translate';
import { mergeArrAndRejectElementSameIid } from './utils';
import timetableAction from '../../actions/timetable/TimetableV2';

const FormItem = Form.Item;
const Option = Select.Option;

class ClassBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  handleSearchTeachers = async (value) => {
    const params = this.getParams();
    params.q = value;
    const result = await Request.get(timetableEndpoints.search_course, params);
    if (!result || !result.success) {
      return;
    }
    this.setState({ classes: result.result || [] });
  };

  getParams = () => {
    const { course } = this.props;
    return {
      course_iid: course.iid,
      credit_syllabus: course.credit_syllabus,
    };
  };

  getClassesOptions = () => {
    const { cell, course } = this.props;
    const { timetable } = cell;
    const classes = mergeArrAndRejectElementSameIid(
      this.state.classes,
      timetable.classes,
    );

    const result = [];

    classes.map((c) => {
      if (c.iid == course.iid) return;
      result.push(
        <Option key={c.iid} value={c.iid}>
          {this.getCourseName(c)}
        </Option>,
      );
    });

    return result;
  };

  getCourseName = (course) => {
    if (course.major && course.major.length > 0) {
      return `${course.name} - ${course.major[0].name}`;
    }

    return `${course.name}`;
  };

  getClassInitValue = () => {
    const { cell, course } = this.props;
    const { timetable } = cell;
    const classIids = timetable.class_iids || [];
    const result = [];
    classIids.map((classIid) => {
      if (classIid == course.iid) return;
      result.push(classIid);
    });
    return result;
  };

  saveAnotherClass = async () => {
    let params = this.getParams();
    this.props.form.validateFields((err, values) => {
      if (values && values.class_iids) {
        params = {
          ...params,
          attach_class_iids: values.class_iids,
        };
      }
    });
    const result = await Request.get(timetableEndpoints.attach_classes, params);
    if (!result || !result.success) {
      if (result && result.classes) {
        result.classes.map((c) => {
          const msg = c.name + ' ' + t1('already_attached_to_another_class');
          notification.error({
            message: result.message,
            description: (
              <a href={`/admin/course/${c.iid}/timetable`} target="_blank">
                {t1('click_here_to_view_this_class')}
              </a>
            ),
          });
        });
      } else if (result && result.message) {
        if (result.iid) {
          notification.error({
            message: result.message,
            description: (
              <span>
                {t1('please_double_check_the_studied_session_on_this_class')}.
                <a
                  href={`/admin/course/${result.iid}/timetable`}
                  target="_blank"
                >
                  {t1('click_here_to_view_this_class')}
                </a>
                .
              </span>
            ),
          });
        } else {
          notification.error(result.message);
        }
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
  };

  render() {
    const { open, onSwitchState, cell, course, editable } = this.props;
    const { timetable } = cell;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={t1('add_another_class_to_this_class')}
        visible={open}
        onCancel={onSwitchState}
        footer={[
          <Button
            key="submit"
            disabled={!editable}
            type="primary"
            onClick={this.saveAnotherClass}
          >
            {t1('save')}
          </Button>,
        ]}
      >
        <Form>
          <Row>
            <Col span={24}>
              <b>{t1('choose_another_class')}</b>
            </Col>

            <Col span={24}>
              <i>
                {t1('you_are_adding_another_class_to_the_class')} :
                {course && (
                  <span>
                    #{course.code} - {course.name}
                  </span>
                )}
              </i>
            </Col>

            <Col span={24}>
              <FormItem>
                {getFieldDecorator('class_iids', {
                  initialValue: this.getClassInitValue(),
                })(
                  <Select
                    disabled={!editable}
                    mode="multiple"
                    showSearch
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearchTeachers}
                    style={{ width: '100%' }}
                  >
                    {this.getClassesOptions()}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

ClassBox.propTypes = {
  open: PropTypes.bool,
  onSwitchState: PropTypes.func,
  selectedDate: PropTypes.objectOf(PropTypes.any),
  start_time: PropTypes.number,
  end_time: PropTypes.number,
};

export default Form.create()(connect()(ClassBox));
