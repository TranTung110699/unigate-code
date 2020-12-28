/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import FlatButton from 'components/common/mui/FlatButton';

class TopItem extends React.Component {
  render() {
    const { onAction, iconClass } = this.props;

    return (
      <li className="item">
        <FlatButton
          onClick={() => {
            onAction();
          }}
        >
          <i className={iconClass} aria-hidden="true" />
        </FlatButton>
      </li>
    );
  }
}

export default TopItem;
