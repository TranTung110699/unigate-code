/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';

import { switchToGridView, switchToListView } from '../actions';

class GridOrListSwitcher extends React.Component {
  render() {
    const { listView, dispatch } = this.props;
    return (
      <li className="item">
        <FlatButton
          onClick={() => {
            if (listView) {
              dispatch(switchToGridView());
              return;
            }
            dispatch(switchToListView());
          }}
        >
          <i
            className={listView ? 'fa fa-list-ul' : 'fa fa-th'}
            aria-hidden="true"
          />
        </FlatButton>
      </li>
    );
  }
}

const mapStateToProp = (state) => ({
  listView: state.mm.listView,
});

export default connect(mapStateToProp)(GridOrListSwitcher);
