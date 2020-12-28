import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';
import Icon from 'components/common/Icon';
import userMajorSchema from '../schema/form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, optionsFilter } = this.props;
    const { user_iid, ...hiddenFields } = this.props.hiddenFields || {};
    if (user_iid) {
      hiddenFields.user_iids = [user_iid];
    }
    const userIid = hiddenFields.user_iid;

    const contentDialog = (
      <NodeNew
        optionsFilter={optionsFilter}
        ntype="user_major"
        mode="new"
        step="student"
        schema={userMajorSchema}
        formid={'add-major-to-user'}
        searchFormId={this.props.formid}
        hiddenFields={hiddenFields}
        node={hiddenFields}
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('register_new_major'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <RaisedButton
        className={this.props.className}
        name="submit"
        type="submit"
        primary
        icon={<Icon icon="plus" />}
        label={t1('register_new_major')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
