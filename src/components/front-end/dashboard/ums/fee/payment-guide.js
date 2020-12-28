import React from 'react';
import getLodash from 'lodash.get';
import { connect } from 'react-redux';

const paymentGuide = ({ guide }) => (
  <div className="m-t-20" dangerouslySetInnerHTML={{ __html: guide }} />
);

const mapStateToProp = (state) => ({
  guide: getLodash(state, 'domainInfo.conf.payment_guide'),
});

export default connect(mapStateToProp)(paymentGuide);
