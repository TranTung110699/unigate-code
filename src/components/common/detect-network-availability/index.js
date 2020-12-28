import React from 'react';
import { t1 } from 'translate';
import SuccessAlert from 'components/common/SuccessAlert';

import './stylesheet.scss';

class NetworkAvailability extends React.Component {
  timeout = null;

  constructor(props) {
    super(props);
    this.state = { networkAvailable: true };
  }

  detectNetworkAvailable = () => {
    this.setState({ networkAvailable: navigator.onLine });
    this.timeout = setTimeout(() => {
      this.detectNetworkAvailable();
    }, 5000);
  };

  componentDidMount() {
    this.detectNetworkAvailable();
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    if (this.state.networkAvailable) {
      if (this.props.showOnlineStatus)
        return <SuccessAlert>{t1('network_is_available')}</SuccessAlert>;
      else return '';
    }

    return (
      <span className="network-not-available">
        <strong>{t1('network_not_available')}</strong>
      </span>
    );
  }
}

export default NetworkAvailability;
