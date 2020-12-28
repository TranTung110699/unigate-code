import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../Form';

class ButtonNew extends Component {
  handleOnClick = () => {
    const { dispatch, history } = this.props;
    const hiddenFields = {
      type: 'syllabus_exam',
    };

    const contentDialog = (
      <NewForm
        mode="new"
        step="exam"
        hiddenFields={hiddenFields}
        requestSuccessful={(post) => {
          const url = routes.url('edit_item', {
            mode: 'children',
            item: { ntype: 'credit', iid: post.result.iid },
          });
          history.push(url);
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_exam_store'),
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
        label={t1('new_exam_store')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
