import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import Locations from 'components/admin/bus/edit/Locations';
import Drivers from 'components/admin/bus/edit/Drivers';
import { t1 } from 'translate';

class LocationComponent extends Component {
  render() {
    const { bus } = this.props;
    return (
      <div>
        {bus &&
          bus.map((b) => (
            <div style={{ padding: 10 }}>
              <div>{t1('locations')}</div>
              <Locations item={b} />
              <div style={{ padding: 10 }}>
                {t1('drivers')}
                <Drivers item={b} />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default connect((state) => {
  user_iid: get(state, 'userInfo.user.iid');
})(
  fetchData((props) => ({
    baseUrl: apiUrls.get_bus_by_user,
    params: {
      user_iid: get(props, 'user_iid'),
    },
    propKey: 'bus',
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(LocationComponent),
);
