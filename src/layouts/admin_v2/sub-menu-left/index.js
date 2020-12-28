import React from 'react';
import getLodash from 'lodash.get';

import { connect } from 'react-redux';
import LeftAdminSubMenuPresenter from './SubMenuLeftPresenter';

class LeftAdminSubMenu extends React.Component {
  render() {
    const subMenuLeft = this.props.subMenuLeft || {};

    return <LeftAdminSubMenuPresenter {...subMenuLeft} />;
  }
}

const mapStateToProps = (state, props) => {
  const key = props.isHashbang
    ? 'layoutContext.subMenuLeft.dialog'
    : 'layoutContext.subMenuLeft.main';

  const subMenuLeft = getLodash(state, key);

  return { subMenuLeft };
};

export default connect(mapStateToProps)(LeftAdminSubMenu);
