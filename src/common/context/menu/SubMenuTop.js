import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HashbangContext from 'components/common/modal/hashbang-context';
import SubMenuTopDispatcher from './SubMenuTopDispatcher';

class SubMenuTopContext extends React.Component {
  render() {
    // get the isHashbang context and pass it down to SubMenuTopDispatcher
    // so that it can run
    return (
      <HashbangContext.Consumer>
        {(value) => <SubMenuTopDispatcher {...this.props} isHashbang={value} />}
      </HashbangContext.Consumer>
    );
  }
}

export default SubMenuTopContext;
