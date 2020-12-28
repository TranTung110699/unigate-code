import React from 'react';
import Drawer from 'antd/lib/drawer';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import { constants } from 'configs/constants';
import { mergeArrAndRejectElementSameIid } from '../../utils';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style';
import { t1 } from 'translate';
import TimePicker from 'antd/lib/time-picker';
import Select from 'antd/lib/select';
import moment from 'moment';
import datetimeFormat, {
  timeframeConfigs,
  timetableEndpoints,
} from '../../configs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/time-picker/style';
import 'antd/lib/drawer/style';
import Button from 'antd/lib/button';
import Request from 'common/network/http/Request';
import { getTimeName } from '../../utils/DailyUnixTimestamp';

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
  }

  handleSearchRoom = (value) => {
    this.searchVenus('room', value, this.props.form.getFieldValue('campuses'));
  };

  searchVenus = async (type, input, venusIids, room_iids_rejected) => {
    const params = {
      name: input,
      type: type || 'venue',
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
    return rooms.map((room) => (
      <Option key={room.iid} value={room.iid}>
        {room.name}
      </Option>
    ));
  };

  handleChangeCampus = (value) => {
    if (!value || value.length === 0) {
      return;
    }
    this.searchVenus('room', undefined, value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { open, onSwitchState, settingData } = this.props;
    const campuses = this.state.campuses || [];
    const dateToView = this.state.dateToView || moment();
    const courseRoomIids = [];
    const campusOptions = campuses.map((campus) => (
      <Option key={campus.iid} value={campus.iid}>
        {campus.name}
      </Option>
    ));

    const roomTypeOptions = constants.RoomTypeOptions().map((roomType) => {
      if (!roomType.value) {
        return;
      }
      return (
        <Option key={`key-rom-type-${roomType.value}`} value={roomType.value}>
          {roomType.primaryText}
        </Option>
      );
    });

    const roomOptions = this.getRoomOptions();

    return (
      <div>
        <Drawer
          title={t1('settings')}
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
                <b>{t1('date_to_view')}</b>
              </Col>
              <Col span={10}>
                <FormItem>
                  {getFieldDecorator('start_date', {
                    rules: [
                      { required: true, message: t1('start_date_is_require') },
                    ],
                    initialValue: dateToView,
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format={datetimeFormat.DATE_FORMAT}
                    />,
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem>
                  {getFieldDecorator('settingData__start_time', {
                    rules: [
                      { required: true, message: t1('time_from_is_require') },
                    ],
                    initialValue: moment(
                      getTimeName(settingData.start_time),
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
              <Col span={7}>
                <FormItem>
                  {getFieldDecorator('settingData__end_time', {
                    rules: [
                      { required: true, message: t1('time_to_is_require') },
                    ],
                    initialValue: moment(
                      getTimeName(settingData.end_time),
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
                  {getFieldDecorator('settingData__timeframe', {
                    rules: [
                      { required: true, message: t1('timeframe_is_require') },
                    ],
                    initialValue: settingData.timeframe,
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
                    initialValue: this.state.campus_iids,
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
              <Col span={4}>
                <Row gutter={8}>
                  <Col span={24}>
                    <b>{t1('floor')}</b>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('floor', {
                        initialValue: settingData.floor,
                      })(
                        <InputNumber
                          style={{ width: '50px' }}
                          min={1}
                          max={500}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={20}>
                <Row gutter={8}>
                  <Col span={24}>
                    <b>{t1('room_types')}</b>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('room_type', {
                        initialValue: settingData.room_types,
                      })(
                        <Select mode="multiple" style={{ width: '100%' }}>
                          {roomTypeOptions}
                        </Select>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
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
