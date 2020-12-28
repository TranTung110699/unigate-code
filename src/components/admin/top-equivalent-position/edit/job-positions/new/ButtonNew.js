import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
// import apiUrls from 'api-endpoints';
import topEquivalentPositionApiUrls from 'components/admin/top-equivalent-position/endpoints';
import NewForm from '../new/Form';
import schema from '../schema';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, node } = this.props;
    const contentDialog = (
      <NewForm
        mode="new"
        formid="attach_job_position_to_equivalent_position"
        searchFormId="job_position_search_form"
        schema={schema}
        alternativeApi={
          topEquivalentPositionApiUrls.evn_equivalent_position_attach_job_position
        }
        step="job_position"
        node={node}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('attach_job_position_to_equivalent_position'),
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
        label={t1('attach_job_position_to_equivalent_position')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
