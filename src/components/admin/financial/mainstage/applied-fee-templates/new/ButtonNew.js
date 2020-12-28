import React, { Component } from 'react';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import PropTypes from 'prop-types';
import DashBoard from './dashboard';

class ButtonNew extends Component {
  handleOnClick = () => {
    const { dispatch } = this.props;
    const contentDialog = <DashBoard title={t1('new_applied_fee_template')} />;
    const optionsProperties = {
      handleClose: true,
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
        label={t1('new_applied_fee_template')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

ButtonNew.propTypes = {
  dispatch: PropTypes.func,
};

ButtonNew.defaultProps = {
  dispatch: () => {},
};

export default connect()(ButtonNew);
