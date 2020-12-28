import React from 'react';
import ReactGA from 'react-ga';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class GoogleAnalytics extends React.Component {
  componentDidMount() {
    this.initGA(this.props);
    const { history } = this.props;
    history.listen(this.tracking);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trackingId !== nextProps.trackingId) {
      this.initGA(nextProps);
    }
  }

  tracking = (location) => {
    ReactGA.pageview(location.pathname + location.search);
  };

  initGA = (props) => {
    const { trackingId } = props;
    if (trackingId) {
      ReactGA.initialize(trackingId);
      this.tracking(window.location);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  trackingId: get(state, 'domainInfo.conf[google:ga_id]'),
});

export default connect(mapStateToProps)(withRouter(GoogleAnalytics));
