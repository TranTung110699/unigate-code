import React from 'react';
import actions from 'actions/node/creators';
// import SnackbarSimple from 'components/common/snackbar/Snackbar';
import RaisedButton from 'components/common/mui/RaisedButton';
import { connect } from 'react-redux';

class Snack extends React.Component {
  openSnackbar() {
    const msg = new Date().toString();
    this.props.dispatch(actions.snackbar(true, `current date: ${msg}`));
  }

  render() {
    return (
      <div>
        <RaisedButton label="open" onClick={() => this.openSnackbar()} />
        <RaisedButton label="close" />
        {/*
        <SnackbarSimple />
  */}
      </div>
    );
  }
}

export default connect()(Snack);
