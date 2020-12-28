import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../layout/Form';

class ButtonView extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, star } = this.props;
    const contentDialog = <NewForm star={star} />;

    const optionsProperties = {
      handleClose: true,

      title: t1('view_comments'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1('view_comments')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonView);
