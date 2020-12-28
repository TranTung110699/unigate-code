/**
 * Created by DVN on 8/24/2017.
 */
import React, { Component } from 'react';
import { t1 } from 'translate';
import { cardStatuses } from 'configs/constants';
import sagaActions from 'actions/admin/card/saga-creators';
import apiUrls from '../endpoints';
import { connect } from 'react-redux';
import './Stylesheet.scss';
import Radio from 'antd/lib/radio';

class Status extends Component {
  constructor(props) {
    super(props);
    const activedStatus = this.props.item.status || cardStatuses.added;
    this.state = {
      activeStatus: activedStatus,
    };
  }

  getActivedStatusClass = (activedStatus, status) => {
    if (activedStatus === status) {
      return 'actived';
    }
    return '';
  };

  statusOnChanged(status) {
    const { id, dispatch, item } = this.props;
    if (item.status === status) {
      return;
    }
    item.status = status;
    const params = {
      status,
      id: item.id,
      _sand_step: 'status',
    };

    dispatch(sagaActions.changeStatusRequest(apiUrls.update_package, params));
    this.setState({ activeStatus: status });
  }

  render() {
    return (
      <Radio.Group
        defaultValue={this.state.activeStatus}
        buttonStyle="solid"
        onChange={(event) => this.statusOnChanged(event.target.value)}
      >
        {(Object.values(cardStatuses) || []).map((cardStatus) => (
          <Radio.Button value={cardStatus}>{t1(cardStatus)}</Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

export default connect()(Status);
