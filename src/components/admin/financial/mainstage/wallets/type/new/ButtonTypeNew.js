import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import PropTypes from 'prop-types';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from './Form';

class NewButton extends Component {
  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        formid="wallet_type"
        searchFormId="wallet_type_search"
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_type'),
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
        label={t1('new_type')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

NewButton.propTypes = {
  dispatch: PropTypes.func,
};

NewButton.defaultProps = {
  dispatch: () => {},
};

export default connect()(NewButton);
