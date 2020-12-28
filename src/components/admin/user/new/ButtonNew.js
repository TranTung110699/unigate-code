import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes } from 'configs/constants';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, themeConfig, searchFormId } = this.props;

    const step =
      themeConfig.type === schoolTypes.ENTERPRISE ? 'employee' : 'student';
    const formid =
      themeConfig.type === schoolTypes.ENTERPRISE
        ? 'new_employee'
        : 'new_student';

    const contentDialog = <NewForm mode="new" searchFormId={searchFormId} />;
    // const contentDialog = (
    //   <NewForm mode="new" step={step} formid={formid}/>
    // );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('new_user'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <PrimaryButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_user')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

const mapPropsToState = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapPropsToState)(ButtonNew);
