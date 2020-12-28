import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, dialogTitle, organizationLevelName } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        params={{
          identifier: t(organizationLevelName),
          type: 'organization',
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: dialogTitle,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { label } = this.props;
    return (
      <PrimaryButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={label}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const organizationLevelName = getCategoryStructureLevelNameSelector(state)(
    'organization',
    0,
  );
  let label = t1('new');
  if (organizationLevelName) {
    label = t1('new_%s', [t(organizationLevelName)]);
  }
  return {
    label,
    dialogTitle: label,
    organizationLevelName,
  };
};

export default connect(mapStateToProps)(ButtonNew);
