import React from 'react';
import Alert from 'antd/lib/alert';
import Spin from 'antd/lib/spin';
import { t1 } from '../../../translate';

const LoadingAnt = ({ tip, message, type, ...rest }) => (
  <Spin tip={tip || t1('loading....')}>
    <Alert message={message || t1('message_is_loading')} type="info" />
  </Spin>
);
export default LoadingAnt;
