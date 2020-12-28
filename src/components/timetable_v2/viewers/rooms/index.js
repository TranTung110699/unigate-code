import React from 'react';
import Setting from './settings';
import FullViewer from './FullViewer';
import Request from 'common/network/http/Request';
import Button from 'antd/lib/button';
import './stylesheet.scss';

import { connect } from 'react-redux';
import { timetableEndpoints } from '../../configs';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class RoomViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openSetting: false };
  }

  componentDidMount() {
    this.getRoomsToDisplay();
  }

  switchStateOfSetting = (status) => {
    const state = status === undefined ? !this.state.openSetting : status;
    this.setState({ openSetting: state });
  };

  getRoomsToDisplay = async () => {
    const params = {
      date: 12321321,
      campuses: [
        {
          iid: 123,
          floors: [],
          room_iids: [],
        },
      ],
    };
    const result = await Request.get(
      timetableEndpoints.getAllRoomToDisplay,
      params,
    );
    if (!result || !result.success) {
      return;
    }
    this.setState({ rooms: result.result || [] });
  };

  render() {
    const panelWidth = 1366;
    const panelHeight = 800;

    return (
      <div className="ui-school-daily-view">
        <div className="setting-header-panel" style={{ width: panelWidth }}>
          <div className="ui-header-right-panel" />
          <div className="ui-header-left-panel">
            <Button
              className="item-icon"
              shape="circle"
              icon="setting"
              onClick={this.switchStateOfSetting}
            />
          </div>
        </div>
        <FullViewer
          timeConfigs={defaultTimeConfigs}
          rooms={this.state.rooms}
          width={panelWidth}
          height={panelHeight}
        />
        <Setting
          settingData={{ ...defaultTimeConfigs }}
          open={this.state.openSetting}
          onSwitchState={this.switchStateOfSetting}
        />
      </div>
    );
  }
}

export default connect()(RoomViewer);

const defaultTimeConfigs = {
  timeframe: 60,
  start_time: 420, //'07:00:00',
  end_time: 1260, //'21:00:00',
};
