import React from 'react';
import { connect } from 'react-redux';
import layoutContextAction from 'actions/layout-context';

class MenuTopContext extends React.Component {
  componentWillMount() {
    const { dispatch, schema } = this.props;
    if (schema) {
      dispatch(layoutContextAction.setBreadCrumb(schema));
    }
  }

  render() {
    return <span />;
  }
}

export default connect()(MenuTopContext);
