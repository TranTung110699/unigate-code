import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import CheckValidityIcon from 'material-ui/svg-icons/action/done';
import actions from 'actions/node/creators';
import FlatButton from 'components/common/mui/FlatButton';
import CheckValidityForm from 'components/admin/contest/check-validity/form';

class CheckValidity extends Component {
  handleOnClickCheckValidity = () => {
    const { dispatch, node } = this.props;
    const contentDialog = <CheckValidityForm node={node} />;

    const optionsProperties = {
      width: '70%',
      handleClose: true,
      title: t1('check_validity'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        label={t1('check_validity')}
        icon={<CheckValidityIcon />}
        onClick={() => this.handleOnClickCheckValidity()}
      />
    );
  }
}

export default connect()(CheckValidity);
