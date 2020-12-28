import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
// import apiUrls from 'api-endpoints';
import topEquivalentPositionApiUrls from 'components/admin/top-equivalent-position/endpoints';
import NewForm from '../new/Form';
import schema from '../schema/form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;
    const contentDialog = (
      <NewForm
        mode="new"
        formid="new_equivalent_position"
        searchFormId="top_equivalent_position_search"
        schema={schema}
        alternativeApi={
          topEquivalentPositionApiUrls.evn_equivalent_position_new
        }
        step="equivalent_position"
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_equivalent_position'),
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
        label={t1('new_equivalent_position')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
