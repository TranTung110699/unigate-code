import React from 'react';
import Drawer from 'antd/lib/drawer';
import Form from 'antd/lib/form';
import { mergeArrAndRejectElementSameIid } from '../utils';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style';
import { t1 } from 'translate';
import TimePicker from 'antd/lib/time-picker';
import Select from 'antd/lib/select';
import moment from 'moment';
import datetimeFormat, {
  timeframeConfigs,
  timetableEndpoints,
} from '../configs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/time-picker/style';
import 'antd/lib/drawer/style';
import Button from 'antd/lib/button';
import Request from 'common/network/http/Request';
import { getTimeFromName, getTimeName } from '../utils/DailyUnixTimestamp';
import {
  getTimestampTheStartADay,
  getTimestampTheEndADay,
} from 'common/utils/Date';

const FormItem = Form.Item;
const Option = Select.Option;

const timeframeOptions = Object.values(timeframeConfigs).map((timeframe) => (
  <Option value={timeframe.value} key={timeframe.value}>
    {timeframe.name}
  </Option>
));

class TimetableSetting extends React.Component {
  state = { campuses: [], rooms: [] };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.searchVenus('venue');
    const course = this.props.course || {};
    if (course.campus_iids) {
      this.searchVenus('room', undefined, course.campus_iids);
    }
  }

  onSaveTimetableSetting = (time, timeString) => {
    const course = this.props.course || {};
    const { onRequestClassInfo } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const parrams = {
          ...values,
          id: course.id,
          start_date: getTimestampTheStartADay(values.start_date.unix()),
          end_date: getTimestampTheEndADay(values.end_date.unix()),
          timetableConfigs__start_time: getTimeFromName(
            values.timetableConfigs__start_time.format(
              datetimeFormat.TIME_FORMAT,
            ),
          ),
          timetableConfigs__end_time: getTimeFromName(
            values.timetableConfigs__end_time.format(
              datetimeFormat.TIME_FORMAT,
            ),
          ),
          _sand_step: 'setting_timetable',
        };
        const result = await Request.post(
          timetableEndpoints.update_settings,
          parrams,
        );
        if (result && result.success) {
          onRequestClassInfo();
        }
      }
    });
  };

  handleSearchRoom = (value) => {
    this.searchVenus('room', value, this.props.form.getFieldValue('campuses'));
  };

  searchVenus = async (type, input, venusIids, room_iids_rejected) => {
    const params = {
      name: input,
      type: type || 'venue',
      room_iids_rejected: null,
      parent_iids: venusIids,
    };
    const result = await Request.get(timetableEndpoints.search_venus, params);
    if (!result || !result.success) {
      return;
    }
    if (type === 'venue') {
      this.setState({ campuses: result.result || [] });
      return;
    }
    this.setState({ rooms: result.result || [] });
  };

  getRoomOptions = () => {
    const course = this.props.course || {};
    const rooms = mergeArrAndRejectElementSameIid(
      this.state.rooms,
      course.rooms,
    );
    const campuses = this.state.campuses || [];

    return rooms.map((room) => {
      const campuse = campuses.find((row) => row.iid === room.parent_iid) || {};
      return (
        <Option key={room.iid} value={room.iid}>
          {campuse.name
            ? `${room.name} - ${campuse.name} (${t1(room.room_type)})`
            : `${campuse.name} (${t1(room.room_type)})`}
        </Option>
      );
    });
  };

  handleChangeCampus = (value) => {
    if (!value || value.length === 0) {
      return;
    }
    this.searchVenus('room', undefined, value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { course, open, onSwitchState } = this.props;
    const timetableConfigs = course.timetableConfigs || {};
    const campuses = this.state.campuses || [];
    const courseRoomIids = course.room_iids || [];
    const campusOptions = campuses.map((campus) => (
      <Option key={campus.iid} value={campus.iid}>
        {campus.name}
      </Option>
    ));
    const roomOptions = this.getRoomOptions();

    return (
      <div>
        <Drawer
          title={t1('timetable_settings')}
          placement="right"
          closable={false}
          width={420}
          onClose={() => {
            onSwitchState();
          }}
          visible={open}
        >
          <Form>
            <Row gutter={8}>
              <Col span={24}>
                <b>{t1('start_and_end_date_of_the_class')}</b>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('start_date', {
                    rules: [
                      { required: true, message: t1('start_date_is_require') },
                    ],
                    initialValue: moment(course.start_date * 1000),
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format={datetimeFormat.DATE_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('end_date', {
                    rules: [
                      { required: true, message: t1('end_date_is_require') },
                    ],
                    initialValue: moment(course.end_date * 1000),
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format={datetimeFormat.DATE_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <b>{t1('start_and_end_time_of_tearching_day')}</b>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('timetableConfigs__start_time', {
                    rules: [
                      { required: true, message: t1('time_from_is_require') },
                    ],
                    initialValue: moment(
                      getTimeName(timetableConfigs.start_time),
                      datetimeFormat.TIME_FORMAT,
                    ),
                  })(
                    <TimePicker
                      style={{ width: '100%' }}
                      minuteStep={1}
                      format={datetimeFormat.TIME_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  {getFieldDecorator('timetableConfigs__end_time', {
                    rules: [
                      { required: true, message: t1('time_to_is_require') },
                    ],
                    initialValue: moment(
                      getTimeName(timetableConfigs.end_time),
                      datetimeFormat.TIME_FORMAT,
                    ),
                  })(
                    <TimePicker
                      minuteStep={1}
                      format={datetimeFormat.TIME_FORMAT}
                      style={{ width: '100%' }}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <b>{t1('timeframe_to_display')}</b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('timetableConfigs__timeframe', {
                    rules: [
                      { required: true, message: t1('timeframe_is_require') },
                    ],
                    initialValue: timetableConfigs.timeframe,
                  })(
                    <Select style={{ width: '100%' }}>
                      {timeframeOptions}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <b>{t1('building')}</b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('campus_iids', {
                    rules: [
                      { required: true, message: t1('campus_is_require') },
                    ],
                    initialValue: course.campus_iids,
                  })(
                    <Select
                      onChange={this.handleChangeCampus}
                      mode="multiple"
                      style={{ width: '100%' }}
                    >
                      {campusOptions}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <b>Phòng học/block</b>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('room_iids', {
                    rules: [{ required: true, message: 'room_is_require' }],
                    initialValue: courseRoomIids.map((iid) => parseInt(iid)),
                  })(
                    <Select
                      mode="multiple"
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearchRoom}
                      style={{ width: '100%' }}
                    >
                      {roomOptions}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <FormItem>
                <Button
                  onClick={this.onSaveTimetableSetting}
                  type="primary"
                  htmlType="submit"
                >
                  {t1('save')}
                </Button>
              </FormItem>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(TimetableSetting);
