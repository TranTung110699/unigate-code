import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from './Form';

class NewPassDefButton extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = <NewForm mode="new" searchFormId="passdef_search" />;
    const optionsProperties = {
      handleClose: true,

      title: t1('new_passdef'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_skill_passing_definition')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(NewPassDefButton);
