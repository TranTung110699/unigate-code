import React from 'react';
import { connect } from 'react-redux';

class Layout extends React.Component {
  render() {
    return <div className="my-sessions">This is examinations page</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.info,
  };
};

export default connect(mapStateToProps)(Layout);
