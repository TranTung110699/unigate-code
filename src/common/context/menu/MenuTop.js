import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import layoutContextAction from 'actions/layout-context';

class MenuTopContext extends React.Component {
  componentWillMount() {
    const { dispatch, schema } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setTopMenu(schema));
    }
  }

  componentWillUnmount() {
    const { dispatch, schema } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setTopMenu(null));
    }
  }

  render() {
    return <span />;
  }
}

MenuTopContext.propsTypes = {
  schema: PropTypes.arrayOf(PropTypes.any),
  messages: PropTypes.arrayOf(PropTypes.any),
  buttons: PropTypes.number,
};

export default connect()(MenuTopContext);
