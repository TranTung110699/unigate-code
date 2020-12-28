import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import layoutContextAction from 'actions/layout-context';

class MenuLeftContext extends React.Component {
  componentWillMount() {
    const { dispatch, schema } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setMenuLeft(schema));
    }
  }

  componentWillUnmount() {
    const { dispatch, schema } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setMenuLeft(null));
    }
  }

  render() {
    return <span />;
  }
}

MenuLeftContext.propsTypes = {
  schema: PropTypes.arrayOf(PropTypes.any),
  messages: PropTypes.arrayOf(PropTypes.any),
  buttons: PropTypes.number,
};

export default connect()(MenuLeftContext);
