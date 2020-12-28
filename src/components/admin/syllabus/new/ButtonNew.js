import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, history } = this.props;
    const hiddenFields = { type: 'syllabus' };
    const contentDialog = (
      <NewForm
        mode="new"
        hiddenFields={hiddenFields}
        requestSuccessful={(post) => {
          const url = routes.url('edit_item', {
            base: '',
            item: { ntype: 'syllabus', iid: post.result.iid },
          });
          history.push(url);
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: t1('new_syllabus'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <RaisedButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_syllabus')}
        primary
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
