import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import isEqual from 'lodash.isequal';
import schema from './quick-attendace-schema';
import get from 'lodash.get';

class Layout extends Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.formValues, nextProps.formValues)) {
      this.handleChange(nextProps);
    }
  }

  handleChange = (props) => {
    const { user, session, type, handleChange, formValues } = props;

    if (!handleChange) {
      return;
    }

    const userIid = get(user, 'iid');

    const hiddenFields = {
      type: type,
      user_iid: userIid,
      iid: get(session, 'iid'),
      id: get(session, 'id'),
    };

    handleChange({ ...formValues, user_iid: userIid }, hiddenFields, session);
  };

  render() {
    const { absenceReasons, user, formid, session, type, node } = this.props;

    const userIid = get(user, 'iid');

    const hiddenFields = {
      type: type,
      user_iid: userIid,
      iid: get(session, 'iid'),
      id: get(session, 'id'),
    };

    return (
      <NodeNew
        formid={formid}
        mode="edit"
        schema={schema(absenceReasons)}
        node={node}
        hiddenFields={hiddenFields}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    formValues: getFormValues(props.formid)(state),
  };
};

export default connect(mapStateToProps)(Layout);
