import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupApiUrls from 'components/admin/group/endpoints';
import NewForm from './Form';

class ButtonNew extends Component {
  render() {
    return (
      <NewForm
        hiddenFields={{}}
        mode="new"
        alternativeApi={groupApiUrls.new_user_group}
      />
    );
  }
}

export default connect()(ButtonNew);
