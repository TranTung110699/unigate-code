import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
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
    const { dispatch, dialogTitle, majorLevelName } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        params={{
          identifier: t(majorLevelName),
          type: 'major',
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
      <FlatButton
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
  const majorLevelName = getCategoryStructureLevelNameSelector(state)(
    'major',
    0,
  );
  let label = t1('new');
  if (majorLevelName) {
    label = t1('new_%s', [t(majorLevelName)]);
  }
  return {
    label,
    dialogTitle: label,
    majorLevelName,
  };
};

export default connect(mapStateToProps)(ButtonNew);
