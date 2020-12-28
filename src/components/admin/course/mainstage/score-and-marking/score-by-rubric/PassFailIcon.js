import React from 'react';
import Icon from 'components/common/Icon';

class PassFailIcon extends React.Component {
  render() {
    const { passed } = this.props;

    return typeof passed !== 'undefined' ? (
      <Icon
        icon={passed ? 'check' : 'cancel'}
        style={{
          fontSize: 20,
          color: passed ? 'deepskyblue' : 'red',
        }}
      />
    ) : null;
  }
}

export default PassFailIcon;
