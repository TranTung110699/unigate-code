import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions/creators';

class WithTitle extends React.Component {
  componentDidMount() {
    const { route } = this.props;
    this.props.dispatch(actions.setTopMenuElement({ siteTitle: route.title }));
  }

  render() {
    const { route } = this.props;
    return route.component;
  }
}

export default connect()(WithTitle);
