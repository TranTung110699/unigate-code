import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { t } from 'translate';

class StatusDisplay extends Component {
  render() {
    const { status, text, bold } = this.props;

    const style =
      status === 'approved' || status === 'active'
        ? {
            color: 'green',
          }
        : status === 'deleted'
        ? { color: 'red' }
        : {};

    if (bold) style.fontWeight = 'bold';

    return <span style={style}>{text || t(status)}</span>;
  }
}

export default StatusDisplay;
